
import $ from "jquery";
import anime from 'animejs';
import { Conductor } from '@catsums/conductorjs';
import {
	docReady, 
	parseURLParams, processAjaxData,
	findItem, stringTrimToLength,
	rndInt,
} from '@catsums/my';
import {
	displayPopUpBox, deletePopUp, easyPopUpBox,
	logg, 
	setSlidableContent, createMenuTracker,
	loadUserPreferences,
	myAPI, myHandler,
	saveActivity, getActivity,
	transitionTo,
} from './mainscript';

var conductor : Conductor, 
thisQuiz : IQuizData, 
thisList : IPlaylistData, 
thisSong : ISongData, 
answeredFlags : boolean[]  = [];
var listIndex = 0, listQuizzes = [];
var thisUser : IUserData;
var quizCtrl = {
	isEnded: false,
	isPaused: false,
	isStarted: false,
	multiplier: 10,
};
var questionSlider, sectionSlider;
var thisScore = 0, maxScore = 0, passingScore = 0;
var DebugMode = false;
var playlistMode = false;

var holdDown = {
	timer: null,
	startTimer: null,
	startTime: 400,
	time: 100,
	down: false,
};
var frequency = {
	max:255,min:50,
};

var urlParams = parseURLParams(window.location.href) as IJSON;
console.log(urlParams);

verifyLogin((data)=>{
	loadUserPreferences();
	myHandler({
		type:'user',subType:'get',data:{
			id:data.userID
		}
	},(msg,data)=>{
		console.log('User is Authenticated');
		thisUser = data[0];
		console.log(thisUser);
		docReady(main);
	},(msg,data)=>{
		displayPopUpBox({
			messageText:`User login failed. Returning to splash screen so you can log in.`,
			cancelText:`Return to Splash Screen`,
			onCancel:()=>{
				window.location.href = './index.php';
			}
		});
	},(err,data)=>{
		displayPopUpBox({
			messageText:`Error in user login. Returning to splash screen so you can log in.`,
			cancelText:`Return to Splash Screen`,
			onCancel:()=>{
				window.location.href = './index.php';
			}
		});
	});
});

