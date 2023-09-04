<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	
	<meta name="author" content="35_Chifamba">
	<meta name="application-name" content="Just Bops & Quizzes">

	<!-- Favicons -->
	<link rel="shortcut icon" sizes="64x64" type="image/x-icon" href="../img/favicon/favicon.ico"/>
	<link rel="shortcut icon" sizes="16x16 24x24" type="image/x-icon" href="../img/favicon/favicon-16x16.png"/>
	<link rel="shortcut icon" sizes="32x32 48x48" type="image/x-icon" href="../img/favicon/favicon-32x32.png"/>
	<link rel="apple-touch-icon" href="img/favicon/apple-touch-icon.png"/>
	<link rel="android-chrome" href="img/favicon/android-chrome-192x192.png"/>

	<!-- BootStrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous"/>
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous"/> -->

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
	
	<!-- My Stylesheets files -->
	<link rel="stylesheet" type="text/css" href="../css/bstrap.css"/>
	<link rel="stylesheet" type="text/css" href="../css/myMouse.css"/>
	<link rel="stylesheet" type="text/css" href="../css/main.css"/>

	<link rel="stylesheet" type="text/css" href="../css/signup.css"/>
	

	<title>SignUp - Just Bops & Quizzes</title>
	<style></style>
</head>
<body>
	<?php
		include_once 'myHelperFunctions.php';
		$DataJSON = file_get_contents('php://input');
		if(empty($_POST)||is_null($_POST)||!isset($_POST)){
			$Data = json_decode($DataJSON,true);	//convert to associative array
			console_log('using php://input');
		}else{
			$Data = $_POST;
			console_log('using $_POST');
		}
		$emailFromSplashPage = "";
		if(is_array($Data) && array_key_exists('email', $Data))
			$emailFromSplashPage = $Data['email'];
	?>
	<div class="main-container container-fluid">
		<div class="row py-2 m-0 h-100">
			<div class="col-sm-0 col-md"></div>
			<div class="homeContainer col-sm-12 col-md-8 m-1 my-lg-3 mr-lg-3" id="containerR">
				<div class="row h-sm-10 h-md-5"></div>
				<div class="row my-sm-0 my-lg-2 mx-3">
					<div class="col alert formLog logg"> </div>
				</div>
				<div class="row py-sm-1 py-lg-2 h-50">
					<div class="col"></div>
					<div class="col-sm-12 col-lg-11">
						<form method="POST" id="loginForm">
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="fname">First Name:</label>
								</div>
								<div class="col">
									<input type="text" id="fname" class="inputBox inputRightAlign form-control" name="fname" placeholder="Allium">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="sname">Surname:</label>
								</div>
								<div class="col">
									<input type="text" id="sname" class="inputBox inputRightAlign form-control" name="sname" placeholder="Dais">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="username">Username:</label>
								</div>
								<div class="col">
									<input type="text" id="username" class="inputBox inputRightAlign form-control" name="username" placeholder="allium_dais">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="password">Password:</label>
								</div>
								<div class="col">
									<input type="password" id="password" class="inputBox inputRightAlign form-control" name="pass">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="confirmPassword">Confirm Password:</label>
								</div>
								<div class="col">
									<input type="password" id="confirmPassword" class="inputBox inputRightAlign form-control" name="confirmPassword">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="email">Email:</label>
								</div>
								<div class="col">
									<input type="email" id="email" class="inputBox inputRightAlign form-control" 
									<?php 
										echo 'value="'.$emailFromSplashPage.'"';
									?>
									name="email" placeholder="alliumdais@email.com">
								</div>
							</div>
							<div class="row my-1 mx-1">
								<div class="col-3 mr-2">
									<label class="inputLeftAlign" for="dob">DOB:</label>
								</div>
								<div class="col">
									<input type="text" id="dob" class="inputBox inputRightAlign form-control" name="dob" placeholder="06/09/1969" onfocus="(this.type='date')">
								</div>
							</div>
							<div class="row my-sm-3 my-lg-5">
							</div>
							<div class="row my-sm-3 my-lg-5 mx-1">
								<div class="col"></div>
								<div class="col-6 text-center">
									<div class="bopRing signupRing"></div>
									<div class="h4">Sign Up!</div>
								</div>
								<div class="col"></div>
							</div>
						</form>
					</div>
					<div class="col"></div>
				</div>
			</div>
			<div class="col-sm-0 col-md"></div>
		</div>
	</div>

	<div id="myMouse"></div>

	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<!-- anime.js -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js"></script>

	<!-- My Modules/Scripts -->
	<script type="module" src="../js/mainscript.js"></script>
	<script type="module" src="../js/myMouse.js"></script>
	<script type="module" src="../js/signup_script.js"></script>
</body>
</html>