var schema = require ('js-schema');

//how to implement this via interfaces ??
module inputValidator{
	export class addProjectRequest {
			expect = schema({
				'division':String,
				'product':String,
				'application':String,
				"*":null,
			});
			isValid(body){
				return this.expect(body);
			}
	}
}
