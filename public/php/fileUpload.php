<?php 

session_start();
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: access");
//header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

error_reporting(0);
ini_set('display_errors', 0);

include_once 'myHelperFunctions.php';


$json = file_get_contents('php://input');

header("HTTP/1.1 200 OK"); 

main();

function main(){
	global $json;


	// $jsonData = json_decode($json,true);
	// echo response(false,json_encode($jsonData));
	// echo response(false,json_encode($_POST));
	// echo response(false,json_encode($_FILES));
	// return;
	
	if(!array_key_exists('file',$_FILES) || empty($_FILES['file'])){
		echo response(false,'No File was received for upload');
		return;
	}

	if(is_array($_FILES['file']['name'])){
		$filesCount = count($_FILES['file']['name']);
		for ($i=0; $i < $filesCount; $i++) { 
			if ($_FILES['file']['error'][$i]) {
				echo response(false,'An error has occured on file: '.$_FILES['file']['name'][$i]);
				return;
		    }

		    $target_dir = "";
		    if(strStartsWith($_FILES['file']['type'][$i],'image/')) {
		    	$target_dir = "./../data/image/";
		    }else if(strStartsWith($_FILES['file']['type'][$i],'audio/')) {
		    	$target_dir = "./../data/audio/";
		    }else if(strStartsWith($_FILES['file']['type'][$i],'application/json')) {
		    	$target_dir = "./../data/json/";
		    }else {
		    	$target_dir = "./../data/misc/";
		    }

		    $target_path = $target_dir.$_FILES['file']['name'][$i];
			/*$fileSizeLimit = 1; //in KB
			if($_FILES['image']['size']<($fileSizeLimit*100)){
				echo response(false,"File is too smol. Please send a file more than ".$fileSizeLimit."KB large.");
				return;
			}*/
			if(!move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_path)){
				echo response(false,'Error in uploading image file: '.$_FILES['file']['name'][$i]);
				return;
			}
		}
	}else{
		if ($_FILES['file']['error']) {
			echo response(false,'Error: '.$_FILES['file']['error']);
			return;
	    }

	    $target_dir = "";
	    if(strStartsWith($_FILES['file']['type'],'image/')) {
	    	$target_dir = "./../data/image/";
	    }else if(strStartsWith($_FILES['file']['type'],'audio/')) {
	    	$target_dir = "./../data/audio/";
	    }else if(strStartsWith($_FILES['file']['type'],'application/json')) {
	    	$target_dir = "./../data/json/";
	    }else {
	    	$target_dir = "./../data/misc/";
	    }

	    $target_path = $target_dir.$_FILES['file']['name'];
		/*$fileSizeLimit = 1; //in KB
		if($_FILES['image']['size']<($fileSizeLimit*100)){
			echo response(false,"File is too smol. Please send a file more than ".$fileSizeLimit."KB large.");
			return;
		}*/
		if(!move_uploaded_file($_FILES['file']['tmp_name'], $target_path)){
			echo response(false,'Error in uploading image.');
			return;
		}
	
	}
    echo response(true,'File(s) uploaded successfully!');
}

?>