<?php 

// session_start();
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: access");
//header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

error_reporting(0);
ini_set('display_errors', 0);

include_once 'myHelperFunctions.php';

$json = file_get_contents('php://input');
if(empty($_POST)||is_null($_POST)||!isset($_POST)){
	$jsonData = json_decode($json,true);	//convert to associative array
	// console_log('using php://input');
}else{
	$jsonData = $_POST;
	// console_log('using $_POST');
}

header("HTTP/1.1 200 OK"); 

main();

function main(){
	global $jsonData;

	// if(is_array($jsonData))
	// 	echo json_encode($jsonData);
	// else{
	// 	echo "no.";
	// }
	// return;

	if(!is_array($jsonData)){
		echo response(false,'No Data was sent to server');
		return;
	}

	$request = new APIRequest();
	if(is_array($jsonData) && array_key_exists('key', $jsonData)){
		$request->key = $jsonData['key'];
	}
	if(is_array($jsonData) &&  array_key_exists('type',$jsonData)){
		$type = $jsonData['type'];
	}
	$refLocation = "http://localhost/IMY220/PROJECT/myProject/php/";
	// $refLocation = "http://localhost/IMY220/u19024895/php/";
	// $refLocation = "./";
	// 
	$result = $request->callAPI('POST',$refLocation.'handler.php',$jsonData);	//for some reason nested associated array does not work
	// echo $result;

	if(!$result){
		http_response_code(400);
		echo $request->response(false,"No result/Empty request @ {$refLocation}");
	}else{
		http_response_code($request->code);
		if(is_array(json_decode($result,true))){
			echo $result;
		}else{
			echo $request->response(false,$result);
		}
	}
	return;
}

class APIRequest{
	public $key;
	public $type;
	public $data;
	public $code;

	public function __construct($key=""){
		$this->key = $key;
	}

	function callAPI($method,$url,$data=[]){
		$username = 'u19024895';
		$password = 'uqocytju';
		// if(!isset($data)){
		// 	$data = $this->data;
		// }
		$curl = curl_init();
		switch (strtoupper($method)) {
			case 'POST':
				curl_setopt($curl, CURLOPT_POST, true);
				curl_setopt($curl,CURLOPT_POSTFIELDS, http_build_query($data));
				break;
			case 'PUT':
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
				curl_setopt($curl,CURLOPT_POSTFIELDS, http_build_query($data));
				break;
			default: //assume its GET
				$url = sprintf("%s?%s",$url,http_build_query($data));
				break;
		}
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);  
		// curl_setopt($ch, CURLOPT_HTTPHEADER,
		// 	["Authorization: Basic ".base64_encode($username.":".$password), ]
		// );

		$result = curl_exec($curl);
		curl_close($curl);
		if(!$result)
			return false;

		$code = curl_getinfo($curl)['http_code'];
		
		$this->$code = $code;
		if($code < 200 || $code >= 300){
			return $result;
		}
		else{
			return $result;
		}
	}
	function response($success=false, $message = "", $data="")
	{
		return json_encode([
			"success" => $success,
			"message" => $message,
			"data" => $data
		]);
	}
}

?>