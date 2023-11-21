/*homescript.js*/

import { Conductor } from '@catsums/conductorjs';
import {
	docReady,  hardPush, defectAllFormSubmits,
	formDataToJSON, getFormData, 
	setCookie, getCookie, deleteCookie,
	parseURLParams, processAjaxData,
	isObject, isString, isInt, isJSON, isArray,
	findItem, stringTrimToLength,
	hash32, hash64, getBase64, getFileBlob,
	rndInt, randomID, randomString, randomId,
	findItemObjectIndex
} from '@catsums/my';
import * as MyMouse from './myMouse.js';
import {
	displayPopUpBox, deletePopUp, easyPopUpBox,
	logg, 
	setSlidableContent, createMenuTracker,
	loadUserPreferences,
	myAPI, myHandler,
	saveActivity, getActivity,
	transitionTo,
} from './mainscript.js';

import $ from "jquery";
import anime from 'animejs';

var conductor : Conductor; 
var startLobby = false; 
var songIsPlay = false;
var homeAudio; 
var editAudio;

var holdDown : {
	timer: number | null,
	startTimer: number | null,
	startTime: number,
	time: number,
	down: boolean,
} = {
	timer: null,
	startTimer: null,
	startTime: 400,
	time: 100,
	down: false,
};
var frequency = {
	max:255,
	min:50,
};

// var quizMenuQuestions = [];
var sliderCache = null;
var menuTracker : IMenuTracker;
var urlParams : IJSON = parseURLParams(window.location.href);
console.log(urlParams);

docReady(main);

function main(){
	$('#containerL').load('html/home_profile.html',()=>{
		verifyLogin((data)=>{
			$('#profileUsername').html(localStorage.getItem('JBQ_username'));
			loadUserPreferences();
			myHandler({
				type:'user',subType:'get',data:{id:localStorage.getItem('JBQ_userId')}
			}).then((res)=>{
				if(res.success){
					let uData = res.data as IUserData;
					$('.pfp').css({
						'background-image':`url('/files/images/${uData?.imageURL||`defImage`}')`,
						'background-position':`center`, 'background-size':`cover`,
						'background-repeat':`no-repeat`,
					});
				}
			});
			menuTracker = createMenuTracker({
				container: $('#containerM'),
				transitionIn:async()=>{
					return anime({
						targets: $('#containerM')[0],
						opacity: ['1','0'],
						duration: 350,
						easing: 'easeInCubic',
					}).finished;
				},
				transitionOut:async()=>{
					return anime({
						targets: $('#containerM')[0],
						opacity: ['0','1'],
						duration: 350,
						easing: 'easeInCubic',
					}).finished;
				},
				/*onStart:()=>{
					retrieveQuizzes().then(()=>{
						$('#containerR').load('./html/home_createSection.html');
					});
				},*/
				// start: $('.cardContainer'),
			}) as IMenuTracker;
			$('#containerM').html('');
			menuTracker?.push({
				element: $('<div>',{class:'menuContainer mainMenuContainer w-100 h-100 m-0 p-0 scrollVerticalOff scrollHorizontalOff'}).append(
						$('<div>',{class:'menuSearch w-xs-100 h-10 p-1 centerFlexCont'}).append([
							$('<div>',{class:'row mx-2 w-90'}).append([
								$('<input>',{class:'inputBox col m-2'}),
								$('<button>',{class:'btn formBtn col-2 m-2'}).text('Search'),
							]),
						]),
						$('<hr>',{class:'my-0'}),
						$('<div>',{class:'cardContainer w-95 h-90 scrollVerticalOn scrollHorizontalOff'}),
					),
				data:{
					mode: 'home',
				},
				onChange:(data)=>{
					processAjaxData(null,`/home`,{
						html:'',pageTitle:`Home - Just Bops & Quizzes`
					});
					
					$('#containerR').load('./html/home_createSection.html',()=>{
						loadEvents();
					});
					if(!$('.cardContainer *').length){
						retrieveQuizzes().then(()=>{
							loadEvents();
						});
					}
				}
			}).then(()=>{
				retrievePlaylist().then(()=>{
					console.log( $(menuTracker?.currentContent)[0] );
					if(urlParams?.quiz){
						showQuizDetail(String(urlParams?.quiz));
					}else if(urlParams?.user){
						showUserDetail(String(urlParams?.user));
					}else if(urlParams?.list){
						showListDetail(String(urlParams?.list));
					}else if(urlParams?.search){
						homeSearch(String(urlParams?.search));
					}else if(urlParams?.feed) {
						homeFeed(Number(urlParams?.feed));
					}
					else{
						processAjaxData(null,`/home`,{
							html:'',pageTitle:`Home - Just Bops & Quizzes`
						});
						/*retrieveQuizzes().then(()=>{
							$('#containerR').load('./html/home_createSection.html',()=>{
								// retrievePlaylist();
								loadEvents();	
							});
						});*/
					}
				});
			});
			
			// setSlidableContent('.mainContent','.mySlideContainer');
			// $('#containerM').addClass('scrollVerticalOff');
			/*$('#containerR').load('html/home_userEdit_userEdit.html',()=>{
				goToMainMenu();
				console.log('loaded!');
				loadEvents();
			});*/
		});
		
	});
}

function logOut(){
	var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	var apikey = localStorage.getItem('JBQ_apikey');

	localStorage.removeItem('JBQ_username');
	localStorage.removeItem('JBQ_userId');
	localStorage.removeItem('JBQ_apikey');
	deleteCookie('JBQ_username');
	deleteCookie('JBQ_userId');
	deleteCookie('JBQ_apikey');
	myHandler({
		type:'logout',
		data:{
			id:userID, apikey:apikey
		}
	}).then((res)=>{
		if(!res.success){
			console.log('Authentication failed but loggin out anyways');
		}
		console.log('API/User data cleared.');
		window.location.href = "/";
	});
}

function deleteQuiz(qID){
	var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	var apikey = localStorage.getItem('JBQ_apikey');
	myHandler({
		type:'quiz',subType:'delete',data:{
			id:qID
		}
	}).then((res)=>{
		if(res.success){
			if( $(menuTracker?.currentContent()).find(`.quizMenuContainer`).length ){
				menuTracker?.goBack().then(()=>{
					showQuizDetail(qID);
				});
			}
			saveActivity({
				userID: userID as string, 
				type:'Deleted Quiz',
				info: `${username} deleted a quiz`,
				details:{ quizID: qID }
			}).then((res)=>{
				if(res.success){
					console.log('Saved Activity');
				}
			});
		}else{
			easyPopUpBox(res.message);
		}
	});
}
function deleteList(lID){
	var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	var apikey = localStorage.getItem('JBQ_apikey');
	myHandler({
		type:'list',subType:'delete',data:{
			id:lID
		}
	}).then((res)=>{
		if(res.success){
			if( $(menuTracker?.currentContent()).find(`.listMenuContainer`).length ){
				menuTracker?.goBack().then(()=>{
					showListDetail(lID);
				});
			}
			saveActivity({
				userID: userID as string,
				type:'Deleted Playlist',
				info: `${username} deleted a playlist`,
				details:{ listID: lID }
			}).then((res)=>{
				if(res.success){
					console.log('Saved Activity');
				}
			});
		}else{
			easyPopUpBox(res.message);
		}
	});
}

function deleteUser(uID){
	var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	var apikey = localStorage.getItem('JBQ_apikey');

	deletePopUp({
		messageText: `Enter the key here to confirm user account deletion. The key is ${uID}`,
		acceptText:`Confirm Deletion`,
		onAccept:(val)=>{
			if(val != uID){
				easyPopUpBox(`Incorrect key. User will not be deleted.`);
				return;
			}else{
				myHandler({
					type:'user', subType:'delete',data:{
						id:uID,
					}
				}).then((res)=>{
					if(res.success){
						easyPopUpBox(`User deleted successfully`);
						if(userID==uID){
							logOut();
						}else{
							if( $(menuTracker?.currentContent()).find(`.userMenuContainer`).length ){
								menuTracker?.goBack().then(()=>{
									showUserDetail(uID);
								});
							}
						}
					}else{
						easyPopUpBox(`Could not delete user. ${res.message}`);
					}
				});
			}
		}
	});
}

function createConductor(){
	conductor = new Conductor();
	conductor.connectElements([
		$('#myMouse')[0]
	]);

}
async function retrievePlaylist(){
	return myHandler({
		type: 'playlist', data: {
			id: '[NOT NULL]',
		}
	},(msg,data)=>{
		if(data instanceof Array)
			playRandomSong(data as ISongData[]);
		else 
			playDefaultSong();
	},(msg,data)=>{
		playDefaultSong();
	},(err,data)=>{
		logg('Error: something happened to the server');
		console.log(err);
		console.log(data);
	}).then(()=>{
		return Promise.resolve();
	});
}
function playDefaultSong() {
	var currSong = {
		title: 'Gizmo',
		author: 'Syn Cole',
		bpm: 124,
		measure: 8,
		songURL: './data/audio/default.dat'
	};

	homeAudio = new Audio(currSong.songURL);
	if(!conductor) createConductor();
	conductor?.changeStats(currSong.bpm,currSong.measure);
	conductor?.connectAudioObject(homeAudio);
	$('.pfpPlayButton').html(`<i class="fas fa-play m-2 c4-txt"></i>`);
	console.log('loaded default.dat');
	loadEvents();
}
function playRandomSong(songs : ISongData[]) {

	var index = rndInt(0,songs.length-1);
	var songIndex = index;
	var currSong : ISongData = songs[index];

	homeAudio = new Audio(`/files/songs/${currSong.songURL}`);
	if(!conductor) createConductor();
	conductor?.changeStats(currSong.bpm,currSong.measure);
	conductor?.connectAudioObject(homeAudio);
	$('.pfpPlayButton').html(`<i class="fas fa-play m-2 c4-txt"></i>`);
	loadEvents();
}

function playQuiz(qID : string){
	transitionTo($('body'),()=>{
		window.location.href = `/play?quiz=${qID}`;
	});
}

function playPlaylist(pID : string, qID : string){
	transitionTo($('body'),()=>{
		window.location.href = `/play?playlist=${pID}&quiz=${qID}`;
	});
}


$('#myMouse').on('beatHit',(event:any)=>{
	let e = event as CustomEvent;

	var myMouse = e.currentTarget;
	var animBox = anime({
		targets: myMouse,
		translateY: ['1','7'],
		duration: e.detail.stepCrotchet*1000,
		easing: "easeInOutQuad",
		direction: 'alternate',
	});
});

function verifyLogin(callback){
	// var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	// var apikey = localStorage.getItem('JBQ_apikey');

	myHandler({
		type:'verify',data:{id:userID}
	},(msg,data)=>{
		console.log(data);
		console.log(msg);
		callback(data);
		loadEvents();
	},(msg,data)=>{
		console.log('Verification failed');
		console.log(msg);
		displayPopUpBox({
			messageText:`Authentication failed. You're not logged in. Returning to Splash Screen.`,
			cancelText: 'Return to Splash Screen',
			onCancel:()=>{
				window.location.href = "/";
			}
		});
		loadEvents();
	},(err,data)=>{
		console.log(data);
		displayPopUpBox({
			messageText:'Error trying to verify login. Returning to Splash Screen',
			cancelText: 'Return to Splash Screen',
			onCancel:()=>{
				window.location.href = "/";
			}
		});
		loadEvents();
	});
}
function resetContainerM(){
	// $('#containerM').html('');
}
function goToMainMenu(){
	menuTracker?.goToStart().then(()=>{
		$('.cardContainer').html('');
		(menuTracker as IMenuTracker).current().data.mode = 'home';
		retrieveQuizzes().then(()=>{
			$('#containerR').load('./html/home_createSection.html',()=>{
				loadEvents();
			});
		});
	});
	/*anime({
		targets: '#containerM',
		opacity: '0',
		duration: 300,
		direction: 'normal',
		easing: 'easeInCubic',
		complete:(anim)=>{
			resetContainerM();
			retrieveQuizzes();
			$('#containerR').load('./html/home_createSection.html',()=>{
				anime({
					targets: '#containerM',
					opacity: '1',
					duration: 300,
					direction: 'normal',
					easing: 'easeInCubic',
				});
			});
		}
	});*/
	
}

interface IAllResData {
	users : IUserData[]; quizzes : IQuizData[]; lists : IPlaylistData[];
}

async function searchForCriteria(_criteria){
	_criteria = String(_criteria).toLowerCase();
	if(_criteria==''){
		_criteria = `abcdefghijABCEDEGHIJKL1234567890MNOPQRSTUVWXYZklmnopqrstuvwxyz`;
	}
	var userID = localStorage.getItem('JBQ_userId');

	var allData : IAllResData = {
		users: [],
		quizzes: [],
		lists: [],
	} ;
	var initData : IAllResData = {
		users: [],
		quizzes: [],
		lists: [],
	};
	return myHandler({
		type:'quiz',subType:'getAll',data:{
			id:userID
		}
	}).then((res)=>{
		if(res.success){
			allData.quizzes = res.data as IQuizData[];
			for(let _q of allData.quizzes){
				if(( String(_q.name).toLowerCase().includes(_criteria) )
					|| ( String(_q.description).toLowerCase().includes(_criteria) )
					|| ( String(_q.hashtags).toLowerCase().includes(_criteria) )
					|| ( String(_q.username).toLowerCase().includes(_criteria) ))
				{
					initData.quizzes.push(_q);
				}
			}
		}
		return myHandler({
			type:'user',subType:'getAll',data:{
				id:userID
			}
		}).then((res)=>{
			if(res.success){
				allData.users = res.data as IUserData[];
				for(let _q of allData.users){
					if(( String(_q.firstname).toLowerCase().includes(_criteria) )
						|| ( String(_q.lastname).toLowerCase().includes(_criteria) )
						|| ( String(_q.email).toLowerCase().includes(_criteria) )
						|| ( String(_q.description).toLowerCase().includes(_criteria) )
						|| ( String(_q.username).toLowerCase().includes(_criteria) ))
					{
						initData.users.push(_q);
					}
				}
			}
			return myHandler({
				type:'list',subType:'getAll',data:{
					id:userID
				}
			}).then((res)=>{
				if(res.success){
					allData.lists = res.data as IPlaylistData[];
					for(let _q of allData.lists){
						if(( String(_q.name).toLowerCase().includes(_criteria) )
							|| ( String(_q.description).toLowerCase().includes(_criteria) ))
						{
							initData.lists.push(_q);
						}
					}
				}
				return Promise.resolve(initData);
			});
		});
	});
}

async function retrieveMyQuizzes(){
	var userID = localStorage.getItem('JBQ_userId');
	return myHandler({
		type:'quiz',subType:'get',data:{userID:userID}
	},(msg,data)=>{
		data = JSON.parse(JSON.stringify(data));
		var quizArr = data as IQuizData[];
		if(!$('.menuContainer').find('.cardContainer').length){
			$('.menuContainer').append($('<div>',{class:'cardContainer'}));
		}
		for(var quiz of quizArr){
			addQuizToDOM(quiz);
		}
		console.log($('.cardContainer')[0]);
	},(msg,data)=>{
		console.log(data);
		console.log(msg);
		// $('#containerM').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
	},(msg,err)=>{
		console.log(msg);
		console.log(err);
		easyPopUpBox('An error occured trying to retrieve the quizzes');
	}).then((res)=>{
		retrieveMyLists().then((lres)=>{
			if(!$('.cardContainer *').length){
				$('.cardContainer').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
			}
			loadEvents();
		});
		return Promise.resolve(res);
	});
}
async function retrieveQuizzes(){
	var userID = localStorage.getItem('JBQ_userId');
	return myHandler({
		type:'quiz',subType:'getAll',data:{userID:userID}
	},(msg,data)=>{
		data = JSON.parse(JSON.stringify(data));
		var quizArr = data as IQuizData[];
		if(!$('.menuContainer').find('.cardContainer').length){
			$('.menuContainer').append($('<div>',{class:'cardContainer'}));
		}
		for(var quiz of quizArr){
			addQuizToDOM(quiz);
		}
	},(msg,data)=>{
		console.log(data);
		console.log(msg);
		
		$('.cardContainer').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
	},(msg,err)=>{
		console.log(msg);
		console.log(err);
		easyPopUpBox('An error occured trying to retrieve the quizzes');
	}).then((res)=>{
		retrieveLists().then((lres)=>{
			if(!$('.cardContainer *').length){
				$('.cardContainer').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
			}
			loadEvents();
		});
		loadEvents();
		return Promise.resolve(res);
	});
	
}
async function retrieveMyLists(){
	var userID = localStorage.getItem('JBQ_userId');
	return myHandler({
		type:'list',subType:'get',data:{userID:userID}
	},(msg,data)=>{
		data = JSON.parse(JSON.stringify(data));
		var listArr = data as IPlaylistData[];
		if(!$('.menuContainer').find('.cardContainer').length){
			$('.menuContainer').append($('<div>',{class:'cardContainer'}));
		}
		for(var list of listArr){
			addListToDOM(list);
		}
	},(msg,data)=>{
		// console.log(data);
		console.log(msg);
		// $('.cardContainer').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
		
	},(msg,err)=>{
		console.log(msg);
		console.log(err);
		easyPopUpBox('An error occured trying to retrieve the playlists');
	}).then((res)=>{
		loadEvents();
		return Promise.resolve(res);
	});
}
async function retrieveLists(){
	var userID = localStorage.getItem('JBQ_userId');
	return myHandler({
		type:'list',subType:'getAll',data:{userID:userID}
	},(msg,data)=>{
		data = JSON.parse(JSON.stringify(data));
		var listArr = data as IPlaylistData[];
		if(!$('.menuContainer').find('.cardContainer').length){
			$('.menuContainer').append($('<div>',{class:'cardContainer'}));
		}
		for(var list of listArr){
			addListToDOM(list);
		}
	},(msg,data)=>{
		// console.log(data);
		console.log(msg);
		// $('#containerM').html(`<div class="noQuizInfo">No Quizzes added yet</div>`);
	},(msg,err)=>{
		console.log(msg);
		console.log(err);
		easyPopUpBox('An error occured trying to retrieve the playlists');
	}).then((res)=>{
		loadEvents();
		return Promise.resolve(res);
	});
}
async function addFriend(uID){
	let username = localStorage.getItem('JBQ_username');
	let userID = localStorage.getItem('JBQ_userId');
	let apikey = localStorage.getItem('JBQ_apikey');
	return myHandler({
		type:'connect',subType:'addFriend',data:{id:uID}
	},(msg,data)=>{
		easyPopUpBox(msg);
		showUserDetail(uID);
		
	},(msg,data)=>{
		easyPopUpBox(msg);
	},(err,data)=>{
		easyPopUpBox(err);
	}).then((res)=>{
		// let _friend = JSON.parse(res.data);
		let _friend = (res.data as IUserData);
		saveActivity({
			userID: userID as string,
			type: 'Added Friend',
			info: `${username} and ${_friend?.username} are now friends.`,
			details:{
				friendID: _friend?.id,
			}
		},(msg,_dat)=>{
			console.log('Saved Activity');
			console.log(_dat);
		},(msg,_dat)=>{
			console.log('Failed to save the Activity');
			console.log(msg);
			console.log(_dat);
		},(err,msg)=>{
			console.log('Error saving Activity');
			console.log(err);
			console.log(msg);
		});
		loadEvents();
	});
}
async function removeFriend(uID){
	let username = localStorage.getItem('JBQ_username');
	let userID = localStorage.getItem('JBQ_userId');
	let apikey = localStorage.getItem('JBQ_apikey');
	return myHandler({
		type:'connect',subType:'removeFriend',data:{id:uID}
	},(msg,data)=>{
		easyPopUpBox(msg);
		showUserDetail(uID);
	},(msg,data)=>{
		easyPopUpBox(msg);
	},(err,data)=>{
		easyPopUpBox(err);
	}).then((res)=>{
		loadEvents();
	});
}
async function addFollow(uID){
	let username = localStorage.getItem('JBQ_username');
	let userID = localStorage.getItem('JBQ_userId');
	let apikey = localStorage.getItem('JBQ_apikey');
	return myHandler({
		type:'connect',subType:'addFollow',data:{id:uID}
	},(msg,data)=>{
		easyPopUpBox(msg);
		showUserDetail(uID);

	},(msg,data)=>{
		easyPopUpBox(msg);
	},(err,data)=>{
		easyPopUpBox(err);
	}).then((res)=>{
		console.log(res);
		// let _followed = JSON.parse(res.data);
		let _followed = (res.data as IUserData);
		saveActivity({
			userID: userID as string,
			type: 'Followed',
			info: `${username} is now following ${_followed.username}.`,
			details:{
				friendID: _followed.id,
			}
		},(msg,_dat)=>{
			console.log('Saved Activity');
			console.log(_dat);
		},(msg,_dat)=>{
			console.log('Failed to save the Activity');
			console.log(msg);
			console.log(_dat);
		},(err,msg)=>{
			console.log('Error saving Activity');
			console.log(err);
			console.log(msg);
		});
		loadEvents();
	});
}
async function removeFollow(uID){
	let username = localStorage.getItem('JBQ_username');
	let userID = localStorage.getItem('JBQ_userId');
	let apikey = localStorage.getItem('JBQ_apikey');
	return myHandler({
		type:'connect',subType:'removeFollow',data:{id:uID}
	},(msg,data)=>{
		easyPopUpBox(msg);
		showUserDetail(uID);
	},(msg,data)=>{
		easyPopUpBox(msg);
	},(err,data)=>{
		easyPopUpBox(err);
	}).then((res)=>{
		loadEvents();
	});
}

