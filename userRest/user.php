<?php
include_once('config.php');

if($_SERVER['REQUEST_METHOD'] == "POST"){
	$params = json_decode(file_get_contents('php://input')); 
	$_POST = json_decode(json_encode($params),true);

	$name = isset($_POST['name']) ? mysql_real_escape_string($_POST['name']) : "";
	$age = isset($_POST['age']) ? mysql_real_escape_string($_POST['age']) : "";
	$email = isset($_POST['email']) ? mysql_real_escape_string($_POST['email']) : "";
	$phone = isset($_POST['phone']) ? mysql_real_escape_string($_POST['phone']) : "";
	$password = isset($_POST['pwd']) ? mysql_real_escape_string($_POST['pwd']) : "";
	$salary = isset($_POST['salary']) ? mysql_real_escape_string($_POST['salary']) : "";
	$address = isset($_POST['address']) ? mysql_real_escape_string($_POST['address']) : "";

	// Insert data into data base
	$sql = "INSERT INTO `users` (`ID`, `name`,`age`, `email`,`phone`, `password`,`salary` , `address`) VALUES (NULL, '".$name."','".$age."', '".$email."','".$phone."', '".$password."','".$salary."', '".$address."');";

	$qur = mysql_query($sql);
	if($qur){
		$qur = mysql_query("select * from `users`");
		$result =array();

		while($r = mysql_fetch_array($qur)){
			extract($r);
			$result[] = array("id" =>$ID ,"name" => $name,"age" =>$age, "email" => $email,"phone"=>$phone,'salary' => $salary, 'address' => $address); 
		}
		$json = array("status" => 1, "info" => $result);
		$json = array("status" => 1, "smsg" => "Done User added!","info" => $result);
	}else{
		$json = array("status" => 0, "emsg" => "Error in Post Data");
	}
}

elseif($_SERVER['REQUEST_METHOD'] == "GET"){
//checkusername
	if(isset($_GET['users']) && !empty($_GET['users'])){
		$qur = mysql_query("select * from `users`");
		$result =array();

		while($r = mysql_fetch_array($qur)){
			extract($r);
			$result[] = array("id" =>$ID ,"name" => $name,"age" =>$age, "email" => $email,"phone"=>$phone,'salary' => $salary, 'address' => $address); 
		}
		$json = array("status" => 1, "info" => $result);
	}elseif(isset($_GET['uid']) && !empty($_GET['uid'])){
		$uid = isset($_GET['uid']) ? mysql_real_escape_string($_GET['uid']) :  "";
		$qur = mysql_query("select name, age,email,phone, salary, address from `users` where ID='$uid'");
		$result =array();
		while($r = mysql_fetch_array($qur)){
			extract($r);
			$result[] = array("id" =>$ID ,"name" => $name,"age" =>$age, "email" => $email,"phone"=>$phone,'salary' => $salary, 'address' => $address); 
		}
		$json = array("status" => 1, "info" => $result);
	}

	elseif(isset($_GET['checkusername']) && !empty($_GET['checkusername'])){
		$qur = mysql_query("select `email` from `users`");
		$result =array();

		$result[]='';
		while($res = mysql_fetch_array($qur)){

			 array_push($result,$res['email']);
		}/*
		print_r($result); echo "OOOOOOOOOOOOOOOO";
		$r = ['Jim', 'John', 'Jill', 'Jackie'];*/
		$json = array("status" => 1, "info" => $result);

	}



	else{
		$json = array("status" => 0, "emsg" => "User ID not define");
	}

}
else{
	$json = array("status" => 0, "emsg" => "Request method not accepted");
}

@mysql_close($conn);

/* Output header */
	header('Content-type: application/json');
	echo json_encode($json);
?>