<?php

function loadEnv($path)
{
    if (!file_exists($path)) {
        die('.env file not found');
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {

        if (trim($line) === '' || strpos(trim($line), '#') === 0) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);

        $name = trim($name);
        $value = trim($value);

        $_ENV[$name] = $value;
        putenv("$name=$value");
    }
}

loadEnv(__DIR__ . '/.env');

/* Define Constants */

define('SMTP_HOST', $_ENV['SMTP_HOST']);
define('SMTP_USERNAME', $_ENV['SMTP_USERNAME']);
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD']);
define('SMTP_FROM', $_ENV['SMTP_FROM']);
define('SMTP_TO', $_ENV['SMTP_TO']);
define('SMTP_PORT', $_ENV['SMTP_PORT']);
define('SMTP_COMPANY_NAME', $_ENV['SMTP_COMPANY_NAME']);
?>