function main(){
	console.log('Main');

	if(urlParams.playlist){
		playlistMode = true;
	}
	if(urlParams.debug && urlParams.debug=='DEBUG'){
		DebugMode = true;
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

	
	myHandler({
		type:'quiz',subType:'get',data:{
			id:(urlParams.quiz?urlParams.quiz:'')
		}
	}).then((res:IResponse)=>{
		if(!res?.success || !res?.data || !res?.data[0]){
			displayPopUpBox({
				messageText:`Error loading quiz. Quiz might be broken or none existent.`,
				cancelText:`Return to Home Screen`,
				onCancel:()=>{
					window.location.href = './home.php';
				}
			});
		}
		console.log(`SUCCESS`);

		thisQuiz= res.data[0];
		$('.play-quizName').text(`${thisQuiz?.name}`);
		let cont = $('<div>',{class:'sliderContainer mx-3 w-100 h-80 centerFlexCont'});
		let questionData;
		
		if(!(thisQuiz?.questions)){
			displayPopUpBox({
				messageText:`This quiz seems to be missing its questions so it's unplayable.`,
				cancelText:`Return to Home Screen`,
				onCancel:()=>{
					window.location.href = './home.php';
				}
			});
			return;
		}
		questionData = (thisQuiz?.questions);
		console.log(questionData);
		if(!questionData || !questionData.length){
			displayPopUpBox({
				messageText:`This quiz seems to be missing its questions so it's unplayable.`,
				cancelText:`Return to Home Screen`,
				onCancel:()=>{
					window.location.href = './home.php';
				}
			});
			return;
		}
		let questionDivs = [];
		for(let q=0;q<questionData.length;q++){
			let _question = questionData[q];

			let answerDivCont = $('<div>',{
				class:'answerDivContainer formRadioContainer w-100 h-80 p-3'
			});

			for(let a=0;a<_question.answers.length;a++){
				let _answer = _question.answers[a];
				let answerDiv = $('<div>',{
					class:'row answerDiv w-100 mx-2'
				}).append([
					$('<input>').attr({
						'class':`formRadioBtn dontShow`,
						'id':`q${q}a${a}`,
						'name':`q${q}Answer`,
						'type':`${(_question.type=='multiple')?`checkbox`:`radio`}`,
					}),
					$('<label>').attr({
						'class':`col-10 answerName inputBox px-4 fixWrap formRadioLabel`,
						'for':`q${q}a${a}`,
					}).text(`${_answer.answer}`)
				]).attr('data-correct',`${_answer.correct?true:false}`);
				answerDivCont.append(answerDiv);
			}
			
			let questionDiv = $('<form>',{
				class:'questionCard h-80 h-md-90 w-90 w-sm-80 w-md-70 w-lg-50'
			}).append([
				$('<div>',{class:'card my-1 mx-5 quizCard h-100'}).append([
					$('<div>',{
						class:'card-header',
					}).append([
						$('<div>',{
							class:'card-img-top centerFlexCont'
						}).css({'background':`url('./data/image/${_question.imageURL}')`})
					]),
					$('<h5>',{
						class:'card-title questionName'
					}).css({'background-color':`var(--cI)`}).text(`${_question.question}`),
					$('<div>',{class:'card-body my-1 mx-3 w-100'})
					.append(answerDivCont)
				])//.css('background-color','transparent')
			]);
			questionDivs.push(questionDiv);
		}

		maxScore = (quizCtrl.multiplier * questionDivs.length);
		passingScore = thisQuiz?.passingGrade;

		questionSlider = setSlidableContent({
			group: questionDivs,
			container: cont,
			leftButton: $('<div>'), rightButton: $('<div>'),
			forceCenter:true,
			// positioning:'relative',
		});
		// console.log(formslider);

		$('.quizContCard').append(cont);
		// cont.append($('.barrCont'));

		setScore(0);

		console.log(thisQuiz?.songID);
		answeredFlags = new Array(questionDivs.length);
		for(let i=0;i<questionDivs.length;i++){
			answeredFlags[i] = false;
		}
		//load songs
		return myHandler({
			type:'song',subType:'get',data:{
				id: thisQuiz?.songID
			}
		}).then((sres)=>{
			if(!sres || !sres?.success || !sres?.data){
				playDefaultSong();
			}else{
				console.log('FOUND');
				let song = sres.data[0];
				thisSong = song;
				console.log(song);
				playSong(song);
			}
		});
	}).then(async()=>{
		loadEvents();
		if(playlistMode){
			return myHandler({
				type:'list',subType:'get',data:{id: urlParams.playlist?urlParams.playlist:''}
			}).then((pres)=>{
				console.log(pres);
				if(!pres || !pres?.success|| !pres?.data){
					displayPopUpBox({
						messageText:`Error loading playlist. Playlist might be broken or none existent.`,
						cancelText:`Return to Home Screen`,
						onCancel:()=>{
							window.location.href = './home.php';
						}
					});
				}
				thisList = pres.data[0];

				if(!(thisList?.quizzes)){
					displayPopUpBox({
						messageText:`Error loading playlist. Playlist might be broken or none existent.`,
						cancelText:`Return to Home Screen`,
						onCancel:()=>{
							window.location.href = './home.php';
						}
					});
					return;
				}
				let _quizzes = (thisList?.quizzes);	//array

				let isValid = false;
				for(let q=0;q<_quizzes.length;q++){
					let _q = _quizzes[q];
					if(_q == thisQuiz?.id){
						isValid = true;
						listIndex = q;
						break;
					}
				}
				listQuizzes = _quizzes;

				if(!isValid){
					displayPopUpBox({
						messageText:`Page link might be invalid for playlist. Please check if you have played the playlist correctly.`,
						cancelText:`Return to Home Screen`,
						onCancel:()=>{
							window.location.href = './home.php';
						}
					});
					return;
				}
			});
		}else{
			return Promise.resolve(true);
		}
	}).then(()=>{
		onMusicLoad();
		if(conductor && !conductor.isPlaying()){
			conductor.setStep(0);
		}
		loadEvents();
	});

	function onMusicLoad(){
		let playBtn = {
			startIntro: $('<button>',{class:'btn formBtn p-3 startIntroPlayBtn thiccBtn font-150'}).append([
					$('<i>',{class:'fas fa-play mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-300 font-md-0'}).text(`Play`)
				]),
			quitIntro: $('<button>',{class:'btn formBtn p-2 px-3 quitIntroPlayBtn thiccBtn'}).append([
					$('<i>',{class:'fas fa-times mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Quit`)
				]),
			continuePause: $('<button>',{class:'btn formBtn p-3 continuePausePlayBtn thiccBtn'}).append([
					$('<i>',{class:'fas fa-play mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Continue`)
				]),
			quitPause: $('<button>',{class:'btn formBtn p-3 quitPausePlayBtn thiccBtn'}).append([
					$('<i>',{class:'fas fa-stop mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Quit`)
				]),
			retryComplete: $('<button>',{class:'btn formBtn p-3 retryCompletePlayBtn thiccBtn'}).append([
					$('<i>',{class:'fas fa-redo-alt mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Retry`)
				]),
			quitComplete: $('<button>',{class:'btn formBtn p-3 quitCompletePlayBtn thiccBtn'}).append([
					$('<i>',{class:'fas fa-stop mx-2'}),
					$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Quit`)
				]),
			nextComplete: $('<button>',{class:'dontShow'}),

			mutePlay: $('#mutePlayBtn'),
			prevPlay: $('#prevPlayBtn'),
			pausePlay: $('#pausePlayBtn'),
			nextPlay: $('#nextPlayBtn'),
			quitPlay: $('#quitPlayBtn'),
			confirmPlay: $('#confirmPlayBtn'),
		};

		if(playlistMode && (listQuizzes.length-1 > listIndex)){
			playBtn.nextComplete = $('<button>',{class:'btn formBtn p-3 nextCompletePlayBtn thiccBtn'}).append([
				$('<i>',{class:'fas fa-forward mx-2'}),
				$('<span>',{class:'thiccBtnText font-xs-100 font-md-0'}).text(`Next Quiz`)
			]);

			$(playBtn.nextComplete).on('click',(event)=>{
				event.preventDefault(); event.stopPropagation();
				displayPopUpBox({
					messageText:'Go to the next quiz?',
					acceptText:'Go to Next Quiz', cancelText:'Return to End Screen',
					onAccept:()=>{
						window.location.href = `./play.php?playlist=${thisList?.id}&quiz=${listQuizzes[listIndex+1]}`;
					}, onCancel:()=>{}
				});
				loadEvents();
			});
		}

		let introCard = $('<div>',{class:'introCard sectionCard h-80 h-md-90 w-90 rounded'}).append([
			$('<div>',{class:'card my-1 mx-5 quizCard h-100 w-100'})
			.append([
				$('<div>',{class:'card-header p-2'}).append([
					$('<div>',{class:'play-quizName c3-bg p-1 c0-txt rounded font-125'})
					.text(`${thisQuiz?.name}`),
					$('<div>',{class:'play-quizAuthor c2-bg p-1 m-1 c0-txt rounded text-right'})
					.append([
						'by ' as any,
						$('<span>',{class:'"play-quizAuthor'}).text(`${thisQuiz?.username}`)
					]),
				]),
				$('<div>',{class:'card-body w-100 h-100 centerFlexCont'}).append([
					$('<div>',{class:'m-1 p-1 w-70 h-95'}).append([
						$('<div>',{class:'play-disclaimer p-2 c3-bg c0-txt rounded'})
						.text(`The quiz needs you to complete all the questions before the song ends. While you could try to play without music, it's recommended have it unmuted so you can keep track of the time and get the full experience. This quiz is best experienced with headphones.`),
						$('<div>',{class:'play-instruction p-2 c2-bg c0-txt rounded'})
						.text(`To select an answer, click on it and hit the Confirm button below to know if its correct or wrong. This quiz needs ${passingScore} points to pass as completed successfully.`),
						
						$('<div>',{class:'h3 font-200 p-3 centerFlexCont'}).text('Ready?'),
						$('<div>',{class:'play-intro p-2 centerFlexCont'}).append([
							playBtn.startIntro
						]),
						$('<div>',{class:'play-intro p-2 centerFlexCont'}).append([
							playBtn.quitIntro
						]),
					]),
				])
			])
		]);
		let pauseCard = $('<div>',{class:'pauseCard sectionCard h-80 h-md-90 w-90 rounded'}).append([
			$('<div>',{class:'card my-1 mx-5 quizCard h-100 w-100'})
			.append([
				$('<div>',{class:'card-body w-100 h-100 centerFlexCont'})
				.append([
					$('<div>',{class:'centerFlexCont w-100'}).append([
						$('<div>',{class:'m-1 p-2 w-95 h-9'}).append([
							$('<div>',{class:'h4 p-3 centerFlexCont'}).text(`Quiz has been Paused`),
							$('<div>',{class:'play-intro p-2 centerFlexCont'}).append([
								playBtn.continuePause, playBtn.quitPause
							])
						])
					])
				])
			])
		]);
		let completeCard = $('<div>',{class:'completeCard sectionCard h-80 h-md-90 w-90 rounded'}).append([
			$('<div>',{class:'card my-1 mx-5 quizCard h-100 w-100'})
			.append([
				$('<div>',{class:'card-body w-100 h-100 centerFlexCont p-3'})
				.append([
					$('<div>',{class:'centerFlexCont w-40'}).append([
						$('<div>',{class:'m-1 p-2 w-95 h-95'}).append([
							$('<div>',{class:'row w-80 rounded'}).append([
								$('<div>',{class:'col h3 p-2'}).text(`${thisUser.username}`)
							]),
							$('<div>',{class:'row w-100 m-1'}).append([
								$('<div>',{class:'col c2-bg c0-txt p-2 play-quizName rounded font-125'})
								.text(`${thisQuiz?.name}`),
							]),
							$('<div>',{class:'row w-100 m-1 text-right'}).append([
								$('<div>',{class:'col c0-bg c3-txt p-1 rounded'})
								.append([
									'by ' as any,
									$('<span>',{class:'play-Username'}).text(`${thisQuiz?.username}`)
								])
							]),
							$('<div>',{class:'row rowGap m-3'}),
							$('<div>',{class:'row w-100 text-center'}).append([
								$('<div>',{class:'col p-2'}).text(`Score`),
								$('<div>',{class:'col c3-bg c0-txt p-2 rounded play-Score'})
								.text(`${thisScore}`),
							]),
							$('<div>',{class:'row rowGap m-3'}),
							$('<div>',{class:'row m-0'}).text(`Song`),
							$('<div>',{class:'row w-100 m-1 text-center'}).append([
								$('<div>',{class:'col c2-bg c0-txt p-2 play-songAuthor'}).text(`${thisSong?.author}`),
								$('<div>',{class:'col c3-bg c0-txt p-2 play-songTitle'}).text(`${thisSong?.title}`)
							])
						])
					]),
					$('<div>',{class:'centerFlexCont w-60'}).append([
						$('<div>',{class:'m-1 p-2 w-95 h-95'}).append([
							$('<div>',{class:'h4 p-3 centerFlexCont'}).text(`${ (playlistMode && (listQuizzes.length-1 <= listIndex))? `Playlist Completed` :`Quiz Completed`}`),
							$('<div>',{class:'completeResults centerFlexCont'}).append([
								$('<div>',{class:'completeResultsGrade cI-txt m-4 font-400 font-weight-bold'}).text('F'),
								$('<div>',{class:'completeResultsPass font-110 c0-txt m-4 p-2 rounded'}).text('FAIL'),
							]),
							$('<div>',{class:'play-intro p-2 centerFlexCont'}).append([
								playBtn.retryComplete,
								playBtn.nextComplete,
								playBtn.quitComplete,
							])
						])
					])
				])
			])
		]);

		let quizContCard = $('.quizContCard').css('background','transparent');

		$('.play-songDetails').text(`${thisSong?.author} - ${thisSong?.title}`);
		$('.play-Username').text(`${thisUser.username}`);

		sectionSlider = setSlidableContent({
			container: $('.quizCont'),
			group: [introCard, quizContCard, pauseCard, completeCard],
			leftButton: $('<div>'), rightButton: $('<div>'),
		});

		$('.quizCont').append($('.barrCont'));
		loadEvents();

		// console.log(sectionSlider);
		$(playBtn.confirmPlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isStarted && !quizCtrl.isEnded){
				if(!quizCtrl.isPaused){
					checkQuestion();
				}else{
					unpauseQuiz();
				}
			}else if(quizCtrl.isEnded){
				$(playBtn.quitComplete).trigger('click');
			}
		});

		$(playBtn.startIntro).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(!quizCtrl.isStarted){
				startQuiz();
				saveActivity({
					userID: thisUser.id,
					type: 'Played Quiz',
					info: `${thisUser.username} started playing a quiz: ${thisQuiz?.name} by ${thisQuiz?.username}`,
					details:{
						quizID: thisQuiz?.id,
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
				if(playlistMode && listIndex==0){
					saveActivity({
						userID: thisUser.id,
						type: 'Played Playlist',
						info: `${thisUser.username} started playing a playlist: ${thisList?.name} by ${thisList?.username}`,
						details:{
							listID: thisList?.id,
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
				}
			}
			
		});
		$(playBtn.prevPlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isStarted && !quizCtrl.isPaused && !quizCtrl.isEnded){
				questionSlider.moveContentBy(-1);
			}
		});
		$(playBtn.nextPlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isStarted && !quizCtrl.isPaused && !quizCtrl.isEnded){
				questionSlider.moveContentBy(1);
			}
		});
		$(playBtn.continuePause).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isStarted){
				$(playBtn.confirmPlay).find('.thiccBtnText').text('Confirm');
				unpauseQuiz();
			}
		});
		$(playBtn.pausePlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isStarted){
				if(!quizCtrl.isPaused){
					$(playBtn.confirmPlay).find('.thiccBtnText').text('Continue');
					pauseQuiz();
				}
				else{
					$(playBtn.confirmPlay).find('.thiccBtnText').text('Confirm');
					unpauseQuiz();
				}
			}
			
		});
		$(playBtn.retryComplete).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(quizCtrl.isEnded){
				displayPopUpBox({
					messageText:'Retry quiz? Your score has been saved but you are welcome to redo it.',
					acceptText:'Retry this quiz', cancelText:'Return to screen',
					onAccept:()=>{
						window.location.href = window.location.href;
					}, onCancel:()=>{}
				});
				loadEvents();
			}
		});
		$(playBtn.mutePlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			muteQuiz();
			/*if(quizCtrl.isStarted && !quizCtrl.isEnded){
				muteQuiz();
			}*/
		});
		$(playBtn.quitPlay).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(!quizCtrl.isEnded){
				displayPopUpBox({
					messageText:'Stop playing quiz? This will end the quiz with your current score.',
					acceptText:'End this quiz', cancelText:'Return to quiz',
					onAccept:()=>{
						$(playBtn.confirmPlay).find('.thiccBtnText').text('Quit');
						endQuiz();
					}, onCancel:()=>{}
				});
				loadEvents();
			}
		});
		$(playBtn.quitIntro).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(!quizCtrl.isEnded){
				displayPopUpBox({
					messageText:'Stop playing quiz? This will not save your score and will return you to the home page.',
					acceptText:'End this quiz', cancelText:'Return to quiz',
					onAccept:()=>{
						window.location.href = './home.php';
					}, onCancel:()=>{}
				});
				loadEvents();
			}
		});
		$(playBtn.quitPause).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			if(!quizCtrl.isEnded){
				displayPopUpBox({
					messageText:'Stop playing quiz? This will end the quiz with your current score.',
					acceptText:'End this quiz', cancelText:'Return to quiz',
					onAccept:()=>{
						$(playBtn.confirmPlay).find('.thiccBtnText').text('Quit');
						endQuiz();
					}, onCancel:()=>{}
				});
				loadEvents();
			}
		});
		$(playBtn.quitComplete).on('click',(event)=>{
			event.preventDefault(); event.stopPropagation();
			window.location.href = './home.php';
		});
		
		loadEvents();
	}
}

