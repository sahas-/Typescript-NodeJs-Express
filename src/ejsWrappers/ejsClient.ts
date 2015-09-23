var es = require('elasticsearch');

module ejs.configs{
	export interface IClientOptions{
		host: string;
		port: number;
	}
	

	export class clientConfig implements IClientOptions{
		host: string;
		port: number;
		
		constructor(public options: IClientOptions){
			this.host= options.host;
			this.port = options.port;
			return new es.Client({
				host: this.host+":"+this.port
			});
		}	
	}
	
}