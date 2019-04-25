# Introdução ao PHP


```
<html>
  
  <head>
    
  </head>
  <body>
    <?php
  $servername = "localhost";
  $username = "id8850089_bd_dsi";
  $password = "id8850089_bd_dsi";
  $dbname = "id8850089_bd_dsi";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM usuario";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - E-mail: " . $row["email"]."<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>


    
  </body>
</html>

    
  </body>
</html>
```


```
<!DOCTYPE html>
<html>
<body>

<form action="cadastrar.php">
  Nome:<br>
  <input type="text" name="nome">
  <br>
  e-mail:<br>
  <input type="text" name="email">
  <br><br>
  Endereco:<br>
  <input type="text" name="endereco">
  <br><br>
  senha:<br>
  <input type="password" name="senha">
  <br><br>
  <input type="submit" value="Cadastrar">
</form> 
  
  <a href="listar.php">Listar usuarios</a>


</body>
</html>
```
 
 
``` php
<html>
<body>

Bem vindo <?php echo $_GET["nome"]; ?><br>
Tome cuidado, agora sei seu e-mail: <?php echo $_GET["email"]; ?>
  <?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "loja";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "<br>Sistema conectado ao sgbd";
  $nome = $_GET["nome"];
  $senha = sha1($_GET["senha"]);
  $email = $_GET["email"];
  $endereco = $_GET["endereco"];
  
  $sql = "INSERT INTO usuario (nome, email, senha, endereco)
VALUES ('".$nome."', '".$email."', '".$senha."', '".$endereco."')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastrado com sucesso!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
  
  ?>

</body>
</html>
```
