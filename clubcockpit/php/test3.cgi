#!/usr/bin/php5
<?php
echo "Content-Type: text/plain;charset=utf-8\r\n\r\n";

var_dump($_POST);
print_r($_POST);
var_dump($_GET);
print_r($_GET);
var_dump($_REQUEST);
print_r($_REQUEST);
$data = file_get_contents('php://input');
echo($data);

var_dump($_SERVER);
