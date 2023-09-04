<?php

include_once 'myHelperFunctions.php';

class Database{
	//password on imy.up.ac.za is @U19024895 not the ftp password uqocytju
	private $host = "localhost";
	private $userName = "root";
	private $password = "";
	private $dbName = "dbquizzes";
	
	// private $host = "localhost";
	// private $userName = "u19024895";
	// private $password = "uqocytju@U19024895";
	// private $dbName = "u19024895";
	 
	public $conn;


	public function connect(){
		$this->conn = null;

		try{
			$this->conn = mysqli_connect(
				$this->host,$this->userName,$this->password,$this->dbName
			);
			if(!$this->conn){
				throw new Exception('No SQL Connection/Database.');
			}
			/*else if($this->conn->connect_error){
				throw new Exception($this->conn->connect_error);
			}*/
		}catch(Exception $err){
			echo "Connection error: ".$err;
			return false;
		}
		return true;
	}
	public function getConnection(){
		$this->conn = null;
		try{
			$this->conn = mysqli_connect(
				$this->host,$this->userName,$this->password,$this->dbName
			);
			if(!$this->conn){
				throw new Exception('No SQL Connection/Database.');
			}
			else if($this->conn->connect_error){
				throw new Exception($this->conn->connect_error);
			}
		}catch(Exception $err){
			// echo "Connection error: ".$err;
			return null;
		}
		return $this->conn;
	}

	public function executeQuery($query){
		$res = mysqli_query($this->conn, $query);
		if($res) return $res;
		return false;
	}

