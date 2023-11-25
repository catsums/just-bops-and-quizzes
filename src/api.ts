
import path from 'path';
import http from 'http';
import fs from 'node:fs/promises';
import url from 'url';
import express from 'express';

import {
	File, FileList, FileReader
} from 'file-api';

import { MongoClient, ServerApiVersion } from 'mongodb';
import md5 from 'salted-md5';
import * as CRC32C from 'crc-32/crc32c';
import cloudinary from 'cloudinary';

//OUR VARIABLES AND HELPER FUNCTIONS
import * as MY from '@catsums/my';
import * as MAINVARS from './myMainVariables'
import * as CONFIG from './config';

/// MONGODB ///

const mongoClient = new MongoClient(CONFIG.MongoDB.uri, {
	serverApi: ServerApiVersion.v1,
});

//use env variables for these
const dbOpts = {
	uri: CONFIG.MongoDB.uri,
	username: CONFIG.MongoDB.username,
	pass: CONFIG.MongoDB.pass,
	cluster: CONFIG.MongoDB.cluster,
	dbName: CONFIG.MongoDB.dbName,
};

/// Cloudinary ///

//use env variables for these
cloudinary.v2.config({ 
	cloud_name: CONFIG.Cloudinary.cloud_name,
	api_key: CONFIG.Cloudinary.api_key, 
	api_secret: CONFIG.Cloudinary.api_secret, 
});

const dbObject : {
	client : MongoClient | null;
	conn : MongoClient | null;
	connected : boolean;
} = {
	client: null,
	conn: null,
	connected: false,
};

if(mongoClient){
	dbObject.client = mongoClient;

	mongoClient.on('open', ()=>{
		dbObject.connected=true; //log(now()+'DB connected.')
	});
	mongoClient.on('topologyClosed', ()=>{
		dbObject.connected=false; //log(now()+'DB disconnected.')
	});
}


async function mongoClientConnection(){
	if(!dbObject.connected){
		dbObject.conn = await mongoClient.connect();
	}
	return dbObject.conn;
}

var _SALT = 'd33Z_NUT5';
var _SECRET_SALT = 'can_we_pretend_that_aIrplanes_In_the_nIght_sky_are_lIke_shooting_stars_I_could_really_use_a_wIsh_right_now';