function showUserDetail(uID:string){
	var userDivCont = $('<div>',{class:'userMenuContainer h-100 w-100'});
	let userDivFriendCont = $('<div>',{class:'userFriendContainer h-100 w-100'}).append([
		$('<div>',{class:'userMenuHeader centerFlexCont h-10 w-xs-100'}).append([
			$('<div>',{class:'row mx-2 w-90'}).append([
				$('<div>',{class:'btn formBtn rreturnBtn col-1 p-1 m-1 centerFlexCont rounded'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left m-0 p-0'})
				),
				$('<div>',{class:'col h4 p-2 cI-txt userMenuHeaderName'}).text(`Friends`),
			]),
		]),
		$('<hr>',{class:'my-0'}),
		$('<div>',{class:'cardContainer h-90 w-95 scrollVerticalOn scrollHorizontalOff c4-txt'}).append([
			$('<div>',{class:'row m-2 w-100'}).append([
				$('<div>',{class:'col p-2'}).text(`This user has no friends`),
			]),
		]),
	]);

	let userDivFollowerCont = $(userDivFriendCont).clone();
	$(userDivFollowerCont).find(`.userMenuHeaderName`).text(`Followers`);

	let userDivFollowingCont = $(userDivFriendCont).clone();
	$(userDivFollowingCont).find(`.userMenuHeaderName`).text(`Following`);

	let userDivActivityCont = $(userDivFriendCont).clone();
	$(userDivActivityCont).find(`.userMenuHeaderName`).text(`Activity`);

	let userDivRecentCont = $(userDivFriendCont).clone();
	$(userDivRecentCont).find(`.userMenuHeaderName`).text(`Recently Played`);

	let userDivQuizzesCont = $(userDivFriendCont).clone();
	$(userDivQuizzesCont).find(`.userMenuHeaderName`).text(`Quizzes`);

	let userDivListsCont = $(userDivFriendCont).clone();
	$(userDivListsCont).find(`.userMenuHeaderName`).text(`Lists`);
	
	
	myHandler({
		type:'user',subType:'get',data:{id:uID}
	},(msg,hdata)=>{
		console.log({hdata});
		var userData = hdata as IUserData;
		var userPref = {
			color:'A',shape:'A',
		};
		var userFriends : string[] = [];
		var userFollowers : string[] = [];
		var userFollowing : string[] = [];

		var userConnect = {
			isFriends: false,
			isFollowing: false,
			isFollower: false,
		};

		console.log(4)
		if(userData.preferences && isObject(userData.preferences)){
			userPref = (userData.preferences as {color:string, shape:string});
		}
		if(userData.friendlist && isArray(userData.friendlist)){
			userFriends = (userData.friendlist as string[]);
		}
		if(userData.followers && isArray(userData.followers)){
			userFollowers = (userData.followers as string[]);
		}
		if(userData.following && isArray(userData.following)){
			userFollowing = (userData.following as string[]);
		}
		let myId = localStorage.getItem('JBQ_userId');
		console.log(4.5)
		for(let _friend of userFriends){
			if(String(_friend)==String(myId)){
				userConnect.isFriends = true;
			}
		}
		for(let _follower of userFollowers){
			if(String(_follower)==String(myId)){
				userConnect.isFollower = true;
			}
		}
		for(let _follow of userFollowing){
			if(String(_follow)==String(myId)){
				userConnect.isFollowing = true;
			}
		}

		console.log(5)

		let userShapeElem = $('<div>',{class:'userShapeElem m-3'}).css({
			'clip-path':`var(--s${userPref.shape})`,
			'background-color':`var(--c${userPref.color})`,
		});
		userDivCont.append(
			$('<div>',{class:'card my-1 mx-5 quizCard userCard h-90'}).append([
				$('<div>',{class:'card-header'}).append([
					$('<div>',{class:'btn formBtn returnBtn'}).append(
						$('<i>',{class:'fas fa-chevron-circle-left'})
					),
					$('<div>',{class:`card-img-top c${userPref.color}-txt`}).css({
						'background-image':`url('/files/images/${userData.imageURL || 'defImage'}')`
					}),
					$('<h5>',{class:`card-title userUsername c${userPref.color}-bg`}).text(userData.username).css('background-color',`var(--c${userPref.color})`),
					$('<h6>',{class:`card-subtitle userFullName c${userPref.color}-txt`}).append([
						$('<span>',{class:'userFirstName'}).text(userData.firstname),
						$('<span>',{class:'mx-1'}),
						$('<span>',{class:'userLastName'}).text(userData.lastname),
					]).css('color',`var(--c${userPref.color})`)
				]),
				$('<div>',{class:'card-body my-1 mx-3 scrollVerticalOff'}).append([
					$('<div>',{class:'row'}).append([
						$('<div>',{class:'col'}).append([
							$('<div>',{class:'userDetail'}).append([
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel c0-txt c${userPref.color}-bg rounded`}).text('DOB: '),
								$('<span>',{class:'userDOB'}).text(userData.DOB as string)
							]),
							$('<div>',{class:'userDetail'}).append([
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel c0-txt c${userPref.color}-bg rounded`}).text('Points: '),
								$('<span>',{class:'userPoints'}).text(userData.score?userData.score:0)
							]),
							$('<div>',{class:'userDetail'}).append([
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel c0-txt c${userPref.color}-bg rounded`}).text('Role: '),
								$('<span>',{class:'userRole'}).text(userData.role?userData.role:'Normal Player')
							]),
							$('<div>',{class:'userDetail'}).append([
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel userDetailLabelClickable c0-txt c${userPref.color}-bg rounded`,id:'userDetailFriends'}).text('Friends: '),
								$('<span>',{class:'userFriends'}).text(userFriends.length?userFriends.length:'None'),
							]),
							$('<div>',{class:'userDetail '}).append([
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel userDetailLabelClickable c0-txt c${userPref.color}-bg rounded`,id:'userDetailFollowers'}).text('Followers: '),
								$('<span>',{class:'userFollowers'}).text(userFollowers.length?userFollowers.length:'None'),
								$('<label>',{class:`f1-txt px-1 mx-2 userDetailLabel userDetailLabelClickable c0-txt c${userPref.color}-bg rounded`,id:'userDetailFollowing'}).text('Following: '),
								$('<span>',{class:'userFollowing'}).text(userFollowing.length?userFollowing.length:'None'),
							]),
							$('<div>',{class:'userDetail text-center'}).append([
								$('<div>',{class:`f1-txt px-1 mx-5 userDetailLabel userFriendCheck c0-txt cI-bg font-80 rounded ${(userConnect.isFriends)?``:`dontShow`}`}).text(`You are Friends!`),
							
								$('<div>',{class:`f1-txt px-1 mx-5 userDetailLabel userFollowerCheck c0-txt cI-bg font-80 rounded ${(userConnect.isFollower && !userConnect.isFollowing)?``:`dontShow`}`}).text(`You are Following!`),
							
								$('<div>',{class:`f1-txt px-1 mx-5 userDetailLabel userFollowingCheck c0-txt c${userPref.color}-bg font-80 rounded ${(!userConnect.isFollower && userConnect.isFollowing)?``:`dontShow`}`}).text(`They Follow You!`),
							
								$('<div>',{class:`f1-txt px-1 mx-5 userDetailLabel userFollowCheck c0-txt c${userPref.color}-bg font-80 rounded ${(userConnect.isFollower && userConnect.isFollowing)?``:`dontShow`}`}).text(`You Follow Each Other!`),
							
							]),
						]),
						$('<div>',{class:'col-4 justify-content-center text-center align-content-center'}).append([
							userShapeElem,
						]),
					])
				]),
				$('<hr>',{class:'m-1'}),
				$('<div>',{class:'card-body my-1 mx-3 h-30'}).append([
					$('<h5>').text('About'),
					$('<div>',{class:`w-100 px-2 c${userPref.color}-txt userAbout`}).text(`${userData.description||``}`),
				])
			]).attr({
				'data-userID':userData.id,
				'data-user-data':JSON.stringify(userData)
			})
		);

		console.log(6)
		
		let quizMenuArr = [
			(localStorage.getItem('JBQ_userId')!=uID)?{id:'userMenuBtnAdd',text:'Add Friend',icon:'fas fa-user-plus mx-2',}:null,
			(localStorage.getItem('JBQ_userId')!=uID)?{id:'userMenuBtnFollow',text:'Follow',icon:'fas fa-user-check mx-2',}:null,
			(localStorage.getItem('JBQ_userId')==uID||localStorage.getItem('JBQ_role')==`Admin`)?{id:'userMenuBtnEdit',text:'Edit',icon:'fas fa-pen-square mx-2',}:null,
			(localStorage.getItem('JBQ_userId')==uID||localStorage.getItem('JBQ_role')==`Admin`)?{id:'userMenuBtnDelete',text:'Delete',icon:'fas fa-trash mx-2',}:null,
		];
		let quizMenuControl = $('<div>',{class:'quizMenuControl my-2 mx-5 p-0 h-5'});
		for(let quizopt of quizMenuArr){
			if(!quizopt) continue;
			quizMenuControl.append(
				$('<div>',{class:'btn formBtn userMenuBtn mx-0 thiccBtn',id:quizopt.id})
				.append( $('<i>',{class: quizopt.icon}) )
				.append( $('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(quizopt.text) )
			);
		}
		userDivCont.append(quizMenuControl);

		console.log(6.5)

		let userDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		let userDetailSliderCtrl = setSlidableContent({
			group: [
				userDivCont, userDivFriendCont,userDivFollowerCont,userDivFollowingCont,userDivActivityCont,userDivRecentCont,userDivQuizzesCont,userDivListsCont,
			],
			container: userDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});

		console.log(7);
		
		// $('#containerM').html(userDetailSlider);

		console.log({userData})
		
		menuTracker?.push({
			element:userDetailSlider,
			data:{
				uID: uID,
				myId:myId,
				userData: userData,
				userPref: userPref,
				userFriends: userFriends,
				userFollowers: userFollowers,
				userFollowing: userFollowing,
				connect: userConnect,
				userDivCont: userDivCont,
				userDivFriendCont: userDivFriendCont,
				userDivFollowerCont: userDivFollowerCont,
				userDivFollowingCont: userDivFollowingCont,
				userDivActivityCont: userDivActivityCont,
				userDivRecentCont: userDivRecentCont,
				userDivQuizzesCont: userDivQuizzesCont,
				userDivListsCont: userDivListsCont,
				userShapeElem: userShapeElem,
				userDetailSlider: userDetailSlider,
				userDetailSliderCtrl: userDetailSliderCtrl,
			},
			onChange:(data)=>{
				console.log({data});
				processAjaxData(
					null, 
					`/home?${ new URLSearchParams({ user: data.userData.id }).toString() }`,
					{
						html:'',pageTitle:`Home - ${data.userData.username} - Just Bops & Quizzes`
					}
				);
				myHandler({
					type:'user',subType:'get',data:{id:uID}
				},(msg,ndata)=>{
					data.userData = ndata;
					data.userPref = {
						color:'A',shape:'A',
					};
					data.userFriends = [];
					data.userFollowers = [];
					data.userFollowing = [];
					data.connect.isFriends = false;
					if(data.userData.preferences && isObject(data.userData.preferences)){
						data.userPref = (data.userData.preferences);
					}

					if(data.userData.friendlist && isArray(data.userData.friendlist)){
						data.userFriends = (data.userData.friendlist);
					}
					if(data.userData.followers && isArray(data.userData.followers)){
						data.userFollowers = (data.userData.followers);
					}
					if(data.userData.following && isArray(data.userData.following)){
						data.userFollowing = (data.userData.following);
					}

					data.myId = localStorage.getItem('JBQ_userId');
					for(var _friend of data.userFriends){
						if(String(_friend)==String(data.myId)){
							data.connect.isFriends = true;
						}
					}
					for(var _follower of data.userFollowers){
						if(String(_follower)==String(data.myId)){
							data.connect.isFollower = true;
						}
					}
					for(var _follow of data.userFollowing){
						if(String(_follow)==String(data.myId)){
							data.connect.isFollowing = true;
						}
					}
					$('.userCard .card-img-top').attr({
						'class':`card-img-top c${data.userPref.color}-txt`,
					}).css({
						'background-image':`url('/files/images/${data.userData.imageURL || 'defImage'}')`,
					});
					$('.userCard .userUsername').attr({
						'class':`card-title userUsername c${data.userPref.color}-bg`,
					}).text(data.userData.username).css('background-color',`var(--c${data.userPref.color})`);
					$('.userCard .userFullName').attr({
						'class':`card-subtitle userFullName c${data.userPref.color}-txt`
					}).css('color',`var(--c${data.userPref.color})`);
					$('.userCard .userFirstName').text(data.userData.firstname);
					$('.userCard .userLastName').text(data.userData.lastname);
					$('.userCard .userDOB').text(data.userData.DOB);
					$('.userCard .userAbout').attr({
						'class':`w-100 px-2 c${userPref.color}-txt userAbout`
					}).text(data.userData.description||``);

					$('.userCard .userPoints').text(data.userData.score?data.userData.score:0);
					$('.userCard .userRole').text(data.userData.role?data.userData.role:'Normal Player');
					$('.userCard .userFriends').text(data.userFriends.length?data.userFriends.length:'None');
					$('.userCard .userFollowers').text(data.userFollowers.length?data.userFollowers.length:'None');
					$('.userCard .userFollowing').text(data.userFollowing.length?data.userFollowing.length:'None');
					$('.userCard .userFriendCheck').attr({
						'class':`f1-txt px-1 mx-5 userDetailLabel userFriendCheck c0-txt cI-bg font-80 rounded ${data.connect.isFriends ? '' : 'dontShow'}`
					});
					$('.userCard .userFollowCheck').attr({
						'class':`f1-txt px-1 mx-5 userDetailLabel userFollowCheck c0-txt c${data.userPref.color}-bg font-80 rounded ${(data.connect.isFollower && data.connect.isFollowing)?``:`dontShow`}`
					});
					$('.userCard .userFollowerCheck').attr({
						'class':`f1-txt px-1 mx-5 userDetailLabel userFollowerCheck c0-txt cI-bg font-80 rounded ${(data.connect.isFollower && !data.connect.isFollowing)?``:`dontShow`}`
					});
					$('.userCard .userFollowingCheck').attr({
						'class':`f1-txt px-1 mx-5 userDetailLabel userFollowingCheck c0-txt c${data.userPref.color}-bg font-80 rounded ${(!data.connect.isFollower && data.connect.isFollowing)?``:`dontShow`}`
					});

					$('.userCard .userShapeElem').css({
						'clip-path':`var(--s${data.userPref.shape})`, 'background-color':`var(--c${data.userPref.color})`,
					});

				},(msg,ndata)=>{
					data.userData = null;
					data.userShapeElem = null;
					data.userPref = null;
					data.userFriends = null;
					data.userFollowers = null;
					data.userFollowing = null;
					data.connect = null;

					console.log('HARDRESET G')

					data.userDivCont.append(
						$('<div>',{class:'card my-1 mx-5 quizCard userCard h-90'}).append([
							$('<div>',{class:'card-header'}).append([
								$('<div>',{class:'btn formBtn returnBtn'}).append(
									$('<i>',{class:'fas fa-chevron-circle-left'})
								),
								$('<div>',{class:`card-img-top cI-txt`}).css({
									'background-image':`url('./data/image/default.dat')`
								}),
								$('<h5>',{class:`card-title userUsername cI-bg`}).text(`Not available`),
								
							]),
							$('<div>',{class:'card-body my-1 mx-3 scrollVerticalOff'}).append([
								$('<div>',{class:'row'}).append(
									$('<div>',{class:'col'}).text(`User is not available or deleted.`)
								)
							])
						])
					);
				}).then((res)=>{
					$('#containerR').load('html/home_userMenu_userSection.html',()=>{
						if(data.connect.isFriends){
							$('#userMenuSectionAddFriend').find('span').text(`Remove Friend`);
							$('#userMenuSectionAddFriend').find('i').attr({
								'class':`fas fa-user-minus mx-2`
							});
							$('#userMenuBtnAdd').find('span').text(`Remove Friend`);
							$('#userMenuBtnAdd').find('i').attr({
								'class':`fas fa-user-minus mx-2`
							});
							$('#userMenuSectionFriends').removeClass('dontShow');
						}else{
							$('#userMenuSectionFriends').addClass('dontShow');
						}
						if(data.connect.isFollower){
							$('#userMenuSectionFollow').find('span').text(`Unfollow User`);
							$('#userMenuSectionFollow').find('i').attr({
								'class':`fas fa-user-times mx-2`
							});
							$('#userMenuBtnFollow').find('span').text(`Unfollow`);
							$('#userMenuBtnFollow').find('i').attr({
								'class':`fas fa-user-times mx-2`
							});
						}

						if(data.myId==data.userData?.id){
							$('#userMenuSectionAddFriend').parents('.clickContainerRow').addClass('dontShow');
							$('#userMenuBtnAdd').addClass('dontShow');
							$('#userMenuSectionFollow').parents('.clickContainerRow').addClass('dontShow');
							$('#userMenuBtnFollow').addClass('dontShow');
							$('#userMenuSectionFriends').removeClass('dontShow');
						}else{
							$('#userMenuSectionAddFriend').parents('.clickContainerRow').removeClass('dontShow');
							$('#userMenuBtnAdd').removeClass('dontShow');
							$('#userMenuSectionFollow').parents('.clickContainerRow').removeClass('dontShow');
							$('#userMenuBtnFollow').removeClass('dontShow');
						}

						if(data.userShapeElem && data.userPref){
							conductor?.connectElement($(data.userShapeElem)[0]);
							data.userDivCont.find('.playListItemColor').addClass(`c${data.userPref.color}-bg`);
							data.userDivCont.find('.playListItemUser').addClass(`c${data.userPref.color}-txt`);
							
						}

						$('.userShapeElem').on('beatHit',(event:any)=>{
							let e = event as CustomEvent;
							anime({
								targets: [e.currentTarget],
								duration: e.detail.stepCrotchet*1000,
								scale: ['1','1.3'],
								rotate: ['15deg','18deg'],
								direction: 'alternate',
								easing: 'easeInOutQuad',
							});
						});

						$('#userMenuBtnDelete').on('click',(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
						
							displayPopUpBox({
								messageText:`Are you sure you want to delete this user account? All associated quizzes and lists will be deleted to.`,
								acceptText:`Say bye to this Account`, cancelText:`Don't delete`,
								onAccept:()=>{
									deleteUser(data.userData.id);
								},
								onCancel:()=>{}
							});
						});

						$('#userMenuBtnAdd').on('click',(event)=>{
							if(data.connect.isFriends){
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Remove ${data.userData.username} as a friend?`,
										acceptText: `Unfriend`, cancelText:`Keep as friend`,
										onAccept:()=>{
											removeFriend(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't unfriend yourself!`);
								}
							}else{
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Add ${data.userData.username} as a friend?`,
										acceptText: `Add as friend`, cancelText:`Do not friend`,
										onAccept:()=>{
											addFriend(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't add yourself as a friend!`);
								}
							}
							
						});
						$('#userMenuBtnFollow').on('click',(event)=>{
							if(data.connect.isFollower){
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Unfollow ${data.userData.username}?`,
										acceptText: `Unfollow`, cancelText:`Keep following`,
										onAccept:()=>{
											removeFollow(data.userData.id);
										},
										onCancel:()=>{},
									});
								}else{
									easyPopUpBox(`You can't unfollow yourself!`);
								}
								
							}else{
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Follow ${data.userData.username}?`,
										acceptText: `Follow them`, cancelText:`Don't follow them`,
										onAccept:()=>{
											addFollow(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't follow yourself!`);
								}
							}
							
						});

						$(`#userMenuSectionFriends`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							if(data.connect.isFriends || data.myId==data.userData.id){
								showUserDetail_Friends();
							}
						});
						$(`#userMenuSectionFollowers`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Followers();
						});
						$(`#userMenuSectionFollowing`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Following();
						});
						$(`#userMenuSectionActivity`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Activity();
						});
						$(`#userMenuSectionRecent`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Recent();
						});
						$(`#userMenuSectionQuizzes`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Quizzes();
						});
						$(`#userMenuSectionPlaylists`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Lists();
						});
						


						$(`#userDetailFriends`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							if(data.connect.isFriends || data.myId==data.userData.id){
								showUserDetail_Friends();
							}
							
						});
						$(`#userDetailFollowers`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Followers();
						});
						$(`#userDetailFollowing`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
							showUserDetail_Following();
						});
						

						$(`.userFriendContainer .rreturnBtn`).on(`click`,(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();

							data.userDetailSliderCtrl.setContentIndex(0);

						});

						function showUserDetail_Friends(){
							let _promises : any[] = [];
							for(let _friend of data.userFriends){
								_promises.push(
									myHandler({type:'user',subType:'get',data:{
										id:_friend
									}}).then((res)=>{
										if(!res?.success) return Promise.resolve(null);
										// console.log(res);
										return Promise.resolve(res?.data);
									})
								)
							}

							Promise.all(_promises).then((res)=>{
								$(data.userDivFriendCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res.length){
									$(data.userDivFriendCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has no friends`),
										])[0]
									);
								}else{
									for(let _user of res){
										if(!_user) continue;
										addUserToCont(_user, $(data.userDivFriendCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(1);
								loadEvents();
							});
						}
						function showUserDetail_Followers(){
							let _promises : any[] = [];
							for(let _follower of data.userFollowers){
								_promises.push(
									myHandler({type:'user',subType:'get',data:{
										id:_follower
									}}).then((res)=>{
										if(!res?.success) return Promise.resolve(null);
										// console.log(res);
										return Promise.resolve(res?.data);
									})
								)
							}

							Promise.all(_promises).then((res)=>{
								$(data.userDivFollowerCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res?.length){
									$(data.userDivFollowerCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has no followers.`),
										])[0],
									);
								}else{
									for(let _user of res){
										if(!_user) continue;
										addUserToCont(_user, $(data.userDivFollowerCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(2);
								loadEvents();
							});
						}
						function showUserDetail_Following(){
							let _promises : any[] = [];
							for(let _follow of data.userFollowing){
								_promises.push(
									myHandler({type:'user',subType:'get',data:{
										id:_follow
									}}).then((res)=>{
										if(!res?.success) return Promise.resolve(null);
										// console.log(res);
										return Promise.resolve(res?.data);
									})
								)
							}

							Promise.all(_promises).then((res)=>{
								$(data.userDivFollowingCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res.length){
									$(data.userDivFollowingCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user is not following anyone.`),
										])[0]
									);
								}else{
									for(let _user of res){
										if(!_user) continue;
										addUserToCont(_user, $(data.userDivFollowingCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(3);
								loadEvents();
							});
						}

						function showUserDetail_Activity(){
							getActivity({
								userID: data.userData.id,
							}).then((res)=>{
								if(!res?.success) return Promise.resolve(null);
								// console.log(res);
								return Promise.resolve(res?.data as IActivityData[]);
							}).then((res)=>{
								$(data.userDivActivityCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res || !res[0]){
									$(data.userDivActivityCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has not done anything.`),
										])[0]
									);
									data.userDetailSliderCtrl.setContentIndex(4);
									loadEvents();
								}else{
									let _promises : any[] = [];
									let arr = res as IActivityData[];
									for(let _act of arr){
										if(!_act) continue;
										_promises.push(
											addActivityToCont(_act, $(data.userDivActivityCont).find('.cardContainer'))
										);
									}
									Promise.all(_promises).then(()=>{
										data.userDetailSliderCtrl.setContentIndex(4);
										loadEvents();
									})
								}
							});
						}
						function showUserDetail_Recent(){
							let _promises : any[] = [];
							_promises.push(
								getActivity({
									userID: data.userData.id, type: 'Played Quiz'
								}).then((res)=>{
									if(!res?.success || !res?.data) return Promise.resolve(null);
									console.log(res);
									let qpromises : any[] = [];
									let arr = res.data as IActivityData[];

									for(let _a of arr){
										let _aDetails = (_a.details as IActivityDataDetail);

										qpromises.push(
											myHandler({
												type:'quiz',subType:'get',data:{
													id: _aDetails.quizID
												}
											}).then((qres)=>{
												if(!qres.success || !qres.data) return Promise.resolve(null);
												return Promise.resolve(qres?.data);
											})
										);
									}
									return Promise.all(qpromises);
								})
							);

							Promise.all(_promises).then((res)=>{
								$(data.userDivRecentCont).find(`.cardContainer`).html('');
								console.log(res);
								if(!res || !res[0]){
									$(data.userDivRecentCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has not played any quizzes.`),
										])[0]
									);
								}else{
									let addedList : any[] = [];
									for(let _quiz of res[0]){
										if(!_quiz) continue;
										if(findItem(addedList,_quiz.id)){
											continue;
										}else{
											addedList.push(_quiz.id);
										}
										addQuizToCont(_quiz, $(data.userDivRecentCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(5);
								loadEvents();
							});
						}
						function showUserDetail_Quizzes(){
							myHandler({type:'quiz',subType:'get',data:{
								userID:data.userData.id
							}}).then((res)=>{
								if(!res?.success) return Promise.resolve(null);
								// console.log(res);
								return Promise.resolve(res?.data);
							}).then((res)=>{
								$(data.userDivQuizzesCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res || !res[0]){
									$(data.userDivQuizzesCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has not made any quizzes.`),
										])[0]
									);
								}else{
									let arr = res as IQuizData[];
									for(let _q of arr){
										if(!_q) continue;
										addQuizToCont(_q, $(data.userDivQuizzesCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(6);
								loadEvents();
							});
						}
						function showUserDetail_Lists(){
							myHandler({type:'list',subType:'get',data:{
								userID:data.userData.id
							}}).then((res)=>{
								if(!res?.success) return Promise.resolve(null);
								// console.log(res);
								return Promise.resolve(res?.data);
							}).then((res)=>{
								$(data.userDivListsCont).find(`.cardContainer`).html('');
								// console.log(res);
								if(!res || !res[0]){
									$(data.userDivListsCont).find(`.cardContainer`).html(
										$('<div>',{class:'row m-2 w-100'}).append([
											$('<div>',{class:'col p-2'}).text(`This user has not made any playlists.`),
										])[0]
									);
								}else{
									let arr = res as IPlaylistData[];
									for(let _l of arr){
										if(!_l) continue;
										addListToCont(_l, $(data.userDivListsCont).find('.cardContainer'));
									}
								}
								
								data.userDetailSliderCtrl.setContentIndex(7);
								loadEvents();
							});
						}
						

						$('#userMenuSectionAddFriend').on('click',(event)=>{
							if(data.connect.isFriends){
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Remove ${data.userData.username} as a friend?`,
										acceptText: `Unfriend`, cancelText:`Keep as friend`,
										onAccept:()=>{
											removeFriend(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't unfriend yourself!`);
								}
							}else{
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Add ${data.userData.username} as a friend?`,
										acceptText: `Add as friend`, cancelText:`Do not friend`,
										onAccept:()=>{
											addFriend(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't add yourself as a friend!`);
								}
							}
						});
						$('#userMenuSectionFollow').on('click',(event)=>{
							if(data.connect.isFollower){
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Unfollow ${data.userData.username}?`,
										acceptText: `Unfollow`, cancelText:`Keep following`,
										onAccept:()=>{
											removeFollow(data.userData.id);
										},
										onCancel:()=>{},
									});
								}else{
									easyPopUpBox(`You can't unfollow yourself!`);
								}
								
							}else{
								if(data.userData.id != data.myId){
									displayPopUpBox({
										messageText:`Follow ${data.userData.username}?`,
										acceptText: `Follow them`, cancelText:`Don't follow them`,
										onAccept:()=>{
											addFollow(data.userData.id);
										},
										onCancel:()=>{},
									});
									
								}else{
									easyPopUpBox(`You can't follow yourself!`);
								}
							}
						});

						$('.playListQuiz').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var qID = $(event.currentTarget).attr('data-quizID');
							// $('.cardContainer').remove();
							showQuizDetail(qID);
						});
						$('.playListList').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var lID = $(event.currentTarget).attr('data-listID');
							// $('.cardContainer').remove();
							showListDetail(lID);
						});
						$('.returnBtn').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							// $('.userMenuContainer').remove();
							// goToMainMenu();
							menuTracker?.goBack().then(()=>{
								console.log(menuTracker?.current());
								console.log(menuTracker?.current().content);
								loadEvents();
							});
							
						});
						loadEvents();
					});
				});
			}
		}).then(()=>{
			console.log( $(menuTracker?.current().content)[0] );
			console.log( $(menuTracker?.start().content)[0] );
			console.log( menuTracker?.current() );
			console.log( menuTracker?.start() );
			
		});

		console.log(8);

		console.log({egg:true, userData})
		
	},(msg,hdata)=>{
		console.log({hdata});
		var userDivCont = $('<div>',{class:'card my-1 mx-5 quizCard userCard h-90'}).append([
			$('<div>',{class:'card-header'}).append([
				$('<div>',{class:'btn formBtn returnBtn'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left'})
				),
				$('<div>',{class:`card-img-top cI-txt`}).css({
					'background-image':`url('./data/image/default.dat')`
				}),
				$('<h5>',{class:`card-title userUsername cI-bg`}).text(`Not available`),
				
			]),
			$('<div>',{class:'card-body my-1 mx-3 scrollVerticalOff'}).append([
				$('<div>',{class:'row'}).append(
					$('<div>',{class:'col'}).text(`User is not available or deleted.`)
				)
			])
		]);

		var userDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		var userDetailSliderCtrl = setSlidableContent({
			group: [userDivCont.addClass('w-100')],
			container: userDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});
		
		// $('#containerM').html(userDetailSlider);
		
		menuTracker?.push({
			element:userDetailSlider,
			data:{
				uID: uID,
				userDivCont: userDivCont,
				userDetailSlider: userDetailSlider,
				userDetailSliderCtrl: userDetailSliderCtrl,
			},
			onChange:(data)=>{
				$('.returnBtn').on('click',(event)=>{
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					menuTracker?.goBack().then(()=>{
						console.log(menuTracker?.current());
						console.log(menuTracker?.current().content);
						loadEvents();
					});
				});
			}
		});

	}).catch((err)=>{
		console.log(err);
	});
}
function showListDetail(lID : string){
	var listQuizzesCont = $('<div>',{class:'playListQuizzes list-group'});
	myHandler({type:'list',subType:'get',data:{
		id:lID
	}},(msg,ldata)=>{
		var lData = ldata as IPlaylistData;
		
		var playlistDivCont = $('<div>',{class:'listMenuContainer h-100'})
		.append(
			$('<div>',{class:'card my-1 mx-5 quizCard listCard h-90'})
			.append(
				$('<div>',{class:'btn formBtn returnBtn'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left'})
				)
			).append(
				$('<div>',{class:'card-header'})
				.append(
					$('<div>',{class:'card-img-top'}).css('background-image',`url('/files/images/${lData.imageURL || 'defImage'}')`)
				).append(
					$('<h5>',{class:'card-title quizName playlistName'}).text(lData.name)
				).append(
					$('<h6>',{class:'card-subtitle quizUsername playlistUsername cI-txt'}).text(`by ${lData.username}`).attr('data-userID',lData.userID)
				)
			).append(
				$('<div>',{class:'card-body my-1 mx-3'})
				.append(
					$('<p>',{class:'quizDesc playlistDesc'}).text(lData.description)
				)
			).append(
				$('<div>',{class:'card-body my-1 mx-3 h-40'})
				.append(listQuizzesCont)
			)
		);
		var quizMenuArr = [
			{id:'listMenuPlay',text:'Play',icon:'fas fa-play mx-2',},
			( (localStorage.getItem('JBQ_userId')==lData.userID) || (localStorage.getItem('JBQ_role')=='Admin') )?{id:'listMenuEdit',text:'Edit',icon:'fas fa-pen-square mx-2',}:null,
			( (localStorage.getItem('JBQ_userId')==lData.userID) || (localStorage.getItem('JBQ_role')=='Admin') )?{id:'listMenuDelete',text:'Delete',icon:'fas fa-trash mx-2',}:null,
		];
		var quizMenuControl = $('<div>',{class:'quizMenuControl my-2 mx-5 p-0 h-5'});
		for(var quizopt of quizMenuArr){
			if(!quizopt) continue;
			quizMenuControl.append(
				$('<div>',{class:'btn formBtn listMenuBtn mx-0 thiccBtn',id:quizopt.id})
				.append( $('<i>',{class: quizopt.icon}) )
				.append( $('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(quizopt.text) )
			);
		}
		
		playlistDivCont.append(quizMenuControl);
		var listDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		var listDetailSliderCtrl = setSlidableContent({
			group: [playlistDivCont.addClass('w-100')],
			container: listDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});
		// $('#containerM').html(listDetailSlider);
		menuTracker?.push({
			element:listDetailSlider,
			data: {
				listDetailSliderCtrl:listDetailSliderCtrl,
				quizMenuControl:quizMenuControl,
				playlistDivCont:playlistDivCont,
				listQuizzesCont:listQuizzesCont,
				lData:lData,
				thisListQuizzes:[],
			},
			onChange:(data)=>{
				processAjaxData(null,`/home?${
					(new URLSearchParams({
						list: `${data.lData.id}`
					}).toString())
				}`,{
					html:'',pageTitle:`Home - ${data.lData.name} - Just Bops & Quizzes`
				});

				myHandler({type:'list',subType:'get',data:{
					id:data.lData.id,
				}},(msg,ldata)=>{
					data.lData = ldata;
					data.thisListQuizzes = JSON.parse(data.lData.quizzes);
				},(msg,qdata)=>{
					data.playlistDivCont.html(
						$('<div>',{class:'listMenuContainer h-100'}).append(
							$('<div>',{class:'card my-1 mx-5 quizCard listCard h-90'})
							.append(
								$('<div>',{class:'btn formBtn returnBtn'}).append(
									$('<i>',{class:'fas fa-chevron-circle-left'})
								)
							).append(
								$('<div>',{class:'card-header'})
								.append(
									$('<div>',{class:'card-img-top'}).css('background-image',`url('./data/image/default.dat')`)
								).append(
									$('<h5>',{class:'card-title quizName playlistName'}).text('Not available')
								)
							).append(
								$('<div>',{class:'card-body my-1 mx-3'})
								.append(
									$('<p>',{class:'quizDesc playlistDesc'}).text(`List is deleted or not available.`)
								)
							)
						)
					);
					data.thisListQuizzes = [];
					data.lData = null;
					data.listQuizzesCont = null;
					
				}).then(()=>{
					$('#containerR').load('html/home_createSection.html',()=>{
						if(data.lData){
							$('.listCard .playlistUsername').text(`by ${data.lData.username}`).attr('data-userID',data.lData.userID);
							$('.listCard .playlistName').text(data.lData.name);
							$('.listCard .playlistDesc').text(data.lData.description);
							$('.listCard .card-img-top').css('background-image',`url('/files/images/${data.lData.imageURL || 'defImage'}')`);

						}
						if(data.listQuizzesCont){
							data.listQuizzesCont.html('');
						}
						let _promises : any[] = [];
						for(let _q of data.thisListQuizzes){
							let __q = _q;
							_promises.push(
								myHandler({type:'quiz',subType:'get',data:{
									id:_q
								}}).then((res)=>{
									if(res && res.success && res.data){
										return Promise.resolve(res.data);
									}
									return Promise.resolve(__q);
								})
							)
						}
						Promise.all(_promises).then((qres)=>{
							for(let qData of qres){
								if(qData instanceof Object){
									let qElem = $('<li>',{class:'row list-group-item playListQuiz p-1 mx-1'}).append([
										$('<div>',{class:'col-1 cI-bg playListItemColor'}),
										$('<div>',{class:'col playListItemName'}).text(qData.name),
										$('<div>',{class:'col-4 playListItemUser cI-txt'}).text(`by ${qData.username}`),
									]).attr({
										'data-quizID':`${qData.id}`,
										'data-quiz-data':JSON.stringify(qData)
									});
									data.listQuizzesCont.append(qElem);
									$('.playListQuiz').on('click',function(event){
										event.preventDefault();
										event.stopPropagation();
										event.stopImmediatePropagation();
										let qID = $(event.currentTarget).attr('data-quizID');
										// $('.cardContainer').remove();
										showQuizDetail(qID);
									});
									loadEvents();
								}else{
									data.listQuizzesCont.append(
										$('<li>',{class:'row list-group-item playListQuiz p-1 mx-1 c2-txt'}).append([
											$('<div>',{class:'col-1 cI-bg playListItemColor'}),
											$('<div>',{class:'col playListItemName'}).text(`Deleted Quiz`),
											$('<div>',{class:'col-4 playListItemUser cI-txt'}).text(``),
										]).attr({
											'data-quizID':`${qData}`,
											'data-quiz-data':``,
										})
									);
									$('.playListQuiz').on('click',function(event){
										event.preventDefault();
										event.stopPropagation();
										event.stopImmediatePropagation();
										let qID = $(event.currentTarget).attr('data-quizID');
										// $('.cardContainer').remove();
										showQuizDetail(qID);
									});
									loadEvents();
								}
							}
						}).catch((err)=>{
							easyPopUpBox(`Error trying to retrieve this playlist's quizzes`);
							data.listQuizzesCont.append(
								$('<li>',{class:'row list-group-item p-1 mx-1'}).text('No Quizzes Found')
							);
							loadEvents();
						});

						$('#listMenuPlay').on('click',(event)=>{
							displayPopUpBox({
								messageText:`Play this Playlist?`,
								acceptText:`Play!`, cancelText:`Return to menu`,
								onAccept:()=>{
									playPlaylist(data.lData.id,data.thisListQuizzes[0]);
								},
								onCancel: ()=>{}
							})
							loadEvents();
						});
						$('#listMenuEdit').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							createListSect(data.lData);
						});

						$('#listMenuDelete').on('click',(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
						
							displayPopUpBox({
								messageText:`Are you sure you want to delete this playlist? Quizzes will not be deleted`,
								acceptText:`Delete List`, cancelText:`Don't delete`,
								onAccept:()=>{
									deleteList(data.lData.id);
								},
								onCancel:()=>{}
							});
						});


						$('.returnBtn').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							menuTracker?.goBack().then(()=>{
								console.log(menuTracker?.current());
								console.log(menuTracker?.current().content);
								loadEvents();
							});
						});

						$('.thiccBtn').on('mouseenter',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
							// console.log('bingus');
							if($(quizBtnText).hasClass('font-md-0')){
								$(quizBtnText).removeClass('font-md-0');
							}
						});
						$('.thiccBtn').on('mouseleave',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
							// console.log('bignus');
							if(!$(quizBtnText).hasClass('font-md-0')){
								$(quizBtnText).addClass('font-md-0');
							}
						});
						$('.playlistUsername').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var uID = $(event.currentTarget).attr('data-userID');
							showUserDetail(uID);
						});
						$('.playListQuiz').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var qID = $(event.currentTarget).attr('data-quizID');
							// $('.cardContainer').remove();
							showQuizDetail(qID);
						});
						loadEvents();
					});
				});
			}
		}).then(()=>{
			console.log( $(menuTracker.current().content)[0] );
			console.log( $(menuTracker.start().content)[0] );
			console.log( menuTracker.current() );
			console.log( menuTracker.start() );
		});

	},(msg,qdata)=>{
		var playlistDivCont = $('<div>',{class:'listMenuContainer h-100'})
		.append(
			$('<div>',{class:'card my-1 mx-5 quizCard listCard h-90'})
			.append(
				$('<div>',{class:'btn formBtn returnBtn'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left'})
				)
			).append(
				$('<div>',{class:'card-header'})
				.append(
					$('<div>',{class:'card-img-top'}).css('background-image',`url('./data/image/default.dat')`)
				).append(
					$('<h5>',{class:'card-title quizName playlistName'}).text('Not available')
				)
			).append(
				$('<div>',{class:'card-body my-1 mx-3'})
				.append(
					$('<p>',{class:'quizDesc playlistDesc'}).text(`List is deleted or not available.`)
				)
			)
		);
		var listDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		var listDetailSliderCtrl = setSlidableContent({
			group: [playlistDivCont.addClass('w-100')],
			container: listDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});
		// $('#containerM').html(listDetailSlider);
		menuTracker.push({
			element:listDetailSlider,
			data: {
				listDetailSliderCtrl:listDetailSliderCtrl,
				playlistDivCont:playlistDivCont,
			},
			onChange:(data)=>{
				$('.returnBtn').on('click',(event)=>{
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					menuTracker.goBack().then(()=>{
						console.log(menuTracker.current());
						console.log(menuTracker.current().content);
						loadEvents();
					});
				});

				$('.thiccBtn').on('mouseenter',(event)=>{
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
					// console.log('bingus');
					if($(quizBtnText).hasClass('font-md-0')){
						$(quizBtnText).removeClass('font-md-0');
					}
				});
				$('.thiccBtn').on('mouseleave',(event)=>{
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
					// console.log('bignus');
					if(!$(quizBtnText).hasClass('font-md-0')){
						$(quizBtnText).addClass('font-md-0');
					}
				});
			}
		});

	});
	
	
}
function showQuizDetail(qID : string){
	var quizCardTags = $('<div>',{class:'card-tags quizTags mx-3 p-1 h-20'});
	myHandler({type:'quiz',subType:'get',data:{
		id:qID
	}},(msg,qdata)=>{
		var qData = qdata as IQuizData;
		var divQuizMenuContainer = $('<div>',{class:'quizMenuContainer h-100'})
		.append(
			$('<div>',{class:'card my-1 mx-5 quizCard h-80'}).append([
				$('<div>',{class:'btn formBtn returnBtn'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left'})
				),
				$('<div>',{class:'card-header'}).append([
					$('<div>',{class:'card-img-top'}).css('background-image',`url('/files/images/${qData.imageURL || 'defImage'}')`),
					$('<h5>',{class:'card-title quizName'}).text(qData.name),
					$('<h6>',{class:'card-subtitle quizUsername'}).text(`by ${qData.username}`).css('color','var(--cI)').attr('data-userID',qData.userID)
				]),
				$('<div>',{class:'card-body my-1 mx-3'}).append([
					$('<p>',{class:'quizDesc'}).text(qData.description),
					$('<div>',{class:'quizScore c2-bg p-2 w-40 rounded'}).css('color',`var(--c0)`).text(`Passing Score: ${qData.passingGrade}`)
				]),
				$('<hr>'), quizCardTags,
			])
		);
		var quizMenuArr = [
			{id:'quizMenuPlay',text:'Play',icon:'fas fa-play mx-2',},
			(localStorage.getItem('JBQ_userId')==qData.userID||localStorage.getItem('JBQ_role')=='Admin')?{id:'quizMenuEdit',text:'Edit',icon:'fas fa-pen-square mx-2',}:null,
			(localStorage.getItem('JBQ_userId')==qData.userID||localStorage.getItem('JBQ_role')=='Admin')?{id:'quizMenuDelete',text:'Delete',icon:'fas fa-trash mx-2',}:null,
			// {id:'quizMenuSave',text:'Save to List',icon:'fas fa-bookmark mx-2',},
			// {id:'quizMenuPreview',text:'Preview Song',icon:'fas fa-play-circle mx-2',},
		];
		var quizMenuControl = $('<div>',{class:'quizMenuControl my-2 mx-5 p-0 h-5'});
		for(var quizopt of quizMenuArr){
			if(!quizopt) continue;
			quizMenuControl.append(
				$('<div>',{class:'btn formBtn quizMenuBtn mx-0 thiccBtn',id:quizopt.id})
				.append( $('<i>',{class: quizopt.icon}) )
				.append( $('<span>',{class:'quizBtnText font-xs-100 font-md-0 thiccBtnText'}).text(quizopt.text) )
			);
		}
		divQuizMenuContainer.append(quizMenuControl);
		var quizDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		var quizDetailSliderCtrl = setSlidableContent({
			group: [divQuizMenuContainer.addClass('w-100')],
			container: quizDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});
		menuTracker.push({
			element:quizDetailSlider,
			data: {
				qData:qData,
				quizDetailSliderCtrl: quizDetailSliderCtrl,
				quizMenuControl: quizMenuControl,
				divQuizMenuContainer: divQuizMenuContainer,
				quizCardTags: quizCardTags,
				qDataTags: [],
			},
			onChange:(data)=>{
				processAjaxData(null,`/home?${
					(new URLSearchParams({
						quiz: `${data.qData.id}`
					}).toString())
				}`,{
					html:'',pageTitle:`Home - ${data.qData.name} - Just Bops & Quizzes`
				});

				myHandler({type:'quiz',subType:'get',data:{
					id:data.qData.id,
				}},(msg,qdata)=>{
					data.qData = qdata;
					data.qDataTags = JSON.parse(data.qData.hashtags);
				},(msg,qdata)=>{
					data.divQuizMenuContainer.html(
						$('<div>',{class:'quizMenuContainer h-100'}).append(
							$('<div>',{class:'card my-1 mx-5 quizCard h-80'})
							.append(
								$('<div>',{class:'btn formBtn returnBtn'}).append(
									$('<i>',{class:'fas fa-chevron-circle-left'})
								)
							).append(
								$('<div>',{class:'card-header'})
								.append(
									$('<div>',{class:'card-img-top'}).css('background-image',`url('./data/image/default.dat')`)
								).append(
									$('<h5>',{class:'card-title quizName'}).text(`Not available`)
								)
							).append(
								$('<div>',{class:'card-body my-1 mx-3'})
								.append(
									$('<p>',{class:'quizDesc'}).text(`Quiz might be deleted or not available.`)
								)
							).append(
								$('<hr>')
							)
						)
					);
					data.qDataTags = [];
					data.qData = null;
					data.quizCardTags = null;
					
				}).then(()=>{
					$('#containerR').load('html/home_createSection.html',()=>{
						if(data.quizCardTags){
							data.quizCardTags.html('');
						}
						for(var ttag of data.qDataTags){
							var ttagSpan = $('<span>',{class:'card-tag'}).append(
								$('<i>',{class:'fab fa-slack-hash'})
							).append(
								$('<span>',{class:'card-tag-text'}).text(ttag)
							).attr('data-hashtag',`${ttag}`);
							data.quizCardTags.append(ttagSpan);
						}
						if(data.qData){
							$('.quizCard .quizName').text(`${data.qData.name}`);
							$('.quizCard .quizUsername').text(`by ${data.qData.username}`);
							$('.quizCard .quizDesc').text(`${data.qData.description}`);
							$('.quizCard .quizScore').text(`Passing Score: ${data.qData.passingGrade}`);

						}
						

						$('#quizMenuPlay').on('click',(event)=>{
							displayPopUpBox({
								messageText:`Play this Quiz?`,
								acceptText:`Play!`, cancelText:`Return to menu`,
								onAccept:()=>{
									playQuiz(data.qData.id);
								},
								onCancel: ()=>{}
							})
							loadEvents();
						});

						$('#quizMenuDelete').on('click',(event)=>{
							event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
						
							displayPopUpBox({
								messageText:`Are you sure you want to delete this quiz?`,
								acceptText:`Delete Quiz`, cancelText:`Don't delete`,
								onAccept:()=>{
									deleteQuiz(data.qData.id);
								},
								onCancel:()=>{}
							});
						});

						$('#quizMenuEdit').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							createQuizSect(data.qData);
						});

						$('.returnBtn').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							menuTracker.goBack().then(()=>{
								console.log(menuTracker.current());
								console.log(menuTracker.current().content);
								loadEvents();
							});
						});

						$('.thiccBtn').on('mouseenter',(event)=>{
							var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
							// console.log('bingus');
							if($(quizBtnText).hasClass('font-md-0')){
								$(quizBtnText).removeClass('font-md-0');
							}
						});
						$('.thiccBtn').on('mouseleave',(event)=>{
							var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
							// console.log('bignus');
							if(!$(quizBtnText).hasClass('font-md-0')){
								$(quizBtnText).addClass('font-md-0');
							}
						});
						$('.quizUsername').on('click',(event)=>{
							event.preventDefault();
							event.stopPropagation();
							event.stopImmediatePropagation();
							var uID = $(event.currentTarget).attr('data-userID');
							showUserDetail(uID);
						});
						loadEvents();
					});
					
				});
			}
		}).then(()=>{
			
		});
	},(msg,qdata)=>{
		var divQuizMenuContainer = $('<div>',{class:'quizMenuContainer h-100'})
		.append(
			$('<div>',{class:'card my-1 mx-5 quizCard h-80'})
			.append(
				$('<div>',{class:'btn formBtn returnBtn'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left'})
				)
			).append(
				$('<div>',{class:'card-header'})
				.append(
					$('<div>',{class:'card-img-top'}).css('background-image',`url('./data/image/default.dat')`)
				).append(
					$('<h5>',{class:'card-title quizName'}).text(`Not available`)
				)
			).append(
				$('<div>',{class:'card-body my-1 mx-3'})
				.append(
					$('<p>',{class:'quizDesc'}).text(`Quiz might be deleted or not available.`)
				)
			).append(
				$('<hr>')
			)
		);
		var quizDetailSlider = $('<div>',{class:'sliderContainer h-100 w-100'}).css('display','flex');
		var quizDetailSliderCtrl = setSlidableContent({
			group: [divQuizMenuContainer.addClass('w-100')],
			container: quizDetailSlider,
			leftButton: $('<div>'),
			rightButton: $('<div>'),
		});
		menuTracker.push({
			element:quizDetailSlider,
			data: {
				quizDetailSliderCtrl: quizDetailSliderCtrl,
				divQuizMenuContainer: divQuizMenuContainer,
			},
			onChange:(data)=>{
				$('.returnBtn').on('click',(event)=>{
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					menuTracker.goBack().then(()=>{
						console.log(menuTracker.current());
						console.log(menuTracker.current().content);
						loadEvents();
					});
				});

				$('.thiccBtn').on('mouseenter',(event)=>{
					var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
					// console.log('bingus');
					if($(quizBtnText).hasClass('font-md-0')){
						$(quizBtnText).removeClass('font-md-0');
					}
				});
				$('.thiccBtn').on('mouseleave',(event)=>{
					var quizBtnText = $(event.currentTarget).children('.thiccBtnText');
					// console.log('bignus');
					if(!$(quizBtnText).hasClass('font-md-0')){
						$(quizBtnText).addClass('font-md-0');
					}
				});
			}
		});
	});
	
}

