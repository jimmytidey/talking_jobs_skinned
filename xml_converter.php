<?php
@$target_file = $_GET['target'];

if(empty($target_file)) { 
    echo "no target selected";
    exit;
}

$xml = simplexml_load_file($target_file);

$paragraphs = $xml->body->div->p; 

header("Content-type: text/plain; charset=utf-8");  

for ($i = 0; $i < count($paragraphs); $i++) { 

    echo $i;
    echo "\r\n";
    $attributes = $paragraphs[$i]->attributes();
    $begin = $attributes[0];
    
    if ($i == count($paragraphs)-1) { 
        $end = '00:01:00.000' ;
    }
    else { 
        $attributes = $paragraphs[$i+1]->attributes();
        $end = $attributes[0];
    }
    echo "$begin --> $end";
    echo "\r\n";
    echo $paragraphs[$i];
    echo "\r\n";
    echo "\r\n";
    
}





?>