module app{
	export class config{
		static host = "http://192.168.99.111"
		static port = 9200;
		static log = ['error', 'trace'];
    	static keepAlive = true;
		static maxKeepAliveTime= 600000;
	} 
	export class indexData{
		static index = "elasticsearch"
		static type = "simple"
	}
	 
}