function loadEvents(){
	if(conductor && conductor instanceof Conductor){
		$(`.playBar-progress`).css({
			'transition':`all ${conductor.crotchet}s`,
		});
		if(holdDown.down){
			$(`.playBar-node`).css({
				'transition':`all ${conductor.stepCrotchet}s`,
			});
		}else{
			$(`.playBar-node`).css({
				'transition':`all ${conductor.crotchet}s`,
			});
		}

		$('body').on('songEnd',(event)=>{
			endQuiz();
		});

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
		conductor.connectElements($('.barr').toArray());

		for(let i=0;i<32;i++){
			$(`.barr.step-${i+1}`).on('stepHit',(event:any)=>{
				let e = event as CustomEvent;
				if(e.detail.step%(i+1)==0) animateStepBar(event);
			});
		}
		for(let i=0;i<8;i++){
			$(`.barr.beat-${i+1}`).on('beatHit',(event:any)=>{
				let e = event as CustomEvent;
				if(e.detail.beat%(i+1)==0) animateBeatBar(event);
			});
		}
		for(let i=0;i<32;i++){
			$(`.barr.freq-${i+1}`).on('beatHit',(event:any)=>{
				let e = event as CustomEvent;
				let K = i;
				if(e.detail.frequencyData[K]>frequency.min){
					let freqDat = e.detail.frequencyData[K];
					animateFreqBar(e, freqDat, K);
				}
			});
		}

		conductor.connectElements($('.formBtn').toArray());
		conductor.connectElement($('#containerFooter')[0]);
		conductor.connectElements($('.answerDiv').toArray());

		conductor.connectElements([
			$('#myMouse')[0]
		]);

	}
	
	$('.playBar-bar').on('mousedown',(event)=>{
		event.preventDefault();
		// event.stopPropagation();
		holdDown.down = true;
		
	}).on('mousemove',(event)=>{
		if(holdDown.down){
			onProgressBarChange(event as any);
		}
	}).on('click',(event)=>{
		onProgressBarChange(event as any);
	}).bind('mouseup',()=>{
		holdDown.down = false;
		clearInterval(holdDown.timer);
		clearTimeout(holdDown.startTimer);
	});

	$('.thiccBtn').on('mouseenter',function(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var quizBtnText = $(this).children('.thiccBtnText');
		// console.log('bingus');
		if($(quizBtnText).hasClass('font-md-0')){
			$(quizBtnText).removeClass('font-md-0');
		}
	});
	$('.thiccBtn').on('mouseleave',function(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var quizBtnText = $(this).children('.thiccBtnText');
		// console.log('bignus');
		if(!$(quizBtnText).hasClass('font-md-0')){
			$(quizBtnText).addClass('font-md-0');
		}
	});


	$('.answerDiv').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var div = event.currentTarget;
		var animBox = anime({
			targets: [div],
			translateY: ['1','8'],
			duration: e.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	});
	$('#containerFooter').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		var cont = event.currentTarget;
		var animBox = anime({
			targets: [cont],
			translateY: ['0','-4'],
			duration: event.detail.stepCrotchet*1000,
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
				duration: event.detail.stepCrotchet*1000,
				easing: "easeInOutQuad",
				direction: 'alternate',
			});
		}
		
	});
	
	$('.barr.beat').on('beatHit',(event:any)=>{
		let e = event as CustomEvent;
		if(e.detail.beat) 
			animateBeatBar(e);
	});
	$('.barr.step').on('stepHit',(event:any)=>{
		let e = event as CustomEvent;
		if(e.detail.step) 
			animateStepBar(e);
	});

	
	function animateBeatBar(event:CustomEvent){
		let h = [1,((5*event.detail.volume)+1)];
		let animBox = anime({
			targets: [event.currentTarget],
			scaleY: h,
			duration: event.detail.stepCrotchet*1000,
			easing: "easeInOutQuad",
			direction: 'alternate',
		});
	}
	function animateStepBar(event:CustomEvent){
		let h = [1,((rndInt(2,5)*event.detail.volume)+1)];
		let animBox = anime({
			targets: [event.currentTarget],
			scaleY: h,
			duration: event.detail.stepCrotchet*1500,
			easing: "easeInOutCubic",
			direction: 'alternate',
		});
	}
	function animateFreqBar(event:CustomEvent, freqDat:number, pos:number){
		let h = [1,((5*event.detail.volume)+1)];
		var m = (freqDat>frequency.max)?(frequency.max):(freqDat);
		m = (m/255) * 4;
		let anim = anime({
			targets: [event.currentTarget],
			scaleY: h,
			duration: event.detail.stepCrotchet*(1000*(pos?pos:0.5)),
			easing: "easeInOutCubic",
			direction: 'alternate',
		});
	}

	function onProgressBarChange(e:MouseEvent){
		if(!DebugMode)	return;

		let thisBar = e.currentTarget as HTMLElement;
		let parent = $(thisBar).parent();
		let progressBar = $(parent).find('.playBar-progress')[0];
		let thisRect = thisBar.getBoundingClientRect();
		let offset = $(thisBar).offset();
		let windowQ = $(window);
		let x = (e.pageX - offset.left) + windowQ.scrollLeft();
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
}

