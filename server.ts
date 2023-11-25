
import path from 'path';
import http from 'http';
import fs from 'node:fs/promises';
import url from 'url';
import express from "express";
import fetch from 'node-fetch';
import {
	File, FileList, FileReader
} from 'file-api';

//SERVER COMPONENTS
import * as Express from './src/express';
import * as IO from './src/socket';
import * as API from './src/api';

//OUR VARIABLES AND HELPER FUNCTIONS
import * as MY from '@catsums/my';
import * as MAINVARS from './src/myMainVariables'
import * as CONFIG from './config/config';


//SERVER RUNTIME SETTINGS
var FileProcess : any = {
	nodePath : '',
	filePath : '',
	args : [],
};

var MySystem = {
	test: false,
	dev: false
};


//PROCESSING RUNNING ARGS
process.argv.forEach(function (val, index, array) {
  switch(index){
	case 0:
		FileProcess.nodePath = val;
		console.log(`NodePath: ${FileProcess.nodePath}`);
		break;
	case 1:
		FileProcess.filePath = val;
		console.log(`FilePath: ${FileProcess.filePath}`);
		break;
	default:
		FileProcess.args.push(String(val).toLowerCase());
		break;
  }
});
if(FileProcess.args.length>0){
	console.log(FileProcess.args);
	FileProcess.args.forEach((arg,index)=>{
		switch(arg){
			case '-test':
				MySystem.test = true;break;
			case '-dev':
				MySystem.dev = true;break;
			default:
				MY.clog(`Invalid argument:\t${arg}`);
				break;
		}
	});
}

//OTHER VARIABLES
const defaultPort = (MySystem.test||MySystem.dev)?8081:(process.env.PORT ||8081);
var PORT = defaultPort;

async function testDB(db, data={}){

}

//CREATE APP AND START SERVER

Express.startExpressServer( Number(PORT) );
const {app, server} = Express;

//API
API.setupExpressApp(app);

/// SOCKET IO ///
IO.startSocketServer(server);

// app
// 	 .set('views', __dirname)
// 	 .use(express.static(path.join(__dirname, 'public')))
// 	 .get('/', (req,res) => {
// 		console.log('pizzaa')
// 		 res.sendFile(path.resolve(`./public/index.html`));
// 	 });
// app
//	 .set('views', __dirname)
//	 .use(express.static(path.join(__dirname, 'public')))
//	 .get('*', (req,res) => {
//		 res.sendFile(path.resolve(`./dist/public/index.html`));
//	 });
// app.use(express.static("public"))
//	 .set('views', __dirname)
//	 .route("/")
//	 .get((req,res,next)=>{
//		 console.log("/");
//		 res.status(200);

//		 res.sendFile(path.resolve(`./dist/public/index.html`));
//	 });
// app.use(express.static("public"));
// app.set('views', __dirname);
// app.route("*").get((req,res,next)=>{
//	 console.log("*");
//	 res.status(404);

//	 res.sendFile(path.resolve(`./dist/public/index.html`));
// });

function getRequestURL(req){
	var hostname = req?.headers?.host;
	var pathname = url.parse(req?.url)?.pathname;
	if(!hostname||!pathname) return null;
	// console.log(`http://${hostname}${pathname}`);
	return `http://${hostname}${pathname}`;
}


function toJsonString(data) {
	if (data !== undefined) {
	  let intCount = 0, repCount = 0;
	  const json = JSON.stringify(data, (_, v) => {
		  if (typeof v === 'bigint') {
			  intCount++;
			  return `${v}#bigint`;
		  }
		  return v;
	  });
	  const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
		  repCount++;
		  return a;
	  });
	  if (repCount > intCount) {
		  // You have a string somewhere that looks like "123#bigint";
		  throw new Error(`BigInt serialization conflict with a string value.`);
	  }
	  return res;
  }
}

function toObject() {
  return JSON.parse(JSON.stringify(this, (key, value) =>
	  typeof value === 'bigint'
		  ? value.toString()
		  : value // return everything else unchanged
  ));
}
