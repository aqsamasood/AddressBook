var appId = "H12ebyiw3KFdV5dCD2LgqeBJ3yP3rW4iZnmRhlGp";
var apiKey = "Eiob2zKJg8XlAGgihlF0CXwtIJkyDlrwIoyuYlvf";
var ROOT = "https://api.parse.com/1/";

$.ajaxSetup({
    contentType:"application/json",
    dataType:"json",
    username:appId,
    password:apiKey,
    processData:false,
    headers:{
      "Authorization": make_base_auth(appId,apiKey)
     },
     error:function(e) { alert('error: '+e);}
});
function make_base_auth(user, password) {
     var tok = user + ':' + password;
//     var hash = Base64.encode(tok);
     var hash = window.btoa(tok);
     return "Basic " + hash;
    }
function writeData()
{
  $.ajax({
            url:ROOT+"classes/addressBook",
            type:"GET"
        }).done(function(e,status) {
            var s = "";
            for(var i=0; i<e.results.length; i++) {
                var person = e.results[i];
                s+= "<p><b>id:</b>"+addressBook.objectId+"<br/>";
                s+= "<b>created:</b>"+addressBook.createdAt+"<br/>";
                s+= "<b>title:</b>"+addressBook.title+"<br/>";
                s+= "</p>";
            }
            $("#result").html(s);
        });  
}
$(document).ready(function(e){
         //adding an item   
    $("#form_add").on("click", function() {
     var person=new Object();
    person.name=$("#name").val();
    person.address=$("#address").val();
        
        $.ajax({
            url:ROOT+"classes/addressBook",
            type:"POST",
            data:JSON.stringify(person)
        }).done(function(e,status) {
            alert('Done');
        });
        writeData();
    });

   

});