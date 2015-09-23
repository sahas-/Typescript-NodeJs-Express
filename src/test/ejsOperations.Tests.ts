/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/supertest/supertest.d.ts" />
/// <reference path="../../typings/chai-subset/chai-subset.d.ts" />
var chai: Chai.ChaiStatic = require('chai');
var request = require('supertest');
var assert = require('chai').assert;
var should = require('chai').should();

describe("ElasticSearch Operations wrapper integration tests ...", function() {

    var url = "http://localhost:3000";
	var docs=[];
	it('get /healthcheck should return 200 OK ...', function(done) {
		request(url)
			.get('/healthcheck')
			.expect(200,done);
	});

	it('post /heatmap/addProject/default with valid data should create the documents in Elasticsearch', function(done) {
			request(url)
				.post('/heatmap/addProject/default')
				.send({
					division: "test",
					product: "test",
					application: "test"
				})
				.end(function(err, res) {
					if (err) throw err;
					docs.push(res.body.message[1].id); //for cleanup later
					chai.expect(res.body.message[1].id).not.undefined;
					chai.expect(res.body.message[1].id).not.null;	
					res.body.should.have.property('isSuccess', true);			
					done();	
		
				});
	});

	//how to test this?	
	// it('post /heatmap/addProject/default should return 500 response back to the client on Elasticsearch related failure',function(done){


	// });
	
	it('post /heatmap/addProject/default should return 400 response back to the client when invalid input data provided', function(done) {
		request(url)
			.post('/heatmap/addProject/default')
			.send({ division1: 'test', product: 'test', application: 'test' })
			.expect(400, done);
	});
	
	it('delete /heatmap/delete with NULL id should return 400',function(done){
		var id=null;
		request(url)
		.delete('/heatmap/delete/'+id)
		.expect(400, done);
	});

	it('get /heatmap/applications should return applications conforming to the contract', function(done) {
		request(url)
			.get('/heatmap/applications')
			.end(function(err, res) {
				if (err) throw err;
				chai.expect(res.body.message).to.be.instanceof(Array);
				chai.expect(res.body.message).to.have.deep.property('[0].fields.division');
				chai.expect(res.body.message).to.have.deep.property('[0].fields.product');
				chai.expect(res.body.message).to.have.deep.property('[0].fields.application');
				done();
			})
	});
	
	it('get heatmap/categories should return categories conforming to the contract',function(done){
		request(url)
			.get('/heatmap/categories')
			.end(function(err, res) {
				if (err) throw err;
				chai.expect(res.body.message.category.buckets).to.be.instanceof(Array);
				done();		
		});
	});
	
	it('should clean up all the docs created by automated test',function(done){
		docs.forEach(element => {
			request(url)
			.delete('/heatmap/delete/'+element)
			.expect(200,done);
		});
	});	

});

