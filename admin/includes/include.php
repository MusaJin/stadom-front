<?php 
session_start();
require 'rb/rb.php';

R::setup( 'mysql:host=localhost; dbname=stardom_db', 'root', '' );
// R::setup( 'mysql:host=localhost; dbname=musaku0d_db', 'musaku0d_db', 'w&T1OAmL' );

if (!R::testConnection()) {
    exit('Нет подключения к БД');
}

function formatstr($str){
    $str = trim($str);
    $str = stripslashes($str);
    $str = htmlspecialchars($str);
    return $str;
}

?>