	public function insert($tableName,$dataArr,$otherOptions=""){
		//data should be an associative array
		
		$insertParams = "";
		if(is_array($dataArr)){
			$dataFields = array_keys($dataArr);
			$dataValues = array_values($dataArr);
			$dataSize = count($dataArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$insertParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$insertParams .= "=" . $dataValues[$i];
				}
				else{
					$insertParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$insertParams .= ", ";
				}
			}
		} else if(is_string($dataArr)){
			//assume its a string in valid SQL format excluding WHERE
			$insertParams .= $dataArr;
			// $insertParams = $this->conn->real_escape_string($insertParams);
		} else $insertParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "INSERT INTO {$tableName} SET {$insertParams} {$otherOptions}";
		$res = mysqli_query($this->conn, $query) == TRUE;
		if($res) return $res;
		return false;
	}
	public function queryInsert($tableName,$dataArr,$otherOptions=""){
		//data should be an associative array
		
		$insertParams = "";
		if(is_array($dataArr)){
			$dataFields = array_keys($dataArr);
			$dataValues = array_values($dataArr);
			$dataSize = count($dataArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$insertParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$insertParams .= "=" . $dataValues[$i];
				}
				else{
					$insertParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$insertParams .= ", ";
				}
			}
		} else if(is_string($dataArr)){
			//assume its a string in valid SQL format excluding WHERE
			$insertParams .= $dataArr;
			// $insertParams = $this->conn->real_escape_string($insertParams);
		} else $insertParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "INSERT INTO {$tableName} SET {$insertParams} {$otherOptions}";
		return $query;
	}
	

	public function select($tableName,$selectArr,$criteriaArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams =  "*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = "*";
		
		$criteriaParams = "";

		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]). "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to select ALL records or cause and error where we cant do anything about it
			return false;
		}

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} FROM {$tableName} WHERE {$criteriaParams} {$otherOptions}";


		$res = mysqli_query($this->conn, $query);
		if($res) return $res;
		return false;
	}public function querySelect($tableName,$selectArr,$criteriaArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams =  "*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = "*";
		
		$criteriaParams = "";
		
		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "' ";
					// $criteriaParams .= "='" . $dataValues[$i] . "' ";	
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
				
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to select ALL records or cause and error where we cant do anything about it
			return false;
		}

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} FROM {$tableName} WHERE {$criteriaParams} {$otherOptions}";

		return $query;
	}


	public function selectAll($tableName,$selectArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams =  "*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = "*";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} FROM {$tableName} {$otherOptions}";

		$res = mysqli_query($this->conn, $query);
		if($res) return $res;
		return false;
	}
	public function querySelectAll($tableName,$selectArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams =  "*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = "*";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} FROM {$tableName} {$otherOptions}";

		return $query;
	}

	public function update($tableName,$updateArr,$criteriaArr,$otherOptions=""){
		//data should be an associative array
		
		if($updateArr) $updateParams = "SET ";

		if(is_array($updateArr)){
			$dataFields = array_keys($updateArr);
			$dataValues = array_values($updateArr);
			$dataSize = count($updateArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$updateParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$updateParams .= "=" . $dataValues[$i];
				}
				else{
					$updateParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$updateParams .= ", ";
				}
			}
		} else if(is_string($updateArr)){
			//assume its a string in valid SQL format excluding WHERE
			$updateParams .= $updateArr;
			// $updateParams = $this->conn->real_escape_string($updateParams);
		} else $updateParams = "";
		
		$criteriaParams = "";

		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";
		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to update ALL records or cause and error where we cant do anything about it
			return false;
		}

		$query = "UPDATE {$tableName} {$updateParams} WHERE {$criteriaParams} {$otherOptions}";
		// return $query;
		$res = mysqli_query($this->conn, $query) == TRUE;
		if($res) return $res;
		return false;
	}
	public function queryUpdate($tableName,$updateArr,$criteriaArr,$otherOptions=""){
		//data should be an associative array
		
		if($updateArr) $updateParams = "SET ";

		if(is_array($updateArr)){
			$dataFields = array_keys($updateArr);
			$dataValues = array_values($updateArr);
			$dataSize = count($updateArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$updateParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$updateParams .= "=" . $dataValues[$i];
				}
				else{
					$updateParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$updateParams .= ", ";
				}
			}
		} else if(is_string($updateArr)){
			//assume its a string in valid SQL format excluding WHERE
			$updateParams .= $updateArr;
			// $updateParams = $this->conn->real_escape_string($updateParams);
		} else $updateParams = "";
		
		$criteriaParams = "";

		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "' ";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";
		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to update ALL records or cause and error where we cant do anything about it
			return false;
		}

		$query = "UPDATE {$tableName} {$updateParams} WHERE {$criteriaParams} {$otherOptions}";
		return $query;
	}

	public function updateAll($tableName,$updateArr,$otherOptions=""){
		//data should be an associative array
		
		if($updateArr) $updateParams = "SET ";

		if(is_array($updateArr)){
			$dataFields = array_keys($updateArr);
			$dataValues = array_values($updateArr);
			$dataSize = count($updateArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$updateParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$updateParams .= "=" . $dataValues[$i];
				}
				else{
					$updateParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$updateParams .= ", ";
				}
			}
		} else if(is_string($updateArr)){
			//assume its a string in valid SQL format excluding WHERE
			$updateParams .= $updateArr;
			// $updateParams = $this->conn->real_escape_string($updateParams);
		} else $updateParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "UPDATE {$tableName} {$updateParams} {$otherOptions}";

		$res = mysqli_query($this->conn, $query) == TRUE;
		if($res) return $res;
		return false;
	}
	public function queryUpdateAll($tableName,$updateArr,$otherOptions=""){
		//data should be an associative array
		
		if($updateArr) $updateParams = "SET ";

		if(is_array($updateArr)){
			$dataFields = array_keys($updateArr);
			$dataValues = array_values($updateArr);
			$dataSize = count($updateArr);
			for ($i=0; $i < $dataSize; $i++) { 
				$updateParams .= $dataFields[$i];
				if(is_numeric($dataValues[$i])){
					$updateParams .= "=" . $dataValues[$i];
				}
				else{
					$updateParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}
				if($i<$dataSize-1){
					$updateParams .= ", ";
				}
			}
		} else if(is_string($updateArr)){
			//assume its a string in valid SQL format excluding WHERE
			$updateParams .= $updateArr;
			// $updateParams = $this->conn->real_escape_string($updateParams);
		} else $updateParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "UPDATE {$tableName} {$updateParams} {$otherOptions}";

		return $query;
	}
	

	public function delete($tableName,$criteriaArr,$otherOptions=""){
		//data should be an associative array
		$criteriaParams = "";

		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to delete ALL records or cause and error where we cant do anything about it
			return false;
		}

		$query = "DELETE FROM {$tableName} WHERE {$criteriaParams} {$otherOptions}";

		$res = mysqli_query($this->conn, $query) == TRUE;
		if($res) return $res;
		return false;
	}
	public function queryDelete($tableName,$criteriaArr,$otherOptions=""){
		//data should be an associative array
		$criteriaParams = "";

		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to delete ALL records or cause and error where we cant do anything about it
			return false;
		}

		$query = "DELETE FROM {$tableName} WHERE {$criteriaParams} {$otherOptions}";

		return $query;
	}
	

	public function deleteAll($tableName,$otherOptions=""){
		//data should be an associative array

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "DELETE FROM {$tableName} {$otherOptions}";

		$res = mysqli_query($this->conn, $query) == TRUE;
		if($res) return $res;
		return false;
	}
	public function queryDeleteAll($tableName,$otherOptions=""){
		//data should be an associative array

		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$query = "DELETE FROM {$tableName} {$otherOptions}";

		return $query;
	}
	
	public function selectJoin($tableName,$selectArr,$criteriaArr,$joinTable,$joinArr,$compareArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $tableName."." . $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams = $tableName."."."*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = $tableName."."."*";

		$addOns = ", ";
		if(is_array($joinArr)){
			$size = count($joinArr);
			$dataFields = array_keys($joinArr);
			$dataNames = array_values($joinArr);
			for ($i=0; $i < $size; $i++) { 
				$addOns .= $joinTable.".". $dataFields[$i];
				if(!empty($dataNames[$i]))
					$addOns .= " as " . $this->conn->real_escape_string($dataNames[$i]);
				if($i<$size-1){
					$addOns .= ", ";
				}
			}
			if($size<=0) $addOns = $joinTable."."."*";
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$addOns .= $joinArr;
			// $addOns = $this->conn->real_escape_string($addOns);
		} else $addOns = $joinTable."."."*";

		$compareParam = "";
		if(is_array($compareArr)){
			$size = count($joinArr);
			$fieldA = array_keys($compareArr)[0];
			$fieldB = array_values($compareArr)[0];
			$compareParam = $tableName . "." . $fieldA . " = " . $joinTable . "." . $fieldB;
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$compareParam .= $compareArr;
			// $compareParam = $this->conn->real_escape_string($compareParam);
		} else{
			//kinda invalid tho
			return false;
		}
		
		$criteriaParams = "";
		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $tableName."." .$dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to select ALL records or cause and error where we cant do anything about it
			return false;
		}

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} {$addOns} FROM {$tableName} LEFT JOIN {$joinTable} ON {$compareParam} WHERE {$criteriaParams} {$otherOptions}";

		$res = mysqli_query($this->conn, $query);
		if($res) return $res;
		return false;
	}
	public function querySelectJoin($tableName,$selectArr,$criteriaArr,$joinTable,$joinArr,$compareArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $tableName."." . $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams = $tableName."."."*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = $tableName."."."*";

		$addOns = ", ";
		if(is_array($joinArr)){
			$size = count($joinArr);
			$dataFields = array_keys($joinArr);
			$dataNames = array_values($joinArr);
			for ($i=0; $i < $size; $i++) { 
				$addOns .= $joinTable.".". $dataFields[$i];
				if(!empty($dataNames[$i]))
					$addOns .= " as " . $this->conn->real_escape_string($dataNames[$i]);
				if($i<$size-1){
					$addOns .= ", ";
				}
			}
			if($size<=0) $addOns = $joinTable."."."*";
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$addOns .= $joinArr;
			// $addOns = $this->conn->real_escape_string($addOns);
		} else $addOns = $joinTable."."."*";

		$compareParam = "";
		if(is_array($compareArr)){
			$size = count($joinArr);
			$fieldA = array_keys($compareArr)[0];
			$fieldB = array_values($compareArr)[0];
			$compareParam = $tableName . "." . $fieldA . " = " . $joinTable . "." . $fieldB;
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$compareParam .= $compareArr;
			// $compareParam = $this->conn->real_escape_string($compareParam);
		} else{
			//kinda invalid tho
			return "Invalid Compare Arr";
		}
		
		$criteriaParams = "";
		if(is_array($criteriaArr)){
			$size = count($criteriaArr);
			$dataFields = array_keys($criteriaArr);
			$dataValues = array_values($criteriaArr);
			for ($i=0; $i < $size; $i++) {
				$criteriaParams .= $tableName."." .$dataFields[$i];
				if($dataValues[$i]=='[NULL]'|| $dataValues[$i]=='[IS NULL]')
					$criteriaParams .= " IS NULL";
				else if($dataValues[$i]=='[NOT NULL]'|| $dataValues[$i]=='[IS NOT NULL]')
					$criteriaParams .= " IS NOT NULL";
				else if(is_numeric($dataValues[$i])){
					$criteriaParams .= "=" . $dataValues[$i];
				}
				else{
					$criteriaParams .= "='" . $this->conn->real_escape_string($dataValues[$i]) . "'";
				}

				if($i<$size-1){
					//use ? for criterias that are optional
					if(substr( $dataFields[$i+1], 0, 1 ) === "?"){
						$criteriaParams .= " OR ";
						$dataFields[$i+1] = ltrim($dataFields[$i+1],'?');
					}
					else{
						$criteriaParams .= " AND ";
					}
				}
			}
			if($size<=0) $criteriaParams =  "";
		} elseif(is_string($criteriaArr)){
			//assume its a string in valid SQL format excluding WHERE
			$criteriaParams .= $criteriaArr;
			// $criteriaParams = $this->conn->real_escape_string($criteriaParams);
		} else $criteriaParams = "";

		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		if(!$criteriaParams || $criteriaParams==""){
			//we dont want to select ALL records or cause and error where we cant do anything about it
			return "Invalid criteriaParams";
		}

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} {$addOns} FROM {$tableName} LEFT JOIN {$joinTable} ON {$compareParam} WHERE {$criteriaParams} {$otherOptions}";

		return $query;
	}
	public function selectJoinAll($tableName,$selectArr,$joinTable,$joinArr,$compareArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $tableName."." . $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams = $tableName."."."*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = $tableName."."."*";

		$addOns = ", ";
		if(is_array($joinArr)){
			$size = count($joinArr);
			$dataFields = array_keys($joinArr);
			$dataNames = array_values($joinArr);
			for ($i=0; $i < $size; $i++) { 
				$addOns .= $joinTable.".". $dataFields[$i];
				if(!empty($dataNames[$i]))
					$addOns .= " as " . $dataNames[$i];
				if($i<$size-1){
					$addOns .= ", ";
				}
			}
			if($size<=0) $addOns = $joinTable."."."*";
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$addOns .= $joinArr;
			// $addOns = $this->conn->real_escape_string($addOns);
		} else $addOns = $joinTable."."."*";

		$compareParam = "";
		if(is_array($compareArr)){
			$size = count($joinArr);
			$fieldA = array_keys($compareArr)[0];
			$fieldB = array_values($compareArr)[0];
			$compareParam = $tableName . "." . $fieldA . " = " . $joinTable . "." . $fieldB;
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$compareParam .= $compareArr;
			// $compareParam = $this->conn->real_escape_string($compareParam);
		} else{
			//kinda invalid tho
			return false;
		}
		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} {$addOns} FROM {$tableName} LEFT JOIN {$joinTable} ON {$compareParam} {$otherOptions}";

		$res = mysqli_query($this->conn, $query);
		if($res) return $res;
		return false;
	}
	public function querySelectJoinAll($tableName,$selectArr,$joinTable,$joinArr,$compareArr,$distinct=false,$otherOptions=""){
		//data should be an associative array
		
		$selectParams = "";
		if(is_array($selectArr)){
			$size = count($selectArr);
			for ($i=0; $i < $size; $i++) { 
				$selectParams .= $tableName."." . $selectArr[$i];
				if($i<$size-1){
					$selectParams .= ", ";
				}
			}
			if($size<=0) $selectParams = $tableName."."."*";
		} else if(is_string($selectArr)){
			//assume its a string in valid SQL format excluding WHERE
			$selectParams .= $selectArr;
			// $selectParams = $this->conn->real_escape_string($selectParams);
		} else $selectParams = $tableName."."."*";

		$addOns = ", ";
		if(is_array($joinArr)){
			$size = count($joinArr);
			$dataFields = array_keys($joinArr);
			$dataNames = array_values($joinArr);
			for ($i=0; $i < $size; $i++) { 
				$addOns .= $joinTable.".". $dataFields[$i];
				if(!empty($dataNames[$i]))
					$addOns .= " as " . $dataNames[$i];
				if($i<$size-1){
					$addOns .= ", ";
				}
			}
			if($size<=0) $addOns = $joinTable."."."*";
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$addOns .= $joinArr;
			// $addOns = $this->conn->real_escape_string($addOns);
		} else $addOns = $joinTable."."."*";

		$compareParam = "";
		if(is_array($compareArr)){
			$size = count($joinArr);
			$fieldA = array_keys($compareArr)[0];
			$fieldB = array_values($compareArr)[0];
			$compareParam = $tableName . "." . $fieldA . " = " . $joinTable . "." . $fieldB;
		} else if(is_string($joinArr)){
			//assume its a string in valid SQL format excluding WHERE
			$compareParam .= $compareArr;
			// $compareParam = $this->conn->real_escape_string($compareParam);
		} else{
			//kinda invalid tho
			return false;
		}
		
		// $otherOptions = $this->conn->real_escape_string($otherOptions);

		$distincter = "";
		if($distinct) $distincter = "DISTINCT";

		$query = "SELECT {$distincter} {$selectParams} {$addOns} FROM {$tableName} LEFT JOIN {$joinTable} ON {$compareParam} {$otherOptions}";

		return $query;
	}
	
}


?>