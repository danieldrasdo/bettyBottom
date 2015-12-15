<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
  echo ("No Text Provided!");
  return false;
}

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

$message = wordwrap($message, 70, "\r\n");

// Create the email and send the message
$to = "[***YOUR_EMAIL_HERE***]";//Change this to who you want receiving the email, without the brackets
$email_subject = "Website Contact Form: $name";

$email_body = "You have received a new message from your website contact form." . "\n\n";
$email_body .= "--------------------" . "\n\n";
$email_body .= "From: $name <$email_address>" . "\n\n";
$email_body .= "$message";

$headers   = array();
$headers[] = "From: [***YOUR_SITE_NAME***] Contact Form <noreply@domain.com>";//Change this to a no-reply email address of your choosing.
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=iso-8859-1";
$headers[] = "Reply-To: $name <$email_address>";
$headers[] = "Subject: {$subject}";
$headers[] = "X-Mailer: PHP/" . phpversion();

mail($to, $email_subject, $email_body, implode("\r\n", $headers));
echo ("Sent!");
return true;
?>