function setupExpressApp(app : express.Application){
	
	app
	.get('/files/:tagId',async(req,res)=>{
		let tag = req.params.tagId;

		if(!tag){
			res.status(404).send(response(
				false, 'Access Denied or no file with name or id was found.'
			));
			return;
		}else{
			console.log({tag});
			console.log({params:req.params});
			console.log('any')
		}

		let reqData = {
			id: tag,
		};

		let result : any = null;

		let db : MongoClient | null = null;

		try{
			// db = await mongoClient.connect();
			db = await mongoClientConnection();
			if(!db){
				throw 'No database object created from MongoDB';
			}
		}catch(err){
			console.log(err);

			res.status(506).send(response(
				false, 'Internal Server error. Database not connecting. Please contact the JBQ website admin.'
			));

			return;
		}

		try{
			result = await getFileBlob(db, reqData, res);

			console.log({result});

			if(result?.file){
				let blob = result.file;
				console.log({type:blob.type, blob})

				res.contentType(blob.type);
				// res.set("Content-Disposition", "inline;");
				
				let buf = await blob.arrayBuffer();
				res.send(Buffer.from(buf));
			}else{
				res.send(result);
			}
		}catch(err){
			console.log(err);
		}
							
		// db.close();
		return;

	})
	.get('/files/images/:tagId',async(req,res)=>{
		let tag = req.params.tagId;

		if(!tag){
			res.status(404).send(response(
				false, 'Access Denied or no file with name or id was found.'
			));
			return;
		}else{
			console.log({tag});
			console.log({params:req.params});
			console.log('images')
		}

		let reqData = {
			id: tag,
		};

		let result : any = null;

		let db : MongoClient | null = null;

		try{
			// db = await mongoClient.connect();
			db = await mongoClientConnection();
			if(!db){
				throw 'No database object created from MongoDB';
			}
		}catch(err){
			console.log(err);

			res.status(506).send(response(
				false, 'Internal Server error. Database not connecting. Please contact the JBQ website admin.'
			));

			return;
		}

		try{
			result = await getFileBlob(db, reqData, res,{
				type:{$regex:/image\//}
			});

			console.log({result});

			if(result?.file){
				let blob = result.file;

				console.log({type:blob.type, blob})

				res.contentType(blob.type);
				res.type(blob.type);
				
				let buf = await blob.arrayBuffer();
				res.send(Buffer.from(buf));
			}else{
				res.send(result);
			}
		}catch(err){
			console.log(err);
		}
							
		// db.close();
		return;

	})
	.get('/files/songs/:tagId',async(req,res)=>{
		let tag = req.params.tagId;

		if(!tag){
			res.status(404).send(response(
				false, 'Access Denied or no file with name or id was found.'
			));
			return;
		}else{
			console.log({tag});
			console.log({params:req.params});
			console.log('songs')
		}

		let reqData = {
			id: tag,
		};

		let result : any = null;

		let db : MongoClient | null = null;

		try{
			// db = await mongoClient.connect();
			db = await mongoClientConnection();
			if(!db){
				throw 'No database object created from MongoDB';
			}
		}catch(err){
			console.log(err);

			res.status(506).send(response(
				false, 'Internal Server error. Database not connecting. Please contact the JBQ website admin.'
			));

			return;
		}

		try{
			result = await getFileBlob(db, reqData, res,{
				type:{$regex:/audio\//}
			});

			console.log({result});

			if(result?.file){
				let blob = result.file;

				res.contentType(blob.type);
				res.type(blob.type);
				
				let buf = await blob.arrayBuffer();
				res.send(Buffer.from(buf));
			}else{
				res.send(result);
			}
		}catch(err){
			console.log(err);
		}
							
		// db.close();
		return;

	})
	.post('/api', async(req,res)=>{
		let reqData = req.body;
		if(MY.isString(reqData) && MY.isJSON(reqData)){
			reqData = JSON.parse(reqData);
		}
		if(!MY.isObject(reqData)){
			//send err
			res.send('eat ass');
		}
		// res.end('WHO ASKED??!!');
		/*
			{
				key: string|api_key,
				type: string,
				subType: string,
				id: string,
				data: object|any
			}
		*/

		console.log({reqData,body:req.body})

		if(!reqData?.data){
			res.status(400).send(response(
				false, 'Error in request: No data available.'
			));
			return;
		}

		let result : any = null;

		let db : MongoClient | null = null;

		try{
			db = await mongoClientConnection();
			// db = await mongoClient.connect();
			if(!db){
				throw 'No database object created from MongoDB';
			}
		}catch(err){
			console.log(err);

			res.status(506).send(response(
				false, 'Internal Server error. Database not connecting. Please contact the JBQ website admin.'
			));

			return;
		}

	try{

		console.log(reqData);

		switch(reqData?.type){
			case 'file':
				if(!reqData?.key){
					res.send(response(false,'Error: API Key is missing'));
				}else if(!reqData?.id){
					res.send(response(false,'Error: UserID for verification is missing'));
				}else if(await verify(db, reqData, res)){
					
					let subType = reqData.subType;

					switch(subType){
						case 'upload': case 'post':
							result = await uploadFile(db, reqData.data, res);
							break;
						case 'get': case 'download':
							result = await getFile(db, reqData.data, res);
							break;
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}

					res.send(result);

				}else{
			res.status(501).send(
				response(false,'Invalid API Request. Please use a valid api key and be logged in.')
			);
			}
				break;
			case 'signup':
				if(await checkUser(db, reqData.data, res)){
					res.send(
						response(false,'Username/Email already exists')
					);
					return;
				}
				result = await createUser(db, reqData.data, res);
				res.send(result);
				break;
			case 'login':
				if(!(await checkUser(db, reqData.data, res))){
					res.send(
						response(false,'Username/Email does not exist...maybe sign up?')
					);
					return;
				}
				result = await loginUser(db, reqData.data, res);
				res.send(result);
				break;
			case 'user':
				if(!reqData?.key){
					res.send(response(false,'Error: API Key is missing'));
				}else if(!reqData?.id){
					res.send(response(false,'Error: UserID for verification is missing'));
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'get':
							result = await getUser(db, reqData.data, res);
							break;
						case 'getAll':
							result = await getUser(db, reqData.data, res, true);
							break;
						case 'check':
							let check = await checkUser(db, reqData.data, res);
							if(check){
								result = response(true,'User exists', check); 
							}else{
								result = response(false,'User does not exists',check);
							}
							break;
						case 'create':
							result = await createUser(db, reqData.data, res);
							break;
						case 'edit':
							result = await editUser(db, reqData.data, res);
							break;
						case 'delete':
							result = await deleteUser(db, reqData.data, res);
							break;
						
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}

					res.send(result);
				}else{
			res.status(501).send(
				response(false,'Invalid API Request. Please use a valid api key and be logged in.')
			);
		}

				break;
			case 'quiz':
				if(!reqData?.key){
					res.send(response(false,'Error: API Key is missing'));
				}else if(!reqData?.id){
					res.send(response(false,'Error: UserID for verification is missing'));
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'get':
							result = await getQuiz(db, reqData.data, res);
							break;
						case 'getAll':
							result = await getQuiz(db, reqData.data, res, true);
							break;
						case 'check':
							let check = await checkQuiz(db, reqData.data, res);
							if(check){
								result = response(true,'Quiz exists', check); 
							}else{
								result = response(false,'Quiz does not exists',check);
							}
							break;
						case 'create':
							result = await createQuiz(db, reqData.data, res);
							break;
						case 'edit':
							result = await editQuiz(db, reqData.data, res);
							break;
						case 'delete':
							result = await deleteQuiz(db, reqData.data, res);
							break;
						
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}

					res.send(result);
				}else{
			res.status(501).send(
				response(false,'Invalid API Request. Please use a valid api key and be logged in.')
			);
			}
				break;
			case 'playlist':
				result = await getSong(db, reqData.data, res, true);

				res.send(result);
				break;
			case 'list':
				if(!reqData?.key){
					res.send(response(false,'Error: API Key is missing'));
				}else if(!reqData?.id){
					res.send(response(false,'Error: UserID for verification is missing'));
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'get':
							result = await getList(db, reqData.data, res);
							break;
						case 'getAll':
							result = await getList(db, reqData.data, res, true);
							break;
						case 'check':
							let check = await checkList(db, reqData.data, res);
							if(check){
								result = response(true,'List exists', check); 
							}else{
								result = response(false,'List does not exists',check);
							}
							break;
						case 'create':
							result = await createList(db, reqData.data, res);
							break;
						case 'edit':
							result = await editList(db, reqData.data, res);
							break;
						case 'delete':
							result = await deleteList(db, reqData.data, res);
							break;
						
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}

					res.send(result);
				}else{
			res.status(501).send(
				response(false,'Invalid API Request. Please use a valid api key and be logged in.')
			);
		}
				break;
			case 'song':
				if(!reqData?.key){
					res.send(response(false,'Error: API Key is missing'));
				}else if(!reqData?.id){
					res.send(response(false,'Error: UserID for verification is missing'));
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'get':
							result = await getSong(db, reqData.data, res);
							break;
						case 'getAll':
							result = await getSong(db, reqData.data, res, true);
							break;
						case 'check':
							let check = await checkSong(db, reqData.data, res);
							if(check){
								result = response(true,'Song exists', check); 
							}else{
								result = response(false,'Song does not exists',check);
							}
							break;
						case 'create':
							result = await createSong(db, reqData.data, res);
							break;
						// case 'edit':
						// 	result = await editSong(db, reqData.data, res);
						// 	break;
						// case 'delete':
						// 	result = await deleteSong(db, reqData.data, res);
						// 	break;
						
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}

					res.send(result);
				}else{
				res.status(501).send(
					response(false,'Invalid API Request. Please use a valid api key and be logged in.')
				);
			}
				break;
			case 'verify':
				if(!reqData?.key){
					res.status(400);
					result = response(false, 'Error: API Key missing');
				}else{
					if(await checkUser(db, reqData.data, res)){
						result = await verifyKey(db, reqData, res);
					}else{
						result = response(false,'Username does not exist');
					}
				}
				res.send(result);
				break;
			case 'search':

				break;
			case 'connect':
				if(!reqData.key){
					res.status(400);
					result = response(false,'Error: API Key is missing');
				}else if(!reqData.key){
					res.status(400);
					result = response(false,'Error: UserID for verification is missing');
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'addFriend':
							result = await addFriend(db, reqData.data, res);
							break;
						case 'removeFriend':
							result = await removeFriend(db, reqData.data, res);
							break;
						case 'addFollow':
							result = await addFollow(db, reqData.data, res);
							break;
						case 'removeFollow':
							result = await removeFollow(db, reqData.data, res);
							break;
						case 'addScore':
							result = await addScore(db, reqData.data, res);
							break;
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}
				}else{
					res.status(501)
					result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
				}

				res.send(result);
				break;
			case 'activity':
				if(!reqData.key){
					res.status(400);
					result = response(false,'Error: API Key is missing');
				}else if(!reqData.key){
					res.status(400);
					result = response(false,'Error: UserID for verification is missing');
				}else if(await verify(db, reqData, res)){
					let subType = reqData.subType;

					switch(subType){
						case 'get':
							result = await getActivity(db, reqData.data, res);
							break;
						case 'getAll':
							result = await getActivity(db, reqData.data, res, true);
							break;
						case 'set':
							result = await setActivity(db, reqData.data, res);
							break;
						default:
							res.status(501);
							result = response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.');
							break;
					}
				}else{
					res.status(501)
					result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
				}

				res.send(result);
				break;
			
			default:
				res.status(501).send(
						response(
						false,'Invalid APIRequest. API request type is not implemented or non-existent.'
					)
				);
				break;
		}

	}catch(err){
		console.log(err);

		res.status(506).send(response(
			false, 'Internal Server error. Error happened while processing request. Please contact the JBQ website admin.'
		));
	}

		// db.close();

		return;
	});
}