async function retrieveActivity(_userID : string) : Promise<IActivityData[]|null>{
	let initSubType = 'get';
	if(!_userID)
		initSubType = 'getAll';
	return myHandler({
		type:'activity',subType:'get',data:{
			userID:_userID||'[NOT NULL]'
		}
	}).then((res)=>{
		if(res?.success){
			let dat = res.data as IActivityData[];
			if(!dat?.length) dat = [];
			return Promise.resolve(dat);
		}
		return Promise.resolve([]);
	});
}

async function retrieveFollowerActivity(){
	let myId = localStorage.getItem('JBQ_userId');
	return myHandler({
		type:'user',subType:'get',data:{id:myId}
	}).then((res)=>{
		if(!res.success) return Promise.resolve([]);
		let dat = res.data as IUserData;
		let myFollowing : string[] = [];
		if(dat?.following && isJSON(dat.following)){
			myFollowing = JSON.parse(dat.following as string);
		}
		if(!myFollowing.length){
			return Promise.resolve([]);
		}
		let _promises : any[] = [];
		myFollowing.forEach((elem,index,arr)=>{
			_promises.push(
				retrieveActivity(elem)
			);
		});

		return Promise.all(_promises).then((res)=>{
			let _collection : any[] = [];
			for(let _arr of res){
				for(let _act of _arr){
					_collection.push(_act);
				}
			}
			return Promise.resolve(_collection);
		});
		
	})
}

