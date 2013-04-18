<?php
$con=mysqli_connect("localhost","root","root","my_db");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

if($_SERVER['REQUEST_METHOD']=="GET") {
$function = $_GET['call'];
if(function_exists($function)) {        
    call_user_func($function);
} else {
    echo 'Function Not Exists!!';
}
}

if($_SERVER['REQUEST_METHOD']=='POST'){
  $function=$_POST['call'];
  if(function_exists($function))
  {        
    call_user_func($function);
  } 
  else
  {
    echo 'Function Not Exists!!';
  }
}



/****************** Select Query *************************/

function selectQuery()
{
global $con;
$result = mysqli_query($con,"SELECT * FROM Persons");
echo "<table border='1'>
<col width='100'>
<col width='300'>
<tr>
<th bgcolor='#28798B'>Name</th>
<th bgcolor='#28798B'>Address</th>
</tr>";

while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['Name'] . "</td>";
  echo "<td>" . $row['Address'] . "</td>";
  echo "</tr>";
  }
echo "</table>";
}

/******************** Insert Query ********************************/

function insertQuery()
{
global $con;
$sql="INSERT INTO Persons (Name, Address)
      VALUES ('$_POST[name]','$_POST[address]')";
if (!mysqli_query($con,$sql))
  {
    die('Error: ' . mysqli_error());
  }
echo selectQuery();
}

/************************* Delete Query *************************************/

function deleteQuery()
{
  global $con;
  $sql="DELETE FROM Persons WHERE Name='$_POST[name]'";
  if (!mysqli_query($con,$sql))
  {
    exit(1);
    //die('Error: Name does not exist in the Address Book ' . mysqli_error());
  }
  echo selectQuery();
}


/******************************* Search Query **********************************/

function searchQuery()
{
global $con;
$sql="SELECT * FROM Persons WHERE Name='$_POST[name]' ";
$result = mysqli_query($con,$sql);
echo "<table border='1'>
<col width='100'>
<col width='300'>
<tr>
<th bgcolor='#28798B'>Name</th>
<th bgcolor='#28798B'>Address</th>
</tr>";

while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['Name'] . "</td>";
  echo "<td>" . $row['Address'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

}

/***************************** Sort By Name ***********************************/
function sortByNameQuery()
{
  global $con;
  $result = mysqli_query($con,"SELECT * FROM Persons ORDER BY Name");
  echo "<table border='1'>
  <col width='100'>
  <col width='300'>
  <tr>
  <th bgcolor='#28798B'>Name</th>
  <th bgcolor='#28798B'>Address</th>
  </tr>";

  while($row = mysqli_fetch_array($result))
  {
    echo "<tr>";
    echo "<td>" . $row['Name'] . "</td>";
    echo "<td>" . $row['Address'] . "</td>";
    echo "</tr>";
  }
  echo "</table>";

}

/************************* Sort By Address *******************************/
function sortByAddressQuery()
{
  global $con;
  $result = mysqli_query($con,"SELECT * FROM Persons ORDER BY Address");
  echo "<table border='1'>
  <col width='100'>
  <col width='300'>
  <tr>
  <th bgcolor='#28798B'>Name</th>
  <th bgcolor='#28798B'>Address</th>
  </tr>";

  while($row = mysqli_fetch_array($result))
  {
    echo "<tr>";
    echo "<td>" . $row['Name'] . "</td>";
    echo "<td>" . $row['Address'] . "</td>";
    echo "</tr>";
  }
  echo "</table>";

}

mysqli_close($con);
?>