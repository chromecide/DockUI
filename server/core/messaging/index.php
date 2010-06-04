<?
	session_start();
	
	//yeah yeah i know wtf right? *sigh* appserv on windows, needed to get outta the public folders
	define('MESSAGE_FOLDER', '../../../../../messages/');

	$errors = array();
	$returnValue = array('count'=>0, 'messages'=>array());

	if($_SESSION['user']){
		if($_POST){
			switch($_POST['action']){
				case 'send_string':
					$message = array(
						'id'=>$_POST['id'],
						'to'=>$_POST['to'],
						'from'=>$_SESSION['user']['username'],
						'type'=> $_POST['type'],
						'title'=>$_POST['title'],
						'data'=>$_POST['data']
					);

					//save the message to the appropriate message file
					$currentMessages = @file_get_contents(MESSAGE_FOLDER.$message['to']);

					//if($currentMessages){
						$messages = json_decode($currentMessages);
						$returnValue['count'] = count($messages->messages)+1;
						$returnValue['messages'] = $messages->messages;
						$returnValue['messages'][] = $message;
						//echo json_encode($returnValue);

						$hn = fopen(MESSAGE_FOLDER.$message['to'], 'w');
						$fx = fwrite($hn, json_encode($returnValue));
						
						$returnValue = array();
					//}else{
					//	$errors[] = 'Error Opening Messaging File';
					//}
					break;
				case 'share_dock':
					
					break;
				default:
					break;
			}
		}
		//load the users messages file
		$messagesString = @file_get_contents(MESSAGE_FOLDER.$_SESSION['user']['username']);
		
		if($messagesString){
			$messages = json_decode($messagesString);
			$returnValue['count'] = count($messages->messages);
			$returnValue['messages'] = $messages->messages;
		}else{
			$errors[] = 'Error Opening Messaging File';
		}
	}else{
		$errors[] = 'No Messages Found';
	}
	$returnValue['errors'] = $errors;

	echo json_encode($returnValue);

	function appendMessage($user, $message){
		
	}
?> 