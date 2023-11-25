
import path from 'path';
import http from 'http';
import fs from 'node:fs/promises';
import url from 'url';
// import events from 'events';
import express from "express";
import fetch from 'node-fetch';
import {
	Server, Socket
} from 'socket.io';

import * as MY from '@catsums/my';

var io : Server;

var myUsers : {[key:string] : Socket} = {};
var myClients : Socket[] = [];

function startSocketServer(server: http.Server){
	io = new Server(server);
	
	io.on('connection', (socket)=>{
		socket.data = {
			id: getUniqueID(),
			key:'', username: '',
			url: '', 
			new: true,
			sync:{
				time:0,
			},
			startTime:new Date(),
		};

		if(!myClients.find(s => s.id == socket.id)) {
			myClients.push(socket);
			updateClients();
		}

		let socketFunctions = {
			sync:(req)=>{
				// socket.key = data.key;
				socket.data.username = req.data?.username?req.data.username:'Guest';
				socket.data.url = req.data?.url?req.data.url:'/';
				socket.data.sync.time = new Date();
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
				if(socket.data.new){
					socket.data.new = false;
					console.log('New Client: '+socket.data.id+' - '+ (socket.data.username ? socket.data.username : 'Guest') );
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
			console.log('A client disconnected: '+socket.data.id);
			myClients.splice(myClients.indexOf(socket));
			updateClients();
		});
	});

}

function updateClients(){
	//Use sync broadcast to update whenever new user joins or leave
	let dat = {
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
	for(let i=0;i<myClients.length;i++){
		let cl = myClients[i];
		if(cl.data.new){
			cl.data.new = false;
			console.log(`New Client: ${cl.data.id} - (${ (cl.data.username!='') ? cl.data.username : 'Guest' })`);
		}
		cl.emit('sync',JSON.stringify(dat));
	}
}

function getUniqueID(){
	return MY.hexadecimalID() + MY.hexadecimalID() + '-' + MY.hexadecimalID();
}

export {
	io, startSocketServer, getUniqueID, updateClients, 
	myClients, myUsers
}