<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $fullname = htmlspecialchars($_POST['fullname']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  $to = "eladt1010@gmail.com"; // Replace with your email address
  $subject = "New Contact Form Submission";
  $body = "Name: $fullname\nEmail: $email\n\nMessage:\n$message";

  $headers = "From: eladtayarr.com"; // Replace with your domain

  if (mail($to, $subject, $body, $headers)) {
    echo "Message sent successfully!";
  } else {
    echo "Failed to send message.";
  }
}
?>
