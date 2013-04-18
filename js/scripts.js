/********* show Text **********/

function showText(str)
{
 $.ajax({
       url: "php/getData.php",
       type: "GET",
       data: "call=selectQuery",
       cache: true,
       success: function(response){
       	document.getElementById("personInfo").innerHTML=response;
       }
	});
}


/******* Adding Info to the AddressBook *****/

function addData()
{
	var get_name=$("#name").val();
	if(!get_name)
	{
		alert("Enter Name!!");
		return;	
	}
		
	var get_address=$("#address").val();
	if(!get_address)
	{
		alert("Enter Address!!");
		return;
	}
		
	$.ajax({
       url: "php/getData.php",
       type: "POST",
       data: {'call':'insertQuery','name':get_name,'address':get_address},
       cache: true,
       success: function(response){
       	document.getElementById("personInfo").innerHTML=response;
       }
	});
}

/**** Deleteing perticular info from address Book ****/

function deleteData()
{
	var get_name=$("#deleteInfo").val();	
	if(!get_name)
		alert('Enter Name!!');
	$.ajax({
       url: "php/getData.php",
       type: "POST",
       data: {'call':'deleteQuery','name':get_name},
       cache: true,
       success: function(response){
       	if(!response)
       	{
       		alert("Error: Name not Found!!");
       		return;
       	} 
       	document.getElementById("personInfo").innerHTML=response;
       }
         
	});
}

/*** searching info from address Book *****/
	
function searchData(str)
{
	var get_name=$('#searchName').val();
	if(!get_name) alert("Enter Name for Search");
 	$.ajax({
       url: "php/getData.php",
       type: "POST",
       data: {'call':'searchQuery','name':get_name},
       cache: true,
       success: function(response){
       	if(!response)
       	{
       		alert("Error: Name not Found!!");
       		return;
       	} 
       	document.getElementById("searchResult").innerHTML=response;
       }
	});
}

/******** sorting ******/

function sortByName()
{
 	$.ajax({
       url: "php/getData.php",
       type: "POST",
       data: {'call':'sortByNameQuery'},
       cache: true,
       success: function(response){
       	document.getElementById("personInfo").innerHTML=" ";
       	document.getElementById("personInfo").innerHTML=response;
       }
	});
}
function sortByAddress()
{

 	$.ajax({
       url: "php/getData.php",
       type: "POST",
       data: {'call':'sortByAddressQuery'},
       cache: true,
       success: function(response){
       document.getElementById("personInfo").innerHTML=" ";
       document.getElementById("personInfo").innerHTML=response;
       }
	});
}

$(document).ready(function(e){
	$('#sort').click(function()
    {
      val=$('input[name="sort"]:checked').val();
      switch(val)
      {
      case "sort_by_name":
      sortByName();
      
      break;
      case "sort_by_address":
      sortByAddress();
      
      break;
      }
     
    });
});

