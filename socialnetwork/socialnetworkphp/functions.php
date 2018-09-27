<?php
include("config.php");


function getPeople(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM people");
    $num_rows = $result->num_rows;
    $people=array();
    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $person = array();
            $person['list_id'] = $row['list_id'];
            $person['list_firstName'] = $row['list_firstName'];
            $person['list_surname'] = $row['list_surname'];
            $person['list_age'] = $row['list_age'];
            $person['list_gender'] = $row['list_gender'];
            $person['list_friends'] = $row['list_friends'];
            
            array_push($people,$person);
        }
    $rarray['people'] = $people;
    return json_encode($rarray);
    }
    else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }

}

?>