function addToScore(val){
	if(isNaN(val)) return;
	thisScore += val;
	updateScore();
}
function setScore(val){
	if(isNaN(val)) return;
	thisScore = val;
	updateScore();
}
function updateScore(){
	$('.play-Score').text(`${thisScore}`).attr('data-play-score',`${thisScore}`);
}
function getGrade(){
	let res = {
		pass: false, grade: 'F'
	};
	res.pass = (thisScore>=passingScore)?true:false;
	let percent = (thisScore/(maxScore?maxScore:10))*100;
	if(percent>=100)	res.grade = 'S';
	else if(percent>=90)	res.grade = 'A';
	else if(percent>=75)	res.grade = 'B';
	else if(percent>=50)	res.grade = 'C';
	else if(percent>=47)	res.grade = 'D';
	else if(percent>=25)	res.grade = 'E';
	else	res.grade = 'F';

	return res;
}

function allAreAnswered(){
	for(let flag of answeredFlags){
		if(!flag){
			return false;
		}
	}
	return true;
}

function checkQuestion(){
	if(questionSlider){
		let qIndex = questionSlider.currentContentIndex();
		let thisQuizQuestions =  (thisQuiz?.questions);
		let thisQuestion = thisQuizQuestions[qIndex];
		// console.log(currQuestion[qIndex]);

		let currQuestionDiv = questionSlider.currentContent();
		// console.log($(currQuestionDiv)[0]);

		let answerDivs = $(currQuestionDiv).find('.answerDiv').toArray();
		let checkedAnswers = [], correctAnswers = [];
		let checkedAnswerTexts = [];
		for(let an of answerDivs){
			if(($(an).find('.formRadioBtn')[0] as HTMLInputElement).checked){
				checkedAnswers.push($(an).find('.formRadioBtn')[0]);
				checkedAnswerTexts.push($(an).find('.formRadioLabel').text());
			}
			if($(an).attr('data-correct')==='true'){
				correctAnswers.push($(an).find('.formRadioBtn')[0]);
			}
		}
		if(!checkedAnswers.length){
			easyPopUpBox('You did not select an answer!');
			loadEvents();
			return;
		}
		let isCorrect = true, correctCount = 0;
		for(let an of correctAnswers){
			let isFound = false;
			for(let can of checkedAnswers){
				if($(an).attr('id')==$(can).attr('id')){
					isFound = true;
					break;
				}
			}
			if(!isFound){
				isCorrect = false;
			}else{
				correctCount++;
			}
		}
		if(isCorrect){
			// console.log('CORRECT');
			addToScore( correctCount * quizCtrl.multiplier );
		}
		// console.log(thisQuestion.type);

		let logTxt =  ( (thisQuestion.type=='multiple')?(checkedAnswerTexts.length):(checkedAnswerTexts[0]) );

		$(currQuestionDiv).removeClass('questionCard').addClass('confirmCard')
		.html( createConfirmCard(isCorrect, logTxt).find('.card')[0] );

		//questin is answered and this is used to check if all questions are answered
		answeredFlags[qIndex] = true;

		if(allAreAnswered()){
			endQuiz();
		}else{
			setTimeout(()=>{
				questionSlider.setContentIndex(qIndex+1);
			},250);
		}
		
	}
}

