var appId = "H12ebyiw3KFdV5dCD2LgqeBJ3yP3rW4iZnmRhlGp";
var apiKey = "Eiob2zKJg8XlAGgihlF0CXwtIJkyDlrwIoyuYlvf";
var url = "https://api.parse.com/1/classes/AddressBook";
var jsKey="8iMqbUjKprcDQc1RJjGcJizjIqSRi9wqZUjp6yAd"
Parse.initialize(appId,jsKey);
var id="personInfo";
function clear(id)
{
  id.innerHTML="";
}

/******* adding data  **********/

function addData () 
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url, true);
    xhr.setRequestHeader("X-Parse-Application-Id",appId);
    xhr.setRequestHeader("X-Parse-REST-API-Key",apiKey);
    xhr.setRequestHeader("Content-Type", "application/json");
    var person=new Object();
    person.name=$("#name").val();
    person.address=$("#address").val();
    if(!person.name)
    {
      alert("Enter Name!!");
      return;
    }
    if(!person.address)
    {
      alert("Enter Address!!");
      return;
    }
    var data = JSON.stringify({ 'Name': person.name,'Address':person.address });
    xhr.send(data);
}


/************* Write function *****************/ 

function writeData() 
{
  var AddressBook = Parse.Object.extend("AddressBook");
  var query=new Parse.Query(AddressBook);
  query.find({
    success:function(results){
      var len=results.length;
      var text="<p></p>";
      for(i=0;i<len;i++)
      text+="<p>Name: "+results[i].get("Name")+"&nbsp &nbsp &nbsp Address: "+results[i].get("Address")+"<br>"; 
      document.getElementById(id).innerHTML=text;
    },
    error:function(error){
      console.log("An error occured");
    }
  });      
}


/************ Search function ****************/

function search(){
  var searchName=$("#searchName").val();
  if(!searchName)
    {
      alert("Enter Name for searching records!!");
      return;
    }
  // var arr=searchName.split("");
  // alert(arr[0]);
  var AddressBook = Parse.Object.extend("AddressBook");
  var query = new Parse.Query(AddressBook);
  query.matches("Name",searchName);
  query.find({
    success:function(results){
      var text="<p></p>"
      for(i=0;i<results.length;i++)
       text+="<p>Name: "+results[i].get("Name")+"&nbsp &nbsp &nbsp Address: "+results[i].get("Address")+"<br>"; 
      document.getElementById("searchResult").innerHTML=text;
    }
  })
//   query.equalTo("Name", searchName);
//   query.first({
//   success: function(results) {
//     console.log(results.get("Name"));
//     $('#searchResult').append('<p>Name: '+results.get("Name")+'&nbsp&nbsp&nbsp Address: '+results.get("Address")+'</p>');
//   },
//   error: function(error) {
//     alert("Error: " + error.code + " " + error.message);
//   }
// });

}

/*************** Delete Function ***********************/

function deleteQuery(name)
{
  var AddressBook = Parse.Object.extend("AddressBook");
  var query = new Parse.Query(AddressBook);
  var obj;
  query.equalTo("Name", name);
  query.first({
    success:function(results){
      results.destroy({
    success:function(obj){
      writeData(); 
      alert("Deleted!!")
    }
  }); 
    }
  });
 
}

/**************** Sort By Name ******************/

function sort_by_name()
{
  var id="personInfo"
  var AddressBook = Parse.Object.extend("AddressBook");
  var query = new Parse.Query(AddressBook);
  query.ascending("Name");
  query.find({ 
  success: function(results) {
    clear("#personInfo");
    var text="<p></p>"
    var len=results.length;
    for(i=0;i<len;i++)
    text+="<p>Name: "+results[i].get("Name")+"&nbsp &nbsp &nbsp Address: "+results[i].get("Address")+"<br>"; 
    document.getElementById(id).innerHTML=text;
    }
 });
}

/********************** Sort By Address ***************************/

function sort_by_address()
{
  var id="personInfo"
  var AddressBook = Parse.Object.extend("AddressBook");
  var query = new Parse.Query(AddressBook);
  query.ascending("Address");
  query.find({ 
  success: function(results) {
    clear("#personInfo");
    var text="<p></p>"
    var len=results.length;
    for(i=0;i<len;i++)
    text+="<p>Name: "+results[i].get("Name")+"&nbsp &nbsp &nbsp Address: "+results[i].get("Address")+"<br>"; 
    document.getElementById(id).innerHTML=text;
    }
 });
}


$(document).ready(function(e) 
{ 
  
 
  //******** Add Records *********** //
    $("#form_add").click(function(e) 
    {
    addData();
    writeData();
    e.preventDefault();
    $(this).reload();
   
    });
 
    // ************ search **************//
    
   $('#search').click(function(e)
   {
    search();
    $(this).reload();
     e.preventDefault();
   });


   //************  Delete Query ***********//

   $('#delete').click(function(e)
   {
    var deleteName=$("#deleteInfo").val();
    if(!deleteName)
    {
      alert("Enter Name for deleting coresspoding records!!");
      return;
    }
    deleteQuery(deleteName);
   
     e.preventDefault();
   });
    


   //************ sort ************// 
   
    $('#sort').click(function()
    {
      val=$('input[name="sort"]:checked').val();
      switch(val)
      {
      case "sort_by_name":
      sort_by_name();
      
      break;
      case "sort_by_address":
      sort_by_address();
      
      break;
      }
     
    });
 
});
