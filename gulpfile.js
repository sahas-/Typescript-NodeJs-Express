var gulp = require('gulp');
var typescript = require('gulp-tsc');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var tslint = require('gulp-tslint');
var plumber = require('gulp-plumber');
 
gulp.task('compileSrc', function(){
  console.log('compiling sources');
  gulp.src([
      'src/**/*.ts',
      '!src/test/**/*.ts'])
    .pipe(plumber())
    .pipe(typescript({emitError:true, module:'commonjs',target:'es5', out:'app.js'}))
    .pipe(clean({force: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('compileTests', function(){
  console.log('compiling tests');
  gulp.src(['src/test/**/*.ts'])
    .pipe(plumber())  
    .pipe(typescript({emitError:true, module:'commonjs',target:'es5'}))
    .pipe(clean({force: true}))
     .pipe(gulp.dest('dist/test/'))
});

gulp.task('tslint', function(){
    console.log('running tslint');
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('full'));
});

gulp.task('test', function () {
    return gulp.src('dist/test/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['compileSrc']);
    gulp.watch('test/**/*.ts', ['compileTests']);
});

gulp.task('default', function(){
     console.log('Default task: compile sources and tests');
     gulp.start(['compileSrc'],['compileTests'],['tslint']);
});