function createConfirmCard(isCorrect : boolean, logTxt : string){
	let divText = '[blank]'
	if(!logTxt) divText = '[blank]';
	else if(typeof logTxt === 'number'){
		divText = `${logTxt} answer(s)`;
	}
	else{
		divText = `${stringTrimToLength(logTxt,30)}`;
	}

	let confirmCardDIV = $('<div>',{
		class:'confirmCard h-80 h-md-90 w-90 w-sm-80 w-md-70 w-lg-50'
	}).append([
		$('<div>',{class:'card my-1 mx-5 quizCard h-100'}).append([
			$('<div>',{class:'card-body w-100 h-100 c0-txt centerFlexCont p-1 p-md-2'})
			.append([
				$('<i>',{class:'fas font-750'}).addClass(`${isCorrect?`fa-check-circle`:`fa-times-circle`}`)
			]).addClass(`${isCorrect?`c1-bg`:`c2-bg`}`),
			$('<div>',{class:'card-body w-100 h-100 c0-txt centerFlexCont p-1 p-md-2'})
			.append([
				$('<span>',{class:'p-2 c0-bg c1-txt rounded'})
				.addClass(`${isCorrect?`c1-txt`:`c2-txt`}`)
				.text(`${divText}`)
			]).addClass(`${isCorrect?`c1-bg`:`c2-bg`}`),
		])
	]);
	return confirmCardDIV;
}

