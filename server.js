(async ()=>{


const
	http = require('http'),
	// fs = require('fs'),
	fs = require('node:fs/promises'),
	url = require('url'),
	events = require('events'),
	express = require("express"),
	fetch = require('node-fetch'),
	// {Blob} = await import('fetch-blob'),
	// ejs = require('ejs'),
	WebSocket = require('ws'),
	socketIO = require('socket.io'),
	XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
	FileAPI = require('file-api'),
	querystring = require('querystring'),
	jsonrepair = require('jsonrepair'),
	compression = require('compression'),
	helmet = require('helmet'),
	cors = require('cors'),
	morgan = require('morgan'),
	mongodb = require('mongodb'),
	md5 = require('salted-md5'),
	CRC32C = require('crc-32/crc32c'),
	bodyParser = require('body-parser'), //for express body json and url parsing
	cloudinary = require('cloudinary'),
	path = require('path');

const {Blob} = await import('fetch-blob');

//Initialise File API
var File = FileAPI.File;
var FileList = FileAPI.FileList;
var FileReader = FileAPI.FileReader;

//SERVER RUNTIME SETTINGS
var FileProcess = {
	nodePath : '',
	filePath : '',
	args : [],
};

var MySystem = {
	test: false,
	dev: false
};

//OUR VARIABLES AND HELPER FUNCTIONS
const MY = require(path.resolve('./myNodeModules/myHelperFunctions.js'));
const MAINVARS = require(path.resolve('./src/js/myMainVariables.js'));
const CONFIG = require(path.resolve('./config.js'));

//PROCESSING RUNNING ARGS
process.argv.forEach(function (val, index, array) {
  switch(index){
	case 0:
		FileProcess.nodePath = val;
		MY.clog(`NodePath: ${FileProcess.nodePath}`);
		break;
	case 1:
		FileProcess.filePath = val;
		MY.clog(`FilePath: ${FileProcess.filePath}`);
		break;
	default:
		FileProcess.args.push(String(val).toLowerCase());
		break;
  }
});
if(FileProcess.args.length>0){
	MY.clog(FileProcess.args);
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

var syncSeconds = 60;
var syncElapsed = 0;
var syncTimerFlag = false;

/// MONGODB ///

const { MongoClient, ServerApiVersion } = mongodb;
const uri = CONFIG.MongoDB.uri;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//use env variables for these
var dbOpts = {
	uri: uri,
	username: CONFIG.MongoDB.username,
	pass: CONFIG.MongoDB.pass,
	cluster: CONFIG.MongoDB.cluster,
	dbName: CONFIG.MongoDB.dbName,
};

// mongoClient.connect((err, db)=>{
// 	if(err){
// 		console.log(err);
// 		return;
// 	}

// 	testDB(db).then(()=>{
// 		// db.close();
// 	});
	
// });

async function testDB(db, data={}){

	

}

/// Cloudinary ///

//use env variables for these
cloudinary.config({ 
  cloud_name: CONFIG.Cloudinary.cloud_name, 
  api_key: CONFIG.Cloudinary.api_key, 
  api_secret: CONFIG.Cloudinary.api_secret, 
});

//CREATE APP AND START SERVER
const app = express();

var server = app.listen(defaultPort, function(){
	console.log('Server started! @ '+ new Date());
	switchPort(this, PORT);
});

// var io = new socketIO.Server(server);

var myUsers = {};
var myClients = [];
 
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("public"));

app.use(bodyParser.text({limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// app.use(morgan('combined'));

app.post('/xapi', async(req,res)=>{
		
	try{
		let reqData = req.body;
		if(MY.isString(reqData) && MY.isJSON(reqData)){
			reqData = JSON.parse(reqData);
		}
		if(!MY.isObject(reqData)){
			//send err
			res.send('eat ass');
		}

		try{
			// let db = await mongoClient.connect();
			let db = await mongoClientConnection();

			// console.log(db);

			if(!db) throw 'DB object is blank';

			let result = await uploadFile(db, reqData.data, res);

			res.send(result);
			// db.close();
			return;
		}catch(err){
			console.log(err);
			res.status(506).send(
				response(false, 'WTF THE SERVER IS DEAD??', {status:500})
			);
			return;
		}

		// res.status(200).send(
		// 	response(true, 'Milk is valid', {fish:23, milk:true})
		// );
	}catch(err){
		console.log(err);
	}
	return;
});



const dbObject = {
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

app.get('/files/:tagId',async(req,res)=>{
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

	let result = null;

	let db = null;

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

});

app.get('/files/images/:tagId',async(req,res)=>{
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

	let result = null;

	let db = null;

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

});

app.get('/files/songs/:tagId',async(req,res)=>{
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

	let result = null;

	let db = null;

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

});



app.post('/api', async(req,res)=>{
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

	let result = null;

	let db = null;

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
					case 'edit':
						result = await editSong(db, reqData.data, res);
						break;
					case 'delete':
						result = await deleteSong(db, reqData.data, res);
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
						result = await addFriend(db, reqData.data, reqData.id, res);
						break;
					case 'removeFriend':
						result = await removeFriend(db, reqData.data, reqData.id, res);
						break;
					case 'addFollow':
						result = await addFollow(db, reqData.data, reqData.id, res);
						break;
					case 'removeFollow':
						result = await removeFollow(db, reqData.data, reqData.id, res);
						break;
					case 'addScore':
						result = await addScore(db, reqData.data, reqData.id, res);
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
						result = await getActivity(db, reqData.data, reqData.id, res);
						break;
					case 'getAll':
						result = await getActivity(db, reqData.data, reqData.id, res, true);
						break;
					case 'set':
						result = await setActivity(db, reqData.data, reqData.id, res);
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

var _SALT = 'd33Z_NUT5';
var _SECRET_SALT = 'can_we_pretend_that_aIrplanes_In_the_nIght_sky_are_lIke_shooting_stars_I_could_really_use_a_wIsh_right_now';

async function uploadMultipleFiles(db,data,resp){
	let initRes = response(false, 'Processing',{ fileData:[]});

	if(MY.isArray(data.files)){
		for(let fileData of data.files){
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

async function uploadFile(db, data, resp){

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

async function _getFile(db,data,resp,opts=null){
	/*
		{
			url: String,
			id: String,
		}
	*/

	if(!data?.name && !data.id){
		resp.status(400);
		return response(false, 'ID or File name is missing');
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

		let fileBlob = null;

		for(let _url of fileData.urls){
			try{
				let _res;

				try{
					_res = await fetch(_url);
					fileBlob = await _res.blob();
				}catch(err){ console.log('url');console.log(err); }

				try{
					_res = await fs.readFile(path.resolve(_url));
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

async function getFile(db, data, resp){

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

async function getFileBlob(db, data, resp, opts=null){

	if(!data?.name && !data.id){
		resp.status(400);
		return response(false, 'ID or File name is missing');
	}

	try{
		let res = await _getFile(db,data,resp,opts);

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

async function verify(db, data, resp){
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

async function verifyKey(db, data, resp){
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

async function createSecretKey(db, data, resp){

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

async function createAPIKey(db, data, sKey, resp){

	if(!data?.id) return response(false,'User Id is missing');
	
	try{
		let apikey = md5(sKey, MY.randomString(8));
		let id = MY.hash32(apikey);

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

async function checkUser(db, data, resp){
	if((!'username' in data) && (!'id' in data)){
		return false;
	}
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

async function createUser(db, data, resp){
	if(!data?.username) return response(false,'Username is missing');
	if(!data?.fname) return response(false,'First Name(s) is missing');
	if(!data?.sname) return response(false,'Surname is missing');
	if(!data?.dob) return response(false,'DOB is missing');
	if(!data?.email) return response(false,'Email is missing');
	if(!data?.pass) return response(false,'Password is missing');
	
	

	try{
		let id = MY.hash32(`${data?.username}${MY.randomString(8)}`);

		let pass = encryptPassword(data);

		let query = {
			id: id,
			password: pass,
			username: data?.username||'',
			firstname: data?.fname||'',
			lastname: data?.sname||'',
			DOB: data?.dob||'',
			email: data?.email||'',
			dataCreated: new Date(),
			roleID: '000000',
			friendlist: [],
			preferences: data.preferences||{color: 'A',shape: 'A'},
			secretkey: '',
			imageURL: {},
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

async function loginUser(db, data, resp){
	if(data?.apikey){
		//auto login user with apikey
	}

	if(!data?.username){
		return response(false,'Username/Email is missing');
	}
	if(!data?.pass){
		return response(false,'Password is missing');
	}

	let pass = encryptPassword(data);

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
		let pipeline = [{
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
					return response(false, `Login failed. Authentication had a problem. ${apikeyRes?.message}`);
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

async function logoutUser(db, data, resp){
	if(!data?.apikey){
		return response(false, 'API key is missing');
	}

	let query = {
		apikey: data?.apikey
	}

	try{
		let res = await db.db(dbOpts.dbName).collection('users')
		.deleteOne({username: query.username});

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

async function getUser(db, data, resp, all=false){

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

		let pipeline = [{
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

async function editUser(db, data, resp, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Username/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query = {
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

async function deleteUser(db, data, resp, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Username/Id is missing');
	}

	let query = {
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
		deleteOne(query);

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

async function addScore(db, data, id, resp){
	if(!data?.score && data.score !== 0){
		resp.status(400);
		return response(false, `Score is missing`);
	}
	try{
		let updateScore = data?.score||0;
		let currUser;

		try{
			let currUserRes = await getUser(db, {id:id},resp,true);
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
			id: id
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


async function addFriend(db, data, id, resp){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:id},resp,true);
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

		if(!isArray(currUser?.friendlist)){
			currUser.friendlist = [];
		}
		if(!isArray(otherUser?.friendlist)){
			otherUser.friendlist = [];
		}

		if(!currUser.friendlist.includes(otherUser.id)){
			MY.hardPush(currUser.friendlist,otherUser.id);
			MY.hardPush(otherUser.friendlist,currUser.id);
		}else{
			resp.status(400);
			return response(false,'This user is already your friend!');
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: id
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

async function removeFriend(db, data, id, resp){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:id},resp,true);
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

		if(!isArray(currUser?.friendlist)){
			currUser.friendlist = [];
		}
		if(!isArray(otherUser?.friendlist)){
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
			id: id
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

async function addFollow(db, data, id, resp){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential follower is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:id},resp,true);
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

		if(!isArray(currUser?.following)){
			currUser.following = [];
		}
		if(!isArray(otherUser?.followers)){
			otherUser.followers = [];
		}

		if(!currUser.following.includes(otherUser.id)){
			MY.hardPush(currUser.following,otherUser.id);
			MY.hardPush(otherUser.followers,currUser.id);
		}else{
			resp.status(400);
			return response(false,'You already follow this user!');
		}
	
		let res0 = await db.db(dbOpts.dbName).collection('users')
		.updateOne({
			id: id
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


async function removeFollow(db, data, id, resp){
	if(!data?.id){
		resp.status(400);
		return response(false, `Id of potential friend is missing`);
	}
	try{

		let currUser, otherUser;

		try{
			let _res = await getUser(db, {id:id},resp,true);
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

		if(!isArray(currUser?.following)){
			currUser.following = [];
		}
		if(!isArray(otherUser?.followers)){
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
			id: id
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

async function createQuiz(db, data, resp){
	if(!data?.qname) return response(false,'Quiz name is missing');
	if(!data?.desc || !data.description) return response(false,'Description is missing');
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

async function getQuiz(db, data, resp, all=false){

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

		let pipeline = [{
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

async function editQuiz(db, data, resp, all=false){

	if(!data?.name && !data?.id){
		resp.status(400);
		return response(false,'Quiz Name/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query = {
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
		updateOne(query, opts);

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

async function deleteQuiz(db, data, resp, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'Quiz Name/Id is missing');
	}

	let query = {
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
		deleteOne(query);

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

async function createList(db, data, resp){
	if(!data?.name) return response(false,'Playlist name is missing');
	if(!data?.desc || !data.description) return response(false,'Description is missing');
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

async function getList(db, data, resp, all=false){

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
		let pipeline = [{
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

async function editList(db, data, resp, all=false){

	if(!data?.name && !data?.id){
		resp.status(400);
		return response(false,'List Name/Id is missing');
	}
	if(!data?.options){
		resp.status(400);
		return response(false,'Options are missing');
	}

	let query = {
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
		updateOne(query, opts);

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

async function deleteList(db, data, resp, all=false){

	if(!data?.username && !data?.id){
		resp.status(400);
		return response(false,'List Name/Id is missing');
	}

	let query = {
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
		deleteOne(query);

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

async function createSong(db, data, resp){
	if(!data?.songTitle) return response(false,'Song Title name is missing');
	if(!data?.songArtist) return response(false,'Song Artist name is missing');
	if(!data?.userID) return response(false,'UserID is missing');
	if(!data?.bpm) return response(false,'BPM is missing');
	if(!data?.measure) return response(false,'Measure is missing');
	if(!data?.songURL) return response(false,'Song File (URL) is missing');
	
	try{

		let id = MY.hash32(`${data.songTitle}${data.songArtist}${data.userID}${MY.randomString(4)}`);

		let query = {
			id: id,
			title: data?.songTitle || '',
			author: data?.songArtist || '',
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

async function getSong(db, data, resp, all=false){

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
		let pipeline = [{
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
			let song = res[0];
			if(all) song = res;

			console.log({song})

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

async function setActivity(db, data, resp){
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

async function getActivity(db, data, resp, all=false){

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
			let acts = res[0];
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


function encryptPassword(data){
	return `${CRC32C.str(`${data?.pass}`)}${CRC32C.str(`${data?.username}${_SALT}`)}`;
}

function response(s=false,m='',d=null){
	return {
		success: s,
		message: m,
		data: d
	};
}
function isResponse(obj){
	return (
		'success' in obj && 'message' in obj && 'data' in obj
	);
}

const ExpressApp = {
	routes : [
		{route:"/", render: "public/index.html", status:200, preRender:function(req,res,data){
			
		}},
		{route:"/home", render: "public/home.html", status:404, preRender:function(req,res,data){

		}},
		{route:"/signup", render: "public/signup.html", status:404, preRender:function(req,res,data){

		}},
		// {route:"/play", render: "public/play.html", status:404, preRender:function(req,res,data){

		// }},
		// {route:"*", render: "public/404.html", status:404, preRender:function(req,res,data){

		// }},
	],
	defaultURL: !(MySystem.test)?`${MAINVARS.metadata.url}`:`https://localhost:${PORT}`,
	routeDirectory: "./dist/",
	meta: MAINVARS.metadata,
};

ExpressApp.routes.forEach((val)=>{
	app.set("views", __dirname);
	app.use(express.static(path.join(__dirname, 'public')));
	app.get(val.route, (req,res)=>{
		res.status(val.status);
		// res.setHeader('Accept-Encoding','gzip');

		let urlParams = MY.parseURLParams(req.url);

		let viewData = {
			local:{}
		};
		if(urlParams){
			viewData.local.urlParams = urlParams;
		}
		viewData.local = Object.assign(viewData.local,ExpressApp.meta);

		viewData.local.url = (MySystem.test||MySystem.dev)?`${ExpressApp.meta.url || `https://${req.headers.host}${req.url}`}`:`https://${req.headers.host}${req.url}`;


		var renderPath = ExpressApp.routeDirectory+val.render;
		// var renderPath = val.render;
		if(val.preRender){
			console.log(34234545+'e');
			val.preRender(req,res,viewData);
		}
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

/// SOCKET IO ///

var io = new socketIO.Server(server);

io.getUniqueID = function () {
  return MY.hexadecimalID() + MY.hexadecimalID() + '-' + MY.hexadecimalID();
};

io.on('connection', (socket)=>{
	socket.detail = {
		id: io.getUniqueID(),
		key:'', username: '',
		url: '', new: true,
		sync:{
			time:0,
		},
		startTime:new Date(),
	};
	// myClients.push(socket);
	MY.hardPush(myClients,socket);
	updateClients();

	let socketFunctions = {
		sync:(req)=>{
			// socket.key = data.key;
			socket.detail.username = req.data?.username?req.data.username:'Guest';
			socket.detail.url = req.data?.url?req.data.url:'/';
			socket.detail.sync.time = new Date();
			// console.log(req.data);
			let res = {
				data : {
					time : new Date(),
					message : 'Synchronised',
					server : {
						online:io.engine.clientsCount,
					}
				}
			};
			if(socket.detail.new){
				socket.detail.new = false;
				console.log('New Client: '+socket.detail.id+' - '+ (socket.detail.username ? socket.detail.username : 'Guest') );
			}
			return res;
			
		},
		log:(req)=>{
			MY.clog(req.data);
		}
	}

	Object.keys(socketFunctions).forEach((_e)=>{
		if(typeof _e !== 'string') return;
		socket.on(_e,(dataStr)=>{
			var req = {
				data: dataStr
			};
			dataStr = jsonrepair(String(dataStr));
			if(MY.isJSON(dataStr)){
				req = JSON.parse(dataStr);
			}
			//run function based on event name as key for assoc array
			let res = socketFunctions[_e](req);
			if(MY.isObject(res)){
				socket.emit('sync',JSON.stringify(res));
			}
		});
	});

	socket.on('disconnect',()=>{
		console.log('A client disconnected: '+socket.detail.id);
		myClients.splice(MY.findIndexID(socket.detail.id,myClients));
		updateClients();
	});
});

function updateClients(){
	//Use sync broadcast to update whenever new user joins or leave
	var dat = {
		type : 'sync',
		data : {
			time : new Date(),
			message : 'Synchronised',
			server : {
				online:io.engine.clientsCount,
			}
		}
	};
	// MY.clog(dat);
	for(var i=0;i<myClients.length;i++){
		var cl = myClients[i];
		/*if(cl.new){
			cl.new = false;
			console.log('New Client: '+cl.detail.id+' - '+ (cl.detail.username!='' ? cl.detail.username : 'Guest') );
		}*/
		cl.emit('sync',JSON.stringify(dat));
	}
}

// app
//	 .set('views', __dirname)
//	 .use(express.static(path.join(__dirname, 'public')))
//	 .get('/', (req,res) => {
//		 res.sendFile(path.resolve(`./public/index.html`));
//	 });
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

///////SERVER FUNCTIONS///////

// function updateClients(){
//	 //Use sync broadcast to update whenever new user joins or leave
//	 var dat = {
//		 type : 'sync',
//		 data : {
//			 time : new Date(),
//			 message : 'Synchronised',
//			 server : {
//				 online:io.engine.clientsCount,
//			 }
//		 }
//	 };
//	 // MY.clog(dat);
//	 for(var i=0;i<myClients.length;i++){
//		 var cl = myClients[i];
//		 /*if(cl.new){
//			 cl.new = false;
//			 console.log('New Client: '+cl.detail.id+' - '+ (cl.detail.username!='' ? cl.detail.username : 'Guest') );
//		 }*/
//		 cl.emit('sync',JSON.stringify(dat));
//	 }
// }

async function getBase64(file) {

	return new Promise((res,rej)=>{
		let reader = new FileReader();
		
		reader.onload = ()=>{
			return res(reader.result);
		};
		reader.onerror = (err)=>{
			rej(err);
		};
		reader.readAsDataURL(file);
	});
}

function switchPort(s, p){
	s.close();
	syncTimerFlag = true;
	s.listen(p,()=>{
		console.log('Server is listening on port '+p);
	});
	myClients = []; myUsers = {};
	syncTimerFlag = false;
	syncTimer(syncSeconds);
}


function syncTimer(seconds){
	if(seconds<=0.01) seconds = 10;
	if(seconds>=360) seconds = 359.99;
	if(!syncTimerFlag){
		syncTimerFlag = true;
		var tS = setTimeout(()=>{
			syncTimerFlag = false;
			// updateClients();
			// MY.clog('Synced Server : '+new Date());
			syncElapsed+=seconds;
			syncTimer(seconds);
		}, Math.floor(seconds*1000));
	}
}

function AJAX(jsonData,callback,url){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4){
			if(req.status == 200){
				var json = JSON.parse(req.responseText);
				callback(json);
			}
		}
		else{
			console.log(req.readyState);
		}
		
	};
	req.open("GET",url,true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(jsonData));
}

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


})();