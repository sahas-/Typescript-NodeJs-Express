/// <reference path="../../typings/moment/moment.d.ts" />

moment = require('moment');

module utils{
	export class logger{
		write(msg: string){
			console.log(moment().format('MM-DD-YYYY, h:mm:ss a')+" --> "+msg);
		}
	}
}