function createConductor(){
	conductor = new Conductor();
	conductor.connectElements([
		$('#myMouse')[0]
	]);

	conductor.activate();
}
function retrievePlaylist(){
	myHandler({
		type: 'playlist', data: {
			id: '[NOT NULL]',
		}
	},(msg,data)=>{
		playRandomSong(data);
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
	var currSong : ISongData = {
		id: '',
		title: 'Gizmo',
		author: 'Syn Cole',
		bpm: 124,
		measure: 8,
		songURL: './data/audio/default.dat'
	};

	playSong(currSong);
	thisSong = currSong;
	loadEvents();
	console.log('loaded default.dat');
}
function playSong(currSong : ISongData) {
	var audio = new Audio(`./data/audio/${currSong.songURL}`);
	if(!conductor) createConductor();
	conductor.changeStats(currSong.bpm,currSong.measure);
	conductor.connectAudioObject(audio);
	thisSong = currSong;
	loadEvents();
}

function verifyLogin(callback:(d:any)=>void){
	var userID = localStorage.getItem('JBQ_userId');
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
				window.location.href = "./index.php";
			}
		});
		loadEvents();
	},(err,data)=>{
		console.log(data);
		displayPopUpBox({
			messageText:'Error trying to verify login. Returning to Splash Screen',
			cancelText: 'Return to Splash Screen',
			onCancel:()=>{
				window.location.href = "./index.php";
			}
		});
		loadEvents();
	});
}

