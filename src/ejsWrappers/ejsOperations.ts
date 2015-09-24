/// <reference path="ejsFactory.ts" />
/// <reference path="../templates/addProject.ts" />
/// <reference path="./queries/search.ts" />

/// <reference path="../appConfig.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
var promise = require('promise');
var underscore = require('underscore');


module ejsOperations {
	export interface IOperationsResponse {
		isSuccess: boolean,
		code: number,
		message: string
	}



	export class Operations extends ejsFactory.Client implements IOperationsResponse {
		isSuccess: boolean;
		code: number;
		message: string;

		constructor(public options?: ejs.configs.IClientOptions) {
			super();
		}

		Ping() {
			return new promise((fulfill, reject) => {
				this.client.ping({
					requestTimeout: 30000,
					hello: "elasticsearch"
				}).then((res) => {
					fulfill(({ isSuccess: true, code: 200, message: "Operation Successful" }));

				}, (error) => {
					reject(({ isSuccess: false, code: 400, message: "Operation Unsuccessful" }));

				});
			});
		}

		CreateIndex(requestbody: string) {
			return new promise((fulfill, reject) => {
				this.client.bulk({
					type: 'post',
					body: this.buildBulkIndex(action, templateContent, requestbody)
				}).then((res) => {
					let msg = [
						{
							"msg":"created indices"
						},
						{
							"id":res.items[0].create._id							
						}];
					fulfill(({ isSuccess: true, code: 200, message: msg}));
				}, (error) => {
					reject(({ isSuccess: false, code: 500, message: "Create Index operation failure, " + error }));
				});
			})
		}
		deleteADoc(id: string){
			return new promise((fulfill, reject) => {
				let query = new ejsOperations.queries();
				this.client.delete({
					index: app.indexData.index,
					type: app.indexData.type,
					id: id 
				}).then((res) => {
					fulfill(({ isSuccess: true, code: 200, message: "Deleted the doc successfully" }));
				}, (error) => {
					reject(({ isSuccess: false, code: 400, message: "Delete attempt was unsuccessful, " + error }));					
				});
			})			
		}
		//later this can be used to get Unique divisions and product.
		getUnique(item: string) {
			return new promise((fulfill, reject) => {
				let query = new ejsOperations.queries();				
				this.client.search({
					index: app.indexData.index,
					type: app.indexData.type,
					body: query.getUnique(item)
				}).then((res) => {
					fulfill(({ isSuccess: true, code: 200, message: res.hits.hits }));
				}, (error) => {
					reject(({ isSuccess: false, code: 400, message: "Can't get products, " + error }));					
				});
			})
		}
		
		getAllCategories(){
			return new promise((fulfill,reject) => {
				let query = new ejsOperations.queries();
				this.client.search({
					index: app.indexData.index,
					type: app.indexData.type,
					body: query.getAllCategories()
				}).then((res) => {
					fulfill(({ isSuccess: true, code: 200, message: res.aggregations.categories })); //here categories is the aggregation name from the query
				},(error) =>{
					reject(({ isSuccess: false, code: 400, message: "Can't get categories, " + error }));										
				})
			})
		}
		
		getCategoryScore(division: string,product: string, application: string){
			return new promise((fulfill,reject) => {
				let query = new ejsOperations.queries();
				this.client.search({
					index: app.indexData.index,
					type: app.indexData.type,
					body: query.getCategoryScore(division, product, application)
				}).then((res) => {
					fulfill(({ isSuccess: true, code: 200, message: res.hits.hits })); //here categories is the aggregation name from the query
				},(error) =>{
					reject(({ isSuccess: false, code: 400, message: "Can't get category score, " + error }));										
				})
			})			
		}
		
		private buildBulkIndex(action, data, requestBody) {
			return (JSON.stringify(action) + '\n' + JSON.stringify(underscore.extend(requestBody, data)));
		}

	}
}