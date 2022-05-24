<?php
//conexão  com o banco de dados 

$hostname ='localhost'; //onde está o banco de dados 
$user = 'root'; //nome 
$password = 'ifsp';
$database = 'store';
$connection = mysqli_connect($hostname,$user,$password,$database ); 

if($connection){
    //echo "</br> Conexão efetuada com sucesso";

    //Realizar a leitura do banco de dados 

    $query = "select * from products";
    $results = mysqli_query($connection,$query);
    //                                                                                                                                                                                                                                                                   var_dump ($results);

    //Entregar dados para quem pediu 
    $products =[];
    $index=0;

    //while = enquanto 
    while($record = mysqli_fetch_row($results)){
    $product = new stdClass();
    $product -> id_product = $record[0];
    $product -> productName = $record[1];
    $product -> productPrice =$record[2];
    $product -> productDescription = $record[3];
    $product -> urlProductImage = $record[4];
    $product -> productCategory = $record[5];
    $products[$index] = $product;
    $index = $index + 1;

    }
    echo json_encode ($products);
}else{
    echo "</br>Conexão não efetuada";
    echo "</br>".mysqli_connect_error(); //simular erro 
}

?>