async function addUserToCont(uData : IUserData, cont : Element | JQuery){

	let uprefs : IUserDataPrefs = {color:'A',shape:'A'};
	if(isObject(uData.preferences)){
		uprefs = (uData.preferences as IUserDataPrefs); //object
	}
	let _div = $('<div>',{class:'row p-2 m-2 w-70 h-15 searchOpt activityRoute'}).append([
		$('<div>',{class:`col-4 c${uprefs.color}-bg c0-txt rounded`})
		.css({
			'background-image':`url('/files/images/${uData.imageURL||`defImage`}')`,
			'background-position':`center`, 'background-size':`cover`,
			'background-repeat':`no-repeat`,
		}),
		$('<div>',{class:`col c${uprefs.color}-txt font-120`}).text(`${uData.username}`),
		$('<div>',{class:`col-2 mx-2`}).append([
			$('<div>',{class:'userShapeElem m-0'}).css({
				'clip-path':`var(--s${uprefs.shape})`,
				'background-color':`var(--c${uprefs.color})`,
				'width':`3rem`, 'height':`3rem`,
			}),
		]),
	]).attr({
		'data-userid':uData.id,
	});

	$(cont).append(_div);

	if(conductor){
		conductor.connectElement($(_div)[0]);
		$(_div).on('beatHit',(event:any)=>{
			let e = event as CustomEvent;
			let currBeat = e.detail.beat;
			if(currBeat%2==0){
				let animBox = anime({
					targets: [e.currentTarget],
					scale: ['1','1.05'],
					duration: e.detail.stepCrotchet*1000,
					easing: "easeInOutQuad",
					direction: 'alternate',
				});
			}
		});
	}

	return Promise.resolve();

}

async function addQuizToCont(qData : IQuizData, cont : Element | JQuery){

	let _div = $('<div>',{class:'row p-2 m-2 w-75 h-10 searchOpt activityRoute'}).append([
		$('<div>',{class:'col-2 p-1 cI-bg c0-txt rounded text-center'})
		.css({
			'background-image':`url('/files/images/${qData.imageURL||`defImage`}')`,
			'background-position':`center`, 'background-size':`cover`,
			'background-repeat':`no-repeat`,
		}),
		$('<div>',{class:'col'}).text(`${qData.name}`),
		$('<div>',{class:'col-4'}).text(`by ${qData.username}`),
	]).attr({
		'data-quizid':qData.id,
	});

	$(cont).append(_div);
	return Promise.resolve();
}

async function addListToCont(lData : IPlaylistData, cont : Element | JQuery){
	let _quizzes : string[] = [];
	if(isJSON(lData.quizzes)){
		_quizzes = JSON.parse(lData.quizzes as string); //array
	}
	let _div = $('<div>',{class:'row p-2 m-2 w-90 h-10 searchOpt activityRoute'}).append([
		$('<div>',{class:'col-2 p-1 cI-bg c0-txt rounded text-center'})
		.css({
			'background-image':`url('/files/images/${lData.imageURL||`defImage`}')`,
			'background-position':`center`, 'background-size':`cover`,
			'background-repeat':`no-repeat`,
		}),
		$('<div>',{class:'col'}).text(`${lData.name}`),
		$('<div>',{class:'col'}).text(`by ${lData.username}`),
		$('<div>',{class:'col cI-bg c0-txt p-1 text-center rounded'}).text(`${_quizzes.length} Quizzes`),
	]).attr({
		'data-listid':lData.id,
	});

	$(cont).append(_div);
	if(conductor){
		conductor.connectElement($(_div)[0]);
		$(_div).on('beatHit',(event:any)=>{
			let e = event as CustomEvent;
			let currBeat = event.detail.beat;
			if(currBeat%2==0){
				let animBox = anime({
					targets: [e.currentTarget],
					scale: ['1','1.05'],
					duration: e.detail.stepCrotchet*1000,
					easing: "easeInOutQuad",
					direction: 'alternate',
				});
			}
		});
	}
	return Promise.resolve();
}

