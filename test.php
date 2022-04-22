<?php
    $conn = mysqli_connect("localhost","root","","test") or die("connection Failed");
    $input = file_get_contents("php://input");
    $decode = json_decode($input, true);

    $point = $decode['value'];
    $securePoint =  filter_var($point, FILTER_VALIDATE_INT);
    $sql = "INSERT INTO test(value) VALUES({$securePoint})";
    if(mysqli_query($conn,$sql)){
        echo json_encode(array('insert'=>'success'));
    }else{
        echo json_encode(array('insert'=>'failed'));
    }
?>