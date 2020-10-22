<?php

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();

$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Host = 'smtp.mail.yahoo.com';
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->Username = 'kolesnikov1987ua@yahoo.com';
$mail->Password = 'jcgrcdozrbqcxxgn';

$mail->setFrom('kolesnikov1987ua@yahoo.com', 'Portfolio');
$mail->addAddress('kolesnikov1987ua@gmail.com');

$mail->Subject = 'Данные Portfolio';
$mail->Body = '
	Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	E-mail: ' . $email . '<br>
	Сообщение: ' . $text . '';
$mail->AltBody = '
	Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	E-mail: ' . $email . '<br>
	Сообщение ' . $text . '';


if (!$mail->send()) {
    echo 'Mailer Error: '. $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}

?>