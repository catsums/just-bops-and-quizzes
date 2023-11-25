<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	
	<meta name="author" content="35_Chifamba">
	<meta name="application-name" content="Just Bops & Quizzes">

	<!-- Favicons -->
	<link rel="shortcut icon" sizes="64x64" type="image/x-icon" href="img/favicon/favicon.ico"/>
	<link rel="shortcut icon" sizes="16x16 24x24" type="image/x-icon" href="img/favicon/favicon-16x16.png"/>
	<link rel="shortcut icon" sizes="32x32 48x48" type="image/x-icon" href="img/favicon/favicon-32x32.png"/>
	<link rel="apple-touch-icon" href="img/favicon/apple-touch-icon.png"/>
	<link rel="android-chrome" href="img/favicon/android-chrome-192x192.png"/>

	<!-- BootStrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous"/>
	<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous"/> -->

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
	
	<!-- My Stylesheets files -->
	<link rel="stylesheet" type="text/css" href="css/bstrap.css"/>
	<link rel="stylesheet" type="text/css" href="css/myMouse.css"/>
	<link rel="stylesheet" type="text/css" href="css/main.css"/>
	
	<link rel="stylesheet" type="text/css" href="css/home.css"/>

	<title>Home - Just Bops & Quizzes</title>
	<style></style>
</head>
<body>
	<div class="main-container container-fluid">
		<div class="row py-2 m-0 h-100">
			<div class="homeContainer col-sm-12 col-md mx-1 my-lg-3" id="containerL">
				
			</div>

			<div class="homeContainer col-sm-12 col-md-6 col-lg-7 mx-0 my-lg-3" id="containerM">
				<div class="mySlideContainer h-90 m-3">
					
				</div>
			</div>

			<div class="homeContainer col-sm-12 col-md mx-1 my-lg-3" id="containerR">
				
			</div>	
		</div>
	</div>
	<div class="popUpArea container-fluid">
		<div class="popUpOverlay opacity-60 h-100 w-100 c0-bg">
		</div>
		<div class="popUpBox card cI-bg pt-5 px-5 pb-3 font-120">
			<div class="btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt"><i class="fas fa-window-close"></i></div>
			<div class="card-title">Popup</div>
			<div class="row card-body text-right">
				<button class="col btn formBtn font-100 mx-3 popUpBtnYes">Yes.</button>
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
	<script type="module" src="./js/homescript.js"></script>
</body>
</html>