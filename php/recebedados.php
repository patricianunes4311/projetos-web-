<?php
echo 'Script para receber e armazenar dados';

$productName = $_GET ['productName'];
$productPrice = $_GET ['productPrice'];
$productDescription = $_GET ['productDescription'];
$urlProductImage = $_GET ['urlProductImage'];
$categoriaprodutos = $_GET ['categoriaprodutos'];

// conexão com o banco de dados 

$hostname = 'localhost'; //variável e seus valores 
$user = 'root';
$password = 'ifsp';
$database = 'Store';
$conn = mysqli_connect($hostname,$user,$password,$database ); 

if($conn){
    echo 'conexão efetuada com sucesso';
    //gravar no banco de dados 
    $query = "insert into  products (productName,productPrice ,productDescription,urlProductImage,productCategory) values ('".$productName."'," .$productPrice. ",'". $productDescription."','".$urlProductImage.
  "','".$categoriaprodutos."'  );";
  echo "<br/>";
  echo $query;
  //realizar leitura do banco de dados   
  $resultado = mysqli_query($conn,$query);
  if($resultado){
      echo '<h2>Produto incluido com sucesso. </h2>';
      header("Location:".$_SERVER['index.html'].""); //após adicionar um produto voltar para página principal 
  }else{
    echo '<h2>Produto não  incluido. </h2>';
    var_dump(mysqli_connect($conn));
  }

}else{
    echo 'conexão com o banco de dados não efetuada  <br/>';
    echo mysqli_connect_error();
}

//var_dump mostra o tipo da variavél e o tamanho dela 
?>