async function uploadMultipleFiles(db:MongoClient, data:IObject, resp:express.Response){
	let initRes = response(false, 'Processing',{ fileData:[]});

	if(MY.isArray(data.files)){
		for(let fileData of data.files as IObject[]){
			if(data.userID) fileData.userID = data.userID;
			let _res = await uploadFile(db, fileData,resp);

			if(_res.success){
				initRes.success = true;
				initRes.data.fileData.push(_res.data);
			}else{
				initRes.data.fileData.push(null);
			}
		}

		if(initRes.success)
			initRes.message = 'File(s) uploaded successfully';
		else
			initRes.message = 'All files failed to upload due to error in data.';
		resp.status(200);

		return initRes;

	}

	initRes.message = 'Error in files container data';

	resp.status(400);
	return initRes;
}

async function uploadFile(db:MongoClient, data:IObject, resp:express.Response){

	/*
		{
			name: String,
			contents: String|Base64,
			type: MIMEType,
			userID: String,
			urls: String[] (usually blank)
		}
	*/

	/*
		{
			files:[
				{
					name:String, contents:String|Base64, type: MIMEType, urls:String[]
				}
			],
			userID: String
		}
	*/

	if(data?.files){
		return await uploadMultipleFiles(db,data,resp);
	}

	if(!data.name){
		resp.status(400);
		return response(false, "File Name is missing");
	}
	// if(!data.userID){
	// 	return response(false, "UserID is missing");
	// }
	if(!data.contents){
		resp.status(400);
		return response(false, "File Content/Data is missing");
	}
	if(!data.type) data.type = 'object/*';

	try{
		let id = MY.hash32(`${data?.name}${data?.userID}${MY.randomString(8)}`);
		data.id = id;
		let res = await cloudinary.v2.uploader.upload(`${data.contents}`,{
			public_id: `${data.id}`
		});

		if(!MY.isArray(data.resources)){
			data.resources = [];
		}
		data.resources.push(res);

		if(!MY.isArray(data.urls)){
			data.urls = [];
		}
		data.urls.push(res?.url);

	}catch(err){
		console.log(err);

		resp.status(400);
		return response(false, 'An error occurred trying to upload the file resource.');
	}

	try{

		let query = {
			id: data?.id || '',
			name: data?.name || '',
			type: data?.type || '',
			urls: data?.urls,
			userID: data?.userID || '',
		}

		let res = await db.db(dbOpts.dbName).collection('files')
		.insertOne(query);

		if(res.insertedId){
			resp.status(202);
			return response(true, 'File uploaded successfully', {
				id: data?.id,
				name: data?.name,
				urls: data?.urls,
				resources: data?.resources,
			});
		}
	}catch(err){
		console.log(err);
	}
	resp.status(400);
	return response(false, 'Error occurred trying to upload file.');

}

