/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="../typings/cors/cors.d.ts"/>
/// <reference path="utils/logger.ts" />
/// <reference path="routes/controller.ts" />

var http = require('http');
var express = require('express');
var bodyparser = require ('body-parser');
var cors = require('cors');
var fs = require ('fs');
var path = require ('path');

class Server{
	private app;
	private router;
	private port;

	constructor(port: number){
		this.app = express();
		this.router = express.Router();
		this.port=port;
		
	}
	SetAppPreferences(){
		this.router.use((req,res,next)=>{
			next();
		});
		
		this.app.use(bodyparser.json({strict:false}));
		this.app.use(bodyparser.urlencoded({exteded:true}));
		this.app.use(cors());
		this.app.use('/',this.router);
		var route = new  routes.heatmap();
		route.init(this.app,this.router);

	}

	Start(){
		this.app.listen(this.port);	
		var _logger = new utils.logger();
		_logger.write('running server on port '+ this.port);
	}
}

var serverport = 3000;
var server = new Server(serverport);
server.SetAppPreferences();
server.Start();

