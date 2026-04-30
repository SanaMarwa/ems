<?php


$firstName = $_POST['fname'];
$lastName = $_POST['lname'];
$email = $_POST['email'];
$pnum = $_POST['pnum'];
$dob = $_POST['dob'];

$program = 'None';
if (isset($_POST['program']) && is_array($_POST['program']) && count($_POST['program']) > 0) {
    $program = implode(', ', $_POST['program']);
}

$body = "First Name: " . $firstName . "\r\n" . "Last Name: " . $lastName . "\r\n" . "Email: " . $email . "\r\n" . "Phone Number: " . $pnum . "\r\n" . "DOB: " . $dob . "\r\n" . "Program(s): " . $program;

$subject = "New Enquiry Application!";
$mailheader = "From:" . $firstname . "<" . $email . ">\r\n";
$recipient = "elysianmontessori@gmail.com";
mail($recipient, $subject, $body, $mailheader)
    or die("Error!");
// echo "message sent";

header('Location:/thankyou.html');
// echo '<script>alert("Enquiry Sent Successfully. Thank You for Contacting us.");</script>';

?>