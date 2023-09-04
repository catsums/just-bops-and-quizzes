<?php 
/*SQL Handler*/

/*
    Cassim Chifamba - u19024895
 */
// session_start();
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
// header("Access-Control-Allow-Methods: POST");
//header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_reporting(0);
ini_set('display_errors', 0);

include_once 'database.php';
include_once 'myHelperFunctions.php';

$database = new Database();
if(!$database->connect()){
    http_response_code(400);
    die(response(false,"Error: Failed to Connect to Database.".$database->conn->connect_error));
}
// die(response(false,json_encode($database)));

$Data = "";
$DataJSON = file_get_contents('php://input');
if(empty($_POST)||!isset($_POST)){
   $Data = json_decode($DataJSON,true);    //convert to associative array
    // echo "YeeE";
    // echo json_encode($_POST);
    // echo json_encode($Data);
}else{
    $Data = $_POST;
    // echo "REEE";
    // echo json_encode($_POST);
}

if(!is_array($Data)){
    http_response_code(400);
    die(response(false,"Error in request: No Data"));
}

$responseCode = 200;
$SALT = "d33Z_NUT5";
$SECRET_SALT = "can_we_pretend_that_aIrplanes_In_the_nIght_sky_are_lIke_shooting_stars_I_could_really_use_a_wIsh_right_now";

/*
$DBConnection = mysqli_connect('localhost','dbusername','dbpassword','dbName');
$query = "SELECT * tbquizzes WHERE userID='UserIDHere' ";
$res = mysqli_query($DBConnection, $query);
//get all rows as a single array
$rows = mysqli_fetch_all($res,MYSQLI_ASSOC);
$rows = [
    [
        'quizID'=>'QuizID',
        'description'=>'DescriptionHere',
        'userID'=>'UserIDHere'
    ],
    [
        'quizID'=>'QuizID2',
        'description'=>'DescriptionHere2',
        'userID'=>'UserIDHere'
    ],
];

$rows = mysqli_fetch_array($res,MYSQLI_ASSOC);
$rows = [
    'quizID'=>'QuizID',
    'description'=>'DescriptionHere',
    'userID'=>'UserIDHere'
];
//use function again to get the next row
$rows = mysqli_fetch_array($res,MYSQLI_ASSOC);
$rows = [
    'quizID'=>'QuizID2',
    'description'=>'DescriptionHere2',
    'userID'=>'UserIDHere'
];
$res->free_result();
$DBConnection->close();
 */

main();

