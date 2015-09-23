/// <reference path = "ejsClient.ts" />
/// <reference path="../appConfig.ts" />

module ejsFactory{
	//to instantialize a client instance
	export class Client implements ejs.configs.IClientOptions{
		protected client;
		private clientConfig = ejs.configs.clientConfig;
		host = app.config.host;
		port = app.config.port;
		constructor();
		constructor(public options?: ejs.configs.IClientOptions){
			this.client = new this.clientConfig(({
				host:this.host || this.options.host,
				port:this.port || this.options.port}));
		}

	}
	
}
	