async function addActivityToCont(aData : IActivityData, cont : Element|JQuery){
	/*
	aData = {
		id: Str,
		info: Str,
		userID: userID,
		type: Enum ActivityType,
		details:{
			quizID: quizID,
			listID: listID,
			friendID:friendID,
			listID:listID,
			songID:songID,
			score:int,
		}
	}
	 */
	return myHandler({type:'user',subType:'get',data:{
		id: aData.userID
	}}).then((res)=>{
		let _resolve : any = {
			type:'',data:{}, detail:{}, info:'', div:null
		};
		let a_user : IUserData;
		let aUserPrefs = {color:'2',shape:'2'};
		if(res?.success && res?.data){
			a_user = res.data as IUserData;
			if(isObject(a_user.preferences)){
				aUserPrefs = (a_user.preferences as IUserDataPrefs);
			}
		}
		let aDetail : IActivityDataDetail;
		if(isJSON(aData.details)){
			aDetail = JSON.parse(aData.details as string);
		}
		// console.log(aDetail);
		
		switch(aData.type){
			case 'Created Quiz': case 'Played Quiz': case 'Completed Quiz': case 'Edited Quiz': case 'Deleted Quiz':
				_resolve.type = 'quiz';
				_resolve.data = { id: aDetail.quizID };
				break;
			case 'Created Playlist': case 'Edited Playlist': case 'Deleted Playlist': case 'Played Playlist':
				_resolve.type = 'list';
				_resolve.data = { id: aDetail.listID };
				break;
			case 'Added Song': case 'Edited Song': case 'Deleted Song':
				_resolve.type = 'song';
				_resolve.data = { id: aDetail.songID };
				break;
			case 'Added Friend': case 'Friend Request': case 'Followed': case 'Created User':
				_resolve.type = 'user';
				_resolve.data = { id: aDetail.friendID };
				break;
			case 'Maxed Score':
				_resolve.type = 'quiz';
				_resolve.data = { id: aDetail.quizID };
				_resolve.detail.score = aDetail.score;
				break;
			default:
				break;
		}
		if(!_resolve.type){
			console.log('NO TYPE??');
			return;
		}
		
		// console.log(_resolve);
		return myHandler({
			type:_resolve.type,subType:'get',data:_resolve.data
		}).then((res)=>{

			let a_data = res?.data as any;

			switch(aData.type){
				case 'Created Quiz': 

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` created a quiz: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-quizid',`${aDetail.quizID}`),
					]);
					break;
				case 'Played Quiz':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` is playing a quiz: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-quizid',`${aDetail.quizID}`),
						$('<span>',{class:'p-1 '}).text(` by `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.username||`[Deleted]`}`).attr('data-userid',`${a_data?.userID}`),
					]);
					break;
				case 'Completed Quiz':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` completed a quiz: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-quizid',`${aDetail.quizID}`),
						$('<span>',{class:'p-1 '}).text(` by `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.username||`[Deleted]`}`).attr('data-userid',`${a_data?.userID}`),
					]);
					break;
				case 'Edited Quiz':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` edited a quiz: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-quizid',`${aDetail.quizID}`),
					]);
					break;
				case 'Deleted Quiz':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` deleted a quiz: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-quizid',`${aDetail.quizID}`),
					]);
					break;
				case 'Created Playlist':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` created a playlist: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-listid',`${aDetail.listID}`),
					]);
					break;
				case 'Edited Playlist':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` edited a playlist: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-listid',`${aDetail.listID}`),
					]);
					break;
				case 'Deleted Playlist':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` deleted a playlist: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-listid',`${aDetail.listID}`),
					]);
					break;
				case 'Played Playlist':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` played a playlist: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-listid',`${aDetail.listID}`),
						$('<span>',{class:'p-1 '}).text(` by `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.username||`[Deleted]`}`).attr('data-userid',`${a_data?.userID}`),
					]);
					break;
				case 'Added Song':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` added a song: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.author||`[Deleted]`} - ${a_data.title||`[Deleted]`}`).attr('data-songid',`${aDetail.songID}`),
					]);
					break;
				case 'Edited Song':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` edited a song: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.author||`[Deleted]`} - ${a_data.title||`[Deleted]`}`).attr('data-songid',`${aDetail.songID}`),
					]);
					break;
				case 'Deleted Song':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` removed a song: `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.author||`[Deleted]`} - ${a_data.title||`[Deleted]`}`).attr('data-songid',`${aDetail.songID}`),
					]);
					break;
				case 'Created User':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` joined Just Bops & Quizzes!`),
					]);
					break;
				case 'Added Friend':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` and `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.username||`[Deleted]`}`).attr('data-userid',`${aDetail.friendID}`),
						$('<span>',{class:'p-1 '}).text(` are now friends`),
					]);
					break;
				case 'Friend Request':
					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` sent a friend request `),
					]);
					break;
				case 'Followed':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` just followed `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.username||`[Deleted]`}`).attr('data-userid',`${aDetail.friendID}`),
					]);
					break;
				case 'Maxed Score':

					_resolve.div = $('<div>',{class:'activityPart'}).append([
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_user?.username||`[Deleted]`}`).attr('data-userid',`${aData.userID}`),
						$('<span>',{class:'p-1 '}).text(` maxed out the score for the quiz `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data?.name||`[Deleted]`}`).attr('data-listid',`${aDetail.quizID}`),
						$('<span>',{class:'p-1 '}).text(` by `),
						$('<span>',{class:`p-1 c${aUserPrefs?.color||`A`}-bg activityRoute`}).text(`${a_data.username||`[Deleted]`}`).attr('data-userid',`${a_data?.userID}`),
					]);
					break;
				default:
					break;
			}
			/*console.log(_resolve.info);
			console.log(_resolve.div);*/
			if(!_resolve.div){
				console.log('NO DIV');
				return;
			}
			$(_resolve.div).addClass('col m-2');
			let divData = $('<div>',{class:'row m-2 w-80 cX-bg activityOpt font-100'}).append([
				_resolve.div,
			]);
			
			// console.log($(divData)[0]);
			$(cont).append(divData);
			if(conductor){
				conductor.connectElement($(divData)[0]);
				$(divData).on('beatHit',(event:any)=>{
					let e = event as CustomEvent;

					let currBeat = e.detail.beat;
					if(currBeat%2==0){
						let animBox = anime({
							targets: [e.currentTarget],
							scale: ['1','1.05'],
							duration: e.detail.stepCrotchet*1000,
							easing: "easeInOutQuad",
							direction: 'alternate',
						});
					}
				});
			}
			loadEvents();
			// console.log('KUIII');
		});

	});
	
}

function addListToDOM(lData : IPlaylistData){
	/*
	lData = {
		name: listName,
		id: listID,
		userID: userID,
		username: username
		songTitle: songTitle
		quizzes: [ids_here],
		description: descriptionOfTheListBeLike,
		imageURL: imageURL
	};
	 */
	var rndColSize = rndInt(1,3);
	var lDataQuizzes : string[] = JSON.parse(lData.quizzes as string);
	var divData = $('<div>',{
		class: `row m-2 quiZ`, id: `${lData.id}`
	}).append(
		$('<div>',{class:`col-${rndColSize} cardSpacer`})
	).append(
		$('<div>',{class:`col-8 card myCard`})
		.append([
			$('<div>',{class:`card-img-top`}).css('background-image', `url('/files/images/${lData.imageURL || 'defImage'}')`),
			$('<h5>',{class:`card-title`}).text(`${lData.name}`),
			$('<h6>',{class:`card-subtitle`}).text(`${lData.username}`),
			$('<div>',{class:`card-body`}).text(`${lDataQuizzes.length} Quizzes in this playlist`),
			$('<div>',{class:`bopRing cardRing rightRing`})
		])
	).append(
		$('<div>',{class:'col'})
	).attr({
		'data-lData':JSON.stringify(lData),
		'data-listID':`${lData.id}`,
	})

	$(divData).appendTo('.cardContainer');
	if(conductor){
		conductor.connectElement($(`#${lData.id}`)[0]);
	}
	$('.quiZ').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;

		var currBeat = e.detail.beat;
		if(currBeat%2==0){
			var animBox = anime({
				targets: [e.currentTarget],
				scale: ['1','+=0.05'],
				duration: e.detail.stepCrotchet*1000,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
	});

	$('.quiZ .myCard').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var lID = $(event.currentTarget).parents('.quiZ').attr('data-listID');
		// $('.cardContainer').remove();
		showListDetail(lID);
	});
}
function addQuizToDOM(qData : IQuizData){
	/*
	qData = {
		name: quizName,
		id: quizID,
		userID: userID,
		username: username
		songID: songID,
		songTitle: songTitle
		hashtags: [],
		description: descriptionOfTheQuizBeLike,
		imageURL: imageURL
	};
	 */
	var rndColSize = rndInt(1,5);
	var hashtagData = "";
	var qDataTags : string[] = JSON.parse(qData.hashtags as string);
	for(var ttag of qDataTags){
		var dat = `<span class="card-tag"><i class="fab fa-slack-hash"></i>`+ttag+`</span>`;
		hashtagData += dat;
	}
	var divData = $('<div>',{
		class: `row m-2 quiZ`, id: `${qData.id}`
	}).append(
		$('<div>',{class:`col-${rndColSize} cardSpacer`})
	).append(
		$('<div>',{class:`col-5 card myCard`})
		.append(
			$('<div>',{class:`card-img-top`}).css('background-image', `url('/files/images/${qData.imageURL||'defImage'}')`)
		).append(
			$('<h5>',{class:`card-title`}).text(`${qData.name}`)
		).append(
			$('<h6>',{class:`card-subtitle`}).text(`${qData.username}`)
		).append(
			$('<div>',{class:`bopRing cardRing`})
		)
	).append(
		$('<div>',{class:'col'})
	).attr({
		'data-qData':JSON.stringify(qData),
		'data-quizID':`${qData.id}`,
	});

	$('.cardContainer').append(divData);
	if(conductor){
		conductor.connectElement($(`#${qData.id}`)[0]);
	}
	$('.quiZ').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;

		var currBeat = e.detail.beat;
		if(currBeat%2==0){
			var animBox = anime({
				targets: [e.currentTarget],
				scale: ['1','1.05'],
				duration: e.detail.stepCrotchet*1000,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
	});

	$('.quiZ .myCard').on('click',function(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var qID = $(event.currentTarget).parents('.quiZ').attr('data-quizID');
		// console.log(thisQData);
		// $('.cardContainer').remove();
		showQuizDetail(qID);
	});
}


function loadEvents(){
	// console.log('loadedEvents!');

	defectAllFormSubmits();

	if(conductor){
		conductor.audio.ontimeupdate = (event) => {
			let progress = (conductor.currStep/conductor.totalSteps)*100;
			$('.playBar .playBar-progress').attr({
				'data-progress':`${progress}`
			}).css({
				'width':`${progress}%`
			}).find('.playBar-node').css(
				(progress<=50)?({ right:`auto`,left:`${progress}%`,}):({ left:`auto`,right:`${100-progress}%`,})
			);
		}

		$(`.playBar-progress`).css({
			'transition':`all ${conductor.crotchet}s`,
		});
	}
	$('.playBar-bar').on('mousedown',(event)=>{
		event.preventDefault();
		// event.stopPropagation();
		holdDown.down = true;
		
	}).on('mousemove',(event)=>{
		if(holdDown.down){
			onProgressBarChange(event);
		}
	}).on('click',(event)=>{
		onProgressBarChange(event);
	}).bind('mouseup',()=>{
		holdDown.down = false;
		clearInterval(holdDown.timer as number);
		clearTimeout(holdDown.startTimer as number);
	});

	function onProgressBarChange(event){
		if(!conductor)	return;
		let thisBar = event.currentTarget;
		let parent = $(thisBar).parent();
		let progressBar = $(parent).find('.playBar-progress')[0];
		let thisRect = thisBar.getBoundingClientRect();
		let offset = $(thisBar).offset();
		let windowQ = $(window);
		let x = (event.pageX - offset.left) + windowQ.scrollLeft();
		// let y = (event.pageY - offset.top) + windowQ.scrollTop();
		let w = thisRect.width;
		// let h = thisRect.height;
		if(x>0 && x<=w){
			let progress = ( (x?x:0) / (w?w:1) )*100;
			conductor.setStep(Math.trunc(conductor.totalSteps*progress/100));
			$('.playBar .playBar-progress').attr({
				'data-progress':`${progress}`
			}).css({
				'width':`${progress}%`
			}).find('.playBar-node').css(
				(progress<=50)?({ right:`auto`,left:`${progress}%`,}):({ left:`auto`,right:`${100-progress}%`,})
			);
		}
	}

	$('.quizCard .card-tags .card-tag').on('click',(event)=>{
		event.preventDefault(); event.stopPropagation();
		event.stopImmediatePropagation();
		let ttag = $(event.currentTarget).attr('data-hashtag');
		homeSearch(ttag);
	});

	$('.menuContainer .menuSearch .formBtn').on('click',(event)=>{
		event.preventDefault(); event.stopPropagation();
		event.stopImmediatePropagation();
		let _query = String($('.menuSearch .inputBox').val());
		homeSearch(_query);
	});

	$('.activityRoute').on('click',(event)=>{
		event.preventDefault(); event.stopPropagation();
		event.stopImmediatePropagation();
		let thisElem = event.currentTarget;
		if($(thisElem).attr('data-userid')){
			showUserDetail($(thisElem).attr('data-userid'));
			return;
		}else if($(thisElem).attr('data-listid')){
			showListDetail($(thisElem).attr('data-listid'));
			return;
		}else if($(thisElem).attr('data-quizid')){
			showQuizDetail($(thisElem).attr('data-quizid'));
			return;
		}else if($(thisElem).attr('data-songid')){
			// showSongDetail($(thisElem).attr('data-songid'));
			return;
		}else{
			return;
		}
	});

	$('.splashLogo').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		menuTracker.goToStart().then(()=>{
			$('.cardContainer').html('');
			menuTracker.current().data.mode = 'home';
			retrieveQuizzes().then(()=>{
				$('#containerR').load('./html/home_createSection.html',()=>{
					loadEvents();
				});
			});
		});
	}).on('mouseenter',(event)=>{
		$(event.currentTarget).addClass('scale-120').css({
			'transition':`all 0.5s`,
		});
	}).on('mouseleave',(event)=>{
		$(event.currentTarget).removeClass('scale-120').css({
			'transition':`all 0.5s`,
		});
	});
	

	$('#profileOptionMyQuizzes').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		menuTracker.goToStart().then(()=>{
			$('.cardContainer').html('');
			menuTracker.current().data.mode = 'home';
			retrieveMyQuizzes().then(()=>{
				$('#containerR').load('./html/home_createSection.html',()=>{
					loadEvents();
				});
			});
		});
		/*transitionTo('#containerM',()=>{
			$('#containerM').html('');
			retrieveMyQuizzes();
			$('#containerR').load('html/home_createSection.html',function(res){
				
			});
		});*/
		
	});
	$('#profileOptionAllQuizzes').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		menuTracker.goToStart().then(()=>{
			$('.cardContainer').html('');
			menuTracker.current().data.mode = 'home';
			retrieveQuizzes().then(()=>{
				$('#containerR').load('./html/home_createSection.html',()=>{
					loadEvents();
				});
			});
		});
		/*transitionTo('#containerM',()=>{
			$('#containerM').html('');
			retrieveQuizzes();
			$('#containerR').load('html/home_createSection.html',function(res){
				
			});
		});*/
	});

	$('#profileOptionMyProfile').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		showUserDetail(localStorage.getItem('JBQ_userId'));
		/*transitionTo('#containerM',()=>{
			$('#containerM').html('');
			showUserDetail(localStorage.getItem('JBQ_userId'));
		});*/
	});

	$('#profileOptionAllFeed').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		homeFeed(0);
		// easyPopUpBox('Feature Not yet Implemented. Might be fixed by 12 November...?');
	});
	$('#profileOptionMyFeed').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		homeFeed(1);
		// easyPopUpBox('Feature Not yet Implemented. Might be fixed by 12 November...?');
	});
	

	$('.formRadioBox').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		let _parent = $(event.currentTarget).parent();
		let radioBtn = $(_parent).children('.formRadioBtn')[0] as HTMLInputElement;
		radioBtn.checked = true;
	});
	$('.formCheckBox').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		let _parent = $(event.currentTarget).parent();
		let checkBtn = $(_parent).children('.formCheckBtn')[0] as HTMLInputElement;
		checkBtn.checked = !checkBtn.checked;
	});

	$('.dropImage').on('drag dragstart dragend dragover dragenter dragleave', (event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
	}).on('dragenter', (event)=>{
		$(event.currentTarget).css('border-color','var(--cI)');

	}).on('dragleave dragend drop',(event)=>{
		event.preventDefault();
		$(event.currentTarget).css('border-color','var(--c4)');
	});

	$('.dropImage').on('drop', (event)=>{
		event.preventDefault();
		event.stopPropagation();
		let ffiles : File[] = []; let errorInFile = false;
		let thisForm = $(event.currentTarget).parents('form')[0];
		if (event.originalEvent.dataTransfer.items) {
			for (let i = 0; i < 1; i++) {
				if (event.originalEvent.dataTransfer.items[i].kind === 'file') {
					let file = event.originalEvent.dataTransfer.items[i].getAsFile();
					if(!file.type.startsWith('image/')){
						errorInFile = true;
						break;
					}
					ffiles.push(file);
				}
			}
		}else{
			for (let i = 0; i < 1; i++) {
				let file = event.originalEvent.dataTransfer.files[i];
				if(!file.type.startsWith('image/')){
					errorInFile = true;
					break;
				}
	    		ffiles.push(file);
	    	}
		}
		if(errorInFile){
			console.log("File was not supported! Please upload an image!");
			return;
		}
		else if(ffiles.length>0){
			let out = ffiles[0].name +" selected";
			$(event.currentTarget).css(`background-image`,`url('${URL.createObjectURL(ffiles[0])}')`);
			thisForm.files = ffiles;
			console.log(thisForm.files);
			// console.log(thisForm);
		}
	}).on('click',(event)=>{
		var parentElem = $(event.currentTarget).parent();

		$(parentElem).find('.dropImageFile').trigger('click');
	});

	$('.dropImageFile').on('change',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		let ffiles : File[] = []; let errorInFile = false;
		let thisForm = $(event.currentTarget).parents('form')[0];
		let thisElem = $(thisForm).find('.dropImage')[0];

		let currElem = event.currentTarget as HTMLInputElement;

		if(currElem.files){
			for (let i = 0; i < 1; i++) {
				let file = currElem.files[i];
				if(!file.type.startsWith('image/')){
					errorInFile = true;
					break;
				}
    			ffiles.push(file);
    		}
		}
		if(errorInFile){
			console.log("File was not supported! Please upload an image!");
			return;
		}
		else if(ffiles.length>0){
			let out = ffiles[0].name +" selected";
			$(thisElem).css(`background-image`,`url('${URL.createObjectURL(ffiles[0])}')`);
			thisForm.files = ffiles;
			console.log(thisForm.files);
		}
	});

	$('.dropAudio').on('drop', (event)=>{
		event.preventDefault();
		event.stopPropagation();
		let ffiles : File[] = []; let errorInFile = false;
		let thisForm = $(event.currentTarget).parents('form')[0];
		if (event.originalEvent.dataTransfer.items) {
			for (let i = 0; i < 1; i++) {
				if (event.originalEvent.dataTransfer.items[i].kind === 'file') {
					let file = event.originalEvent.dataTransfer.items[i].getAsFile();
					if(!file.type.startsWith('audio/')){
						errorInFile = true;
						break;
					}
					ffiles.push(file);
				}
			}
		}else{
			for (let i = 0; i < 1; i++) {
				let file = event.originalEvent.dataTransfer.files[i];
				if(!file.type.startsWith('audio/')){
					errorInFile = true;
					break;
				}
	    		ffiles.push(file);
	    	}
		}
		if(errorInFile){
			easyPopUpBox("File was not supported! Please upload an audio!");
			return;
		}
		else if(ffiles.length>0){
			let out = ffiles[0].name +" selected";
			thisForm.files = ffiles;
			console.log(thisForm.files);
			// console.log(thisForm);
		}
	}).on('click',(event)=>{
		var parentElem = $(event.currentTarget).parent();

		$(parentElem).find('.dropSongFile').trigger('click');
	});

	$('.dropSongFile').on('change',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		let ffiles : File[] = []; let errorInFile = false;
		let thisForm = $(event.currentTarget).parents('form')[0];
		let thisElem = $(thisForm).find('.dropAudio')[0];

		let currElem = event.currentTarget as HTMLInputElement;

		if(currElem.files){
			for (let i = 0; i < 1; i++) {
				let file = currElem.files[i];
				if(!file.type.startsWith('audio/')){
					errorInFile = true;
					break;
				}
    			ffiles.push(file);
    		}
		}
		if(errorInFile){
			easyPopUpBox("File was not supported! Please upload an audio!");
			return;
		}
		else if(ffiles.length>0){
			let out = ffiles[0].name +" selected";
			thisForm.files = ffiles;
			console.log(thisForm.files);
		}
	});


	$('div.hashtagAreaDiv').on('click',onHashtagAreaFocus);

	function onHashtagAreaFocus(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var thisElem = event.currentTarget;
		console.log('onfocusin');
		var ttags = $(thisElem).attr('data-tags');
		try {
			ttags = JSON.parse(ttags).join(', ');
		}catch(e){
			// console.log(e);
			ttags = "";
		}
		var textArea = $('<textarea>',{class:'formTextarea hashtagAreaTextArea form-control w-100 h-100'})
		.val(ttags).attr({
			'placeholder':'#hashtags, #seperated, #by, #commas, #no need to worry about, #spacing or adding a sharp symbol',
			'maxlength':`200`,
		});
		$(textArea).on('focusout',onHashtagAreaFocusOut);
		$(thisElem).replaceWith(textArea);
		textArea[0].focus();
	}
	function onHashtagAreaFocusOut(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		console.log('onfocusout');
		let thisElem = event.currentTarget;
		let hashtagArea = $('<div>',{class:'hashtagAreaDiv w-100 h-100', id:"quizHashtags"})
		.attr('name','hashtags')[0];

		let thisForm = $(thisElem).parents('.createQuizForm')[0];
		let initText = String(thisElem.value);
		initText = initText.replaceAll('&#160;','');
		initText = initText.replaceAll('&nbsp;','');
		let ttags = initText.split(',');
		let properTags = [];
		for(let ttag of ttags){
			if(ttag && ttag!=""){
				let tagElem = $('<div>',{class:'hashtagAreaTag'}).text(`${String(ttag).trim()}`)
				.prepend(
					$('<i>',{class:'fab fa-slack-hash'})
				);
				properTags.push(String(ttag).trim());
				$(hashtagArea).append(tagElem);
			}
		}
		$(hashtagArea).attr('data-tags',JSON.stringify(properTags));
		// console.log(properTags);
		thisForm.dataset.tags = JSON.stringify(properTags);
		console.log(thisForm.dataset.tags);

		if(properTags.length<1){
			$(hashtagArea).text('#hashtags, #seperated, #by, #commas, #no need to worry about, #spacing or adding a sharp symbol');
		}
		$(hashtagArea).on('click',onHashtagAreaFocus);
		$(thisElem).replaceWith(hashtagArea);
	}

	
	$('.thiccBtn').on('mouseenter',(event)=>{
		var quizBtnText = $(event.currentTarget).find('.thiccBtnText');
		// console.log('bingus');
		if($(quizBtnText).hasClass('font-md-0')){
			$(quizBtnText).removeClass('font-md-0');
		}
	});
	$('.thiccBtn').on('mouseleave',(event)=>{
		var quizBtnText = $(event.currentTarget).find('.thiccBtnText');
		// console.log('bignus');
		if(!$(quizBtnText).hasClass('font-md-0')){
			$(quizBtnText).addClass('font-md-0');
		}
	});

	$('.pfpPlayButton').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var pfp = event.currentTarget;
		if(!songIsPlay){
			songIsPlay = true;
			$(pfp).find('i').attr('class',`fas fa-pause c4-txt`);
			console.log('PLAYED');
			conductor.playOn();
		}else{
			$(pfp).find('i').attr('class',`fas fa-play c4-txt`);
			console.log('PAUSED');
			conductor.pause();
			songIsPlay = false;
		}
	});
	$('.pfp').on('barHit',(event:any)=>{
		let e = event as CustomEvent;

		var pfp = e.currentTarget;
		var animBox = anime({
			targets: [pfp],
			translateY: ['1','+=10'],
			duration: e.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	if(conductor){
		conductor.connectElements($('.formBtn').toArray());
		conductor.connectElements($('.clickContainer').toArray());
	}
	$('.clickContainer').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;

		var cont = e.currentTarget;
		var animBox = anime({
			targets: [cont],
			translateY: ['1','+=7'],
			duration: e.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('.formBtn').on('stepHit',(event:any)=>{
		let e = event as CustomEvent;

		var btn = e.currentTarget;
		var currStep = e.detail.step;
		if(currStep%8==0){
			var animBtn = anime({
				targets: [btn],
				scale: ['1','1.225'],
				duration: e.detail.stepCrotchet*1000,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
		
	});

	$('#userMenuBtnEdit').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var _userData = JSON.parse($('.userMenuContainer .userCard').attr('data-user-data'));
		userEditSect(_userData);
	});
	

	$('.creationSectionBtn').on('click', (event)=>{
		console.log('goback!');
		$('#containerM .creationSectionContainer').remove();
		goToMainMenu();
	});

	$('#createListSectionBtn').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		createListSect();
	});

	$('#createQuizSectionBtn').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		createQuizSect();
	});
	
	$('.removeAnswerBtn').on('click',(event)=>{
		var answerDiv = $(event.currentTarget).parent();
		$(answerDiv).remove();
	});
	$('#addSongSectionBtn').on('click',(event)=>{
		console.log('addSongSection!');
		$('#containerM').load('html/home_addSong.html',(e)=>{
			($('.addSongForm')[0] as HTMLFormElement).files = [];
			if(conductor){
				conductor.connectElements($('.formBtn').toArray());
			}
			loadEvents();
		});
	});

	$('.inputNumBox').on('focusout',(event)=>{
		let currElem = event.currentTarget as HTMLInputElement;
		
		var val = Number(currElem.value);
		if(!val || isNaN(val))
			currElem.value = currElem.placeholder;
		else if(val > Number(currElem.max))
			currElem.value = currElem.max;
		else if(val < Number(currElem.min))
			currElem.value = currElem.min;
	});
	/*$('#containerL').click(function(event) {
		// $('#containerL').load('./html/home_profile.html');
	});*/
	$('.createForm').on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
		event.preventDefault();
	}).on('dragover dragenter', function(event) {
		event.preventDefault();
		$('#dropArea p').html("where are we droppin boys?");
	}).on('dragleave dragend drop',(event)=>{
		$('#dropArea p').html("Drag one or more images to this Drop Site ...!");
	});
	$('.hashtagArea').on('focusout',(event)=>{
		var hashtagArea = event.currentTarget as HTMLTextAreaElement;
		hashtagArea.value = hashtagArea.innerText;
		var theForm = $(event.currentTarget).parents('.createQuizForm')[0] as HTMLFormElement;
		var initHTML = String(hashtagArea.innerHTML);
		initHTML = initHTML.replaceAll('&#160;','');
		initHTML = initHTML.replaceAll('&nbsp;','');
		var elChilds = Array.from(hashtagArea.children);
		let tags : string[] = [];
		theForm.dataset.tags = JSON.stringify([]);

		elChilds.forEach((elChild : HTMLElement)=>{
			let innerText = elChild.innerText.trim();
			if(innerText && innerText!="")
				tags.push(innerText);
			initHTML = initHTML.replaceAll(elChild.outerHTML,'');
		});

		var ttags = initHTML.split(',');
		initHTML = "";
		ttags.forEach((ttag)=>{
			if(ttag && ttag!="")
				tags.push(ttag.trim());
		});
		tags.forEach((ttag)=>{
			if(ttag && ttag!="")
				initHTML += `<div class="hashtagAreaTag"><i class="fab fa-slack-hash"></i>`+ttag+`</div>`;
		});
		hashtagArea.innerHTML = initHTML+'&#160;';
		theForm.dataset.tags = JSON.stringify(tags);
		console.log(theForm.dataset.tags);
	});
	$('.hashtagArea').on('input',(event)=>{
		var hashtagArea = event.currentTarget;
		hashtagArea.innerHTML = hashtagArea.innerHTML.replaceAll('</div>',', ');
		hashtagArea.innerHTML = hashtagArea.innerHTML.replaceAll('<div class="hashtagAreaTag"><i class="fab fa-slack-hash"></i>','');
		hashtagArea.innerHTML = hashtagArea.innerHTML.replaceAll('<div class="hashtagAreaTag">',' ');
		setCaret(hashtagArea);
	});
	function setCaret(el) {
	    // var el = document.getElementById("editable")
	    var range = document.createRange();
	    var sel = window.getSelection();
	    var latestChild = el.childNodes[el.childNodes.length-1];
	    if(latestChild){
	    	range.setStart(latestChild, latestChild.length);
	    }
	    else{
	    	range.setStart(el,0);
	    }
	    range.collapse(true);
	    
	    sel.removeAllRanges();
	    sel.addRange(range);

	}
	function resetFilesInForm(form : HTMLFormElement){
		let theForm = form;
		if(!form) theForm = $('.createForm')[0] as HTMLFormElement;
		theForm.files = [];
		$('#dropArea p').html("Drag one or more images to this Drop Site ...!");
		$('#dropBtn').css('display','none');
	}
	$('.createForm').on('load', (event)=>{
		var form = event.currentTarget as HTMLFormElement;
		resetFilesInForm(form);
	});
	$('.removeFileBtn').on('click',(event)=>{
		var btn = event.currentTarget as HTMLInputElement;
		var form = btn.form;
		resetFilesInForm(form);
	});
	
	/*$('.createQuizForm').on('drop', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var ffiles = []; var errorInFile = false;
		var thisForm = event.currentTarget;
		if (event.originalEvent.dataTransfer.items) {
			
			for (var i = 0; i < 1; i++) {
		    	// If dropped items aren't files, reject them
				if (event.originalEvent.dataTransfer.items[i].kind === 'file') {
					var file = event.originalEvent.dataTransfer.items[i].getAsFile();
					if(!file.type.startsWith('image/')){
						errorInFile = true;
						break;
					}
					ffiles.push(file);
				}
			}
		}else{
			for (var i = 0; i < 1; i++) {
				var file = event.originalEvent.dataTransfer.files[i];
				if(!file.type.startsWith('image/')){
					errorInFile = true;
					break;
				}
	    		ffiles.push(file);
	    	}
		}
		if(errorInFile){
			$('#dropArea p').html("File was not supported! Please upload an image!");
			return;
		}
		else if(ffiles.length>0){
			var out = ffiles[0].name +" selected";
	    	$('#dropArea p').html(out);
			$('#dropBtn').css('display','inline-block');
			thisForm.files = ffiles;
			console.log(thisForm.files);
		}
		
	});*/
	$('.addSongForm').on('drop', (event)=>{
		event.preventDefault();
		event.stopPropagation();
		let thisForm = event.currentTarget as HTMLFormElement;
		let ffiles : File[] = []; let errorInFile = false;
		if (event.originalEvent.dataTransfer.items) {
			for (let i = 0; i < 1; i++) {
		    	// If dropped items aren't files, reject them
				if (event.originalEvent.dataTransfer.items[i].kind === 'file') {
					let file = event.originalEvent.dataTransfer.items[i].getAsFile();
					if(!file.type.startsWith('audio/')){
						errorInFile = true;
						break;
					}
					ffiles.push(file);
				}
			}
		}else{
			for (let i = 0; i < 1; i++) {
				let file = event.originalEvent.dataTransfer.files[i];
				if(!file.type.startsWith('audio/')){
					errorInFile = true;
					break;
				}
	    		ffiles.push(file);
	    	}
		}
		if(errorInFile){
			$('#dropArea p').html("File was not supported! Please upload an audio!");
			return;
		}
		else if(ffiles.length>0){
			var out = ffiles[0].name +" selected";
	    	$('#dropArea p').html(out);
			$('#dropBtn').css('display','inline-block');
			thisForm.files = ffiles;
			console.log(thisForm.files);
		}
		
	});

	$('#profileOptionLogout').on('click',(event)=>{
		event.preventDefault();
		event.stopPropagation();
		logOut();
		return;
	});

	$('#addSongBtn').on('click', async(event)=>{
		event.preventDefault();
		if((document.getElementsByName('songTitle')[0] as HTMLInputElement).value==""){
			return logg("Song Title is empty!")
		}
		if((document.getElementsByName('songArtist')[0] as HTMLInputElement).value==""){
			return logg("Song Artist is empty!")
		}
		if(!(document.getElementsByName('bpm')[0] as HTMLInputElement).value){
			return logg("BPM is not set!")
		}
		if(!(document.getElementsByName('measure')[0] as HTMLInputElement).value){
			return logg("Measure is not set!")
		}
		var theForm = $('.addSongForm')[0] as HTMLFormElement;
		if('files' in theForm && theForm.files.length < 1){
			return logg("Please add the audio file, it would help for good bops");
		}

		var username = localStorage.getItem('JBQ_username');
		var userID = localStorage.getItem('JBQ_userId');
		var apikey = localStorage.getItem('JBQ_apikey');

		if(!username || !apikey || !userID){
			// window.location.href = "/";
			console.log('No API/Userdata in system');
			return;
		}

		let initFormDat = getFormData('.addSongForm');
		let initFormDatJSON = formDataToJSON(initFormDat) as IJSON;

		console.log(theForm.files);

		// initFormDat.append('userID',userID);

		initFormDatJSON.userID = userID;

		if(theForm.files.length>0){
			var init_blob = theForm.files[0];
			var _blob_name = stringTrimToLength(theForm.files[0].name,32)+hash32(theForm.files[0].name)+'.dat';
			var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
			
			initFormDatJSON.songData = {
				name: _blob.name,
				contents: await getBase64(_blob),
				urls:[],
				type: _blob.type,
				userID:userID,
			};

			initFormDatJSON.songURL = '';

		}else{
			return logg("Error: The file is corrupt or missing");
		}

		// if(theForm.files.length>0){
		// 	var init_blob = theForm.files[0];
		// 	var _blob_name = stringTrimToLength(theForm.files[0].name,32)+hash32(theForm.files[0].name)+'.dat';
		// 	var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
		// 	initFormDat.append('songURL',_blob.name);
		// 	initFormDat.append('file',_blob);
		// }else{
		// 	return logg("Error: The file is corrupt or missing");
		// }

		// var initFormDatJSON = formDataToJSON(initFormDat);

		let songUploadData = {
			key: apikey,
			type: 'file',
			subType: 'upload',
			id: userID,
			data: initFormDatJSON.songData,
		}
		
		initFormDatJSON.songData = null;

		var formDat = {
			key: apikey,
			type: 'song',
			subType: 'create',
			id: userID,
			data: initFormDatJSON
		};

		console.log(initFormDatJSON);

		await fetch('/api',{
			method:'POST', body:JSON.stringify(songUploadData), headers: { 'Content-Type': 'application/json' }
		}).then(async(res)=>{
			let resData = await res.text();
			if(!isJSON(resData)){
				easyPopUpBox('An Error occured uploading quiz files!');
			}
			let data = JSON.parse(resData);

			if(data?.success && data?.data?.id){
				initFormDatJSON.songURL = data.data.id;
			}else{
				return data;
			}

			return await fetch('/api',{
				method:'POST', body:JSON.stringify(formDat), headers: { 'Content-Type': 'application/json' }
			});
		}).then(async(res)=>{

			let resData = await res.text();
			if(!isJSON(resData)){
				logg('An Error occured trying to upload song');
			}
			let data = JSON.parse(resData);
			if('success' in data){
				logg(data.message);
				if(data.success){
					console.log(data.data);
					console.log(data.message);
					
					resetContainerM();
					retrieveQuizzes();
				}else{
					throw data.message;
				}

			}else{
				logg('Invalid response from server');
				console.log(data);
			}

		}).catch((err)=>{
			console.log('uh oh!');
			console.log(err);
		});

	});
}

