<?php
$time=time();
$base = 'mysql:dbname=alp;host=localhost';
$root = 'root';
$password = '';
$backJSON = false;
$delJSON = false;

while(time()-$time<=5 && !$backJSON){
        try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
                $time2 = $_POST['nowTime'];
                $count = $_POST['count'];

                $query = "SELECT * FROM `komunikator` WHERE `date` > '$time2'";
                $result = $db->query($query);

                $data = $result->fetchAll();
                $length = count($data);
                
        } 
        catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
        }

        if($count < $length) {$backJSON = true;}
        if($length > 40) {$delJSON = true;}
        usleep(25000);
}

if($backJSON) {echo json_encode($data);}

else if($delJSON) {
        echo("delete");
        $delJSON = false;
        $query =  "DELETE FROM `komunikator` WHERE `id` > 0"; 
        $result = $db->query($query);
}
else {echo("noUpdate");}

?>