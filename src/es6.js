var babel = require("babel-core");
var argc = process.argv.length;

babel.transformFile(process.argv[argc - 1], function (err, result) {
    eval(result.code);
});