function homeFeed(_mode = 0){
	let cardCont = $('<div>',{class:'cardContainer feedContainer w-95 h-90 scrollVerticalOn scrollHorizontalOff'}).html(
		$('<div>',{class:'row m-2 w-90 cX-bg'}).append([
			$('<div>',{class:'activityPart col m-2'}).append([
				$('<span>',{class:'p-1 c4-txt'}).text('Loading Activity...')
			])
		])[0]
	);
	let menuCont = $('<div>',{class:'menuContainer menuFeed w-100 h-100 m-0 p-0 scrollVerticalOff scrollHorizontalOff'}).append(
		$('<div>',{class:'menuSearch w-xs-100 h-10 p-1 centerFlexCont'}).append([
			$('<div>',{class:'row mx-2 w-90'}).append([
				$('<div>',{class:'btn formBtn rreturnBtn col-1 p-1 m-1 centerFlexCont rounded'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left m-0 p-0'})
				),
				$('<button>',{class:'btn formBtn col m-2',id:`feedBtnAllFeed`}).text('All Feed'),
				$('<button>',{class:'btn formBtn col m-2',id:`feedBtnMyFeed`}).text('My Feed'),
				$('<button>',{class:'btn formBtn col m-2',id:`feedBtnFollowFeed`}).text('Following'),
			]),
		]),
		$('<hr>',{class:'my-0'}),
		cardCont,
	);
	menuTracker.push({
		element: menuCont,
		data:{
			mode: 'feed',
			cardCont: cardCont,
			menuCont: menuCont,
			feed:{
				mode: _mode,
			}
		},
		onChange:(data)=>{
			$('#containerR').load('./html/home_createSection.html',()=>{
				if(data.mode!='feed'){
					menuTracker.goBack().then(()=>{
						loadEvents();
					});
					return;
				}
				let _promiseFunc = retrieveActivity;
				let _promiseParams = null;
				switch(data.feed.mode){
					case 1:
						_promiseFunc = retrieveActivity;
						_promiseParams = localStorage.getItem('JBQ_userId');
						break;
					case 2:
						_promiseFunc = retrieveFollowerActivity;
						break;
				}
				
				_promiseFunc(_promiseParams).then((res)=>{
					// console.log('MOGONUT');
					console.log(res);
					data.cardCont.html('');
					for(let _act of res){
						addActivityToCont(_act,data.cardCont);
					}
					if(!res.length){
						data.cardCont.append(
							$('<div>',{class:'row m-2 w-90 cX-bg'}).append([
								$('<div>',{class:'activityPart col m-2'}).append([
									$('<span>',{class:'p-1 c4-txt'}).text('No Activity available. Try playing some quizzes or doing something to get noticed!')
								])
							])
						)
					}
					// console.log('COCONUT');
				}).then(()=>{
					processAjaxData(null,`/home?${
						(new URLSearchParams({
							feed: `${data.feed.mode}`
						}).toString())
					}`,{
						html:'',pageTitle:`Home - Feed - Just Bops & Quizzes`
					});
					$(data.menuCont).find('.rreturnBtn').on('click',(event)=>{
						event.preventDefault();event.stopPropagation();
						event.stopImmediatePropagation();
						menuTracker.goBack().then(()=>{
							console.log(menuTracker.current());
							console.log(menuTracker.current().content);
							loadEvents();
						});
					});
					$(data.menuCont).find('#feedBtnAllFeed').on('click',(event)=>{
						event.preventDefault();event.stopPropagation();
						event.stopImmediatePropagation();
						homeFeed(0);
					});
					$(data.menuCont).find('#feedBtnMyFeed').on('click',(event)=>{
						event.preventDefault();event.stopPropagation();
						event.stopImmediatePropagation();
						homeFeed(1);
					});
					$(data.menuCont).find('#feedBtnFollowFeed').on('click',(event)=>{
						event.preventDefault();event.stopPropagation();
						event.stopImmediatePropagation();
						homeFeed(2);
					});
					loadEvents();
				});
			});
			
		}
	});
}

function homeSearch(_query : string){
	let cardCont = $('<div>',{class:'cardContainer resultContainer w-95 h-90 scrollVerticalOn scrollHorizontalOff'});
	let _inputBox = $('<input>',{class:'inputBox col m-2'});
	let menuCont = $('<div>',{class:'menuContainer searchMenu w-100 h-100 m-0 p-0 scrollVerticalOff scrollHorizontalOff'}).append(
		$('<div>',{class:'menuSearch w-xs-100 h-10 p-1 centerFlexCont'}).append([
			$('<div>',{class:'row mx-2 w-90'}).append([
				$('<div>',{class:'btn formBtn rreturnBtn col-1 p-1 m-1 centerFlexCont rounded'}).append(
					$('<i>',{class:'fas fa-chevron-circle-left m-0 p-0'})
				),
				_inputBox, $('<button>',{class:'btn formBtn col-2 m-2'}).text('Search'),
			]),
		]),
		$('<hr>',{class:'my-0'}),
		cardCont,
	);
	menuTracker.push({
		element: menuCont,
		data:{
			mode: 'search',
			cardCont: cardCont,
			menuCont: menuCont,
			searchInput: _inputBox,
			search:{
				query:`${_query}`,
			}
		},
		onChange:(data)=>{
			$('#containerR').load('./html/home_createSection.html',()=>{
				if(data.mode!='search'){
					menuTracker.goBack().then(()=>{
						loadEvents();
					});
					return;
				}
				searchForCriteria( data.search.query ).then((res)=>{
					$(data.cardCont).html('');

					let divArr = [];
					
					for(let _q of res.users){
						if(!_q) continue;
						let _qprefs : IUserDataPrefs = {color:'A',shape:'A'};
						if(isObject(_q.preferences)){
							_qprefs = _q.preferences as IUserDataPrefs;
						}
						let _div = $('<div>',{class:'row p-2 m-2 w-70 h-20 searchOpt activityRoute'}).append([
							$('<div>',{class:`col-4 c${_qprefs.color}-bg c0-txt rounded`})
							.css({
								'background-image':`url('/files/images/${_q.imageURL||`defImage`}')`,
								'background-position':`center`, 'background-size':`cover`,
								'background-repeat':`no-repeat`,
							}),
							$('<div>',{class:`col c${_qprefs.color}-txt font-120`}).text(`${_q.username}`),
							$('<div>',{class:`col-2 mx-2`}).append([
								$('<div>',{class:'userShapeElem m-0'}).css({
									'clip-path':`var(--s${_qprefs.shape})`,
									'background-color':`var(--c${_qprefs.color})`,
									'width':`3rem`, 'height':`3rem`,
								}),
							]),
						]).attr({
							'data-userid':_q.id,
						});
						divArr.push(_div);
					}
					for(let _q of res.quizzes){
						if(!_q) continue;
						let _div = $('<div>',{class:'row p-2 m-2 w-75 searchOpt activityRoute'}).append([
							$('<div>',{class:'col-2 p-1 cI-bg c0-txt rounded text-center'}).text(`Quiz`),
							$('<div>',{class:'col'}).text(`${_q.name}`),
							$('<div>',{class:'col-4'}).text(`by ${_q.username}`),
						]).attr({
							'data-quizid':_q.id,
						});
						divArr.push(_div);
					}
					for(let _q of res.lists){
						if(!_q) continue;
						let _quizzes : string[] = [];
						if(isJSON(_q.quizzes)){
							_quizzes = JSON.parse(_q.quizzes as string); //array
						}
						let _div = $('<div>',{class:'row p-2 m-2 w-90 h-10 searchOpt activityRoute'}).append([
							$('<div>',{class:'col-2 p-1 cI-bg c0-txt rounded text-center'}).text(`Playlist`),
							$('<div>',{class:'col'}).text(`${_q.name}`),
							$('<div>',{class:'col'}).text(`by ${_q.username}`),
							$('<div>',{class:'col cI-bg c0-txt p-1 text-center rounded'}).text(`${_quizzes.length} Quizzes`),
						]).attr({
							'data-listid':_q.id,
						});
						divArr.push(_div);
					}
					if(!divArr.length){
						divArr.push(
							$('<div>',{class:'row m-2 p-2 w-80 searchOpt c4-txt'}).append([
								$('<div>',{class:'col m-2'}).text(
									`${data.search.query?`Looks like we couldn't find what you were looking for. Maybe wait until it exists!`:`The search query is empty. Maybe try searching for a related word?`}`
								)
							])
						);
					}

					$(data.cardCont).append(divArr);
					if(conductor){
						conductor.connectElements($('.searchOpt').toArray());
						$('.searchOpt').on('barHit',(event:any)=>{
							let e = event as CustomEvent;

							let currBar = e.detail.bar;
							if(currBar){
								let x = e.currentTarget;
								let animBox = anime({
									targets: x,
									scale: ['1','1.05'],
									duration: e.detail.stepCrotchet*1000,
									easing: "easeInOutQuad",
									direction: 'alternate',
								});
							}
						});
					}
					
				}).then(()=>{
					$(data.searchInput).val(String(data.search.query));
					processAjaxData(null,`/home?${
						(new URLSearchParams({
							search: `${data.search.query}`
						}).toString())
					}`,{
						html:'',pageTitle:`Home - Search:${data.search.query} - Just Bops & Quizzes`
					});
					$(data.menuCont).find('.rreturnBtn').on('click',(event)=>{
						event.preventDefault();event.stopPropagation();
						event.stopImmediatePropagation();
						menuTracker.goBack().then(()=>{
							console.log(menuTracker.current());
							console.log(menuTracker.current().content);
							loadEvents();
						});
					});
					loadEvents();
				});
			});
			
		}
	});
}

/*function addSongSect(_songData=null){
	var _slid = [
		$('<div>',{class:'sliderContainerA songEditMenu m-3 h-100 w-100'}),
	];
	var _sliderContainer = $('<div>',{class:'sliderContainer mx-3 w-xs-100 h-90'});
	$(_slid[0]).load('html/home_songCreate.html',()=>{
		loadEvents();
		let elemForm = $(_slid[0]).find('.createSongForm')[0];

	});

	$('#containerM').load('html/home_addSong.html',(e)=>{
		$('.addSongForm')[0].files = [];
		if(conductor){
			conductor.connectElements($('.formBtn').toArray());
		}
		loadEvents();
	});
}*/

function createQuizSect(_quizData : IQuizData = null){
	console.log('createQuizSection!');
	var _slid = [
		$('<div>',{class:'sliderContainerA quizEditQuizMenu m-3 h-100 w-100'}),
		$('<div>',{class:'sliderContainerB quizEditQuizQuestions m-3 h-100 w-100'}),
		$('<div>',{class:'sliderContainerC quizEditQuizSong m-3 h-100 w-100'}).append([
			$('<div>',{class:`card my-1 mx-5 quizCard h-85`}).append([
				$('<div>',{class:'card-header m-3 row w-100'}).append([
					$('<div>',{class:'mx-5 font-130 c4-txt w-100'}).text(`Select Song`),
				]),
				$('<div>',{class:'card-body my-1 mx-3 h-60'}).append([
					$('<div>',{class:'choiceSongs list-group'}).append([
						
					]),
				]),
				$('<div>',{class:'card-body my-1 mx-1 h-15'}).append([
					$('<div>',{class:'row m-1 h-50'}).append([
						$('<div>',{class:'col m-1'}).append([
							$('<div>',{class:'btn formBtn reverseBtn thiccBtn'}).append([
								$('<i>',{class:'fas fa-angle-double-left mx-1'}),
								$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Rewind`)
							]),
							$('<div>',{class:'btn formBtn previewBtn thiccBtn'}).append([
								$('<i>',{class:'fas fa-play mx-1'}),
								$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Preview`)
							]),
							$('<div>',{class:'btn formBtn forwardBtn thiccBtn'}).append([
								$('<i>',{class:'fas fa-angle-double-right mx-1'}),
								$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Forward`)
							]),
						]),
					]),
					$('<div>',{class:'row m-1 h-50'}).append([
						$('<div>',{class:'col m-0'}).append([
							$('<div>',{class:'row playBar w-100'}).append([
								$('<div>',{class:'playBar-bar'}).append([
									$('<div>',{class:'playBar-progress cI-bg'}).append([
										$('<div>',{class:'playBar-node cI-bg'})
									]).attr('data-progress','0')
								])
							])
						])
					]),
				]),
				
				$('<div>',{class:'row mx-3 h-10'}).append([
					
					$('<div>',{class:'col-9 my-2 p-1 clickContainer songSelectConfirm'}).append([
						$('<i>',{class:'fas fa-plus-circle mx-2'}),
						$('<span>',{class:''}).text(`Use Selected Song`),
					]),
				]),
			]),
		]),
	];
	let _sliderContainer = $('<div>',{class:'sliderContainer mx-3 w-xs-100 h-90'});
	$(_slid[0]).load('html/home_quizCreate.html',()=>{
		loadEvents();
		let elemForm = $(_slid[0]).children('.createQuizForm')[0] as HTMLFormElement;
		let quizmenuctrl = $(_slid[0]).children('.quizMenuControl')[0];
		elemForm.dataset.tags = JSON.stringify([]);
		elemForm.files = [];
		let tags = [];

		// console.log(elemForm);
		$(_slid[1]).load('html/home_quizCreate_questionEdit.html',()=>{
			loadEvents();
			let elemQuestionForm = $(_slid[1]).children('.createQuestionForm')[0];
			$(_slid[1]).children('.quizMenuControl').remove();
			$('#containerR').load('html/home_quizCreate_quizEdit.html',()=>{
				let sliderContentSlider = setSlidableContent({
					group: _slid,
					container: _sliderContainer,
					leftButton: $('<div>'),
					rightButton: $('<div>'),
					
				});
				let detailSlider = setSlidableContent({
					group: elemForm,
					container: _slid[0],
					leftButton: $('<div>'),
					rightButton: $('<div>'),
				});
				let thisQuizMenuQuestions = setSlidableContent({
					group: elemQuestionForm,
					container: _slid[1],
					leftButton: $('<div>'),
					rightButton: $('<div>'),
				});
				$(_slid[1]).append([
					$('<div>',{class:'moveBtnLeft btn formBtn quizEditMoveBtn'}).append($('<i>',{class:'fas fa-caret-square-left'})),
					$('<div>',{class:'moveBtnRight btn formBtn quizEditMoveBtn'}).append($('<i>',{class:'fas fa-caret-square-right'})),
				])
				
				$(_slid[1]).append([quizmenuctrl]);
				$(quizmenuctrl).addClass('local').css({
					position: 'absolute',
				    bottom: '1em',
				    left: '25%',
				});
				var defaultQuestionElem = $(elemQuestionForm).clone();
				var defaultAnswerDiv = $($(elemQuestionForm).find('.answerDiv')[0]).clone();
				var defaultSongDiv = $('<label>',{class:'row list-group-item choiceSong'}).append([
					$('<div>',{class:'col-4 choiceItemArtist'}),
					$('<div>',{class:'col choiceItemTitle'}),
					$('<div>',{class:'col-1 formRadioContainer'}).append([
						$('<input>',{class:'formRadioBtn'}).attr({
							'type':`radio`, 'name':`chooseSong`,
						}),
						$('<div>',{class:'formRadioBox'}),
					]),
				]).attr({'data-songid':''});
				$(elemQuestionForm).remove();
				thisQuizMenuQuestions.group.pop();

				if(_quizData){

					$(_slid[0]).find('.quizName').val(_quizData.name);
					$(_slid[0]).find('.quizDesc').val(_quizData.description);
					($(_slid[0]).find('.quizPassingGrade')[0] as HTMLInputElement).value = String(_quizData.passingGrade);
					$(_slid[0]).find('.quizSongChoice').attr({
						'data-songid':`${_quizData.songID}`
					});
					
					if(_quizData.imageURL){
						getFileBlob(`/files/images/${_quizData.imageURL}`,'image/*',(_url,_blob,_bytes)=>{
							$(_slid[0]).find('.quizFormImage').css({
								'background-image':`url('${_url}')`
							});
							($(_slid[0]).find('.createQuizForm')[0] as HTMLFormElement).files = [new File([_blob], hash32(`${_url}${randomString(32)}`), {type:'image/*'})];
						});
					}
					if(_quizData.hashtags && isJSON(_quizData.hashtags)){
						var _quizHashtags : string[] = JSON.parse(_quizData.hashtags as string); //array
						var hashtagArea = $(_slid[0]).find('.hashtagAreaDiv');
						$(hashtagArea).html('');
						// .attr('name','hashtags')[0];
						var thisForm = $(_slid[0]).find('.createQuizForm')[0];
						var initText = String(_quizHashtags.join(','));
						initText = initText.replaceAll('&#160;','');
						initText = initText.replaceAll('&nbsp;','');
						var ttags = initText.split(',');
						var properTags : string[] = [];
						for(var ttag of ttags){
							if(ttag && ttag!=""){
								var tagElem = $('<div>',{class:'hashtagAreaTag'}).text(`${String(ttag).trim()}`)
								.prepend(
									$('<i>',{class:'fab fa-slack-hash'})
								);
								properTags.push(String(ttag).trim());
								$(hashtagArea).append(tagElem);
							}
						}
						$(hashtagArea).attr('data-tags',JSON.stringify(properTags));
						// console.log(properTags);
						thisForm.dataset.tags = JSON.stringify(properTags);
						if(properTags.length<1){
							$(hashtagArea).text('#hashtags, #seperated, #by, #commas, #no need to worry about, #spacing or adding a sharp symbol');
						}
						// $(hashtagArea).on('click',onHashtagAreaFocus);
					}
					if(_quizData.questions && isJSON(_quizData.questions)){
						var _quizQuestions : IQuizQuestionData[] = JSON.parse(_quizData.questions as string); //array
						for(let _question of _quizQuestions){
							_addQuestion(_question);
						}
						sliderContentSlider.setContentIndex(0);
						thisQuizMenuQuestions.setContentIndex(0);
						function _addQuestion(_questionData : IQuizQuestionData){
							var newQuestion = $(defaultQuestionElem).clone();
							$(_slid[1]).append(newQuestion);
							thisQuizMenuQuestions.group.push(newQuestion[0]);
							thisQuizMenuQuestions.setContentPositions();
							thisQuizMenuQuestions.setContentIndex(thisQuizMenuQuestions.group.length-1);
							// sliderContentSlider.setContentIndex(1);
							$(newQuestion).find('.answerDivContainer').html('');
							for(let _answer of _questionData.answers){
								_addAnswer($(newQuestion).find('.answerDivContainer'),_answer);
							}
							$(newQuestion).find('.questionName').val(_questionData.question);
							getFileBlob(`/files/images/${_questionData.imageURL}`,'image/*',(_url,_blob,_bytes)=>{
								$(newQuestion).find('.questionFormImage').css({
									'background-image':`url('${_url}')`
								});
								($(newQuestion)[0] as HTMLFormElement).files = [
									new File([_blob], hash32(`${_url}${randomString(32)}`), {type:'image/*'})
								];
							});
							loadEvents();
						}
						function _addAnswer(answerDivCont,_answerData){
							var newAnswer = $(defaultAnswerDiv).clone();
							// var answerDivCont = $(quizMenuQuestions.currentContent()).find('.answerDivContainer');
							$(answerDivCont).append(newAnswer);
							$(newAnswer).find('.answerName').val(_answerData.answer);
							($(newAnswer).find('.answerCorrect')[0] as HTMLInputElement).checked = _answerData.correct;
							loadEvents();
						}
					}
				}

				menuTracker.push({
					element:_sliderContainer,
					data: {
						sliderContentSlider: sliderContentSlider,
						elemForm: elemForm,
						quizMenuQuestions: thisQuizMenuQuestions,
						detailSlider: detailSlider,
						defaultAnswerDiv: defaultAnswerDiv,
						defaultQuestionElem: defaultQuestionElem,
						defaultSongDiv: defaultSongDiv,
						_quizData: _quizData||null,
						isPlaying:false,
						currentlyPlaying:null,
					},
					onChange:(data)=>{
						$('#containerR').load('html/home_quizCreate_quizEdit.html',()=>{
							if(conductor){
								conductor.connectElements($('.formBtn').toArray());
							}

							myHandler({
								type:'song',subType:'get',data:{
									id: $(data.elemForm).find('.quizSongChoice').attr('data-songid')
								}
							}).then((sres)=>{
								if(sres?.success && sres.data){
									let _song = sres.data as ISongData;
									$(data.elemForm).find('.quizSongChoice').text(`${_song.author} - ${_song.title}`);
								}else{
									$(data.elemForm).find('.quizSongChoice').text(`Default Song`);
								}
							});

							$(_slid[1].children('.quizEditMoveBtn.moveBtnLeft')).on('click',(event)=>{
								data.quizMenuQuestions.moveContentBy(-1);
							});
							$(_slid[1].children('.quizEditMoveBtn.moveBtnRight')).on('click',(event)=>{
								data.quizMenuQuestions.moveContentBy(1);
							});

							$('#quizEditEditDetails').on('click',(event)=>{
								data.sliderContentSlider.setContentIndex(0);
							});
							$('#quizEditEditQuestions').on('click',(event)=>{
								data.sliderContentSlider.setContentIndex(1);
							});
							$('#quizEditExit').on('click',(event)=>{
								data.sliderContentSlider.setContentIndex(0);
							});
							$('#quizEditAddSong').on('click',(event:any)=>{
								enterSongSelect(event);
							});
							$('.songSelectConfirm').on('click',(event:any)=>{
								selectSongSelect(event);
							});
							$('.previewBtn').on('click',(event:any)=>{
								previewSongSelect(event);
							});
							$('.rewindBtn').on('click',(event:any)=>{
								if(conductor && data.isPlaying){
									conductor.setBeat(conductor.currBeat-10);
								}
							});
							$('.forwardBtn').on('click',(event:any)=>{
								if(conductor && data.isPlaying){
									conductor.setBeat(conductor.currBeat+10);
								}
							});
							
							/*$('.moveBtnLeft').on('click',(event)=>{
								data.detailSlider.moveContentBy(-1);
							});
							$('.moveBtnRight').on('click',(event)=>{
								data.detailSlider.moveContentBy(1);
							});*/

							loadEvents();

							function enterSongSelect(event:Event){
								myHandler({
									type: 'playlist', data: {
										id: '[NOT NULL]',
									}
								}).then((res)=>{
									$('.choiceSongs').html('');
									if(res.success && res.data){
										let arr = res.data as ISongData[];
										for(let _s of arr){
											let tempDiv = $(data.defaultSongDiv).clone();
											$(tempDiv).find('.choiceItemTitle').text(`${_s.title}`);
											$(tempDiv).find('.choiceItemArtist').text(`${_s.author}`);
											$(tempDiv).attr({'data-songid':`${_s.id}`});
											$('.choiceSongs').append(tempDiv);
										}
									}
									data.sliderContentSlider.setContentIndex(2);
									loadEvents();
								});
								
							}
							function selectSongSelect(event:Event){
								let choiceItems = $('.choiceSong').toArray();
								// console.log(choiceItems);
								let chosenSong = null;
								for(let _item of choiceItems){
									console.log(_item);
									console.log(_item);
									if(($(_item).find('.formRadioBtn')[0] as HTMLInputElement).checked==true){
										chosenSong = _item;
									}
								}
								// console.log($(chosenSong)[0]);

								$(data.elemForm).find('.quizSongChoice').attr({
									'data-songid':`${ $(chosenSong).attr('data-songid') }`
								});
								myHandler({
									type:'song',subType:'get',data:{
										id: $(data.elemForm).find('.quizSongChoice').attr('data-songid')
									}
								}).then((sres)=>{
									conductor.stop();
									data.isPlaying = false;
									data.currentlyPlaying = null;
									retrievePlaylist();
									if(sres?.success && sres.data){
										let _song = sres.data as ISongData;
										$(data.elemForm).find('.quizSongChoice').text(`${_song.author} - ${_song.title}`);
									}else{
										$(data.elemForm).find('.quizSongChoice').text(`Default Song`);
										(data.elemForm).find('.quizSongChoice').attr({
											'data-songid':``
										});
									}
									data.sliderContentSlider.setContentIndex(0);
									loadEvents();
								});
								loadEvents();
							}

							function previewSongSelect(event:Event){
								let choiceItems = $('.choiceSong').toArray();
								// console.log(choiceItems);
								let chosenSong = null;
								for(let _item of choiceItems){
									console.log(_item);
									console.log(_item);
									if(($(_item).find('.formRadioBtn')[0] as HTMLInputElement).checked==true){
										chosenSong = _item;
									}
								}
								if(!chosenSong){
									easyPopUpBox('Select a song first and then hit preview to see it through');
									return;
								}

								myHandler({
									type:'song',subType:'get',data:{
										id: $(chosenSong).attr('data-songid')
									}
								}).then((sres)=>{
									if(!conductor) createConductor();
									if(sres?.success && sres.data && conductor){
										let _song = sres.data as ISongData;
										if(_song.id == data?.currentlyPlaying?.id){
											conductor.stop();
											data.isPlaying = false;
											data.currentlyPlaying = null;
											retrievePlaylist();
											return;
										}
										conductor.stop();
										editAudio = new Audio(`/files/songs/${_song.songURL || 'defAudio'}`);
										conductor.changeStats(_song.bpm,_song.measure);
										conductor.connectAudioObject(editAudio);
										conductor.playOn();
										data.isPlaying = true;
										data.currentlyPlaying = _song;
									}
									loadEvents();
								});
								loadEvents();
								
							}

							function exitQuizEdit(event:Event){
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();

								if(data.quizMenuQuestions.group.length>0){
									displayPopUpBox({
										messageText:`Cancel quiz creation and return to menu? Quiz will be not be created or edited if it's not saved.`,
										acceptText:'Return to Main Menu', cancelText:'Return to Quiz Creation',
										onAccept: function(){
											/*$('#containerM').html('');
											$('#containerR').load('html/home_createSection.html',function(res){
												goToMainMenu();
											});*/
											menuTracker.goBack().then(()=>{
												console.log(menuTracker.current());
												console.log(menuTracker.current().content);
												loadEvents();
											});
											console.log('Accepted');
										},
										onCancel: function(){
											console.log('Cancelled');
										}
									});
								}else{
									$('#containerM').html('');
									$('#containerR').load('html/home_createSection.html',function(res){
										menuTracker.goBack().then(()=>{
											console.log(menuTracker.current());
											console.log(menuTracker.current().content);
											loadEvents();
										});
									});
									loadEvents();
								}
							}
							function addAnswerToCurrentQuestion(event:Event){
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								var newAnswer = $(data.defaultAnswerDiv).clone();
								var answerDivContainer = $(data.quizMenuQuestions.currentContent()).find('.answerDivContainer');
								$(answerDivContainer).append(newAnswer);
								loadEvents();
							}
							$('.answerAdd').on('click',addAnswerToCurrentQuestion);
							$('#quizEditExit').on('click',function(event:any){
								exitQuizEdit(event);
							});
							$('#quizEditBtnCancel').on('click',function(event:any){
								exitQuizEdit(event);
							});

							$('#quizEditSave').on('click',function(event){
								displayPopUpBox({
									messageText: 'Save changes?',
									acceptText: 'Save', cancelText: 'Return',
									onAccept:()=>{
										quizEditSave(event);
									},
									onCancel:()=>{

									}
								});
							});
							async function quizEditSave(event){
								event.preventDefault();
								if(!$('.quizName').val()){
									return easyPopUpBox("Quiz Name is empty!")
								}
								if(!$('.quizDesc').val()){
									return easyPopUpBox("Description is empty!")
								}
								var theForm = $('.createQuizForm')[0] as HTMLFormElement;
								// console.log(theForm);
								
								let tags = JSON.parse(theForm.dataset.tags);
								console.log(tags);
								console.log(theForm.files);
								// return;
								if(!tags || !tags.length){
									console.log(theForm.dataset.tags);
									return easyPopUpBox("Please add some tags, it would help for finding your quiz");
								}
								// return easyPopUpBox('JUST TESTING, IF U SEE THIS YOU LOST THE GAME');

								var username = localStorage.getItem('JBQ_username');
								var userID = localStorage.getItem('JBQ_userId');
								var apikey = localStorage.getItem('JBQ_apikey');

								if(!username || !apikey || !userID){
									// window.location.href = "/";
									console.log('No API/Userdata in system');
									return;
								}
								var tagData = JSON.stringify(tags);


								var initFormDat = getFormData('.createQuizForm');

								let initFormDatJSON = formDataToJSON(initFormDat) as IJSON;

								initFormDatJSON.qname = $('.quizName').val();
								initFormDatJSON.desc = $('.quizDesc').val();
								initFormDatJSON.userID = userID;
								initFormDatJSON.songID = $(data.elemForm).find('.quizSongChoice').attr('data-songid');
								initFormDatJSON.hashtags = tagData;

								if(theForm.files.length>0){
									var init_blob = theForm.files[0];
									var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
									var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
									initFormDatJSON.imageURL = '';
									initFormDatJSON.imageData = [{
										name: _blob.name,
										contents: await getBase64(_blob),
										urls: [],
										type: _blob.type,
										userID: userID
									}];
								}else{
									initFormDatJSON.imageURL = ['defImage'];
									console.log("The quiz' image file is corrupt or missing!");
								}

								// initFormDat.append('qname',$('.quizName').val());
								// initFormDat.append('desc',$('.quizDesc').val());
								// initFormDat.append('userID',userID);
								// initFormDat.append('songID',$(data.elemForm).find('.quizSongChoice').attr('data-songid'));
								// initFormDat.append('hashtags',tagData);
								// if(theForm.files.length>0){
								// 	var init_blob = theForm.files[0];
								// 	var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
								// 	var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
								// 	initFormDat.append('imageURL',_blob.name);
								// 	initFormDat.append('file[]',_blob);
								// }else{
								// 	initFormDat.append('imageURL','default.dat');
								// 	console.log("The quiz' image file is corrupt or missing!");
								// }

								var questionsData = [];
							  	for(var q=0;q<data.quizMenuQuestions.group.length;q++){
							  		var _question = data.quizMenuQuestions.group[q];
							  		var _answerDivs = $(_question).find('.answerDiv').toArray();
							  		var answersData = []; var correctExists = false;
							  		for(var a=0;a<_answerDivs.length;a++){
							  			var _answerDiv = _answerDivs[a];
										if(!$(_answerDiv).find('.answerName').val()){
											continue;
										}
							  			var answerData = {
							  				answer: String( $(_answerDiv).find('.answerName').val() ),
							  				correct: ($(_answerDiv).find('.answerCorrect').is(':checked'))?true:false,
							  			};
							  			answersData.push(answerData);
							  			if(answerData.correct) correctExists = true;
							  		}
							  		if(!answersData.length||answersData.length<2){
							  			return easyPopUpBox("There is some questions empty answers (or just one answer?)! Go check on it!");
							  		}
							  		if(!correctExists){
							  			return easyPopUpBox("There is some questions with no set correct answers!");
							  		}
							  		var qForm = $(_question)[0];
							  		var qImgURL = "defImage";

							  		if(qForm.files?.length>0){
										var init_blob = qForm.files[0];
										var _blob_name = `${stringTrimToLength(qForm.files[0].name,32)}${hash32(qForm.files[0].name)}.dat`;
										var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
										// initFormDat.append('file[]',_blob);

										(initFormDatJSON.imageData as JSONType[]).push({
											name: _blob.name,
											contents: await getBase64(_blob),
											urls: [],
											type: _blob.type,
											userID: userID
										});

										qImgURL = '';
										console.log('Inserted img');
									}else{
										(initFormDatJSON.imageData as JSONType[]).push(null);
										console.log('One of the images might be missing or empty');
										// return easyPopUpBox("Error: One of the files is corrupted or missing");
									}
									if(!$(_question).find('.questionName').val()){
										return easyPopUpBox("There is some questions missing their names!");
									}

							  		var questionData = {
							  			answers: answersData,
							  			question: String($(_question).find('.questionName').val()),
							  			imageURL: qImgURL,
							  			type: 'single',
							  		};
							  		questionsData.push(questionData);
							  	}
							  	if(!questionsData.length){
							  		return easyPopUpBox("There are no questions in this quiz yet, don't you want to make some?");
							  	}
							  	// initFormDat.append('questions',JSON.stringify(questionsData));

							  	initFormDatJSON.questions = questionsData;


							  	let initPassGrade = Number(($('.quizPassingGrade')[0] as HTMLInputElement).value);
							  	if((questionsData.length*10) < initPassGrade){
							  		initPassGrade = (questionsData.length * 10);
							  	}
							  	console.log(`PASSING GRADE: ${initPassGrade}`);
							  	// initFormDat.append('passingGrade',initPassGrade);

							  	initFormDatJSON.passingGrade = initPassGrade;

								// var initFormDatJSON = formDataToJSON(initFormDat);
								var formDat : IJSON;
								// var formDat = {
								// 	key: apikey,
								// 	type: 'quiz',
								// 	subType: (!_quizData)?('create'):('edit'),
								// 	id: userID,
								// 	data: initFormDatJSON,
								// };
								if(data._quizData){
									formDat = {
										key: apikey,
										type: 'quiz',
										subType: 'edit',
										id: userID,
										data: {
											id: data._quizData.id,
											options:initFormDatJSON,
										},
									}
								}else{
									formDat = {
										key: apikey,
										type: 'quiz',
										subType: 'create',
										id: userID,
										data: initFormDatJSON,
									}
								}


								let imageUploadData = {
									key: apikey,
									type: 'file',
									subType: 'upload',
									id: userID,
									data: {
										files: initFormDatJSON.imageData, userID:userID,
									},
								};

								initFormDatJSON.imageData = null;

								await fetch('/api',{
									method:'POST', body:JSON.stringify(imageUploadData), headers: { 'Content-Type': 'application/json' }
								}).then(async (res)=>{
									let resData = await res.text();
									if(!isJSON(resData)){
										easyPopUpBox('An Error occured uploading quiz files!');
									}
									let data = JSON.parse(resData);

									if(data?.success && data?.data?.fileData){
										let fileData = data.data.fileData;
										for(let i=0;i<fileData.length;i++){
											if(i==0 && data.fileData[0]){
												initFormDatJSON.imageURL = fileData[0].id || 'defImage';
											}else{
												initFormDatJSON.questionsData[i-1] = fileData[i].id || 'defImage';
											}
										}
									}else{
										easyPopUpBox('An Error occured uploading quiz files!');
									}
								});

								await fetch('/api',{
									method:'POST', body:JSON.stringify(formDat), headers: { 'Content-Type': 'application/json' }
								}).then(async(res)=>{
									let resData = await res.text();
									if(!isJSON(resData)){
										easyPopUpBox('Invalid response from server!');
									}
									let rdata = JSON.parse(resData);

									if(rdata?.success){
										console.log(rdata.data);
										menuTracker.goBack().then(()=>{
											console.log(menuTracker.current());
											console.log(menuTracker.current().content);
											loadEvents();
										});

										easyPopUpBox(rdata.message);

										let _res = rdata.data;

										saveActivity({
											userID: userID,
											type: (!data._quizData)?('Created Quiz'):('Edited Quiz'),
											info: (!data._quizData)?(`${username} created a quiz: ${_res.name}`):(`${username} edited a quiz: ${_res.name}`),
											details:{
												quizID: _res.id,
											}
										},(msg,_dat)=>{
											console.log('Saved Activity');
											console.log(_dat);
										},(msg,_dat)=>{
											console.log('Failed to save the Activity');
											console.log(msg);
											console.log(_dat);
										},(err,msg)=>{
											console.log('Error saving Activity');
											console.log(err);
											console.log(msg);
										});

									}else{
										console.log('uh oh!');
										easyPopUpBox(rdata.message);
									}
								}).catch((err)=>{
									console.log(err);
								})

								
							}

							$('#quizEditEditQuestions').on('click',function(event){
								if(data.quizMenuQuestions.group.length<=0){
									displayPopUpBox({
										messageText:'No Questions exist in this quiz. Would you like to create a new one?',
										acceptText:'Add Question', cancelText:'Return',
										onAccept: function(){
											$('#quizEditAddQuestion').trigger('click');
											console.log('Accepted');
										},
										onCancel: function(){
											data.sliderContentSlider.setContentIndex(0);
											console.log('Cancelled');
										}
									});
								}
							});
							
							$('#quizEditBtnAddAnswer').on('click',function(event){
								var newAnswer = $(data.defaultAnswerDiv).clone();
								var answerDivContainer = $(data.quizMenuQuestions.currentContent()).find('.answerDivContainer');
								$(answerDivContainer).append(newAnswer);
								loadEvents();
							});
							
							$('#quizEditAddQuestion').on('click',function(event){
								var newQuestion = $(data.defaultQuestionElem).clone();
								$('.quizEditQuizQuestions').append(newQuestion);
								data.quizMenuQuestions.group.push(newQuestion);
								data.quizMenuQuestions.setContentPositions();
								setTimeout(()=>{
									data.sliderContentSlider.setContentIndex(1);
									data.quizMenuQuestions.setContentIndex(data.quizMenuQuestions.group.length-1);
									// quizMenuQuestions.setContentIndex(0);
								},250);
								
								data.sliderContentSlider.setContentIndex(1);
								$('.answerAdd').on('click',addAnswerToCurrentQuestion);
								loadEvents();
							});
							$('#quizEditBtnAddQuestion').on('click',function(event){
								var newQuestion = $(defaultQuestionElem).clone();
								var currIndex = data.quizMenuQuestions.currentContentIndex();
								if(data.quizMenuQuestions.group.length>0){
									$(data.quizMenuQuestions.currentContent()).after(newQuestion);
									data.quizMenuQuestions.group.splice(currIndex+1,0,newQuestion);
									data.quizMenuQuestions.setContentPositions();
									setTimeout(()=>{
										data.quizMenuQuestions.setContentIndex(currIndex+1);
									},250);
								}else{
									$('.quizEditQuizQuestions').append(newQuestion);
									data.quizMenuQuestions.group.push(newQuestion);
									data.quizMenuQuestions.setContentPositions();
									setTimeout(()=>{
										data.quizMenuQuestions.setContentIndex(0);
									},250);
								}
								// $('.answerAdd').off('click');
								$('.answerAdd').on('click',addAnswerToCurrentQuestion);
								data.sliderContentSlider.setContentIndex(1);
								loadEvents();
							});
							$('#quizEditBtnRemoveQuestion').on('click',function(event){
								var removedQuestion = data.quizMenuQuestions.currentContent();
								var prevIndex = data.quizMenuQuestions.currentContentIndex()-1;
								data.quizMenuQuestions.group.splice(data.quizMenuQuestions.currentContentIndex(),1);
								data.quizMenuQuestions.setContentIndex(prevIndex);
								$(removedQuestion).remove();
								if(data.quizMenuQuestions.group.length<=0){
									data.sliderContentSlider.setContentIndex(0);
								}
								loadEvents();
							});
						});
					}
				}).then(()=>{

				});
			});
			
			
			
		});
		
		
	});
}

