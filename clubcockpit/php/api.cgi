#!/usr/bin/php5
<?php
echo "Content-type: application/json\r\n\r\n";

require_once 'myapp.php';

$apps = array();

function registerApp($app)
{
    global $apps;

    if (trim($app->name) == false) {
        exit(1);
    }
    if (array_key_exists($app->name, $apps)) {
        exit(1);
    }
    $apps[$app->name] = $app;
}

// Requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

registerApp(new MyApp());

try {
    $pathComponents = explode('/', trim($_SERVER['PATH_INFO'], '/'));
    $name = array_shift($pathComponents);
    $app = $apps[$name];
    echo $app->processAPI($pathComponents);
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}
