<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 0);
error_reporting(0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
require './config.php';

if (
    isset($_POST['fname']) &&
    isset($_POST['lname']) &&
    isset($_POST['email']) &&
    isset($_POST['pnum'])
) {

    // Sanitize Inputs
    $fname = htmlspecialchars(trim($_POST['fname']), ENT_QUOTES, 'UTF-8');
    $lname = htmlspecialchars(trim($_POST['lname']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $pnum = htmlspecialchars(trim($_POST['pnum']), ENT_QUOTES, 'UTF-8');

    $dob = isset($_POST['dob']) ? htmlspecialchars(trim($_POST['dob']), ENT_QUOTES, 'UTF-8') : '';

    $fullName = $fname . ' ' . $lname;

    // Programs
    $programs = isset($_POST['program']) ? $_POST['program'] : [];
    $programList = !empty($programs) ? implode(', ', $programs) : 'None Selected';

    // Email Validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email address.'
        ]);
        exit;
    }

    // Phone Validation (10 digits)
    if (!preg_match('/^[0-9]{10}$/', $pnum)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Phone number must be 10 digits.'
        ]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {

        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        // Sender / Receiver
        $mail->setFrom(SMTP_FROM, $fullName);
        $mail->addAddress(SMTP_TO, SMTP_COMPANY_NAME);

        // Email Format
        $mail->isHTML(true);
        $mail->Subject = 'New Admission Inquiry';

        $mail->Body = '
            <h2>New Admission Inquiry</h2>

            <p><strong>First Name:</strong> ' . $fname . '</p>
            <p><strong>Last Name:</strong> ' . $lname . '</p>
            <p><strong>Full Name:</strong> ' . $fullName . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Phone:</strong> ' . $pnum . '</p>
            <p><strong>Date of Birth:</strong> ' . $dob . '</p>
            <p><strong>Programs Interested In:</strong> ' . $programList . '</p>
        ';

        if ($mail->send()) {

            echo json_encode([
                'status' => 'success',
                'message' => 'Form submitted successfully.'
            ]);

        } else {

            echo json_encode([
                'status' => 'error',
                'message' => $mail->ErrorInfo
            ]);

        }

    } catch (Exception $e) {

        echo json_encode([
            'status' => 'error',
            'message' => $mail->ErrorInfo
        ]);

    }

} else {

    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid form submission.'
    ]);
}
?>