async function _getFile(db:MongoClient, data:IObject, resp:express.Response, opts:IObject | null = null){
	
	const { Blob } = await import('fetch-blob');
	/*
		{
			url: String,
			id: String,
		}
	*/

	if(!data?.name && !data.id){
		resp.status(400);
		return response(false, 'ID and File name is missing');
	}

	let query = {
		$or:[
			{
				id: data?.id || ''
			},
			{
				name: data?.name || ''
			}
		]
	};

	if(opts){
		for(let opt of Object.keys(opts)){
			query[opt] = opts[opt];
		}
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('files')
		.find(query).toArray();

		if(!res.length){
			resp.status(404);
			return response(false, 'File not found or does not exist');
		}

		let fileData = res[0];

		let fileBlob : any = null;

		for(let _url of fileData.urls){
			try{
				let _res;

				console.log(`url: ${_url}`);

				try{
					_res = await fetch(_url, {});
					fileBlob = await _res.blob();
				}catch(err){ console.log('url');console.log(err); }

				try{
					_res = await fs.readFile(path.resolve('public',_url));
					let _type = fileData?.type || 'text/plain';
					fileBlob = new Blob([_res],{type:_type});
				}catch(err){ console.log('path');console.log(err); }
				
				if(fileBlob){ 
					fileBlob.name = fileData.name;
					console.log({fileBlob:true})
					break;
				}
				throw 'File resource was blank';

			}catch(err){
				console.log(err);
			}
		}

		// console.log({fileBlob})

		if(!fileBlob){
			resp.status(403);
			return response(false, 'Failed to retrieve file from url');
		}

		fileData.contents = fileBlob;

		resp.status(200);
		return response(true, 'Fetched File Data!', fileData);
		
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function getFile(db:MongoClient, data:IObject, resp:express.Response){

	try{
		
		let res = await _getFile(db,data,resp);

		console.log({res});

		if(!res.success){
			return res;
		}
		if(res?.data?.contents){
			res.data.contents = await getBase64(res.data.contents);
		}

		resp.status(200);
		return res;
		
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function getFileBlob(db:MongoClient, data:IObject, resp:express.Response, opts : any = null){

	if(!data?.name && !data.id){
		resp.status(400);
		return response(false, 'ID and File name is missing');
	}

	try{
		let res : any = await _getFile(db,data,resp,opts);

		console.log({res});

		if(!res.success){
			return res;
		}
		if(res?.data?.contents){
			res = {file : res.data.contents};
		}

		resp.status(200);
		return res;

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function verify(db:MongoClient, data:IObject, resp:express.Response){
	if(!data?.id || !data?.key) return false;

	let query = {
		apikey: data?.key,
		userID: data?.id
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('apikeys')
		.find(query).toArray();

		if(res.length){
			resp.status(200);
			return true;
		}else{
			resp.status(401);
			return false;
		}
	}catch(err){
		console.log(err);
	}
	resp.status(401);
	return false;
}

async function verifyKey(db:MongoClient, data:IObject, resp:express.Response){
	if(!data?.id){
	   return response(false,'User Id is missing');
	}

	let query = {
		apikey: data?.key,
		userID: data?.id
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('apikeys')
		.find(query).toArray();

		if(res.length){
			resp.status(202);
			return response(true,"User's request is verified", res[0]);
		}
	}catch(err){
		console.log(err);
	}
	resp.status(401);
	return response(false, "Authentication failed");
}

async function createSecretKey(db: MongoClient, data: IObject, resp: express.Response){

	if(!data?.id) return false;
	
	try{
		let sKey = md5(`${data?.id}${MY.randomString(8)}`, _SECRET_SALT);

		let query = {
			id: data?.id
		}
		let update = {
			$set:{
				secretkey: sKey
			}
		}

		let res = await db.db(dbOpts.dbName).collection('users')
		.updateOne(query, update);

		if(res.modifiedCount || res.matchedCount){
			resp.status(202);
			return true;
		}
	}catch(err){
		console.log(err);
	}
	return false;
}

async function createAPIKey(db:MongoClient, data:IObject, sKey:string, resp){

	if(!data?.id) return response(false,'User Id is missing');
	
	try{
		let apikey = md5(sKey, MY.randomString(8));
		let id = MY.hash32(apikey as string);

		let query = {
			id: id,
			apikey: apikey,
			userID: data?.id,
		}

		let res = await db.db(dbOpts.dbName).collection('apikeys')
		.insertOne(query);

		if(res.insertedId){
			resp.status(202);
			return response(true,'Successfully generated API key',apikey)
		}
	}catch(err){
		console.log(err);
	}
	return response(false,'Failed to generate API key');
}

async function checkUser(db:MongoClient, data:IObject, resp?){
	
	if(!data?.username && !data?.id){
		return false;
	}

	let query = {
		$or : [
			{
				id: data?.id||''
			},
			{
				username: data?.username||data?.email||'',
			},{
				email: data?.email||data?.username||'',
			}
		],
	}

	console.log({checkQuery:query})
	console.log(query)

	try{
		let res = await db.db(dbOpts.dbName).collection('users')
		.find(query).toArray();

		if(res.length){
			return true;
		}
	}catch(err){
		console.log(err);
	}
	return false;
	
}

async function createUser(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.username) return response(false,'Username is missing');
	if(!data?.fname) return response(false,'First Name(s) is missing');
	if(!data?.sname) return response(false,'Surname is missing');
	if(!data?.dob) return response(false,'DOB is missing');
	if(!data?.email) return response(false,'Email is missing');
	if(!data?.pass) return response(false,'Password is missing');

	try{
		let id = MY.hash32(`${data?.username}${MY.randomString(8)}`);

		let pass = encryptPassword({username: data.username, pass: data.pass});

		let query = {
			id: id,
			password: pass,
			username: data?.username||'',
			firstname: data?.fname||'',
			lastname: data?.sname||'',
			DOB: data?.dob||'',
			email: data?.email||'',
			dataCreated: new Date(),
			roleID: '00000000',
			friendlist: [],
			preferences: data.preferences||{color: 'A',shape: 'A'},
			secretkey: '',
			imageURL: '',
			description: '',
		}

		let res = await db.db(dbOpts.dbName).collection('users')
		.insertOne(query);

		if(res.insertedId){
			let keyCreated = await createSecretKey(db, query, resp);
			if(keyCreated){
				let currUserRes = await loginUser(db, {
					username: data.username,
					pass: data.pass
				}, resp);
				if(!currUserRes?.success){
					resp.status(400);
					response(false,`Authentication failed!${currUserRes['message']}`);
				}
				let currUser = currUserRes.data;
				resp.status(201);
				return response(true,"User successfully created",currUser);
			}else{
				await db.db(dbOpts.dbName).collection('users')
				.deleteOne({username: query.username});

				resp.status(400);
				return response(false,"Error in data. Possibly invalid data.");
			}
		}
	}catch(err){
		console.log(err);
	}
	resp.status(400);
	return response(false, 'Error in creating user.');

}

async function loginUser(db: MongoClient, data: IObject, resp: express.Response){
	console.log('loginUser');
	if(data?.apikey){
		//auto login user with apikey
	}

	if(!data?.username){
		return response(false,'Username/Email is missing');
	}
	if(!data?.pass){
		return response(false,'Password is missing');
	}

	let pass = encryptPassword({username: data.username, pass: data.pass});

	let query = {
		$or : [
			{
				username: data?.username,
				password: pass,
			},
			{
				email: data?.username,
				password: pass,
			},
		]
	}

	try{
		let pipeline : any[] = [{
			$lookup:{
				from: 'roles',
				localField: 'roleID',
				foreignField: 'id',
				as: 'role'
			}
		}];

		if(Object.keys(query).length){
			pipeline.push({$match:query});
		}
		// if(Object.keys(opts).length){
		// 	pipeline.push({$project:opts});
		// }

		let res = await db.db(dbOpts.dbName).collection('users')
		.aggregate(pipeline).toArray();

		if(res.length){
			for(let user of res){
				let apiResObj = await createAPIKey(db,user, user.secrekey, resp);
				if(!apiResObj?.success){
					resp.status(400);
					return response(false, `Login failed. Authentication had a problem. ${apiResObj?.message}`);
				}
				user.apikey = apiResObj.data;
				resp.status(200);
				return response(true, `User Logged In!`, user);
			}
			resp.status(400);   //Bad Request
			return response(false, 'User does not exist(?)');
		}else{
			resp.status(400);
			return response(false, 'Incorrect username/password');
		}
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, `Login failed. An error occured while logging in. Try again later`);

}

async function logoutUser(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.apikey){
		return response(false, 'API key is missing');
	}

	let query = {
		apikey: data?.apikey
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('apikeys')
		.deleteOne(query);

		if(res.deletedCount){
			resp.status(201);
			return response(true, 'Logged out successfully');
		}
	}catch(e) {
		console.log(e);
	}

	resp.status(400);
	return response(false, 'Failed to logout properly');

}

async function getUser(db: MongoClient, data: IObject, resp: express.Response, all=false){

	let query = {};

	for(let k of Object.keys(data)){
		if(k == 'options') continue;

		switch(data[k]){
		case '[EXISTS]':
				query[k] = {$exists: true};
				break;
			case '[NOT NULL]':
				query[k] = {$ne: null};
				break;
			default:
				query[k] = data[k];
				break;
		}
		
	}

	let opts = {};

	if(MY.isArray(data.options)){
		for(let opt of data.options){
			if(MY.isString(opt) && opt?.length){
				opts[opt] = Number(opt[0]!='!');
			}
		}
	}

	try{

		let pipeline : any[] = [{
			$lookup:{
				from: 'roles',
				localField: 'roleID',
				foreignField: 'id',
				as: 'role',
			}
		}];

		if(Object.keys(query).length){
			pipeline.push({$match:query});
		}
		if(Object.keys(opts).length){
			pipeline.push({$project:opts});
		}

		let res = await db.db(dbOpts.dbName).collection('users')
		.aggregate(pipeline).toArray();

		if(res.length && res[0]){

			res.forEach((user:any)=>{
				if(user.role && MY.isArray(user.role)){
					let role = user.role?.[0];
					if(!role){
						user.role = '';
						user.permissions = {};
						return;
					}
					user.role = role.name;
					user.permissions = role.permissions;
				}
			});

			let user = res[0];
			if(all) user = res;

			resp.status(200);
			return response(true, 'Fetched User info!', user);
		}else{
			resp.status(404);
			return response(false, 'User not found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function editUser(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Username/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query : any = {
		$or: [
			{
				username: data?.username
			},{
				id: data?.id
			}
		]
	}

	let opts = {
		$set: data.options
	};

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('users')
		.updateMany(query, opts);

		if(res.modifiedCount && res.matchedCount){
			resp.status(200);
			return response(true, 'User updated!', data.options);
		}else{
			resp.status(404);
			return response(false, 'User not updated. Might not be found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'User could not be updated. Error in options');
}

async function deleteUser(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Username/Id is missing');
	}

	let query : any = {
		$or: [
			{
				username: data?.username
			},{
				id: data?.id
			}
		]
	}

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('users')
		.deleteOne(query);

		if(res.deletedCount){
			try{
				await db.db(dbOpts.dbName).collection('quizzes').deleteMany({userID: data?.id});
				await db.db(dbOpts.dbName).collection('lists').deleteMany({userID: data?.id});
				await db.db(dbOpts.dbName).collection('apikeys').deleteMany({userID: data?.id});
			}catch(err){
				console.log(err);
			}

			resp.status(201);
			return response(true, 'Deleted User Account');
		}else{
			resp.status(404);
			return response(false, 'Failed to delete user account. Invalid Credentials');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'User could not be deleted. Error in credentials');
}

async function addScore(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.score && data.score !== 0){
		resp.status(400);
		return response(false, `Score is missing`);
	}
	try{
		let updateScore = data?.score||0;
		let currUser;

		try{
			let currUserRes = await getUser(db, {id:data.id},resp,true);
			if(!currUserRes?.success){
				throw 'User does not exist';
			}
			currUser = currUserRes.data[0];
			if(!currUser) throw 'User does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not update score. User does not exist');
		}

		let initScore = currUser.score;
		let newScore = Number(initScore)+Number(updateScore);

		let query = {
			id: data.id
		}

		let opts = {
			$set: {
				score: newScore
			}
		};
	
		let res = await db.db(dbOpts.dbName).collection('users')
		.updateOne(query,opts);

		if(res.modifiedCount && res.matchedCount){
			resp.status(200);
			return response(true,'Score updated!', opts);
		}
				
	}catch(err){
		console.log(err);
	}

	resp.status(400);
    return response(false,'Score could not be updated. Error in options');
}


async function addFriend(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:data.id},resp,true);
			if(!_res?.success){
				throw 'User does not exist';
			}
			currUser = _res.data[0];
			if(!currUser) throw 'User does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not add friend. User does not exist');
		}
	
		try{
			let _res = await getUser(db, {id:data?.id},resp,true);
			if(!_res?.success){
				throw 'Friend does not exist';
			}
			otherUser = _res.data[0];
			if(!otherUser) throw 'Friend does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not add friend. Friend does not exist');
		}

		if(!MY.isArray(currUser?.friendlist)){
			currUser.friendlist = [];
		}
		if(!MY.isArray(otherUser?.friendlist)){
			otherUser.friendlist = [];
		}

		if(!currUser.friendlist.includes(otherUser.id)){
			currUser.friendlist.push(otherUser.id);
			otherUser.friendlist.push(currUser.id);
		}else{
			resp.status(400);
			return response(false,'This user is already your friend!');
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data.id
		},{
			$set:{
				friendlist: currUser.friendlist
			}
		});

		let res1 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data?.id
		},{
			$set:{
				friendlist: otherUser.friendlist
			}
		});

		if(
			(res0.modifiedCount && res0.matchedCount)
			&&
			(res1.modifiedCount && res1.matchedCount)
		){
			resp.status(200);
			return response(true,'Friend Added!',otherUser);
		}
				
	}catch(err){
		console.log(err);
	}

	resp.status(400);
    return response(false,'Friend could not be added because of an error.');
}

