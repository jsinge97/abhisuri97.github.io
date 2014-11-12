<?php  
if (!isset($_SESSION)) {
	session_start();
}

if (isset($_SESSION['user_email']))
{
	header( 'Location: index.php');
}


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset='utf-8'> 
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css' />

	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script type='text/javascript'>

	function login()
	{
		$('#login_response').hide() ;
		$.ajax({  
			type: "POST", 
			cache: false, 
			url: "function.php",  
			data: $('#login_form').serialize()+'&action=login',  
			success: function(data) {  
				$('#login_response').html(data) ;
				$('#login_response').show() ;
				if (data=='Logged in')
				{
					window.location.assign('index.php');
				}
			}  
		});  

	}



	</script>

	<style>

	.login_form
	{
		width: 260px;
		margin: auto auto auto auto;
		border: 1px solid #ddd;
		padding: 20px;
		box-shadow: 0px 2px 3px #ddd;
		-moz-box-shadow: 0px 2px 3px #ddd;
		-webkit-box-shadow: 0px 2px 3px #ddd;
		background-color: #fff;
		padding-top: 30px;
	}

	.login.user, .login.password
	{
		padding: 8px;
		color: #888;
		font-size: 16px;
		margin-bottom: 18px;
		width: 244px;
	}

	.login_form label
	{
		display: block;

	}
	.label_text
	{
		display: block;
	}
	body
	{
		font-family: Arial;
		background-color: #fafafa;
	}
	h1
	{
		color: #888;
		font-size: 32px;
		display: block;
		width: 260px;
		margin: 10% auto auto auto;
		font-weight: normal;
		padding: 10px 20px;
		font-size: 76px;
		margin-bottom: -4px;
	}

	#login_response
	{
		padding-top: 15px;
		text-align: center;
		font-size: 16px;
		color: #777;
	}




	</style>


</head>
<body>
	<div id='box_bg'>
		<div id='content'>


			<h1>nForms</h1>

			<form name="login_form" id="login_form" method="post" action="javascript:login()" class="login_form" style="margin-left: auto; margin-right: auto;">


					<input type="text" onblur="if(this.value=='')this.value='User ID';" onfocus="if(this.value=='User ID')this.value='';" value="<?php if (isset($_GET['email'])) {echo $_GET['email'];} else {echo 'User ID';}?>" class="login user" name='email'/>

					<input type='password' name='password' onfocus="if(this.value=='' || this.value == 'Password') {this.value='';this.type='password'}" value="<?php if (isset($_GET['password'])) {echo $_GET['password'];} else {echo 'Password';}?>" onblur="if(this.value == '') {this.type='text';this.value=this.defaultValue}" class="login password"/>


				<button type='submit' class='btn btn-primary' style='box-sizing: content-box; padding: 8px; width: 244px'>Sign In</button>
				<div id='login_response'></div>

			</form>
		</div>
	</div>


</body>
</html>