function main(){
    global $database, $DataJSON, $Data, $responseCode;
    $DB = $database;
	/*
    data = {
        type: 'myRequestType',
        subType: 'myRequestSubType',
        key: 'myAPIkey',
        data: {
            //any required data for the handler
        }
    }   
     */
    session_start();
    /*
    result = {
        success: true||false
        message: "message",
        data: {
            //received data here
        }
    }
     */
    $requestType = "";
    if(array_key_exists('type',$Data))
        $requestType = $Data['type'];
    $result = '';
    if(!is_array($Data) || !array_key_exists('data', $Data) || empty($Data['data'])){
        http_response_code(400);
        session_destroy();
        die(response(false,"Error in request: No data available"));
    }

    // die(response(false,json_encode($Data)));

    switch ($requestType) {
        case 'signup':
            //check if username/email exists
            
            $userExists = checkUser($database,$Data['data']);
            if($userExists){
                $result = response(false,'Username/Email already exists');
            }
            else{
                
                // $result = response(false,'LMAO NO U CAN HAVE FREE PESOS');
                $result = createUser($database,$Data['data']);
            }
            break;
        case 'login':
            $userExists = checkUser($database,$Data['data']);
            if(!$userExists){
                $result = response(false,'Username/Email does not exist...maybe sign up?');
            }
            else{
                $result = loginUser($database,$Data['data']);
            }
            break;
        // case 'logout':
        //     $result = logoutUser($database,$Data['data']);
        //     break;
        case 'user':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if(verify($database,$Data['key'],$Data['id'])){
                $subType = $Data['subType'];
                switch($subType){
                    case 'get':
                        $result = getUser($database,$Data['data']);
                        break;
                    case 'getAll':
                        $result = getUser($database,$Data['data'],true);
                        break;
                    case 'check':
                        $check = checkUser($database,$Data['data']);
                        if($check){
                            $result = response(true,'User exists',$check);
                        }else{
                           $result = response(false,'User does not exists',$check); 
                        }
                        break;
                    case 'create':
                        $result = createUser($database,$Data['data']);
                        break;
                    case 'edit':
                        $result = editUser($database,$Data['data']);
                        break;
                    case 'delete':
                        $result = deleteUser($database, $Data['data']);
                        break;
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        case 'quiz':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if( verify($database,$Data['key'],$Data['id']) ){
                $subType = $Data['subType'];
                switch($subType){
                    /*case 'check':
                        $result = checkQuiz($database,$Data['data']);
                        break;*/
                    case 'get':
                        $result = getQuiz($database,$Data['data']);
                        break;
                    case 'getAll':
                        $result = getQuiz($database,$Data['data'],true);
                        break;
                    case 'create':
                        $result = createQuiz($database,$Data['data']);
                        break;
                    case 'edit':
                        $result = editQuiz($database,$Data['data']);
                        break;
                    case 'delete':
                        $result = deleteQuiz($database, $Data['data']);
                        break;
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        case 'playlist':
            $result = getSong($database,$Data['data'],true);
            break;
        
        case 'list':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if( verify($database,$Data['key'],$Data['id']) ){
                $subType = $Data['subType'];
                switch($subType){
                   /* case 'check':
                        $result = checkList($database,$Data['data']);
                        break;*/
                    case 'get':
                        $result = getList($database,$Data['data']);
                        break;
                    case 'getAll':
                        $result = getList($database,$Data['data'],true);
                        break;
                    case 'create':
                        $result = createList($database,$Data['data']);
                        break;
                    case 'edit':
                        $result = editList($database,$Data['data']);
                        break;
                    case 'delete':
                        $result = deleteList($database, $Data['data']);
                        break;
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        case 'song':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if(verify($database,$Data['key'],$Data['id'])){
                $subType = $Data['subType'];
                switch($subType){
                    case 'get':
                        $result = getSong($database,$Data['data']);
                        break;
                    /*case 'check':
                        $result = checkSong($database,$Data['data']);
                        break;*/
                    case 'create':
                        $result = createSong($database,$Data['data']);
                        break;
                    /*case 'edit':
                        $result = editSong($database,$Data['data']);
                        break;
                    case 'delete':
                        $result = deleteSong($database, $Data['data']);
                        break;*/
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        case 'verify':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key missing');
            }else{
                $userExists = checkUser($database,$Data['data']);
                if(!$userExists){
                    $result = response(false,'Username does not exist');
                }else{
                    $result = verifyKey($database,$Data['key'],$Data['data']);
                }
            }
            break;
        case 'search':

            break;
        case 'connect':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if(verify($database,$Data['key'],$Data['id'])){
                $subType = $Data['subType'];
                switch($subType){
                    case 'addFriend':
                        $result = addFriend($database,$Data['data'],$Data['id']);
                        break;
                    case 'removeFriend':
                        $result = removeFriend($database,$Data['data'],$Data['id']);
                        break;
                    case 'addFollow':
                        $result = addFollow($database,$Data['data'],$Data['id']);
                        break;
                    case 'removeFollow':
                        $result = removeFollow($database,$Data['data'],$Data['id']);
                        break;
                    case 'addScore':
                        $result = addScore($database,$Data['data'],$Data['id']);
                        break;
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        case 'activity':
            if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: API Key is missing');
            }else if(!array_key_exists('key',$Data)||empty($Data['key'])){
                $result = response(false,'Error: UserID for verification is missing');
            }else if(verify($database,$Data['key'],$Data['id'])){
                $subType = $Data['subType'];
                switch($subType){
                    case 'get':
                        $result = getActivity($DB,$Data['data']);
                        break;
                    case 'getAll':
                        $result = getActivity($DB,$Data['data'],true);
                        break;
                    case 'set':
                        $result = setActivity($DB,$Data['data']);
                        break;
                    default:
                        setResponseCode(501);   //Not Implemented
                        die(response(false,'Invalid APIRequest. Sub type is not implemented or non-existent.'));
                        break;
                }
            }else{
                $result = response(false,'Invalid API Request. Please use a valid api key and be logged in.');
            }
            break;
        
        default:
            setResponseCode(501);   //Not Implementeed
            die(response(false,'Invalid APIRequest. API request type is not implemented or non-existent.'));
            break;
    }
    http_response_code($responseCode);
    echo $result;
    session_unset();
    session_destroy();
}

/*function testA($database,$data){
    $r = $database->insert('tbusers',$data);
    echo $r;
}*/

function verify($DB,$key,$id){

    if(empty($id)) return false;
    if(empty($key)) return false;

    $res = $DB->select('tbapikeys','*',['apikey'=>$key, 'userID'=>$id]);
    // $res = $DB->querySelect('tbapikeys','*',['apikey'=>$key, 'userID'=>$id]);
    // echo response(false, $res);
    // die();

    $keys = mysqli_fetch_all($res,MYSQLI_ASSOC);
    if(count($keys)>0){
        setResponseCode(202);   //Accepted
        return true;
    }else{
        setResponseCode(401);   //Bad Request
        return false;
    }
    return false;
}

function verifyKey($DB,$key,$data){

    if(!array_key_exists('id', $data)||empty($data['id'])) return response(false,'User Id is missing');

    $res = $DB->select('tbapikeys','*',['apikey'=>$key, 'userID'=>$data['id']]);
    // $res = $DB->querySelect('tbapikeys','*',['apikey'=>$key, 'userID'=>$data['id']]);
    // return response(false,$res);

    $keys = mysqli_fetch_all($res,MYSQLI_ASSOC);
    if(count($keys)>0){
        setResponseCode(202);   //Accepted
        return response(true,"User's request is verified",$keys[0]);
    }else{
       setResponseCode(401);   //Bad Request
        return response(false, "Authentication failed"); 
    }
}

function createSecretKey($DB,$data){
    global $SECRET_SALT, $SALT;

    $skey = hash('md5', $SECRET_SALT.$data['id'].randomString(8));

    $res = $DB->update('tbusers',['secretkey'=>$skey], [ 'id'=>$data['id'] ]);
    if($res) return true;
    return false;
}

function createAPIkey($DB,$data,$skey){
    global $SECRET_SALT, $SALT;

    if(!array_key_exists('id', $data)||empty($data['id'])) return response(false,'User Id is missing');
    
    $apikey = hash('md5',randomString(8).$skey);
    $id = hash('adler32',$apikey).randomString(1);

    $parsedData = [
        'id'=>$id,
        'apikey'=>$apikey,
        'userID'=>$data['id']
    ];
    // $res = $DB->queryInsert('tbapikeys',$parsedData);
    // return response(false,$res);
    $res = $DB->insert('tbapikeys',$parsedData);
    if($res) return response(true,'Successfully generated API key',$apikey);
    return response(false,'Failed to generate API key');
}

///USER API FUNCTIONS///

function checkUser($DB,$data){
    if(!array_key_exists('username', $data) && !array_key_exists('id', $data)) return false;
    if(empty($data['username']) && empty($data['id'])) return false;


    $parsedData = [
        'username'=> array_key_exists('username', $data)?$data['username']:'',
        '?email'=> array_key_exists('email', $data)?$data['email']:(array_key_exists('username', $data)?$data['username']:''),
        '?id'=> array_key_exists('id', $data)?$data['id']:(array_key_exists('username', $data)?$data['username']:''),
    ];
    
    $res = $DB->select('tbusers','*',$parsedData,true);
    // $res = $DB->querySelect('tbusers','*',$parsedData,true);
    // die(response(false,$res));

    if(empty($res)) return false;

    $user = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($user)>0){
        return true;
    }
    return false;
}

function createUser($DB,$data){
    global $SALT;
	/*
    parsedData = {
        id: 'hashGeneratedFromRandString&Username',
        username: 'Username',
        firstname: 'First',
        lastname: 'Last',
        DOB: '01-01-2000',
        password: 'encryptedText',
        email: 'username@email.com',
        pfp: 'url',
    }
     */
    if(!array_key_exists('username', $data)||empty($data['username'])) return response(false,'Username is missing');
    if(!array_key_exists('fname', $data)||empty($data['fname'])) return response(false,'First Name is missing');
    if(!array_key_exists('sname', $data)||empty($data['sname'])) return response(false,'Surname is missing');
    if(!array_key_exists('dob', $data)||empty($data['dob'])) return response(false,'DOB is missing');
    if(!array_key_exists('email', $data)||empty($data['email'])) return response(false,'Email is missing');
    if(!array_key_exists('pass', $data)||empty($data['pass'])) return response(false,'Password is missing');
    // else return response(false,'Somehow this data caught ligma');

    $parsedData = [
        'username'=> array_key_exists('username', $data)?$data['username']:'',
        'firstname'=> array_key_exists('fname', $data)?$data['fname']:'',
        'lastname'=> array_key_exists('sname', $data)?$data['sname']:'',
        'DOB'=> array_key_exists('dob', $data)?$data['dob']:'',
        'email'=> array_key_exists('email', $data)?$data['email']:'',
        'dateCreated'=> date("Y-m-d H:i:s"),
        'roleID'=> '00000000',
    ];

    $id = hash('adler32', $data['username'].randomString(8));
    $pass = hash('crc32', $data['pass']) . hash('crc32b',$data['username'].$SALT);

    $parsedData['id'] = $id;
    $parsedData['password'] = $pass;

    $res = $DB->insert('tbusers',$parsedData);
    // $res = $DB->queryInsert('tbusers',$parsedData);
    // die(response(false,$res));
    if($res==true){
        if(createSecretKey($DB,$parsedData)){
            $currUserRes = json_decode(loginUser($DB,[
                'username'=> $data['username'],
                'pass'=> $data['pass'],
            ]),true);
            if(!$currUserRes['success']){
                setResponseCode(400);
                return response(false,"Authentication failed!".$currUserRes['message']);
            }
            $currUser = $currUserRes['data'];
            setResponseCode(201);   //Created
            return response(true,"User successfully created",$currUser); 
        }
        else{
            $DB->delete('tbusers',['username'=>$parsedData['username']]);
            setResponseCode(400);   //Bad Request
            return response(false,"Error in data. Possibly invalid data.");
        }
    }else{
        setResponseCode(400);
        return response(false,'Invalid Credentials');
    }
}

function loginUser($DB,$data){
    global $SALT;
    /*
    parsedData = {
        username: 'Username',
        password: 'encryptedText',
        ?email: 'username@email.com',
    }
     */
    if(!array_key_exists('username', $data)) return response(false,'Username/Email is missing');
    if(!array_key_exists('pass', $data)) return response(false,'Password is missing');

    $pass = hash('crc32', $data['pass']) . hash('crc32b',$data['username'].$SALT);
    $email = $data['username'];
    $parsedData = [
        'username'=>$data['username'],
        'password'=> $pass,
    ];

    // $res = $DB->select('tbusers','*',$parsedData,true);
    $res = $DB->selectJoin('tbusers',0,$parsedData,'tbroles',['name'=>'role','permissions'=>'permissions'],['roleID'=>'id'],true,"ORDER BY dateCreated DESC");
    if(!$res){
        //check for email instead
        $pparsedData = [
            'email'=>$data['username'],
            'password'=> $pass,
        ];
        $ress = $DB->select('tbusers','*',$pparsedData,true);
        if(!$ress){
            setResponseCode(400);   //Bad Request
            return response(false, 'Incorrect username/password');
        }else{
            $users = mysqli_fetch_all($ress,MYSQLI_ASSOC);
            if(count($users)<1){
                setResponseCode(400);   //Bad Request
                return response(false, 'Incorrect username/password?');
            }
            foreach($users as $user){
                $apiResObj = createAPIkey($DB,$user,$user['secretkey']);
                $apikeyRes = json_decode($apiResObj,true);
                if($apikeyRes['success']){
                    $user['apikey'] = $apikeyRes['data'];
                    setResponseCode(200);
                    return response(true, 'User logged in!', $user);
                }else{
                    setResponseCode(400);   //Bad Request
                    return response(false, 'Login failed. Authentication had a problem. '.$apikeyRes['message']);
                }
            }
            setResponseCode(400);   //Bad Request
            return response(false, 'User does not exist?');
            
        }
    }else{
        $users = mysqli_fetch_all($res,MYSQLI_ASSOC);
        if(count($users)<1){
            setResponseCode(400);   //Bad Request
            return response(false, 'Incorrect username/password');
        }
        foreach($users as $user){
            $apiResObj = createAPIkey($DB,$user,$user['secretkey']);
            $apikeyRes = json_decode($apiResObj,true);
            if($apikeyRes['success']){
                $user['apikey'] = $apikeyRes['data'];
                setResponseCode(200);
                return response(true, 'User logged in!', $user);
            }else{
                setResponseCode(400);   //Bad Request
                return response(false, 'Login failed. Authentication had a problem. '.$apikeyRes['message']);
            }
        }
        setResponseCode(400);   //Bad Request
        return response(false, 'User does not exist?');
        
    }
}
function logoutUser($DB,$data){
    /*
    parsedData = {
        username: 'Username',
        password: 'encryptedText',
        ?email: 'username@email.com',
    }
     */
    // if(!array_key_exists('id', $data)) return response(false,'Id is missing');
    if(!array_key_exists('apikey', $data)) return response(false,'apikey is missing');

    $parsedData = [
        // 'userID'=>$data['id'],
        'apikey'=> $data['apikey'],
    ];

    $res = $DB->delete('tbapikeys',$parsedData);
    if(!$res){
        setResponseCode(400);   //Bad Request
        return response(false, 'Failed to logout properly');
    }else{
        setResponseCode(201);   //Bad Request
        return response(true, 'Logged out successfully');
        
    }
}

function getUser($DB,$data,$all=false){
    /*
    parsedData = {
        username: 'username',
        ?id: 'userID'
    }
     */
    // if(!array_key_exists('username', $data) && !array_key_exists('id', $data)) return response(false,'Username/Id is missing');
    // if(empty($data['username']) && empty($data['id'])) return response(false,'Username/Id is missing');

    $parsedData = [];
    
    $kkeys = array_keys($data);
    foreach($kkeys as $key) {
        if($key!='options'){
            $parsedData[$key] = $data[$key];
        }
    }

    if(!array_key_exists('options',$data)||empty($data['options'])){
        $data['options'] = 0;
    }
    if(!$all){
        // $res = $DB->select('tbusers',$data['options'],$parsedData,true,"ORDER BY dateCreated DESC");
        $res = $DB->selectJoin('tbusers',$data['options'],$parsedData,'tbroles',['name'=>'role','permissions'=>'permissions'],['roleID'=>'id'],true,"ORDER BY dateCreated DESC");
    }else{
        // $res = $DB->selectAll('tbusers',$data['options'],true,"ORDER BY dateCreated DESC");
        $res = $DB->selectJoinAll('tbusers',$data['options'],'tbroles',['name'=>'role','permissions'=>'permissions'],['roleID'=>'id'],true,"ORDER BY dateCreated DESC");
    }
    // $res = $DB->querySelect('tbusers',$data['options'],$parsedData,true);
    // return response(false,$res);
    if(!$res){
        setResponseCode(404);   //Not found
        return response(false, 'Error in retrival info');
    }

    $user = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($user)>0){
        setResponseCode(200);   //OK
        return response(true, 'Fetched User info!', $user);
    }else{
        setResponseCode(404);   //Not found
        return response(false, 'User not found or does not exist');
    }
}

function editUser($DB,$data,$all=false){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    if(!array_key_exists('username', $data) && !array_key_exists('id', $data)) return response(false,'Username/Id is missing');
    if(!array_key_exists('options', $data)) return response(false,'Options are missing');

    $options = $data['options'];
    $parsedData = [
        'username'=> array_key_exists('username', $data)?$data['username']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:'',
    ];
    if(empty($options)){
        setResponseCode(400);
        return response(false,'Nothing to update');
    }
    if(!$all){
        $res = $DB->update('tbusers',$options,$parsedData);
    }else{
        $res = $DB->updateAll('tbusers',$options);
    }
    if($res){
        setResponseCode(200);
        return response(true,'User updated!',$data['options']);
    }else{
        setResponseCode(400);
        return response(false,'User could not be updated. Error in options');
    }
}

function deleteUser($DB,$data){
    /*
    parsedData = {
        username: 'username',
        id: 'userID',
        password: 'encryptedPassword'
    }
     */
    if(!array_key_exists('username', $data) && !array_key_exists('id', $data)) return response(false,'Username/Id is missing');
    // if(!array_key_exists('pass', $data)) return response(false,'Password is missing');

    // $pass = hash('crc32', $data['pass']) . hash('crc32b',$data['username'].$SALT);
    $parsedData = [
        'username'=> array_key_exists('username', $data)?$data['username']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:'',
        // 'password'=>$pass
    ];
    $res = $DB->delete('tbusers',$parsedData);
    if($res){
        $DB->delete('tblists',['userID'=>$data['id']]);
        $DB->delete('tbquizzes',['userID'=>$data['id']]);
        $DB->delete('tbapikeys',['userID'=>$data['id']]);
        setResponseCode(201);   //Created/Deleted
        return response(true, 'Deleted User Account');
    }else{
        setResponseCode(400); 
        return response(false, 'Failed to delete user account. Invalid Credentials');
    }
}

function addScore($DB,$data,$id){

    if(!array_key_exists('score', $data)) return response(false,'Score is missing');

    $updateScore = $data['score'];

    $currUserRes = json_decode(getUser($DB,[
        'id'=> $id,
    ]),true);
    if(!$currUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not update score. User does not exist');
    }
    $currUser = $currUserRes['data'][0];

    $initScore = $currUser['score'];
    $newScore = intval($initScore) + intval($updateScore);

    $res = $DB->update('tbusers',['score'=>$newScore],['id'=>$id]);
    if($res){
        setResponseCode(200);
        return response(true,'Score updated!',$data['options']);
    }else{
        setResponseCode(400);
        return response(false,'Score could not be updated. Error in options');
    }
}

function addFriend($DB,$data,$id){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    
    if(!array_key_exists('id', $data)) return response(false,'Id of potential friend is missing');

    $currUserRes = json_decode(getUser($DB,[
        'id'=> $id,
    ]),true);
    if(!$currUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add friend. User does not exist');
    }
    $currUser = $currUserRes['data'][0];
    $currFriendList = json_decode($currUser['friendlist'],true);

    $otherUserRes = json_decode(getUser($DB,[
        'id'=> $data['id'],
    ]),true);
    if(!$otherUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add friend. User does not exist');
    }
    $otherUser = $otherUserRes['data'][0];
    $otherFriendList = json_decode($otherUser['friendlist'],true);

    if(!is_array($currFriendList)||empty($currFriendList)){
        $currFriendList = [];
    }
     if(!is_array($otherFriendList)||empty($otherFriendList)){
        $otherFriendList = [];
    }

    if( (!in_array($id, $otherFriendList)) ){
        array_push($otherFriendList,$id);
    }else{
        setResponseCode(400);
        return response(false,'This user is already your friend!');
    }

    if( (!in_array($data['id'], $currFriendList)) ){
        array_push($currFriendList,$data['id']);
    }else{
        setResponseCode(400);
        return response(false,'This user is already your friend!');
    }
    
    $newCurrFriendList = json_encode($currFriendList);
    $newOtherFriendList = json_encode($otherFriendList);

    $res = $DB->update('tbusers',['friendlist'=>$newCurrFriendList],['id'=>$id]);
    if($res){
        $rres = $DB->update('tbusers',['friendlist'=>$newOtherFriendList],['id'=>$data['id']]);
        if($rres){
           setResponseCode(200);
            return response(true,'Friend Added!',json_encode($otherUser)); 
        }else{
            setResponseCode(400);
            return response(false,'Friend could not be added because of an error.');
        }
    }else{
        setResponseCode(400);
        return response(false,'Friend could not be added because of an error.');
    }
}

function removeFriend($DB,$data,$id){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    
    if(!array_key_exists('id', $data)) return response(false,'Id of potential friend is missing');

    $currUserRes = json_decode(getUser($DB,[
        'id'=> $id,
    ]),true);
    if(!$currUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not unfriend. User does not exist');
    }
    $currUser = $currUserRes['data'][0];
    $currFriendList = json_decode($currUser['friendlist'],true);

    $otherUserRes = json_decode(getUser($DB,[
        'id'=> $data['id'],
    ]),true);
    if(!$otherUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not unfriend. User does not exist');
    }
    $otherUser = $otherUserRes['data'][0];
    $otherFriendList = json_decode($otherUser['friendlist'],true);

    if(!is_array($currFriendList)||empty($currFriendList)){
        $currFriendList = [];
    }
     if(!is_array($otherFriendList)||empty($otherFriendList)){
        $otherFriendList = [];
    }

    if( (!in_array($id, $otherFriendList)) ){
        setResponseCode(400);
         // return response(false,"testY {$id} {$data['id']}");
        return response(false,'This user is not your friend, you can\'t unfriend them!');
    }else{
        $_init = 'null'; $item = 'null';
        for ($i=0; $i < $otherFriendList; $i++) { 
            $_item = $otherFriendList[$i];
            if($id==$_item){
                $_init = $i;
                break;
            }
        }
        if($_init=='null'){
            // return response(false,"testU {$id} {$data['id']} {$_item}");
            return response(false,'This user is not your friend, you can\'t unfriend them!');
        }
        array_splice($otherFriendList, $_init, 1);
        // array_push($otherFriendList,$id);
    }

    if( (!in_array($data['id'], $currFriendList)) ){
        setResponseCode(400);
         // return response(false,"testI {$id} {$data['id']}");
        return response(false,'This user is not your friend, you can\'t unfriend them!');
    }else{
        $_init = 'null'; $item = 'null';
        for ($i=0; $i < $currFriendList; $i++) { 
            $_item = $currFriendList[$i];
            if($data['id']==$_item){
                $_init = $i;
                break;
            }
        }
        if($_init=='null'){
            // return response(false,"testO {$id} {$data['id']} {$_item}");
            return response(false,'This user is not your friend, you can\'t unfriend them!');
        }
        array_splice($currFriendList, $_init, 1);
        // array_push($currFriendList,$data['id']);
    }
     // return response(false,"testP {$id} {$data['id']}");
    $newCurrFriendList = json_encode($currFriendList);
    $newOtherFriendList = json_encode($otherFriendList);

    $res = $DB->update('tbusers',['friendlist'=>$newCurrFriendList],['id'=>$id]);
    if($res){
        $rres = $DB->update('tbusers',['friendlist'=>$newOtherFriendList],['id'=>$data['id']]);
        if($rres){
           setResponseCode(200);
            return response(true,'Friend Removed!',json_encode($otherUser)); 
        }else{
            setResponseCode(400);
            return response(false,'Friend could not be removed because of an error.');
        }
    }else{
        setResponseCode(400);
        return response(false,'Friend could not be removed because of an error.');
    }
}


function addFollow($DB,$data,$id){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    
    if(!array_key_exists('id', $data)) return response(false,'Id of potential follower is missing');

    $currUserRes = json_decode(getUser($DB,[
        'id'=> $id,
    ]),true);
    if(!$currUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add user. User does not exist');
    }
    $currUser = $currUserRes['data'][0];
    $currFriendList = json_decode($currUser['following'],true);

    $otherUserRes = json_decode(getUser($DB,[
        'id'=> $data['id'],
    ]),true);
    if(!$otherUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add user. User does not exist');
    }
    $otherUser = $otherUserRes['data'][0];
    $otherFriendList = json_decode($otherUser['followers'],true);

    if(!is_array($currFriendList)||empty($currFriendList)){
        $currFriendList = [];
    }
     if(!is_array($otherFriendList)||empty($otherFriendList)){
        $otherFriendList = [];
    }

    if( (!in_array($id, $otherFriendList)) ){
        array_push($otherFriendList,$id);
    }else{
        setResponseCode(400);
        return response(false,'You already follow this user!');
    }

    if( (!in_array($data['id'], $currFriendList)) ){
        array_push($currFriendList,$data['id']);
    }else{
        setResponseCode(400);
        return response(false,'You already follow this user!');
    }
    
    $newCurrFriendList = json_encode($currFriendList);
    $newOtherFriendList = json_encode($otherFriendList);

    $res = $DB->update('tbusers',['following'=>$newCurrFriendList],['id'=>$id]);
    if($res){
        $rres = $DB->update('tbusers',['followers'=>$newOtherFriendList],['id'=>$data['id']]);
        if($rres){
           setResponseCode(200);
            return response(true,'You followed!',json_encode($otherUser)); 
        }else{
            setResponseCode(400);
            return response(false,'Follow could not be made because of an error.');
        }
    }else{
        setResponseCode(400);
        return response(false,'Follow could not be made because of an error.');
    }
}

function removeFollow($DB,$data,$id){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
   
    if(!array_key_exists('id', $data)) return response(false,'Id of potential follower is missing');

    $currUserRes = json_decode(getUser($DB,[
        'id'=> $id,
    ]),true);
    if(!$currUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add friend. User does not exist');
    }
    $currUser = $currUserRes['data'][0];
    $currFriendList = json_decode($currUser['following'],true);

    $otherUserRes = json_decode(getUser($DB,[
        'id'=> $data['id'],
    ]),true);
    if(!$otherUserRes['success']){
        setResponseCode(400);
        return response(false,'Could not add friend. User does not exist');
    }
    $otherUser = $otherUserRes['data'][0];
    $otherFriendList = json_decode($otherUser['followers'],true);
 
    if(!is_array($currFriendList)||empty($currFriendList)){
        $currFriendList = [];
    }
    if(!is_array($otherFriendList)||empty($otherFriendList)){
        $otherFriendList = [];
    }

    if( (!in_array($id, $otherFriendList)) ){
        setResponseCode(400);
        return response(false,'You are not following this user!');
    }else{
        $_init = 'null'; $_item = 'null';
        for ($i=0; $i < $otherFriendList; $i++) { 
            $_item = $otherFriendList[$i];
            if($id==$_item){
                $_init = $i;
                break;
            }
        }
        if($_init=='null'){
            // return response(false,"testI {$id} {$data['id']} {$_item}");
            return response(false,'You are not following this user!');
        }
        array_splice($otherFriendList, $_init, 1);
        // array_push($otherFriendList,$id);
    }

    if( (!in_array($data['id'], $currFriendList)) ){
        setResponseCode(400);
        return response(false,'You are not following this user!');
    }else{
        $_init = 'null'; $_item = 'null';
        for ($i=0; $i < $currFriendList; $i++) { 
            $_item = $currFriendList[$i];
            if($data['id']==$_item){
                $_init = $i;
                break;
            }
        }
        if($_init=='null'){
            // return response(false,"testO {$id} {$data['id']} {$_item}");
            return response(false,'You are not following this user!');
        }
        array_splice($currFriendList, $_init, 1);
        // array_push($currFriendList,$data['id']);
    }
    
    $newCurrFriendList = json_encode($currFriendList);
    $newOtherFriendList = json_encode($otherFriendList);

    $res = $DB->update('tbusers',['following'=>$newCurrFriendList],['id'=>$id]);
    if($res){
        $rres = $DB->update('tbusers',['followers'=>$newOtherFriendList],['id'=>$data['id']]);
        if($rres){
           setResponseCode(200);
            return response(true,'Follow Removed!',json_encode($otherUser)); 
        }else{
            setResponseCode(400);
            return response(false,'Follow could not be removed because of an error.');
        }
    }else{
        setResponseCode(400);
        return response(false,'Follow could not be removed because of an error.');
    }
}

///QUIZ API FUNCTIONS///

function createQuiz($DB,$data){
    /*
    parsedData = {
        id: 'hashGeneratedFromRandString&quizname&userID',
        name: 'qname',
        description: 'desc',
        userID: 'userID',
        imageURL: 'imageurl',
        hashtags: hashtagsArr
    }
     */
    if(!array_key_exists('qname', $data)||empty($data['qname'])) return response(false,'Quiz Name is missing');
    if(!array_key_exists('desc', $data)||empty($data['desc'])) return response(false,'Quiz Description is missing');
    if(!array_key_exists('userID', $data)||empty($data['userID'])) return response(false,'UserID is somehow missing');
    if(!array_key_exists('songID', $data)||empty($data['songID'])) $data['songID'] = '';
    if(!array_key_exists('hashtags', $data)||empty($data['hashtags'])) return response(false,'Hashtags are missing');
    if(!array_key_exists('questions', $data)||empty($data['questions'])) return response(false,'Question Data is missing');
    if(!array_key_exists('imageURL', $data)||empty($data['imageURL'])) $data['imageURL']='default.dat';
    if(!array_key_exists('passingGrade', $data)||empty($data['passingGrade'])) $data['passingGrade']=1;

    $parsedData = [
        'name'=> array_key_exists('qname', $data)?$data['qname']:'',
        'description'=> array_key_exists('desc', $data)?$data['desc']:'',
        'userID'=> array_key_exists('userID', $data)?$data['userID']:'',
        'songID'=> array_key_exists('songID', $data)?$data['songID']:'',
        'dateCreated'=> date("Y-m-d H:i:s"),
        'hashtags'=> array_key_exists('hashtags', $data)?$data['hashtags']:'[]',
        'questions'=> array_key_exists('questions', $data)?$data['questions']:'[]',
        'imageURL'=> array_key_exists('imageURL', $data)?$data['imageURL']:'default.dat',
        'passingGrade'=> array_key_exists('passingGrade', $data)?$data['passingGrade']:1,
    ];

    $id = hash('adler32', $data['qname'].$data['userID'].randomString(8));

    $parsedData['id'] = $id;

    $res = $DB->insert('tbquizzes',$parsedData);
    // $res = $DB->queryInsert('tbquizzes',$data);
    // return response(false,$res);
    if($res==true){
        setResponseCode(201);   //Created
        return response(true,"Quiz successfully created",json_encode($parsedData));
    }else{
        setResponseCode(400);
        return response(false,'Invalid Quiz Data');
    }
}
function getQuiz($DB,$data,$all=false){
    /*
    parsedData = {
        username: 'username',
        ?id: 'userID'
    }
     */
    // if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'QuizName/Id is missing');
    // if(empty($data['name']) && empty($data['id'])) return response(false,'QuizName/Id is missing');

    $parsedData = [];
    
    $kkeys = array_keys($data);
    foreach($kkeys as $key) {
        if($key!='options'){
            $parsedData[$key] = $data[$key];
        }
    }

    if(!array_key_exists('options',$data)||empty($data['options'])){
        $data['options'] = 0;
    }
    // $res = $DB->select('tbquizzes',$data['options'],$parsedData);
    if(!$all){
        $res = $DB->selectJoin('tbquizzes',$data['options'],$parsedData,'tbusers',['username'=>'username'],['userID'=>'id'],false,"ORDER BY dateCreated DESC");
    }else{
        $res = $DB->selectJoinAll('tbquizzes',$data['options'],'tbusers',['username'=>'username'],['userID'=>'id'],false,"ORDER BY dateCreated DESC");
    }
    // $res = $DB->querySelect('tbquizzes',$data['options'],$parsedData);
    // return response(false,$res);
    if(!$res){
        setResponseCode(404);   //Not found
        return response(false, 'Error in retrival info');
    }

    $quizzes = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($quizzes)>0){
        setResponseCode(200);   //OK
        return response(true, 'Fetched Quiz info!', $quizzes);
    }else{
        setResponseCode(404);   //Not found
        return response(false, 'Quiz not found or does not exist');
    }
}

function editQuiz($DB,$data){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'Quiz Name/Id is missing');
    if(!array_key_exists('options', $data)) return response(false,'Options are missing');

    $parsedData = [
        'name'=> array_key_exists('name', $data)?$data['name']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:'',
    ];
    // return response(false,'Testing',json_encode($options));
    if(empty($data['options'])){
        setResponseCode(400);
        return response(false,'Nothing to update');
    }
    $options = [];
    if(array_key_exists('qname', $data['options'])) $options['name'] = $data['options']['qname'];
    if(array_key_exists('name', $data['options'])) $options['name'] = $data['options']['name'];
    if(array_key_exists('songID', $data['options'])) $options['songID'] = $data['options']['songID'];
    if(array_key_exists('desc', $data['options'])) $options['description'] = $data['options']['desc'];
    if(array_key_exists('description', $data['options'])) $options['description'] = $data['options']['description'];
    if(array_key_exists('hashtags', $data['options'])) $options['hashtags'] = $data['options']['hashtags'];
    if(array_key_exists('questions', $data['options'])) $options['questions'] = $data['options']['questions'];
    if(array_key_exists('imageURL', $data['options'])) $options['imageURL'] = $data['options']['imageURL'];
    if(array_key_exists('passingGrade', $data['options'])) $options['passingGrade'] = $data['options']['passingGrade'];
    // if(array_key_exists('userID', $data['options'])) $options['userID'] = $data['options']['userID'];

    $res = $DB->update('tbquizzes',$options,$parsedData);
    if($res){
        setResponseCode(200);
        $options['id'] = $data['id'];
        return response(true,'Quiz updated!',json_encode($options));
    }else{
        setResponseCode(400);
        return response(false,'Quiz could not be updated. Error in options');
    }

}

function deleteQuiz($DB,$data){
    /*
    parsedData = {
        username: 'username',
        id: 'userID',
        password: 'encryptedPassword'
    }
     */
    if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'Quiz Name/Id is missing');
    // if(!array_key_exists('pass', $data)) return response(false,'Password is missing');

    // $pass = hash('crc32', $data['pass']) . hash('crc32b',$data['username'].$SALT);
    $parsedData = [
        'name'=> array_key_exists('name', $data)?$data['name']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:''
    ];
    $res = $DB->delete('tbquizzes',$parsedData);
    if($res){
        setResponseCode(201);   //Created/Deleted
        return response(true, 'Deleted Quiz');
    }else{
        setResponseCode(400); 
        return response(false, 'Failed to delete quiz...');
    }
}
function createList($DB,$data){
    /*
    parsedData = {
        id: 'hashGeneratedFromRandString&quizname&userID',
        name: 'lname',
        description: 'desc',
        userID: 'userID',
        imageURL: 'imageurl',
        quizzes: quizzes
    }
     */
    if(!array_key_exists('name', $data)||empty($data['name'])) return response(false,'Playlist Name is missing');
    if(!array_key_exists('desc', $data)||empty($data['desc'])) return response(false,'Playlist Description is missing');
    if(!array_key_exists('userID', $data)||empty($data['userID'])) return response(false,'UserID is somehow missing');
    if(!array_key_exists('quizzes', $data)||empty($data['quizzes'])) return response(false,'Quiz Data are missing');
    if(!array_key_exists('imageURL', $data)||empty($data['imageURL'])) $data['imageURL']='default.png';

    $parsedData = [
        'name'=> array_key_exists('name', $data)?$data['name']:'',
        'description'=> array_key_exists('desc', $data)?$data['desc']:'',
        'userID'=> array_key_exists('userID', $data)?$data['userID']:'',
        'dateCreated'=> date("Y-m-d H:i:s"),
        'quizzes'=> array_key_exists('quizzes', $data)?$data['quizzes']:'[]',
        'imageURL'=> array_key_exists('imageURL', $data)?$data['imageURL']:'default.png',
    ];

    $id = hash('adler32', $data['name'].$data['userID'].randomString(8));

    $parsedData['id'] = $id;

    $res = $DB->insert('tblists',$parsedData);
    // $res = $DB->queryInsert('tbquizzes',$data);
    // return response(false,$res);
    if($res==true){
        setResponseCode(201);   //Created
        return response(true,"List successfully created",json_encode($parsedData));
    }else{
        setResponseCode(400);
        return response(false,'Invalid List Data');
    }
}
function getList($DB,$data,$all=false){
    /*
    parsedData = {
        username: 'username',
        ?id: 'userID'
    }
     */
    // if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'QuizName/Id is missing');
    // if(empty($data['name']) && empty($data['id'])) return response(false,'QuizName/Id is missing');

    $parsedData = [];
    
    $kkeys = array_keys($data);
    foreach($kkeys as $key) {
        if($key!='options'){
            $parsedData[$key] = $data[$key];
        }
    }

    if(!array_key_exists('options',$data)||empty($data['options'])){
        $data['options'] = 0;
    }
    // $res = $DB->select('tbquizzes',$data['options'],$parsedData);
    if(!$all){
        $res = $DB->selectJoin('tblists',$data['options'],$parsedData,'tbusers',['username'=>'username'],['userID'=>'id']);
    }else{
        $res = $DB->selectJoinAll('tblists',$data['options'],'tbusers',['username'=>'username'],['userID'=>'id']);
    }
    // $res = $DB->querySelect('tbquizzes',$data['options'],$parsedData);
    // return response(false,$res);
    if(!$res){
        setResponseCode(404);   //Not found
        return response(false, 'Error in retrival info');
    }

    $quizzes = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($quizzes)>0){
        setResponseCode(200);   //OK
        return response(true, 'Fetched Quiz info!', $quizzes);
    }else{
        setResponseCode(404);   //Not found
        return response(false, 'Quiz not found or does not exist');
    }
}

function editList($DB,$data){
    /*
    parsedData = {
        username: 'username',
        id: 'userID'
    }
     */
    if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'Quiz Name/Id is missing');
    if(!array_key_exists('options', $data)) return response(false,'Options are missing');

    $parsedData = [
        'name'=> array_key_exists('name', $data)?$data['name']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:'',
    ];
    // return response(false,'Testing',json_encode($options));
    if(empty($data['options'])){
        setResponseCode(400);
        return response(false,'Nothing to update');
    }
    $options = [];
    if(array_key_exists('name', $data['options'])) $options['name'] = $data['options']['name'];
    if(array_key_exists('desc', $data['options'])) $options['description'] = $data['options']['desc'];
    if(array_key_exists('description', $data['options'])) $options['description'] = $data['options']['description'];
    if(array_key_exists('quizzes', $data['options'])) $options['quizzes'] = $data['options']['quizzes'];
    if(array_key_exists('imageURL', $data['options'])) $options['imageURL'] = $data['options']['imageURL'];
    // if(array_key_exists('userID', $data['options'])) $options['userID'] = $data['options']['userID'];

    $res = $DB->update('tblists',$options,$parsedData);
    if($res){
        setResponseCode(200);
        $options['id'] = $data['id'];
        return response(true,'List updated!',json_encode($options));
    }else{
        setResponseCode(400);
        return response(false,'List could not be updated. Error in options');
    }

}

function deleteList($DB,$data){
    /*
    parsedData = {
        username: 'username',
        id: 'userID',
        password: 'encryptedPassword'
    }
     */
    if(!array_key_exists('name', $data) && !array_key_exists('id', $data)) return response(false,'List Name/Id is missing');
    // if(!array_key_exists('pass', $data)) return response(false,'Password is missing');

    // $pass = hash('crc32', $data['pass']) . hash('crc32b',$data['username'].$SALT);
    $parsedData = [
        'name'=> array_key_exists('name', $data)?$data['name']:'',
        '?id'=> array_key_exists('id', $data)?$data['id']:''
    ];
    $res = $DB->delete('tblists',$parsedData);
    if($res){
        setResponseCode(201);   //Created/Deleted
        return response(true, 'Deleted List');
    }else{
        setResponseCode(400); 
        return response(false, 'Failed to delete list...');
    }
}

function createSong($DB,$data){
    if(!array_key_exists('songTitle', $data)||empty($data['songTitle'])) return response(false,'Song Title is missing');
    if(!array_key_exists('songArtist', $data)||empty($data['songArtist'])) return response(false,'Song Artist name is missing');
    if(!array_key_exists('userID', $data)||empty($data['userID'])) return response(false,'UserID is somehow missing');
    if(!array_key_exists('bpm', $data)||empty($data['bpm'])) return response(false,'BPM is missing');
    if(!array_key_exists('measure', $data)||empty($data['measure'])) return response(false,'Measure is missing');
    if(!array_key_exists('songURL', $data)||empty($data['songURL'])) return response(false,'Song File (URL) is missing');

    $parsedData = [
        'title'=> array_key_exists('songTitle', $data)?$data['songTitle']:'',
        'author'=> array_key_exists('songArtist', $data)?$data['songArtist']:'',
        'userID'=> array_key_exists('userID', $data)?$data['userID']:'',
        'dateAdded'=> date("Y-m-d H:i:s"),
        'bpm'=> array_key_exists('bpm', $data)?$data['bpm']:'',
        'measure'=> array_key_exists('measure', $data)?$data['measure']:'',
        'songURL'=> array_key_exists('songURL', $data)?$data['songURL']:'',
    ];

    $id = hash('adler32', $data['songTitle'].$data['songArtist'].$data['userID'].randomString(4));

    $parsedData['id'] = $id;

    $res = $DB->insert('tbsongs',$parsedData);
    // $res = $DB->queryInsert('tbsongs',$parsedData);
    // return response(false,$res,$parsedData);
    if($res==true){
        setResponseCode(201);   //Created
        return response(true,"Song successfully added");
    }else{
        setResponseCode(400);
        return response(false,'Song Quiz Data exists/invalid');
    }
}
function getSong($DB,$data,$all=false){
   
    $parsedData = [];
    
    $kkeys = array_keys($data);
    foreach($kkeys as $key) {
        if($key!='options'){
            $parsedData[$key] = $data[$key];
        }
    }

    if(!array_key_exists('options',$data)||empty($data['options'])){
        $data['options'] = 0;
    }
    if(!$all){
        $res = $DB->selectJoin('tbsongs',$data['options'],$parsedData,'tbusers',['username'=>'username'],['userID'=>'id']);
    }else{
        $res = $DB->selectJoinAll('tbsongs',$data['options'],'tbusers',['username'=>'username'],['userID'=>'id']);
    }
    // $res = $DB->querySelectJoin('tbsongs',$data['options'],$parsedData,'tbusers',['username'=>'username'],['userID'=>'id']);
    // echo response(false,$res);
    // die();

    if(!$res){
        setResponseCode(404);   //Not found
        return response(false, 'Error in retrival info');
    }

    $songs = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($songs)>0){
        setResponseCode(200);   //OK
        return response(true, 'Fetched Sond info!', $songs);
    }else{
        setResponseCode(404);   //Not found
        return response(false, 'Song not found or not yet added');
    }
}

