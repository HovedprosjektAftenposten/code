<!-- this is the Simple sexy PHP Login Script. You can find it on http://www.php-login.net ! It's free and open source. -->

<!-- errors & messages -->

<?php

// show negative messages
if ($login->errors) {
    foreach ($login->errors as $error) {
        echo $error;    
    }
}

// show positive messages
if ($login->messages) {
    foreach ($login->messages as $message) {
        echo $message;
    }
}

?>
<link rel="stylesheet" type="text/css" href="../style/style.css" />

<!-- login form box -->
<div id="login_form">
<h1>Logg inn for Tidslinjeverktøy</h1>
<form method="post" action="index.php" name="loginform">
<table>
<tr>
<td><p>Brukernavn: </p></td>
<td><input id="login_input_username" class="login_input" type="text" name="user_name" value="<?php echo $login->view_user_name; ?>" /></td>
</tr>
<tr>
<td><p>Passord: </p></td>
<td><input id="login_input_password" class="login_input" type="password" name="user_password" autocomplete="off" /></td>
</tr>
<tr><td></td>
<td align="right"><input type="submit" id="login_input_submit" name="login" value="Logg inn" /></td>
</tr>
</table> 
</form>
</div>

<!-- this is the Simple sexy PHP Login Script. You can find it on http://www.php-login.net ! It's free and open source. -->