async function removeFriend(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:data.id},resp,true);
			if(!_res?.success){
				throw 'User does not exist';
			}
			currUser = _res.data[0];
			if(!currUser) throw 'User does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not unfriend. User does not exist');
		}
	
		try{
			let _res = await getUser(db, {id:data?.id},resp,true);
			if(!_res?.success){
				throw 'Friend does not exist';
			}
			otherUser = _res.data[0];
			if(!otherUser) throw 'Friend does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not unfriend. Friend does not exist');
		}

		if(!MY.isArray(currUser?.friendlist)){
			currUser.friendlist = [];
		}
		if(!MY.isArray(otherUser?.friendlist)){
			otherUser.friendlist = [];
		}

		if(currUser.friendlist.includes(otherUser.id)){
			MY.arrayRemove(currUser.friendlist, otherUser.id);
			MY.arrayRemove(otherUser.friendlist, currUser.id);
		}else{
			resp.status(400);
			return response(false,`This user is not your friend, you can't unfriend them!`);
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data.id
		},{
			$set:{
				friendlist: currUser.friendlist
			}
		});

		let res1 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data?.id
		},{
			$set:{
				friendlist: otherUser.friendlist
			}
		});

		if(
			(res0.modifiedCount && res0.matchedCount)
			&&
			(res1.modifiedCount && res1.matchedCount)
		){
			resp.status(200);
			return response(true,'Friend Removed!',otherUser);
		}
				
	}catch(err){
		console.log(err);
	}

	resp.status(400);
    return response(false,'Friend could not be removed because of an error.');
}

