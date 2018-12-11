$apps = array()

function registerApp($app)
{
    if trim($name) == false {
        exit(1);
    }
    if array_key_exists($app->name, $apps) {
        exit(1);
    }
}

// Requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

registerApp(new MyApp());


try {
    $pathComponents = explode('/', rtrim($_REQUEST['request'], '/'));
    $app = $apps[$pathComponents[0]];
    echo $app->processAPI($pathComponents);
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}
