/// <reference path="../utils/logger.ts" />
/// <reference path="../ejsWrappers/ejsFactory.ts" />
/// <reference path="../ejsWrappers/ejsOperations.ts" />
/// <reference path="../utils/inputValidator.ts" />

var promise = require('promise');


module routes {
	export class heatmap {
		public _logger = new utils.logger();

		init(app, router) {
			router.get('/healthcheck', (request, response) => {
				var ops = new ejsOperations.Operations();
				return ops.Ping().then((res) => {
					this.sendResponse(res.code, res.isSuccess, res.message, response);
				}, (error) => {
					this.sendResponse(error.code, error.isSuccess, error.message, response);
				});
			});


			router.get('/heatmap/producthierarchy', (request, response) => {
				var ops = new ejsOperations.Operations();
				return ops.getProductHierarchy().then((res) => {
					this.sendResponse(res.code, res.isSuccess, res.message, response);
				}, (error) => {
					this.sendResponse(error.code, error.isSuccess, error.message, response);
				});
			});

			router.get('/heatmap/categories', (request, response) => {
				var ops = new ejsOperations.Operations();
				return ops.getAllCategories().then((res) => {
					this.sendResponse(res.code, res.isSuccess, res.message, response);
				}, (error) => {
					this.sendResponse(error.code, error.isSuccess, error.message, response);
				});
			});
			
			router.post('/heatmap/categoryscore',(request,response) =>{
				//reusing the same validator
				var validator = new inputValidator.addProjectRequest();

				if (!validator.isValid(request.body)) {
					this.sendResponse(400, false, 'Input validation failed', response);
				}
				else {
					var ops = new ejsOperations.Operations();
					console.log(request.body.division);
					return ops.getCategoryScore(request.body.division, request.body.product, request.body.application).then((res) => {
						this.sendResponse(res.code, res.isSuccess, res.message, response);
					}, (error) => {
						this.sendResponse(error.code, error.isSuccess, error.message, response);
					})
				}
			});
			
			//this is for internal use only
			router.delete('/heatmap/delete/:id',(request,response) => {
				var id = request.params.id;
				if(id === null || id === 'undefined'){
					this.sendResponse(400, false, "Bad request", response);
				}
				else{
					var ops = new ejsOperations.Operations();
					return ops.deleteADoc(id).then((res) => {
						this.sendResponse(res.code, res.isSuccess, res.message, response);
					}, (error) => {
						this.sendResponse(error.code, error.isSuccess, error.message, response);
					});				
					
				}
			});

			router.post('/heatmap/addProject/:default', (request, response) => {
				var validator = new inputValidator.addProjectRequest();

				if (!validator.isValid(request.body)) {
					this.sendResponse(400, false, 'Input validation failed', response);
				}
				else {
					var ops = new ejsOperations.Operations();
					return ops.CreateIndex(request.body).then((res) => {
						this.sendResponse(res.code, res.isSuccess, res.message, response);
					}, (error) => {
						this.sendResponse(error.code, error.isSuccess, error.message, response);
					})
				}
			});
		};


		sendResponse(status: number, flag: boolean, output: string, response: any) {
			var logMsg = 'statusCode: ' + status + ' ,output: ' + JSON.stringify(output);
			this._logger.write(logMsg);
			response.status(status).send({
				isSuccess: flag,
				message: output
			});
		};
	}
}