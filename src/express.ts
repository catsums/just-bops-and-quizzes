import path from 'path';
import http, { Server } from 'http';
import fs from 'node:fs/promises';
import url from 'url';
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import * as MY from '@catsums/my';
import * as MAINVARS from './myMainVariables'
import * as CONFIG from './config';

const ProcessDir = process.cwd();

//OTHER VARIABLES
const defaultPort = Number(process.env.PORT || 8081);
var PORT = defaultPort;

var app : express.Express;
var server : Server;

var sync = {
	seconds: 60,
	elapsed: 0,
	timerFlag: false,
}

function startExpressServer(port = defaultPort){
	app = express();
	server = app.listen(port, ()=>{
		console.log(`Server started! @${new Date()}`);
	});

	app
		.use(bodyParser.text({limit: '5mb'}))
		.use(bodyParser.json({limit: '5mb'}))
		// for parsing application/x-www-form-urlencoded
		.use(bodyParser.urlencoded({ extended: false }))
		//cross-origin
		.use(cors())
	ExpressSetup.routes.forEach((val)=>{
		app.set("views", ProcessDir);
		app.use(express.static(path.join(ProcessDir, 'public')));
		console.log(val.route)
		app.get(val.route, (req,res)=>{
			res.status(val.status);
			// res.setHeader('Accept-Encoding','gzip');

			let urlParams = MY.parseURLParams(req.url) as IJSON;

			let viewData : any = {
				local:{}
			};
			if(urlParams){
				viewData.local.urlParams = urlParams;
			}
			viewData.local = Object.assign(viewData.local,ExpressSetup.meta);

			viewData.local.url = `${ExpressSetup.meta.url || `https://${req.headers.host}${req.url}`}`;

			var renderPath = path.resolve(ExpressSetup.routeDirectory,val.render);
			// var renderPath = val.render;
			if(val.preRender){
				console.log(34234545+'e');
				val.preRender(req,res,viewData);
			}

			console.log({renderPath, __dirname, ProcessDir});

			res.sendFile(path.resolve(renderPath));
			// fs.readFile(renderPath, 'utf8', function(err, filedata){
			//	 if(err){
			//		 throw err;
			//	 }
				
			//	 if(val.postRender){
			//		 val.postRender(req,res,filedata);
			//	 }

				
			// });

		});
	});


}

var ExpressSetup = {
	routes : [
		{route:"/", render: "index.html", status:200, preRender:function(req,res,data){
			
		}},
		{route:"/home", render: "home.html", status:200, preRender:function(req,res,data){

		}},
		{route:"/signup", render: "signup.html", status:200, preRender:function(req,res,data){

		}},
		{route:"/play", render: "play.html", status:200, preRender:function(req,res,data){

		}},
		// {route:"*", render: "public/404.html", status:404, preRender:function(req,res,data){

		// }},
	],
	defaultURL: `${MAINVARS.metadata.url || `https://localhost:${PORT}`}`,
	routeDirectory: "./public/",
	meta: MAINVARS.metadata,
};


function switchPort(server:http.Server, newPort:number, callback = ()=>{}){
	server.close();
	sync.timerFlag = true;
	server.listen(newPort,()=>{
		console.log(`Server is listening on port ${newPort}`);
	});
	callback();
	sync.timerFlag = false;
	syncTimer(sync.seconds);
}
function syncTimer(seconds : number, callback = ()=>{}){
	if(seconds<=0.01) seconds = 10;
	if(seconds>=360) seconds = 359.99;
	if(!sync.timerFlag){
		sync.timerFlag = true;
		var tS = setTimeout(()=>{
			sync.timerFlag = false;
			
			callback();

			sync.elapsed += seconds;
			syncTimer(seconds);
		}, Math.floor(seconds*1000));
	}
}

export {
	ExpressSetup,
	server, app,
	defaultPort, PORT, sync,
	startExpressServer, switchPort, syncTimer,
}