async function addFollow(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential follower is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:data.id},resp,true);
			if(!_res?.success){
				throw 'User does not exist';
			}
			currUser = _res.data[0];
			if(!currUser) throw 'User does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not add user. User does not exist');
		}
	
		try{
			let _res = await getUser(db, {id:data?.id},resp,true);
			if(!_res?.success){
				throw 'Friend does not exist';
			}
			otherUser = _res.data[0];
			if(!otherUser) throw 'Friend does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not add user. Friend does not exist');
		}

		if(!MY.isArray(currUser?.following)){
			currUser.following = [];
		}
		if(!MY.isArray(otherUser?.followers)){
			otherUser.followers = [];
		}

		if(!currUser.following.includes(otherUser.id)){
			currUser.friendlist.push(otherUser.id);
			otherUser.friendlist.push(currUser.id);
		}else{
			resp.status(400);
			return response(false,'You already follow this user!');
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data.id
		},{
			$set:{
				following: currUser.following
			}
		});

		let res1 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data?.id
		},{
			$set:{
				followers: otherUser.followers
			}
		});

		if(
			(res0.modifiedCount && res0.matchedCount)
			&&
			(res1.modifiedCount && res1.matchedCount)
		){
			resp.status(200);
			return response(true,'You followed!',otherUser);
		}
				
	}catch(err){
		console.log(err);
	}

	resp.status(400);
    return response(false,'Follow could not be made because of an error.');
}


async function removeFollow(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:data.id},resp,true);
			if(!_res?.success){
				throw 'User does not exist';
			}
			currUser = _res.data[0];
			if(!currUser) throw 'User does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not remove user. User does not exist');
		}
	
		try{
			let _res = await getUser(db, {id:data?.id},resp,true);
			if(!_res?.success){
				throw 'Friend does not exist';
			}
			otherUser = _res.data[0];
			if(!otherUser) throw 'Friend does not exist';
		}catch(err){
			console.log(err);
			resp.status(404);
			return response(false,'Could not remove user. Friend does not exist');
		}

		if(!MY.isArray(currUser?.following)){
			currUser.following = [];
		}
		if(!MY.isArray(otherUser?.followers)){
			otherUser.followers = [];
		}

		if(currUser.following.includes(otherUser.id)){
			MY.arrayRemove(currUser.following, otherUser.id);
			MY.arrayRemove(otherUser.followers, currUser.id);
		}else{
			resp.status(400);
			return response(false,`You aren't following this user!`);
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data.id
		},{
			$set:{
				following: currUser.following
			}
		});

		let res1 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: data?.id
		},{
			$set:{
				followers: otherUser.followers
			}
		});

		if(
			(res0.modifiedCount && res0.matchedCount)
			&&
			(res1.modifiedCount && res1.matchedCount)
		){
			resp.status(200);
			return response(true,'Follow Removed!',otherUser);
		}
				
	}catch(err){
		console.log(err);
	}

	resp.status(400);
    return response(false,'Follow could not be removed because of an error.');
}

///quiz

async function createQuiz(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.qname) return response(false,'Quiz name is missing');
	if(!data?.desc && !data.description) return response(false,'Description is missing');
	if(!data?.userID) return response(false,'UserID is missing');
	if(!data?.songID) data.songID = '';
	if(!data?.hashtags) return response(false,'Hashtags is missing');
	if(!data?.questions) return response(false,'Question Data is missing');
	if(!data?.imageURL) data.imageURL = 'default.dat';
	if(!data?.passingGrade) return response(false,'Passing is missing');
	
	try{

		let id = MY.hash32(`${data.qname}${data.userID}${MY.randomString(8)}`);

		let query = {
			id: id,
			name: data?.qname || '',
			description: data?.desc || data?.description || '',
			userID: data?.userID || '',
			songID: data?.songID || '',
			dateCreated: new Date(),
			hashtags: data?.hashtags || [],
			questions: data?.questions || [],
			imageURL: data?.imageURL || 'default.dat',
			passingGrade: data?.passingGrade || 1,
		};

		console.log(query);

		let res = await db.db(dbOpts.dbName).collection('quizzes')
		.insertOne(query);

		if(res.insertedId){
			resp.status(201);
			return response(true,"Quiz successfully created");
		}
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Invalid Quiz Data');
}

async function checkQuiz(db: MongoClient, data: IObject, resp: express.Response){
	if(!('id' in data)){
		return false;
	}
	if(!data?.id){
		return false;
	}

	let query = {
		$or : [
			{
				id: data?.id||''
			},
		],
	}

	console.log({checkQuery:query})
	console.log(query)

	try{
		let res = await db.db(dbOpts.dbName).collection('quizzes')
		.find(query).toArray();

		if(res.length){
			return true;
		}
	}catch(err){
		console.log(err);
	}
	return false;
	
}