function createListSect(_listData : IPlaylistData = null){
	console.log('createListSection');
	var _slid = [
		$('<div>',{class:'sliderContainerA listEditQuizMenu m-3 h-100 w-100'}),
		$('<div>',{class:'sliderContainerB listEditQuizSearch m-3 h-100 w-100'})
	];
	var _sliderContainer = $('<div>',{class:'sliderContainer mx-3 w-xs-100 h-90'});
	$(_slid[0]).load('html/home_playlistCreate.html',()=>{
		loadEvents();
		var elemForm = $(_slid[0]).find('.createPlaylist')[0] as HTMLFormElement;
		var listMenuCtrl = $(_slid[0]).find('.quizMenuControl')[0];
		elemForm.dataset.tags = JSON.stringify([]);
		let tags : string[] = [];
		elemForm.files = [];
		$(_slid[1]).load('html/home_playlistCreate_addToPlaylist.html',()=>{
			var searchForm = $(_slid[1]).find('.addToPlaylist')[0];
			var searchMenuCtrl = $(_slid[1]).find('.quizMenuControl')[0];
			loadEvents();
			$('#containerR').load('html/home_playlistCreate_listEdit.html',()=>{
				/*$('#containerM').html('');
				$('#containerM').append([
					_sliderContainer,
				]);*/
				// $(_sliderContainer).append(_slid);
				let sliderContentSlider = setSlidableContent({
					group: _slid,
					container: _sliderContainer,
					leftButton: $('<div>'),
					rightButton: $('<div>'),
					/*rightButton: '#listEditBtnAddQuiz',
					leftButton: '#listEditBtnCancelSelection',*/
				});
				// console.log(sliderContentSlider.leftButton);
				
				var listMenuQuizzes = [], listSearchList = [], listAllSearchesList = [];
				$(listMenuCtrl).addClass('local');
				$(searchMenuCtrl).addClass('local');
				
				var defaultQuizElem = $($(elemForm).find('.playListQuiz')[0]).clone();
				var defaultChoiceElem = $($(searchForm).find('.choiceQuiz')[0]).clone();
				$($(elemForm).find('.playListQuiz')[0]).remove();
				$($(searchForm).find('.choiceQuiz')[0]).remove();
				
				if(_listData){
					$(_slid[0]).find('.listName').val(_listData.name);
					$(_slid[0]).find('.listDesc').val(_listData.description);
					
					if(_listData.imageURL){
						getFileBlob(`${_listData.imageURL}`,'image/*',(_url,_blob,_bytes)=>{
							$(_slid[0]).find('.listFormImage').css({
								'background-image':`url('${_url}')`
							});
							($(_slid[0]).find('.createPlaylist')[0] as HTMLFormElement).files = [
								new File([_blob], hash32(`${_url}${randomString(32)}`), {type:'image/*'})
							];
						});
					}
					if(_listData.quizzes){
						let _listQuizzes : string[] = JSON.parse(_listData.quizzes as string); //array
						let quizPromises = _listQuizzes.map((elem,index,arr)=>{
							return myHandler({type:'quiz',subType:'get',data:{
								id:elem
							}},(msg,dat)=>{

							})
							.then((res)=>{
								console.log(res?.success);
								console.log(res?.message);
								if(res?.success){
									console.log(res.data);
									return Promise.resolve(res.data);
								}else{
									return Promise.resolve(null);
								}
							});
						})
						Promise.all(quizPromises).then((_quizzes)=>{
							$(_slid[0]).find('.playListQuizzes').html('');
							console.log('_quizzes');
							console.log(_quizzes);
							// return;
							for(var sQuiz of _quizzes){
								if(!sQuiz)	continue;
								var quizElem = $('<li>',{class:'row list-group-item playListQuiz'}).append([
									$('<div>',{class:'col-1 cI-bg playListItemColor'}).css({
										'background-image':`url('${sQuiz.imageURL}')`,
										'background-size':'cover',
										'background-position':'center',
									}),
									$('<div>',{class:'col playListItemName'}).text(sQuiz.name),
									$('<div>',{class:'col-4 playListItemUser cI-txt'}).text(`by ${sQuiz.username}`),
									$('<button>',{class:'btn formBtn col-2 justify-content-center removeItemBtn'}).html(`<i class="fas fa-minus-square mx-2 c2-txt"></i>`),
								]).attr('data-quizID',sQuiz.id);
								$(_slid[0]).find('.playListQuizzes').append(quizElem);
								listMenuQuizzes.push(sQuiz);
							}
							$(_slid[0]).find('.removeItemBtn').on('click',(event)=>{
								var choiceItem = $(event.currentTarget).parents('.playListQuiz');
								var removeID = choiceItem.attr('data-quizID');
								var removeIndex = findItemObjectIndex(listMenuQuizzes,{id:removeID},['id']);
								if(removeIndex >= 0){
									listMenuQuizzes.splice(removeIndex,1);
								}
								choiceItem.remove();
							});
							loadEvents();
						});
					}
				}

				menuTracker.push({
					element:_sliderContainer,
					data: {
						sliderContentSlider: sliderContentSlider,
						listMenuQuizzes: listMenuQuizzes,
						listSearchList: listSearchList,
						listAllSearchesList: listAllSearchesList,
						defaultQuizElem: defaultQuizElem,
						defaultChoiceElem: defaultChoiceElem,
						_listData:_listData||null,
					},
					onChange:(data)=>{
						$('#containerR').load('html/home_playlistCreate_listEdit.html',()=>{
							
							if(conductor){
								conductor.connectElements($('.formBtn').toArray());
							}

							$('#listEditBtnCancelSelection').on('click',(event)=>{
								data.sliderContentSlider.moveContentBy(-1);
							});
							$('#listEditBtnAddQuiz').on('click',(event)=>{
								data.sliderContentSlider.moveContentBy(1);
							});

							$('.removeItemBtn').on('click',(event)=>{
								var choiceItem = $(event.currentTarget).parents('.playListQuiz');
								var removeID = choiceItem.attr('data-quizID');
								var removeIndex = findItemObjectIndex(data.listMenuQuizzes,{id:removeID},['id']);
								if(removeIndex >= 0){
									data.listMenuQuizzes.splice(removeIndex,1);
								}
								choiceItem.remove();
							});

							$('.playlistAddQuiz').on('click',(event)=>{
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								data.sliderContentSlider.setContentIndex(1);
								fetchQuizzes(event);
							});
							$('#listEditBtnAddQuiz').on('click',(event)=>{
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								data.sliderContentSlider.setContentIndex(1);
								fetchQuizzes(event);
							});

							$('#listEditAddQuizzes').click((event)=>{
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								data.sliderContentSlider.setContentIndex(1);
								fetchQuizzes(event);
							});

							$('.listEditBtn').on('mouseenter',(event)=>{
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								var quizBtnText = $(event.currentTarget).children('.listEditBtnText');
								// console.log('bingus');
								if($(quizBtnText).hasClass('font-md-0')){
									$(quizBtnText).removeClass('font-md-0');
								}
							});
							$('.listEditBtn').on('mouseleave',(event)=>{
								event.preventDefault();
								event.stopPropagation();
								event.stopImmediatePropagation();
								var quizBtnText = $(event.currentTarget).children('.listEditBtnText');
								// console.log('bignus');
								if(!$(quizBtnText).hasClass('font-md-0')){
									$(quizBtnText).addClass('font-md-0');
								}
							});

							$('.playlistSelectAll').click((event)=>{
								selectAllChoices(event);
							});

							$('#listEditBtnClearSelection').click((event)=>{
								clearAllChoices(event);
							});
							$('#listEditBtnAddSelection').click((event)=>{
								addChoices();
								data.sliderContentSlider.setContentIndex(0);
								showSelectedQuizzes();
							});

							$('#listEditBtnClearPlaylist').on('click',(event)=>{
								data.listMenuQuizzes = [];
								$('.playListQuizzes').html('');
							});
							$('#listEditClearPlaylist').on('click',(event)=>{
								data.listMenuQuizzes = [];
								$('.playListQuizzes').html('');
							});

							$('.searchQuizSearchBtn').on('click',(event)=>{
								var parentElem = $(event.currentTarget).parent();
								var searchBar = $(parentElem).find('.searchQuizSearchBar');
								onSearch($(searchBar).val());
							});

							$('#listEditExit').click((event)=>{
								displayPopUpBox({
									messageText:'Cancel Playlist Creation and return to the menu?',
									acceptText:'Return to Main Menu', cancelText: 'Return to List Creation',
									onAccept:()=>{
										/*$('#containerM').html('');
										$('#containerR').load('html/home_createSection.html',function(res){
											goToMainMenu();
										});*/
										menuTracker.goBack().then(()=>{
											console.log(menuTracker.current());
											console.log(menuTracker.current().content);
											loadEvents();
										});
										console.log('Accepted');
									},
									onCancel:()=>{
										return;
									}
								});
							});

							$('#listEditSave').click((event)=>{
								displayPopUpBox({
									messageText: 'Save changes?',
									acceptText: 'Save', cancelText: 'Return',
									onAccept:()=>{
										listEditSave(event);
									},
									onCancel:()=>{

									}
								});
							});

							loadEvents();

							function addChoices(){
								var choiceItems = $('.choiceQuiz').toArray();
								for(let i=0;i<choiceItems.length;i++){
									var _choiceItem = choiceItems[i];
									var choiceBtn = $(_choiceItem).find('.formCheckBtn')[0] as HTMLInputElement;
									if(choiceBtn && choiceBtn.checked){
										hardPush(data.listMenuQuizzes, data.listSearchList[i],['id','name']);
									}
									// console.log(data.listMenuQuizzes);
								}
							}
							function showSelectedQuizzes(){
								$('.playListQuizzes').html('');
								for(let sQuiz of data.listMenuQuizzes){
									var quizElem = $('<li>',{class:'row list-group-item playListQuiz'}).append([
										$('<div>',{class:'col-1 cI-bg playListItemColor'}).css({
											'background-image':`url('${sQuiz.imageURL}')`,
											'background-size':'cover',
											'background-position':'center',
										}),
										$('<div>',{class:'col playListItemName'}).text(sQuiz.name),
										$('<div>',{class:'col-4 playListItemUser cI-txt'}).text(`by ${sQuiz.username}`),
										$('<button>',{class:'btn formBtn col-2 justify-content-center removeItemBtn'}).html(`<i class="fas fa-minus-square mx-2 c2-txt"></i>`),
									]).attr('data-quizID',sQuiz.id).appendTo('.playListQuizzes');
								}
								$('.removeItemBtn').click((event)=>{
									var choiceItem = $(event.currentTarget).parents('.playListQuiz');
									var removeID = choiceItem.attr('data-quizID');
									var removeIndex = findItemObjectIndex(data.listMenuQuizzes,{id:removeID},['id']);
									if(removeIndex >= 0){
										data.listMenuQuizzes.splice(removeIndex,1);
									}
									choiceItem.remove();
								});
								console.log(data.listMenuQuizzes)
							}

							function clearSearch(){
								$('.choiceQuizzes').html('');
							}

							function selectAllChoices(event){
								var choiceItemBtns = $('.formCheckBtn').toArray();
								for(let choiceItemBtn of choiceItemBtns){
									if(choiceItemBtn instanceof HTMLInputElement) choiceItemBtn.checked = true;
								}
							}
							function clearAllChoices(event){
								var choiceItemBtns = $('.formCheckBtn').toArray();
								for(let choiceItemBtn of choiceItemBtns){
									if(choiceItemBtn instanceof HTMLInputElement) choiceItemBtn.checked = false;
								}
							}
							function onSearch(_criteria){
								var _collected = [];
								if(!_criteria){
									showSearchResults(data.listAllSearchesList);
									return;
								}
								var setCriteria = String(_criteria).trim();
								for(let quizz of data.listAllSearchesList){
									var quizName = String(quizz.name).trim();
									var quizUsername = String(quizz.username).trim();
									var quizDesc = String(quizz.description).trim();
									var quizTags = String(JSON.parse(quizz.hashtags).join(' ')).trim();
									if(quizName.includes(setCriteria)){
										_collected.push(quizz);
									}else if(quizDesc.includes(setCriteria)){
										_collected.push(quizz);
									}else if(quizUsername.includes(setCriteria)){
										_collected.push(quizz);
									}else if(quizTags.includes(setCriteria)){
										_collected.push(quizz);
									}
								}
								showSearchResults(_collected);
								loadEvents();
							}
							function showSearchResults(resData){
								data.listSearchList = [];
								clearSearch();
								var quizArr = resData;
								if(!quizArr.length){
									$('.choiceQuizzes').append(
										$('<div>',{class:'row list-group-item'}).text('No Quizzes could be found.')
									);
								}
								for(let quiz of quizArr){
									var choiceItem = $('<li>',{class:'row list-group-item choiceQuiz'}).append([
											$('<div>',{class:'col-1 cI-bg choiceItemColor'}).css({
												'background-image':`url('${quiz.imageURL}')`,
												'background-size':'cover',
												'background-position':'center',
											}),
											$('<div>',{class:'col choiceItemName'}).text(quiz.name),
											$('<div>',{class:'col-4 choiceItemUser cI-txt'}).text(quiz.username),
											$('<div>',{class:'col-1 formCheckContainer'}).append([
													$('<input>').attr({
														type: 'checkbox',
														class: 'formCheckBtn',
														name:'chooseQuiz',
														id:quiz.id
													}),
													$('<div>',{class:'formCheckBox'})
												])
										]).appendTo('.choiceQuizzes');
								}
								data.listSearchList = quizArr;
								console.log(data.listSearchList)
								loadEvents();
							}

							function fetchQuizzes(event){
								var searchCont = $(_slid[1]).find('.choiceQuizzes');

								var username = localStorage.getItem('JBQ_username');
								var userID = localStorage.getItem('JBQ_userId');
								var apikey = localStorage.getItem('JBQ_apikey');

								if(!username || !apikey || !userID){
									window.location.href = "/";
									console.log('No API/Userdata in system');
									return;
								}
								var formDat = {
									key: apikey,
									type: 'quiz',
									subType: 'getAll',
									id: userID,
									data: {
										userID: userID,
									}
								};
								myHandler({
									type:'quiz',subType:'getAll',data:{userID:userID}
								},(msg,_data)=>{
									_data = JSON.parse(JSON.stringify(_data));
									data.listAllSearchesList = _data;
									showSearchResults(_data);
									loadEvents();
								},(msg,_data)=>{
									console.log(_data);
									console.log(msg);
									easyPopUpBox('An error occured trying to retrieve the quizzes');
									$('.choiceQuizzes').append(
										$('<div>',{class:'row'}).text('An Error occured.')
									);
									loadEvents();
								},(msg,err)=>{
									console.log(msg);
									console.log(err);
									$('.choiceQuizzes').append(
										$('<div>',{class:'row'}).text('No Quizzes could be found.')
									);
									loadEvents();
								});
							}

							
							async function listEditSave(event){
								event.preventDefault();
								if(!$('.listName').val()){
									return easyPopUpBox("Playlist Name is empty!")
								}
								if(!$('.listDesc').val()){
									return easyPopUpBox("Description is empty!")
								}

								var theForm = $('.createPlaylist')[0] as HTMLFormElement;

								var username = localStorage.getItem('JBQ_username');
								var userID = localStorage.getItem('JBQ_userId');
								var apikey = localStorage.getItem('JBQ_apikey');

								if(!username || !apikey || !userID){
									// window.location.href = "/";
									console.log('No API/Userdata in system');
									return;
								}
								
								let initFormDat = getFormData('.createPlaylist');
								let initFormDatJSON = formDataToJSON(initFormDat);

								initFormDatJSON.name = $('.listName').val();
								initFormDatJSON.desc = $('.listDesc').val();
								initFormDatJSON.userID = userID;

								if(theForm.files.length>0){
									var init_blob = theForm.files[0];
									var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
									var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
									
									initFormDatJSON.imageURL = '';
									initFormDatJSON.imageData = {
										name: _blob.name,
										contents: await getBase64(_blob),
										urls:[], type: _blob.type,
										userID: userID,
									}

								}else{
									initFormDatJSON.imageData = null;
									return easyPopUpBox("The list' image file is corrupt or missing!");
								}

								// initFormDat.append('name',$('.listName').val());
								// initFormDat.append('desc',$('.listDesc').val());
								// initFormDat.append('userID',userID);
								// if(theForm.files.length>0){
								// 	var init_blob = theForm.files[0];
								// 	var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
								// 	var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
								// 	initFormDat.append('imageURL',_blob.name);
								// 	initFormDat.append('file[]',_blob);
								// }else{
								// 	return easyPopUpBox("The list' image file is corrupt or missing!");
								// }
								var listQuizzes = [];
								for(let sQuiz of data.listMenuQuizzes){
									listQuizzes.push(sQuiz.id);
								}
								if(!listQuizzes.length){
									return easyPopUpBox('There are no quizzes added into this playlist, please add one!');
								}

								initFormDatJSON.quizzes = listQuizzes;

								// initFormDat.append('quizzes',JSON.stringify(listQuizzes));
								
								// var initFormDatJSON = formDataToJSON(initFormDat);
								console.log(listQuizzes);
								// console.log(initFormDat.get('quizzes'));
								// console.log(initFormDatJSON.quizzes);
								// console.log(initFormDatJSON);
								// return;

								var formDat;

								if(data._listData){
									formDat = {
										key: apikey,
										type: 'list',
										subType: 'edit',
										id: userID,
										data: {
											id: data._listData.id,
											options: initFormDatJSON,
										},
									};
								}else{
									formDat = {
										key: apikey,
										type: 'list',
										subType: 'create',
										id: userID,
										data: initFormDatJSON,
									};
								}


								let imageUploadData = {
									key: apikey,
									type: 'file',
									subType: 'upload',
									id: userID,
									data: initFormDatJSON.imageData,
								}
								initFormDatJSON.imageData = null;


								await fetch('/api',{
									method:'POST', body:JSON.stringify(imageUploadData), headers: { 'Content-Type': 'application/json' }
								}).then(async(res)=>{
									let resData = await res.text();
									if(!isJSON(resData)){
										easyPopUpBox('An Error occured uploading list images!');
									}
									let data = JSON.parse(resData);

									if(data?.success && data?.data?.id){
										initFormDatJSON.imageURL = data.data.id || 'defImage';
									}else{
										easyPopUpBox('An Error occured uploading list images!');
									}
								});

								await fetch('/api',{
									method:'POST', body:JSON.stringify(formDat), headers: { 'Content-Type': 'application/json' }
								}).then(async(res)=>{
									let resData = await res.text();
									if(!isJSON(resData)){
										easyPopUpBox('Invalid response from server!');
									}
									let rdata = JSON.parse(resData);

									if(rdata?.success){
										console.log(rdata.data);
										menuTracker.goBack().then(()=>{
											console.log(menuTracker.current());
											console.log(menuTracker.current().content);
											loadEvents();
										});

										easyPopUpBox(rdata.message);

										let _res = rdata.data;

										saveActivity({
											userID: userID,
											type: (!data._listData)?('Created Playlist'):('Edited Playlist'),
											info: (!data._listData)?(`${username} created a playlist: ${_res.name}`):(`${username} edited a playlist: ${_res.name}`),
											details:{
												listID: _res.id,
											}
										},(msg,_dat)=>{
											console.log('Saved Activity');
											console.log(_dat);
										},(msg,_dat)=>{
											console.log('Failed to save the Activity');
											console.log(msg);
											console.log(_dat);
										},(err,msg)=>{
											console.log('Error saving Activity');
											console.log(err);
											console.log(msg);
										});

									}else{
										console.log('uh oh!');
										easyPopUpBox(rdata.message);
									}
								}).catch((err)=>{
									console.log(err);
								});

							}
						});
					}
				}).then(()=>{

				});
			});
			
		});
	});
}

