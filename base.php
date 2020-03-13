<?php
$base = 'mysql:dbname=alp;host=localhost';
$root = 'root';
$password = '';

try {
    $db = new PDO($base, $root, $password);
    $db->exec("set names utf8");

        $nick = $_POST['nick']; 
        $messege = $_POST['messege']; 
        $date = $_POST['date'];
        $color = $_POST['color'];
        
        $query = "INSERT into `komunikator` values ('','$nick','$messege','$date','$color')";
        $result = $db->query($query);
        
    echo "test";
} 

catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>