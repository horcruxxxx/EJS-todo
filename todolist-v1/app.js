const express = require("express");
const bodyParser = require("body-parser");
var tasks = ["milk","coffee"]; //we will create a array as because we want task to get added not to overwrite.
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//this line of code will tell you that our app(which was build by express) to use EJS as its view engine.
app.set('view engine', 'ejs');

app.get("/",function(req,res){
   var today   = new Date();
   var currday = today.getDay();
   var day="";

   if(currday===0) day="sunday";        else if(currday===1) day="Monday";
   else if(currday===2) day="Tuesday";  else if(currday===3) day="wednesday";
   else if(currday===4) day="thursday"; else if(currday===5) day="friday";
   else if(currday===6) day="saturday";

   res.render('list',{DayType:day,newitems:tasks}); //ese bhi list ke item ek ke baad ek nhi aayenge balki side by side aa jaayenge.
});

app.post("/",function(req,res){
    var task = req.body.i1;
    tasks.push(task);

    //we can not use res.render('list',{newitem:task}); get request me smilega nhi usko to vo bolega ki missing hai.
    //isliye redirect krna padega baar baar.or jo 'value' hai key-value pair ki vo bhi globally declare krni padegi
    //jo ar ek post request ke sath hi sath overwrite hoyi jaayegi. 

    res.redirect("/");
    //using this we get redirected to the home route.
    //in order to overwrite the value of our globall variable which we have to use as a ejs object.
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});