function startQuiz(){
	sectionSlider.setContentIndex(1);
	quizCtrl.isStarted = true;
	quizCtrl.isEnded = false;
	quizCtrl.isPaused = false;
	if(conductor){
		conductor.playOn();
		conductor.unmute();
		// buildUp(3.0);
	}
}

function pauseQuiz(){
	if(!quizCtrl.isEnded){
		sectionSlider.setContentIndex(2);
		quizCtrl.isPaused = true;
		if(conductor){
			conductor.pause();
		}
	}else{
		endQuiz();
	}
}
function unpauseQuiz(){
	if(!quizCtrl.isEnded){
		sectionSlider.setContentIndex(1);
		quizCtrl.isPaused = false;
		if(conductor){
			conductor.playOn();
		}
	}else{
		endQuiz();
	}
}

function endQuiz(){
	if(!quizCtrl.isEnded){
		quizCtrl.isEnded = true;
		
		if(conductor){
			conductor.stop();
		}
		if(thisScore>=maxScore){
			$('.play-Score').css({
				'background-color':`white`
			});
		}
		let gradeResult = getGrade();

		$('.completeCard .completeResults .completeResultsPass').text(`${gradeResult.pass?`PASSED`:`FAILED`}`);
		$('.completeCard .completeResults .completeResultsPass').css({
			'background-color':`var(--c${ gradeResult.pass?'1':'2' })`
		});

		$('.completeCard .completeResults .completeResultsGrade').text(`${gradeResult.grade}`);
		$('.completeCard .completeResults .completeResultsGrade').css({
			'color':`var(--c${ gradeResult.pass?'1':'2' })`
		});

		sectionSlider.setContentIndex(3);

		myHandler({
			type:'connect',subType:'addScore',data:{
				score: thisScore,
			}
		}).then((res)=>{
			if(res.success){
				console.log(`Updated Score`);
			}else{
				console.log(`Failed to update Score`);
			}
			saveActivity({
				userID: thisUser.id,
				type: 'Completed Quiz',
				info: `${thisUser.username} completed a quiz with a score of ${thisScore}: ${thisQuiz?.name} by ${thisQuiz?.username}`,
				details:{
					quizID: thisQuiz?.id,
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
				
			})
			console.log(res?.message);
		});
	}
}
function muteQuiz(){
	if(conductor){
		if(!conductor.isMuted()){
			$('#mutePlayBtn').find('i').removeClass('fa-volume-up').addClass('fa-volume-mute');
			conductor.mute();
			console.log(conductor.getVolume());
		}
		else{
			$('#mutePlayBtn').find('i').removeClass('fa-volume-mute').addClass('fa-volume-up');
			conductor.unmute();
		}
	}
}

function buildUp(time:number){
	if(time<0||isNaN(time)) return;
	if(conductor){
		let preprogress = 0;
		conductor.setVolume(0);
		anime({
			targets:[conductor.volumeControl.gain],
			value:{
				value: [0,0.1,0.2,0.5,1],
				duration: (time*1000),
			},
			easing: 'easeInOutQuad',
		});
	}
}
function buildDown(time:number){
	if(time<0||isNaN(time)) return;
	if(conductor){
		let preprogress = 0;
		conductor.setVolume(1);
		anime({
			targets:[conductor.volumeControl.gain],
			value:{
				value: [0,0.1,0.2,0.5,1],
				duration: (time*1000),
				direction: 'reverse',
			},
			easing: 'easeInOutQuad',
		});
	}
}

function playRandomSong(songs) {

	var index = rndInt(0,songs.length-1);
	var songIndex = index;
	var currSong = songs[index];

	let homeAudio = new Audio(`/files/songs/${currSong.songURL}`);
	if(!conductor) createConductor();
	conductor?.changeStats(currSong.bpm,currSong.measure);
	conductor?.connectAudioObject(homeAudio);
	$('.pfpPlayButton').html(`<i class="fas fa-play m-2 c4-txt"></i>`);
	loadEvents();
}

async function myTween(_opt){
	let opts = {
		target:_opt.target,
		prop: _opt.prop,
		from: _opt.from,
		to: _opt.to,
		time: _opt.time,
		tween: _opt.tween,
		onStart: (_opt.onStart)?(_opt.onStart):(step)=>{

		},
		onUpdate: (_opt.onUpdate)?(_opt.onUpdate):(progress,step,currentValue)=>{

		},
		onComplete: (_opt.onComplete)?(_opt.onComplete):(step)=>{},
	}
	let ctrl = {
		timer:null,
		precision:40,
	}
	let _front = false;
	_front = (opts.from<opts.to);
	let timeSteps = opts.time / ctrl.precision;
	let valStep = (opts.to - opts.from)/timeSteps;
	let progress = 0;

	opts.onStart(valStep);
	tweenTime();

	function tweenStep(){
		opts.target[opts.prop] += valStep;
		progress += (valStep/(opts.from-opts.to));
		opts.onUpdate(progress,valStep,opts.target[opts.prop]);
		tweenTime();
	}
	function tweenTime(){
		ctrl.timer = setTimeout(()=>{
			if(_front && opts.target[opts.prop]<opts.to){
				tweenStep();
			}else if(!_front && opts.target[opts.prop]>opts.from){
				tweenStep();
			}else{
				opts.target[opts.prop] = opts.to;
				opts.onComplete(valStep);
				Promise.resolve(true);
			}
		},ctrl.precision);
	}
}