function userEditSect(_userData){
	var _slid = [
		$('<div>',{class:'sliderContainerA userEditQuizMenu m-3 h-100 w-100 h-80'}),
		// $('<div>',{class:'sliderContainerB userEditQuizQuestions m-3 h-100 w-100'})
	];
	var _sliderContainer = $('<div>',{class:'sliderContainer mx-3 w-xs-100 h-80'});
	$(_slid[0]).load('html/home_userEdit.html',()=>{
		var elemForm = $(_slid[0]).find('.userEditForm')[0] as HTMLFormElement;
		var listMenuCtrl = $(_slid[0]).find('.quizMenuControl')[0];
		let tags = [];
		elemForm.tags = JSON.stringify([]);
		elemForm.files = [];
		loadEvents();
		if(_userData){
			$(elemForm).find('.userUsername').val(_userData.username);
			$(elemForm).find('.userFirstname').val(_userData.firstname);
			$(elemForm).find('.userLastname').val(_userData.lastname);
			$(elemForm).find('.userDOB').val(_userData.DOB);
			$(elemForm).find('.userEmail').val(_userData.email);
			$(elemForm).find('.userDesc').val(_userData.description);
			
			if(_userData.imageURL){
				getFileBlob(`${_userData.imageURL}`,'image/*',(_url,_blob,_bytes)=>{
					$(elemForm).find('.userImage').css({
						'background-image':`url('${_url}')`
					});
					elemForm.files = [
						new File([_blob], hash32(`${_url}${randomString(32)}`), {type:'image/*'})
					];
				});
			}
			if(_userData.preferences && isObject(_userData.preferences)){
				var _userPref = _userData.preferences;
				($(elemForm).find(`#userColor${_userPref.color}`)[0] as HTMLInputElement).checked = true;
				($(elemForm).find(`#userShape${_userPref.shape}`)[0] as HTMLInputElement).checked = true;
			}else{
				($(elemForm).find(`#userColorA`)[0] as HTMLInputElement).checked = true;
				($(elemForm).find(`#userShapeA`)[0] as HTMLInputElement).checked = true;
			}
		}
		menuTracker.push({
			element:_sliderContainer,
			data:{
				userData:_userData,
				sliderContainer:_sliderContainer,
				elemForm:elemForm,
				listMenuCtrl:listMenuCtrl,
			},
			onChange:(data)=>{
				$('#containerR').load(`html/home_userEdit_userEdit.html`,()=>{
					var sliderContentSlider = setSlidableContent({
						group: _slid,
						container: _sliderContainer,
						rightButton: $('<div>'),
						leftButton: $('<div>'),
					});

					$('.userColorRadioChoice').on('click',(event)=>{
						// event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
						if(data.userData.id == localStorage.getItem('JBQ_userId')){
							let radioCont = $(event.currentTarget).parents('.formRadioContainer');
							let colorVar = `var(--c${radioCont.attr('data-user-color')})`;
							let colorVarP = `var(--p${radioCont.attr('data-user-color')})`;
							// console.log(colorVar);
							$("body").get(0).style.setProperty("--cI", colorVar);
							$("body").get(0).style.setProperty("--pI", colorVarP);
						}
						
					});
					$('.userShapeRadioChoice').on('click',(event)=>{
						// event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
						if(data.userData.id == localStorage.getItem('JBQ_userId')){
							let radioCont = $(event.currentTarget).parents('.formRadioContainer');
							let shapeVar = `var(--s${radioCont.attr('data-user-color')})`;
							let shapeVarS = `var(--ss${radioCont.attr('data-user-color')})`;
							// console.log(shapeVar);
							$("body").get(0).style.setProperty("--sI", shapeVar);
							$("body").get(0).style.setProperty("--ssI", shapeVarS);
						}
					});

					
					$('#userEditBtnSaveUser').click(function(event){
						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();
						displayPopUpBox({
							messageText: 'Save changes?',
							acceptText: 'Save', cancelText: 'Return',
							onAccept:()=>{
								saveUserEdit(event);
							},
							onCancel:()=>{

							}
						});
					});
					$('#userEditSave').click(function(event){
						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();
						displayPopUpBox({
							messageText: 'Save changes?',
							acceptText: 'Save', cancelText: 'Return',
							onAccept:()=>{
								saveUserEdit(event);
							},
							onCancel:()=>{

							}
						});
					});
					$('#userEditExit').click(function(event){
						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();
						exitUserEdit(event);
					});
					$('#userEditBtnCancelUserEdit').click(function(event){
						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();
						exitUserEdit(event);
					});

					loadEvents();
					function exitUserEdit(event){
						displayPopUpBox({
							messageText:'Exit with unsaved changes?',
							acceptText:'Exit Menu',
							cancelText:'Return to User Edit',
							onAccept:()=>{
								// $('#containerM').html('');
								$('#containerR').load('html/home_createSection.html',function(res){
									menuTracker.goBack().then(()=>{
										console.log(menuTracker.current());
										console.log(menuTracker.current().content);
										loadEvents();
									});
									// goToMainMenu();
								});
								console.log('Accepted');
							},
						});
					}
					async function saveUserEdit(event){
						event.preventDefault();
						
						if(!$('.userUsername').val()){
							return easyPopUpBox("Username is empty!")
						}
						if(!$('.userFirstname').val()){
							return easyPopUpBox("FirstName is empty!")
						}
						if(!$('.userLastname').val()){
							return easyPopUpBox("Lastname is empty!")
						}
						
						var theForm = $('.userEditForm')[0] as HTMLFormElement;

						var username = localStorage.getItem('JBQ_username');
						var userID = localStorage.getItem('JBQ_userId');
						var apikey = localStorage.getItem('JBQ_apikey');

						if(!username || !apikey || !userID){
							console.log('No API/Userdata in system');
							return;
						}
						
						var initFormDat = getFormData('.userEditForm');
						
						let initFormDatJSON = formDataToJSON(initFormDat);

						initFormDatJSON.username = $('.userUsername').val();
						initFormDatJSON.firstname = $('.userFirstname').val();
						initFormDatJSON.lastname = $('.userLastname').val();
						initFormDatJSON.DOB = $('.userDOB').val();
						initFormDatJSON.email = $('.userEmail').val();
						initFormDatJSON.description = $('.userDesc').val();

						// initFormDat.append('username',$('.userUsername').val());
						// initFormDat.append('firstname',$('.userFirstname').val());
						// initFormDat.append('lastname',$('.userLastname').val());
						// initFormDat.append('DOB',$('.userDOB').val());
						// initFormDat.append('email',$('.userEmail').val());
						// initFormDat.append('description',$('.userDesc').val());
						
						var userColorElem = $(`.formRadioContainer .formRadioBtn[type="radio"][name="userColor"]:checked`);
						var userShapeElem = $(`.formRadioContainer .formRadioBtn[type="radio"][name="userShape"]:checked`);

						var _preferences = {
							color: userColorElem.val(),
							shape: userShapeElem.val()
						};

						initFormDatJSON.preferences = (_preferences);
						// initFormDat.append('preferences',JSON.stringify(_preferences));

						if(theForm.files.length>0){
							var init_blob = theForm.files[0];
							var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
							var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
							
							initFormDatJSON.imageData = {
								name: _blob.name,
								contents: await getBase64(_blob),
								urls: [],
								type: _blob.type,
								userID: userID
							};

							initFormDatJSON.imageURL = '';

						}else{
							initFormDatJSON.imageURL = 'defImage';
							initFormDatJSON.imageData = null;
							console.log("User's image file is empty or corrupted");
						}

						// if(theForm.files.length>0){
						// 	var init_blob = theForm.files[0];
						// 	var _blob_name = `${stringTrimToLength(theForm.files[0].name,32)}${hash32(theForm.files[0].name)}.dat`;
						// 	var _blob = new File([init_blob],_blob_name,{type:init_blob.type});
						// 	initFormDat.append('imageURL',_blob.name);
						// 	initFormDat.append('file[]',_blob);
						// }else{
						// 	initFormDat.append('imageURL','defImage');
						// 	console.log("User's image file is empty or corrupted");
						// }

						// var initFormDatJSON = formDataToJSON(initFormDat);

						delete initFormDatJSON.dropImageFile;
						delete initFormDatJSON.userColor;
						delete initFormDatJSON.userShape;

						let imageUploadData = {
							key: apikey,
							type: 'file',
							subType: 'upload',
							id: userID,
							data: initFormDatJSON.imageData,
						};

						initFormDatJSON.imageData = null;

						let formDat : any = {
							key: apikey,
							type: 'user',
							subType: 'edit',
							id: userID,
							data: {
								id: data.userData.id,
								options:initFormDatJSON
							}
						};

						console.log(formDat.data.options);

						async function saveUserEdit_sendData(){
							await fetch('/api',{
								method:'POST', body:JSON.stringify(formDat), headers: { 'Content-Type': 'application/json' }
							}).then(async(res)=>{
								let resData = await res.text();
								if(!isJSON(resData)){
									easyPopUpBox('An Error occured uploading quiz files!');
								}
								let dat = JSON.parse(resData);

								if(!('success' in dat)){
									console.log(data);
									easyPopUpBox('Invalid response from server - could not update User.');
									return;
								}

								if(dat.success){
									if(data.userData.id == localStorage.getItem('JBQ_userId')){
										$('#profileUsername').text(formDat.data.options.username);
										localStorage.setItem('JBQ_username', formDat.data.options.username);
										localStorage.setItem('JBQ_color',`${_preferences.color}`);
										localStorage.setItem('JBQ_shape',`${_preferences.shape}`);
									}
									console.log("SUCCESS");
									
									menuTracker.goBack().then(()=>{
										easyPopUpBox(dat.message);
										console.log(menuTracker.current());
										console.log(menuTracker.current().content);
										loadEvents();
									});
								}else{
									console.log('uh oh!');
									console.log(dat.message);
									easyPopUpBox(dat.message);
								}

							});

							
						}
						async function saveUserEdit_uploadFile(){
							await fetch('/api',{
								method:'POST', body:JSON.stringify(imageUploadData), headers: { 'Content-Type': 'application/json' }
							}).then(async(res)=>{
								let resData = await res.text();
								if(!isJSON(resData)){
									easyPopUpBox('An Error occured uploading user files!');
								}
								let data = JSON.parse(resData);

								if(data?.success && data?.data?.id){
									initFormDatJSON.imageURL = data.data.id;
								}else{
									easyPopUpBox((data.message?data.message:'File Upload failed unexpectedly!'));
								}
							});
						}

						myHandler({
							type:'user',subType:'check',data:{
								username:formDat.data.username
							}
						},async(msg,rdata)=>{
							if(username != formDat.data.username){
								easyPopUpBox('Username exists! Please check for another one!');
								loadEvents();
							}else{
								//change anything besides the username
								await saveUserEdit_sendData();
								await saveUserEdit_uploadFile();
							}
							
						},async(msg,rdata)=>{
							//change everything
							await saveUserEdit_sendData();
							await saveUserEdit_uploadFile();
						},(err,data)=>{
							console.log({err,data});
						});
					
					}
				});
				
			}
		}).then(()=>{

		});

	});
}