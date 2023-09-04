<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	
	<meta name="author" content="Cassim Chifamba-u19024895">
	<meta name="application-name" content="Just Bops & Quizzes">

	<!-- Favicons -->
	<link rel="shortcut icon" sizes="64x64" type="image/x-icon" href="img/favicon/favicon.ico"/>
	<link rel="shortcut icon" sizes="16x16 24x24" type="image/x-icon" href="img/favicon/favicon-16x16.png"/>
	<link rel="shortcut icon" sizes="32x32 48x48" type="image/x-icon" href="img/favicon/favicon-32x32.png"/>
	<link rel="apple-touch-icon" href="img/favicon/apple-touch-icon.png"/>
	<link rel="android-chrome" href="img/favicon/android-chrome-192x192.png"/>

	<!-- BootStrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous"/>
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous"/> -->

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
	
	<!-- My Stylesheets files -->
	<link rel="stylesheet" type="text/css" href="css/bstrap.css"/>
	<link rel="stylesheet" type="text/css" href="css/myMouse.css"/>
	<link rel="stylesheet" type="text/css" href="css/main.css"/>

	<link rel="stylesheet" type="text/css" href="css/play.css"/>

	<title>Play - Just Bops & Quizzes</title>
	<style></style>
</head>
<body>
	<div class="main-container container-fluid">
		<div class="h-100">
			<div class="row h-85 my-0">
				<div class="homeContainer col mx-1" id="containerMain">
					<div class="row h-10 centerFlexCont">

						<div class="row playBar w-75">
							<div class="playBar-bar">
								<div class="playBar-progress" data-progress="0">
									<div class="playBar-node"></div>
								</div>
							</div>
						</div>
						<div class="row w-100">
							<div class="col-5 centerFlexCont play-quizName">Quiz Name</div>
							<div class="col"></div>
							<div class="col-5 play-songDetails centerFlexCont">Artist - Songname</div>
						</div>

					</div>
					<div class="row h-90 w-100 centerFlexCont quizCont mx-0 px-3">
						<div class="barrCont w-100">
							<div class="barr freq-2"></div>
							<div class="barr freq-3"></div>
							<div class="barr freq-4"></div>
							<div class="barr freq-6"></div>
							<div class="barr freq-8"></div>
							<div class="barr freq-12"></div>
							<div class="barr freq-16"></div>
							<div class="barr freq-24"></div>
							<div class="barr freq-32"></div>
							<div class="barr beat-1"></div>
							<div class="barr beat-2"></div>
							<div class="barr beat-3"></div>
							<div class="barr beat-4"></div>
							<div class="barr step-32"></div>
							<div class="barr step-24"></div>
							<div class="barr step-16"></div>
							<div class="barr step-12"></div>
							<div class="barr step-8"></div>
							<div class="barr step-6"></div>
							<div class="barr step-4"></div>
							<div class="barr step-3"></div>
							<div class="barr step-2"></div>
						</div>
						<!-- <div class="moveBtnLeft btn formBtn"><i class="fas fa-caret-square-left"></i></div>
						<div class="moveBtnRight btn formBtn"><i class="fas fa-caret-square-right"></i></div> -->
						<div class="quizContCard card quizCard centerFlexCont h-80 h-md-90 w-xs-100 rounded">
							
						</div>
						<!-- <div class="introCard h-80 h-md-90 w-60 rounded">
							<div class="card my-1 mx-5 quizCard h-100 w-100">
								<div class="card-header p-2">
									<div class="play-quizName c3-bg p-1 c0-txt rounded font-125">Quiz Name</div>
									<div class="play-quizName c2-bg p-1 m-1 c0-txt rounded text-right">by <span class="play-quizAuthor">UserName</span></div>
								</div>
								<div class="card-body w-100 h-100 centerFlexCont">
									<div class="m-1 p-2 w-95 h-95">
										<div class="play-disclaimer p-2 c3-bg c0-txt rounded">
											The quiz needs you to complete all the questions before the song ends. While you could try to play without music.
										</div>
										<div class="h4 p-3 centerFlexCont">Ready?</div>
										<div class="play-intro p-2 centerFlexCont">
											<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn font-150">
												<i class=" fas fa-play mx-2"></i><span class="thiccBtnText font-0">Play</span>
											</button>
										</div>
										<div class="play-intro p-3 centerFlexCont">
											<button class="btn formBtn p-2 px-3 quitIntroPlayBtn thiccBtn">
												<i class=" fas fa-times mx-2"></i><span class="thiccBtnText font-0">Quit</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div> -->
						<!-- <div class="pauseCard h-80 h-md-90 w-90 rounded">
							<div class="card my-1 mx-5 quizCard h-100 w-100">
								<div class="card-body w-100 h-100 centerFlexCont">
									<div class="centerFlexCont w-100">
										<div class="m-1 p-2 w-95 h-95">
											<div class="h4 p-3 centerFlexCont">Quiz has been paused</div>
											<div class="play-intro p-2 centerFlexCont">
												<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn">
													<i class=" fas fa-play mx-2"></i><span class="thiccBtnText font-0">Continue</span>
												</button>
												<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn">
													<i class=" fas fa-stop mx-2"></i><span class="thiccBtnText font-0">Quit</span>
												</button>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div> -->
						<!-- <div class="completeCard h-80 h-md-90 w-90 rounded">
							<div class="card my-1 mx-5 quizCard h-100 w-100">
								<div class="card-body w-100 h-100 centerFlexCont p-3">
									<div class="centerFlexCont w-40">
										<div class="m-1 p-2 w-95 h-95">

											<div class="row w-80 rounded">
												<div class="col h3 p-2">Username</div>
											</div>
											<div class="row w-100 m-1">
												<div class="col c2-bg c0-txt p-2 play-quizName rounded font-125">Quizname</div>
											</div>
											<div class="row w-100 m-1 text-right">
												<div class="col c0-bg c3-txt p-1 rounded">by <span class="play-Username">Username</span></div>
											</div>
											<div class="row rowGap m-3"></div>
											<div class="row w-100 text-center">
												<div class="col p-2">Score</div>
												<div class="col c3-bg c0-txt p-2 rounded play-Score">0</div>
											</div>
											<div class="row rowGap m-3"></div>
											<div class="row m-0">Song</div>
											<div class="row w-100 m-1 text-center">
												<div class="col c2-bg c0-txt p-2 play-songAuthor">Song Author</div>
												<div class="col c3-bg c0-txt p-2 play-songTitle">Song Name</div>
											</div>

										</div>
									</div>
									<div class="centerFlexCont w-60">
										<div class="m-1 p-2 w-95 h-95">
											<div class="h4 p-3 centerFlexCont">Quiz completed</div>
											<div class="play-intro p-2 centerFlexCont">
												<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn">
													<i class=" fas fa-redo-alt mx-2"></i><span class="thiccBtnText font-0">Retry</span>
												</button>
												<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn">
													<i class=" fas fa-angle-right mx-2"></i><span class="thiccBtnText font-0">Next Quiz</span>
												</button>
												<button class="btn formBtn p-3 startIntroPlayBtn thiccBtn">
													<i class=" fas fa-stop mx-2"></i><span class="thiccBtnText font-0">Quit</span>
												</button>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div> -->
						
					</div>
				</div>
			</div>
			<div class="row h-15 my-0">
				<div class="homeContainer col mx-1" id="containerFooter">
					<div class="row w-100">
						<div class="col align-items-end text-center">
							<div class="row m-2 font-125">
								<div class="col play-Username">Username</div>
							</div>
							<div class="row m-2">
								<div class="col">Score</div>
								<div class="col c3-bg c0-txt play-Score" data-play-score="0">0</div>
							</div>
						</div>
						<div class="col-4 col-md-2 centerFlexCont">
							<div class="btn formBtn footerBtn mx-0 thiccBtn font-110" id="confirmPlayBtn">
								<i class="fas fa-play mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Confirm</span>
							</div>
						</div>
						<div class="col centerFlexCont">
							<div class="btn formBtn footerBtn mx-0 thiccBtn" id="mutePlayBtn">
								<i class="fas fa-volume-up mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Mute</span>
							</div>
							<div class="btn formBtn footerBtn mx-0 thiccBtn" id="prevPlayBtn">
								<i class="fas fa-angle-double-left mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Prev</span>
							</div>
							<div class="btn formBtn footerBtn mx-0 thiccBtn" id="pausePlayBtn">
								<i class="fas fa-pause mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Pause</span>
							</div>
							<div class="btn formBtn footerBtn mx-0 thiccBtn" id="nextPlayBtn">
								<i class="fas fa-angle-double-right mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Next</span>
							</div>
							<div class="btn formBtn footerBtn mx-0 thiccBtn" id="quitPlayBtn">
								<i class="fas fa-stop mx-2"></i><span class="footerBtnText font-xs-100 font-md-0 thiccBtnText">Quit</span>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
	<div class="popUpArea container-fluid">
		<div class="popUpOverlay opacity-60 h-100 w-100 c0-bg">
		</div>
		<div class="popUpBox card cI-bg pt-5 px-5 pb-3 font-120">
			<div class="btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt"><i class="fas fa-window-close"></i></div>
			<div class="card-title">Problem?</div>
			<div class="row card-body text-right">
				<button class="col btn formBtn font-100 mx-3 popUpBtnYes">Yes! Yes!</button>
				<button class="col btn formBtn font-100 mx-3 popUpBtnNo">No.</button>
			</div>
		</div>
	</div>

	<div id="myMouse"></div>

	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<!-- anime.js -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js"></script>

	<!-- My Modules/Scripts -->
	<!-- <script type="module" src="./js/homescript.js"></script> -->
	<script type="module" src="./js/playscript.js"></script>
</body>
</html>