function setActivity($DB,$data){
    if(!array_key_exists('id', $data)||empty($data['id']))
        return response(false,'ID is missing');
    if(!array_key_exists('type', $data)||empty($data['type']))
        return response(false,'Type is missing');
    if(!array_key_exists('info', $data)||empty($data['info']))
        return response(false,'Info is missing');
    if(!array_key_exists('details', $data)||empty($data['details']))
        return response(false,'Details is missing');
    if(!array_key_exists('userID', $data)||empty($data['userID']))
        return response(false,'UserID is missing');

    $parsedData = [
        'id'=> array_key_exists('id', $data)?$data['id']:hash('adler32', $data['info'].randomString(8)),
        'type'=> array_key_exists('type', $data)?$data['type']:'',
        'info'=> array_key_exists('info', $data)?$data['info']:'',
        'userID'=> array_key_exists('userID', $data)?$data['userID']:'',
        'time'=> date("Y-m-d H:i:s"),
        'details'=> array_key_exists('details', $data)?json_encode($data['details']):'{}',
    ];

    // return response(false,'Failed to save activity',json_encode($parsedData));

    $res = $DB->insert('tbactivities',$parsedData);
    // return response(false,'Failed to pogggggg activity');
    if($res==true){
        setResponseCode(201);   //Created
        return response(true,"Successfully saved activity");
    }else{
        setResponseCode(400);
        return response(false,'Failed to save activity');
    }

    /*$FILE = './../json/activity.json';
    try{
        $file = file_get_contents($FILE);
        $fileJSON = json_decode($file);
        array_push($fileJSON, $data);
        $newFile = json_encode($fileJSON);
        file_put_contents($FILE, $newFile);
    }catch(Exception $err){
        setResponseCode(400);
        return response(false,'Failed to save activity');
    }
    setResponseCode(201);
    return response(true, 'Successfully saved activity');*/
}
function getActivity($DB,$data,$all=false){
    $parsedData = [];
    
    $kkeys = array_keys($data);
    foreach($kkeys as $key) {
        if($key!='options'){
            $parsedData[$key] = $data[$key];
        }
    }

    if(!array_key_exists('options',$data)||empty($data['options'])){
        $data['options'] = 0;
    }
    if(!$all){
        $res = $DB->select('tbactivities',$data['options'],$parsedData,false,"ORDER BY time DESC LIMIT 100");
    }else{
        $res = $DB->selectAll('tbactivities',$data['options'],false,"ORDER BY time DESC LIMIT 100");
    }
    // $res = $DB->querySelect('tbusers',$data['options'],$parsedData,true);
    // return response(false,$res);
    if(!$res){
        setResponseCode(404);   //Not found
        return response(false, 'Error in retrival info');
    }

    $user = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($user)>0){
        setResponseCode(200);   //OK
        return response(true, 'Fetched Activity!', $user);
    }else{
        setResponseCode(404);   //Not found
        return response(false, 'Activity not found or does not exist');
    }
    
}


// QUIZ FUNCTIONS //



?>