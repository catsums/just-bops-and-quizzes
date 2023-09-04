<?php 
    //myHelperFunctions.php
    function console_log($output, $with_script_tags = true) {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
    ');';
        if ($with_script_tags) {
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }

    function arrayToObject($arr){
        // if(is_array($arr)){
        $object = new stdClass();
        foreach ($array as $key => $value)
        {
            $object->$key = $value;
        }
        return $object;
        // }else{
        //     return null;
        // }
    }
    function randomString(int $length = 32,string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string {
        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $pieces []= $keyspace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }

    function randomID($_prefix,$_suffix,$_length){
        return $_prefix.randomString($_length).$_suffix;
    }

    function response($success=false, $message = "", $data=""){
        return json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ]);
    }

    function setResponseCode($code){
        $GLOBALS['responseCode'] = $code;
    }
    function strStartsWith($str,$prompt){
        $pLength = strlen($prompt);
        if(substr( $str, 0,  $pLength)===$prompt)
            return true;
        return false;
    }
    function str_last_replace($search, $replace, $subject){
        $pos = strrpos($subject, $search);

        if($pos !== false)
        {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }

        return $subject;
    }
?>