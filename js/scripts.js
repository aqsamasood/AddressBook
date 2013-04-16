var appId = "H12ebyiw3KFdV5dCD2LgqeBJ3yP3rW4iZnmRhlGp";
var apiKey = "Eiob2zKJg8XlAGgihlF0CXwtIJkyDlrwIoyuYlvf";
var url = "https://api.parse.com/1/classes/addressBook";
var jsKey="8iMqbUjKprcDQc1RJjGcJizjIqSRi9wqZUjp6yAd"
Parse.initialize(appId,jsKey);
var id="personInfo";
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
    // var len=arr.length;
    // arr[len]=person;  
}

function clear(id)
{
  id.innerHTML="";
}

function writeData() 
{
  
  var addressBook = Parse.Object.extend("addressBook");
  var query = new Parse.Query(addressBook);
  query.get("7cU26gH6Wf",  {
  success: function(name) {
    // The object was retrieved successfully.
    console.log(name.get("Name"));
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
  var newQuery=new Parse.Query(addressBook);
  newQuery.find({
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

function search(){
  var searchName=$("#searchName").val();
  alert(searchName);
  if(!searchName)
    {
      alert("Enter Name for searching records!!");
      return;
    }
  var addressBook = Parse.Object.extend("addressBook");
  var query = new Parse.Query(addressBook);
  query.equalTo("Name", searchName);
  query.first({
  success: function(results) {
    console.log(results.get("Name"));
    $('#searchResult').append('<p>Name: '+results.get("Name")+'&nbsp&nbsp&nbsp Address: '+results.get("Address")+'</p>');
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
 //  alert('Search Fail: Name not found!!');
}

function deleteQuery(name)
{
  alert(name);
  var addressBook = Parse.Object.extend("addressBook");
  var query = new Parse.Query(addressBook);
  var obj;
  query.equalTo("Name", name);
  query.first({
    success:function(results){
      results.destroy({
    success:function(obj){
      alert("Deleted!!")
    }
  }); 
    }
  });
  window.location.reload();
}
function sort_by_name()
{
  var id="personInfo"
  var addressBook = Parse.Object.extend("addressBook");
  var query = new Parse.Query(addressBook);
  query.ascending("Name");
  query.find({ 
  success: function(results) {
    // results has the list of users with a hometown team with a winning record
    console.log("result count" + results.length);
    console.log(results[10].get("Name"));
    clear("#personInfo");
    var text="<p></p>"
    var len=results.length;
    for(i=0;i<len;i++)
      text+="<p>Name: "+results[i].get("Name")+"&nbsp &nbsp &nbsp Address: "+results[i].get("Address")+"<br>"; 
    document.getElementById(id).innerHTML=text;


  }
});
  
}

function sort_by_address()
{
  arr.sort(function(a, b)
  {
    nameA=a.address.toLowerCase();
    nameB=b.address.toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1 
    if (nameA > nameB)
      return 1
    return 0 //default return value (no sorting)
    })
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
     $(this).reload();
     
    });
 
});
