///splash_script.js
/*
	35_Chifamba
*/

let myMods = [];
import * as mod_conductor from './conductor.js'; myMods.push(mod_conductor);
import * as mod_helper from './myHelperFunctions.js'; myMods.push(mod_helper);
import * as mod_main from './mainscript.js'; myMods.push(mod_main);
import * as mod_myMouse from './myMouse.js'; myMods.push(mod_myMouse);

for(let mod of myMods){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

// loadHTMLtoObject('#innerL','html/redpage.html');
var songs = []; var songIndex; var conductor; var songIsPlay = false;

docReady(loadEvents);
console.log('egg');
function loadEvents(){
	// createConductor();
	retrievePlaylist();

	function createConductor(){
		conductor = new Conductor();
		conductor.connectElements([
			$('.splashLogo')[0], $('.disclaimer')[0], $('#coolSplashText')[0], $('#myMouse')[0]
		]);
		conductor.connectElements($('.formBtn').toArray());

	}

	$('#myMouse').on('beatHit',(event)=>{
		var myMouse = event.currentTarget;
		var animBox = anime({
			targets: myMouse,
			translateY: ['1','+=10'],
			duration: event.detail.stepCrotchet*500,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('.splashLogo').on('beatHit',(event)=>{
		var thisLogo = event.currentTarget;
		var animBox = anime({
			targets: thisLogo,
			scale: ['1','+=0.225'],
			duration: event.detail.stepCrotchet*500,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('.formBtn').on('stepHit',(event)=>{
		var btn = event.currentTarget;
		var currStep = event.detail.step;
		if(currStep%8==0){
			var animBtn = anime({
				targets: btn,
				scale: ['1','+=0.225'],
				duration: event.detail.stepCrotchet*500,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
		
	});
	$('.disclaimer').on('beatHit',(event)=>{
		var obj = event.currentTarget;
		var animBox = anime({
			targets: obj,
			translateY: ['0','+=7'],
			duration: event.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('#coolSplashText').on('beatHit',(event)=>{
		var obj = event.currentTarget;
		var animBox = anime({
			targets: obj,
			translateY: ['0','+=7'],
			duration: event.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});

	$('.songPlayButton').on('click',onSongTogglePlay);
	$('.splashLogo').on('click',onSongTogglePlay);

	function onSongTogglePlay(event){
		var btn = $('.songPlayButton')[0];
		if(!songIsPlay){
			btn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
			console.log('PLAYED');
			conductor.playOn();
			songIsPlay = true;
		}else{
			btn.innerHTML = `<i class="fas fa-play-circle"></i>`;
			console.log('PAUSED');
			conductor.pause();
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
		var currSong = songs[index];

		$('.songTitleCol').html(currSong.title);
		$('.songArtistCol').html(currSong.author);

		var audio = $('#conductorAudio')[0];

		audio.src = `/files/songs/${currSong.songURL}`;

		if(!conductor) createConductor();

		conductor.changeStats(currSong.bpm,currSong.measure);
		conductor.connectAudioObject(audio);
		
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

		var audio = $('#conductorAudio')[0];
		audio.src = `${currSong.songURL}`;
		if(!conductor) createConductor();
		conductor.changeStats(currSong.bpm,currSong.measure);
		conductor.connectAudioObject(audio);
		// console.log(conductor);
	}

	function retrievePlaylist(){

		var formDat = {
			type: 'playlist',
			data: {
				// id: '[NOT NULL]',
			}
		};

		cout('retriving playlist...')

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

			let data = JSON.parse(resData);

			console.log(data);
			if(data && 'success' in data){
				if(data.success){
					data.data = JSON.parse(JSON.stringify(data.data));
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
			cout('err');
			console.log(err);
		});

	}

	$('.loginRing').click(function(event) {
		if(document.getElementsByName('username')[0].value==""){
			return logg('Username is Empty! Please insert your username!');
		}
		if(document.getElementsByName('pass')[0].value==""){
			return logg('Password is Empty!');
		}
		var initFormDat = formDataToJSON(getFormData('#loginForm'));

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
				logg(data);
				console.log(data);
			}
			let data = JSON.parse(resData);

			if(data && 'success' in data){
				console.log(data);
				if(data.success){
					var dat = data.data;
					setCookie('JBQ_username',dat.username);
					setCookie('JBQ_userId',dat.id);
					setCookie('JBQ_apikey',dat.apikey);
					setCookie('JBQ_role',dat.role);
					setCookie('JBQ_permissions',dat.permissions);
					

					localStorage.setItem('JBQ_username', dat.username);
					localStorage.setItem('JBQ_userId', dat.id);
					localStorage.setItem('JBQ_apikey', dat.apikey);
					localStorage.setItem('JBQ_role', dat.role);
					localStorage.setItem('JBQ_permissions', dat.permissions);
					
					if(dat.preferences && isJSON(dat.preferences)){
						var _pref = JSON.parse(dat.preferences);
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
				<input type="text" name="email" value="${document.querySelector('#email').value}" />
			</form>`
		);
		$('body').append(form);
		form.submit();
	});
}