async function getQuiz(db: MongoClient, data: IObject, resp: express.Response, all=false){

	let query = {};

	for(let k of Object.keys(data)){
		if(k == 'options') continue;

		switch(data[k]){
		case '[EXISTS]':
				query[k] = {$exists: true};
				break;
			case '[NOT NULL]':
				query[k] = {$ne: null};
				break;
			default:
				query[k] = data[k];
				break;
		}
		
	}

	let opts = {};

	if(MY.isArray(data.options)){
		for(let opt of data.options){
			if(MY.isString(opt) && opt?.length){
				opts[opt] = Number(opt[0]!='!');
			}
		}
	}

	try{

		let pipeline : any[] = [{
			$lookup:{
				from: 'users',
				localField: 'userID',
				foreignField: 'id',
				as: 'user'
			}
		}];

		if(Object.keys(query).length){
			pipeline.push({$match:query});
		}
		if(Object.keys(opts).length){
			pipeline.push({$project:opts});
		}

		let res = await db.db(dbOpts.dbName).collection('quizzes')
		.aggregate(pipeline).toArray();

		if(res.length && res[0]){
			
			res.forEach((quiz:any)=>{
				if(quiz.user && MY.isArray(quiz.user)){
					let user = quiz.user?.[0];
					delete quiz.user;
					if(!user){
						quiz.username = '';
						return;
					}

					quiz.username = user.username;
				}
			});
			let quiz = res[0];
			if(all) quiz = res;

			resp.status(200);
			return response(true, 'Fetched Quiz info!', quiz);
		}else{
			resp.status(404);
			return response(false, 'Quiz not found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function editQuiz(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.name && !data?.id){
		resp.status(400);
		return response(false,'Quiz Name/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query : any = {
		$or: [
			{
				name: data?.name
			},{
				id: data?.id
			}
		]
	}

	let opts = {
		$set: data.options
	};

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('quizzes')
		.updateOne(query, opts);

		if(res.modifiedCount && res.matchedCount){
			resp.status(200);
			return response(true, 'Quiz updated!', data.options);
		}else{
			resp.status(404);
			return response(false, 'Quiz could not be updated. Error in options');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'Quiz could not be updated. Error in options');
}

async function deleteQuiz(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Quiz Name/Id is missing');
	}

	let query : any = {
		$or: [
			{
				username: data?.username
			},{
				id: data?.id
			}
		]
	}

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('quizzes')
		.deleteOne(query);

		if(res.deletedCount){
			resp.status(201);
			return response(true, 'Deleted Quiz');
		}else{
			resp.status(404);
			return response(false, 'Failed to delete quiz...');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'Quiz could not be deleted. Error in credentials');
}

///list

async function createList(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.name) return response(false,'Playlist name is missing');
	if(!data?.desc && !data.description) return response(false,'Description is missing');
	if(!data?.userID) return response(false,'UserID is missing');
	if(!data?.quizzes) return response(false,'Quiz Data is missing');
	if(!data?.imageURL) data.imageURL = 'default.dat';
	
	try{

		let id = MY.hash32(`${data.name}${data.userID}${MY.randomString(8)}`);

		let query = {
			id: id,
			name: data?.name || '',
			description: data?.desc || data?.description || '',
			userID: data?.userID || '',
			dateCreated: new Date(),
			quizzes: data?.hashtags || [],
			imageURL: data?.imageURL || 'default.dat',
		};

		let res = await db.db(dbOpts.dbName).collection('lists')
		.insertOne(query);

		if(res.insertedId){
			resp.status(201);
			return response(true,"List successfully created");
		}
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Invalid List Data');
}


async function checkList(db: MongoClient, data: IObject, resp: express.Response){
	if(!('id' in data)){
		return false;
	}
	if(!data?.id){
		return false;
	}

	let query = {
		$or : [
			{
				id: data?.id||''
			},
		],
	}

	console.log({checkQuery:query})
	console.log(query)

	try{
		let res = await db.db(dbOpts.dbName).collection('lists')
		.find(query).toArray();

		if(res.length){
			return true;
		}
	}catch(err){
		console.log(err);
	}
	return false;
	
}


async function getList(db: MongoClient, data: IObject, resp: express.Response, all=false){

	let query = {};

	for(let k of Object.keys(data)){
		if(k == 'options') continue;

		switch(data[k]){
		case '[EXISTS]':
				query[k] = {$exists: true};
				break;
			case '[NOT NULL]':
				query[k] = {$ne: null};
				break;
			default:
				query[k] = data[k];
				break;
		}
		
	}

	let opts = {};

	if(MY.isArray(data.options)){
		for(let opt of data.options){
			if(MY.isString(opt) && opt?.length){
				opts[opt] = Number(opt[0]!='!');
			}
		}
	}

	try{
		let pipeline : any = [{
			$lookup:{
				from: 'users',
				localField: 'userID',
				foreignField: 'id',
				as: 'user'
			}
		}];

		if(Object.keys(query).length){
			pipeline.push({$match:query});
		}
		if(Object.keys(opts).length){
			pipeline.push({$project:opts});
		}

		let res = await db.db(dbOpts.dbName).collection('lists')
		.aggregate(pipeline).toArray();

		if(res.length && res[0]){
			
			res.forEach((list:any)=>{
				if(list.user && MY.isArray(list.user)){
					let user = list.user?.[0];
					delete list.user;
					if(!list){
						list.username = '';
						return;
					}
					list.username = user.username;
				}
			});
			let list = res[0];
			if(all) list = res;
			
			resp.status(200);
			return response(true, 'Fetched List info!', list);
		}else{
			resp.status(404);
			return response(false, 'List not found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

async function editList(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.name && !data?.id){
		resp.status(400);
		return response(false,'List Name/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query : any = {
		$or: [
			{
				name: data?.name
			},{
				id: data?.id
			}
		]
	}

	let opts = {
		$set: data.options
	};

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('lists')
		.updateOne(query, opts);

		if(res.modifiedCount && res.matchedCount){
			resp.status(200);
			return response(true, 'List updated!', data.options);
		}else{
			resp.status(404);
			return response(false, 'List could not be updated. Error in options');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'List could not be updated. Error in options');
}

async function deleteList(db: MongoClient, data: IObject, resp: express.Response, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'List Name/Id is missing');
	}

	let query : any = {
		$or: [
			{
				username: data?.username
			},{
				id: data?.id
			}
		]
	}

	try{
		if(all) query = {};

		let res = await db.db(dbOpts.dbName).collection('lists')
		.deleteOne(query);

		if(res.deletedCount){
			resp.status(201);
			return response(true, 'Deleted List');
		}else{
			resp.status(404);
			return response(false, 'Failed to delete list...');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false,'List could not be deleted. Error in credentials');
}

///song

async function createSong(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.songTitle && !data?.title) return response(false,'Song Title name is missing');
	if(!data?.songArtist && !data?.author) return response(false,'Song Artist name is missing');
	if(!data?.userID) return response(false,'UserID is missing');
	if(!data?.bpm) return response(false,'BPM is missing');
	if(!data?.measure) return response(false,'Measure is missing');
	if(!data?.songURL) return response(false,'Song File (URL) is missing');
	
	try{

		let id = MY.hash32(`${data.songTitle}${data.songArtist}${data.userID}${MY.randomString(4)}`);

		let query = {
			id: id,
			title: data?.songTitle || data?.title || '',
			author: data?.songArtist || data?.author || '',
			userID: data?.userID || '',
			bpm: data?.bpm || 0,
			measure: data?.measure || 0,
			songURL: data?.songURL || '',
			dateAdded: new Date(),
		};

		let res = await db.db(dbOpts.dbName).collection('songs')
		.insertOne(query);

		if(res.insertedId){
			resp.status(201);
			return response(true,"Song successfully created");
		}else{
			resp.status(400);
			return response(false,'Song Quiz Data exists/invalid');
		}
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Invalid Song Data');
}


async function checkSong(db: MongoClient, data: IObject, resp: express.Response){
	if(!('id' in data)){
		return false;
	}
	if(!data?.id){
		return false;
	}

	let query = {
		$or : [
			{
				id: data?.id||''
			},
		],
	}

	console.log({checkQuery:query})
	console.log(query)

	try{
		let res = await db.db(dbOpts.dbName).collection('songs')
		.find(query).toArray();

		if(res.length){
			return true;
		}
	}catch(err){
		console.log(err);
	}
	return false;
	
}


async function getSong(db: MongoClient, data: IObject, resp: express.Response, all=false){

	console.log({data});

	let query = {};

	for(let k of Object.keys(data)){
		if(k == 'options') continue;

		switch(data[k]){
		case '[EXISTS]':
				query[k] = {$exists: true};
				break;
			case '[NOT NULL]':
				query[k] = {$ne: null};
				break;
			default:
				query[k] = data[k];
				break;
		}
		
	}

	let opts = {};

	if(MY.isArray(data.options)){
		for(let opt of data.options){
			if(MY.isString(opt) && opt?.length){
				opts[opt] = Number(opt[0]!='!');
			}
		}
	}

	try{
		let pipeline : any[] = [{
			$lookup:{
				from: 'users',
				localField: 'userID',
				foreignField: 'id',
				as: 'user'
			}
		}];

		MY.clog({pipeline,query,opts})

		if(Object.keys(query).length){
			pipeline.push({$match:query});
		}
		if(Object.keys(opts).length){
			pipeline.push({$project:opts});
		}

		let res = await db.db(dbOpts.dbName).collection('songs')
		.aggregate(pipeline).toArray();

		if(res.length && res[0]){
			res.forEach((song:any)=>{
				if(song.user && MY.isArray(song.user)){
					let user = song.user?.[0];
					delete song.user;
					if(!user){
						song.username = '';
						return;
					}

					song.username = user.username;
				}
			});
			
			let song = res[0];
			if(all) song = res;

			resp.status(200);
			return response(true, 'Fetched Song info!', song);
		}else{
			resp.status(404);
			return response(false, 'Song not found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

///activity

async function setActivity(db: MongoClient, data: IObject, resp: express.Response){
	if(!data?.id) return response(false,'ID is missing');
	if(!data?.type) return response(false,'Type is missing');
	if(!data?.info) return response(false,'Info is missing');
	if(!data?.details) return response(false,'Details is missing');
	if(!data?.userID) return response(false,'UserID is missing');

	try{

		let query = {
			id: data.id,
			type: data.type,
			info: data.info,
			userID: data.userID,
			time: new Date(),
			details: data.details
		};

		let res = await db.db(dbOpts.dbName).collection('activities')
		.insertOne(query);

		if(res.insertedId){
			resp.status(201);
			return response(true,"Successfully saved activity");
		}
	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Failed to save activity.');
}

async function getActivity(db: MongoClient, data: IObject, resp: express.Response, all=false){

	let query = {};

	for(let k of Object.keys(data)){
		if(k == 'options') continue;

		switch(data[k]){
		case '[EXISTS]':
				query[k] = {$exists: true};
				break;
			case '[NOT NULL]':
				query[k] = {$ne: null};
				break;
			default:
				query[k] = data[k];
				break;
		}
		
	}

	let opts = {};

	if(MY.isArray(data.options)){
		for(let opt of data.options){
			if(MY.isString(opt) && opt?.length){
				opts[opt] = Number(opt[0]!='!');
			}
		}
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('activities')
		.find(query,opts).sort({time:1}).toArray();

		if(res.length && res[0]){
			let acts : any = res[0];
			if(all) acts = res;

			resp.status(200);
			return response(true, 'Fetched Activity!', acts);
		}else{
			resp.status(404);
			return response(false, 'Activity not found or does not exist');
		}

	}catch(err){
		console.log(err);
	}

	resp.status(400);
	return response(false, 'Error in retrival info');
}

function encryptPassword({username, pass}){
	return `${CRC32C.str(`${pass}`)}${CRC32C.str(`${username}${_SALT}`)}`;
}

///RESPONSE

declare global {
	interface IResponse {
		success : boolean;
		message : string;
		data : any;
	}
}

function response(s=false,m='',d:any=null) : IResponse{
	return {
		success: s,
		message: m,
		data: d
	};
}
function isResponse(obj : IObject){
	return (
		'success' in obj && 'message' in obj && 'data' in obj
	);
}
async function getBase64(file) {

	return new Promise((res,rej)=>{
		let reader = new FileReader();
		
		reader.on('load',()=>{
			return res(reader.result);
		});
		reader.on('error',(err)=>{
			rej(err);
		});
		return reader.readAsDataURL(file);
	});
}


export {
	setupExpressApp, encryptPassword,
	dbOpts, mongoClient, mongoClientConnection,
	_SALT, _SECRET_SALT, 
	response, isResponse, getBase64,
}