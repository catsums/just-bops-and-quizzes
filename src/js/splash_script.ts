///splash_script.js

import $ from "jquery";
import anime from 'animejs';

import { Conductor } from '@catsums/conductorjs';
import {
	docReady, rndInt, hardPush, defectAllFormSubmits,
	formDataToJSON, getFormData, setCookie, getCookie,
	isJSON, isString, isObject, isArray,
} from '@catsums/my';
import * as MyMouse from './myMouse';
import {
	logg, 
} from './mainscript';

// loadHTMLtoObject('#innerL','html/redpage.html');
var songs : ISongData[] = []; 
var songIndex : number; 
var conductor : Conductor; 
var songIsPlay = false;

docReady(loadEvents);

function loadEvents(){
	// createConductor();
	retrievePlaylist();

	function createConductor(){
		conductor = new Conductor();
		conductor.connectElements([
			$('.splashLogo')[0], $('.disclaimer')[0], $('#coolSplashText')[0], $('#myMouse')[0]
		]);
		conductor.connectElements($('.formBtn').toArray());

		conductor.activate();

	}

	$('#myMouse').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var myMouse = e.currentTarget;
		var animBox = anime({
			targets: myMouse,
			translateY: ['1','+=10'],
			duration: e.detail.stepCrotchet*500,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('.splashLogo').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var thisLogo = e.currentTarget;
		var animBox = anime({
			targets: thisLogo,
			scale: ['1','+=0.225'],
			duration: e.detail.stepCrotchet*500,
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
				targets: btn,
				scale: ['1','+=0.225'],
				duration: e.detail.stepCrotchet*500,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
		
	});
	$('.disclaimer').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var obj = e.currentTarget;
		var animBox = anime({
			targets: obj,
			translateY: ['0','+=7'],
			duration: e.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('#coolSplashText').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var obj = e.currentTarget;
		var animBox = anime({
			targets: obj,
			translateY: ['0','+=7'],
			duration: e.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});

	$('.songPlayButton').on('click',onSongTogglePlay);
	$('.splashLogo').on('click',onSongTogglePlay);

	function onSongTogglePlay(event:any){
		let e = event as CustomEvent;
		var btn = $('.songPlayButton')[0];
		if(!songIsPlay){
			btn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
			console.log('PLAYED');
			conductor?.playOn();
			songIsPlay = true;
		}else{
			btn.innerHTML = `<i class="fas fa-play-circle"></i>`;
			console.log('PAUSED');
			conductor?.pause();
			songIsPlay = false;
		}
	}

	$('.scrollUp').on('click',(e)=>{
		$('#containerL')[0].scrollTo({
			top: 0, left: 0, behavior: 'smooth'
		});
		$('.scrollUp').html(``);
		$('.scrollDown').html("Click here for more info");
	});
	$('.scrollDown').on('click',(e)=>{
		$('#containerL')[0].scrollTo({
			top: 1000, left: 0, behavior: 'smooth'
		});
		$('.scrollUp').html("Click here to return to player");
		$('.scrollDown').html("");
	});
	$('.goToSignupBtn').on('click',(e)=>{
		$('#containerR')[0].scrollTo({
			top: 0, left: 0, behavior: 'smooth'
		});
	});
	$('.goToLoginBtn').on('click',(e)=>{
		$('#containerR')[0].scrollTo({
			top: 1000, left: 0, behavior: 'smooth'
		});
	});
	defectAllFormSubmits();

	function playRandomSong() {
		var index = rndInt(0,songs.length-1);
		songIndex = index;
		var currSong : ISongData = songs[index];

		$('.songTitleCol').html(currSong.title);
		$('.songArtistCol').html(currSong.author);

		var audio = $('#conductorAudio')[0] as HTMLAudioElement;

		audio.src = `/files/songs/${currSong.songURL}`;

		if(!conductor) createConductor();

		conductor?.changeStats(currSong.bpm,currSong.measure);
		conductor?.connectAudioObject(audio);
		
	}
	function playDefaultSong() {
		var currSong = {
			title: 'Gizmo',
			author: 'Syn Cole',
			bpm: 124,
			measure: 8,
			songURL: './data/audio/default.dat'
		};

		$('.songTitleCol').text(currSong.title);
		$('.songArtistCol').text(currSong.author);

		var audio = $('#conductorAudio')[0] as HTMLAudioElement;
		audio.src = `${currSong.songURL}`;

		if(!conductor) createConductor();

		conductor?.changeStats(currSong.bpm,currSong.measure);
		conductor?.connectAudioObject(audio);
		// console.log(conductor);
	}

	function retrievePlaylist(){

		var formDat = {
			type: 'playlist',
			data: {
				// id: '[NOT NULL]',
			}
		};

		console.log('retriving playlist...')

		const opts = {
			method: 'POST',
			body: JSON.stringify(formDat),
			headers: { 'Content-Type': 'application/json' }
		}

		fetch('/api',opts).then(async(res)=>{
			let resData = await res.text();
			if(!isJSON(resData)){
				throw resData;
			}

			let data : IResponse = JSON.parse(resData);

			console.log(data);
			if(data && 'success' in data){
				if(data.success){
					if(isString(data.data) && isJSON(data.data)){
						data.data = JSON.parse(data.data);
					}
					console.log(data.data);
					songs = data.data;
					playRandomSong();
				}else{
					//Assume there are no songs
					console.log(data.message);
					playDefaultSong();
				}
			}else{
				logg('Error: something happened to the server');
				throw data;
			}
		}).catch((err)=>{
			console.log('err');
			console.log(err);
		});

	}

	$('.loginRing').click(function(event) {
		if((document.getElementsByName('username')[0] as HTMLInputElement).value==""){
			return logg('Username is Empty! Please insert your username!');
		}
		if((document.getElementsByName('pass')[0] as HTMLInputElement).value==""){
			return logg('Password is Empty!');
		}
		var initFormDat = formDataToJSON(getFormData('#loginForm') as FormData);

		var formDat = {
			type: 'login',
			data: initFormDat
		};

		console.log(formDat);

		fetch('/api',{
			method:'POST', body:JSON.stringify(formDat), headers: { 'Content-Type': 'application/json' },
		}).then(async(res)=>{
			let resData = await res.text();
			if(!isJSON(resData)){
				console.log(resData);
			}
			let data : IResponse = JSON.parse(resData);

			if(data && 'success' in data){
				console.log(data);
				if(data.success){
					var dat : IUserData = data.data;
					setCookie('JBQ_username', dat.username);
					setCookie('JBQ_userId', dat.id);
					setCookie('JBQ_apikey', dat.apikey);
					setCookie('JBQ_role', dat.role);
					setCookie('JBQ_permissions', JSON.stringify(dat.permissions));
					
					localStorage.setItem('JBQ_username', dat.username);
					localStorage.setItem('JBQ_userId', dat.id);
					localStorage.setItem('JBQ_apikey', dat.apikey);
					localStorage.setItem('JBQ_role', dat.role);
					localStorage.setItem('JBQ_permissions', JSON.stringify(dat.permissions));
					
					if(dat.preferences){
						var _pref = (dat.preferences);
						localStorage.setItem('JBQ_color', _pref.color);
						localStorage.setItem('JBQ_shape', _pref.shape);
						setCookie('JBQ_color', _pref.color);
						setCookie('JBQ_shape', _pref.shape);
					}else{
						localStorage.setItem('JBQ_color', 'A');
						localStorage.setItem('JBQ_shape', 'A');
						setCookie('JBQ_color', 'A');
						setCookie('JBQ_shape', 'A');
					}
					// return;
					window.location.href = "/home";
					logg('User logged in! Now <strong>go</strong>.');
					console.log(data.data);
					console.log(getCookie('JBQ_apikey'));
					console.log(localStorage.getItem('JBQ_apikey'));
				}else{
					// console.log('uh oh!');
					logg(data.message);
				}
			}else{
				logg('Invalid response from server');
				console.log(data);
			}

		}).catch((err)=>{
			console.log('uh oh');
			console.log(err);
		});


	});
	

	$('.signUpBtn').on('click',(event)=>{
		var url = '/signup';
		var form = $(
			`<form action="${url}" method="get" style="display:none;">
				<input type="text" name="email" value="${($('#email')[0] as HTMLInputElement).value}" />
			</form>`
		);
		$('body').append(form);
		form.submit();
	});
}