<?
session_start();
$authorised = false;
$errors = array();
$users = array('user1'=>'user1pass','user2'=>'user2pass','user3'=>'user3pass');

if(array_key_exists($_POST['txtUserName'], $users)){
	if($users[$_POST['txtUserName']]==$_POST['pwdPassword']){
		$authorised=true;
	}
}

if($_POST['logout']){
	unset($_SESSION['user']);
	session_destroy();
}else{
	if($authorised){
		$_SESSION['user'] = array('username'=>$_POST['txtUserName']);
		$returnValue=true;
	}else{
		$errors[] = 'Username not found or incorrect password';
		$returnValue = false;
	}
}

$return = array('errors'=>$errors, 'data'=>$returnValue);

echo json_encode($return);
?>