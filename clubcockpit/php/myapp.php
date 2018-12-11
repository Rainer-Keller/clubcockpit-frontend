<?php
require_once 'app.php';
class MyApp extends APP
{
    public function __construct() {
        parent::__construct();

        // Name der App festlegen
        $this->name = 'myapp';
    }

    protected function anfangsDaten() {
        if ($this->method == 'GET') {
            $rc = Array();
            $rc['wert1'] = rand(1, 9);
            $rc['wert2'] = rand(1, 9);

            return $rc;
        } else {
            return "Only accepts GET requests";
        }
     }

     protected function zusammenrechnen() {
        if ($this->method == 'GET') {
            $eingangsDaten = $this->request;

            $rc = Array();
            $rc['ergebnis'] = intval($eingangsDaten['wert1']) + intval($eingangsDaten['wert2']);

            return $rc;
        } else {
            return "Only accepts POST requests";
        }
     }
 }
