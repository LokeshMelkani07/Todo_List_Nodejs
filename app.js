const express = require("express");
const bodyParser = require("body-parser");
// const e = require("express");

const app = express();

/*
1 getDay() has values from 0-6 means 0 = sunday and so on
2 if we want to send file in html we just write html inside res.send(" html ")
3 if we want to send only one liner we can use res.send()
4 but to send more than one line we need to use res.write() and at the end write res.send()

app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  if (currentDay === 6 || currentDay === 0) {
    res.write("<h1>Its a weekend</h1>");
  } else {
    res.write("<h2>Its not a weekend</h2>");
    res.write("<p>Lorem ipsum dolor sit amet</p>");
    res.send();
  }
});

Instead of writing multiple res.write() here we can write a index.html and write out html in it and just do res.sendFile(__dirname + "/index.html")

Instead of repeating the text based on different logic and creating separate html files we can create a template and use it to avoid repeatition

To make templates we use something called EJS ( Embedded JavaScript templating)
Link of docs : https://ejs.co/#install go to using EJS with Express Section github link
After doing app.set()
We need to make a views folder where our view engine works
We make a list.ejs inside views and use res.render to render it. we just write simple html inside list.ejs
Let say we want to render a message "Its a <today's day>" so we ddynamically change <today's day> inside list.ejs by passing it from app.js
<%= variable %> is signature of writing that dynamic variable in list.ejs means <today's day>
we pass res.render method which take first arguement = our ejs in which we want to render , second arguement = key value pair where key is same variable name as in list.ejs <today's day> and value is value we want to pass through our app.js
Demo :
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  if (currentDay === 6 || currentDay === 0) {
    day = "Weekend";
    // res.render("list", { kindOfDay: day });  can write it for both if-else case or just write once at the end of if-else statements
  } else {
    day = "Weekday";
    // res.render("list", { kindOfDay: day });
  }
  res.render("list", { kindOfDay: day });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

if we want to render specific day on basis of currentDay , we can use switch statement
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Phudiyaan Phado day";
      console.log("Error : Current Day is " + currentDay);
      break;
  }
  res.render("list", { kindOfDay: day });
});

In list.ejs
{
      <!-- let say we want to check what is the value of kindOfDay coming from our server app.js and accordingly we want to change the colour of the text
    In EJS There are different types of tages one of them is <% 'Scriptlet' tag, for control-flow, no output, which is used for non-HTML statement means for simple Javascript which do not come in our output like "if(condition) and else and { and } of if-else blocks" below
    <% if(kindOfDay === "Saturday" || kindOfDay === "Sunday") { %>
        <h1 style="color: red"><%= kindOfDay %> Todo List</h1>
    <% } else {  %>
        <h1 style="color: blue"><%= kindOfDay %> Todo List</h1>
    <% }  %>
    -->

    ************* In app.js *******************
    Now we create a ul / li and prepare to make a todo list
    we create a form to make a input and button
    we make a post reuqest in the input field of form using its name attribute
    and do app.post to the home route('/) here
    we declare a variable item in which we keep the whatever we write on input section of form using body-parser
    Using EJS in list.ejs we declare a new variable "newListItem" to add new items we write in input to the list
    we assign newListItem : item in res.render of app.get itself because we only get to see whatever inside app.get
    and in app.post we just redirect to "/"
    But whenever we write a new item in input it overwrites the previous in the list
    so instead of making a variable item we make it an array items so that everytime the new input gets added in list and list grows on instead of overwriting
    // var item = "";   --->  var items = []
    and we push the item inside items var item = req.body.newItem; and items.push(item); and "newListItem : items" whole array
}

  *********** In List.ejs ****************
  we change the variable name "newListItem" -> "newListItems" as now its an array
  we make a for loop in this array and for each value of newListItem we make a new <li>
  "<li><%= newListItem %></li>"  changes to "<li><%= newListItems[i] %></li>" inside for loop

  ********************** In app.js ******************************

  To make the simplicity we add  <li>Buy Food</li> and <li>Cook Food</li> and <li>Eat Food</li> in our array items only
  var items = [];  changes to var items = ["Buy Food" , "Cook Food" , "Eat Food"];

  ********************* Concept of Scope *************************
  Case 1 :

  function a {
    var x = 2;
    console.log(x);  // 2
  }
  In this case we can access the variable x

  Case 2 :

  function a {
    var x = 2;
    console.log(x);  // 2
  }
  console.log(x);  // Not possible
  In the above case its not possible because the scope of the variable x is just inside of function a so we can do anything wiyh x inside the {} but cannot do anything outside the {}

  Case 3 :
  function a {
    var x = 2;
    console.log(x);  // 2
  }
  function b{
    console.log(x);  // Not possible either
  }

  In the above case its not possible either
  Scope of varible x is just inside the function a. These are Local Variables

  Case 4 :
  var x = 2;
  function a{
    console.log(x) // 2
  }
  function b{
    console.log(x) // 2
  }

  In above case its possible to access the variable x from both function a and b these are called global variables

  Case 5 :
  if(true){
    var x = 2;
    console.log(x);
  }
  console.log(x);  // this is also possible

  In above case , if there are any other block other than function then we can access the variable from outside also it acts as a soft wall.

  ************************************* Scope ****************************************
  We have three ways of variable declaration in JS
  var , let , const
  const is when we give a value we cannot change it in future
  var and let have different relation with scope
  In terms of function var , let , const all are local variable. if declared inside function their scope is inside function only.
  but
  Outside function if we declare them anywhere then all 3 behaves as global variables
  but
  if we create variables inside if-else , for , while , do-while loop then var is global but let and const are local variable

  So Instead of var , use let and const
  var items = ["Buy Food", "Cook Food", "Eat Food"]; changes to  let items = ["Buy Food", "Cook Food", "Eat Food"];

  ************************ Styling our list.ejs *******************************
  We make a new folder called css and make a styles.css file inside it
  we write our css inside styles.css
  But when we link our list.ejs with styles.css it does not show up because when we use express , it does take all files in our project automatically. it takes only main file ("main": "app.js",) which is specified in package.json and access inside views folder. it ignore everything else. As styles.css is inside our css folder which is inside our root directory so it cannot access it.
  Sameway in future we can create a javascript file or images file or another css file so to let them accessed by express we create a public folder and put them inside it.
  and tell express that app.use(express.static('public'));
  but does not change the css path it remains same "/css/styles.css" only
   input:checked+p
   { text-decoration: line-through;
     text-decoration-thickness: 3px;
     text-decoration-color: #d35400;
   }
   in css file means its a css selector which means put that style in the <p> after checked the input checkbox

   ********************************* Layouts in EJS **********************************************
   Let say we want to make many pages like about , home , contact etc
   To get header , footer and heading etc we need to copy paste in in all pages sepearately or
   we can make use of Layouts in EJS which help us in creating a Layout and we can use that same Layout to duplicate same things in multiple pages and save ourself from Reppeating.
   For Example :
   <%- include('header'); -%>
       <h1>
        Title
       </h1>
        <p>
          My page
        </p>
   <%- include('footer'); -%>
   So in our views folder we make a header.ejs and footer.ejs
   We copy this part of list.ejs in header.ejs
   <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/styles.css">
    <title>Todo List</title>
  </head>
  <body>

  We copy this part of list.ejs in footer.ejs
  </body>
  <footer>
    Copyright 2022 Lokesh
  </footer>
  </html>

  Now in list.ejs we just copy
  <%- include('header'); -%> in header as file name is 'header.ejs'
  <%- include('footer'); -%> in footer as file name is 'footer.ejs'
  Now we can duplicate the same in other files if we make like about.ejs or anything else

  ****************************** How Node Modules Exports Works *********************
  Let say the let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  is coming from an different page "date.js". so how do we export it in app.js and use it ?
  We make use of modules in nodejs and we export day from date.js using
  const date = require(__dirname + "date.js"); in top of app.js

  ************************* In date.js ***************************
  we can use module.exports('Hello World');
  then the value of date in app.js if console.log(date) written becomes "hello world"
  Let say we write the logic of date inside a function getDate
  module.exports(getDate);
  function getDate(){
    let today = new Date();
   let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
   };
   let day = today.toLocaleDateString("en-US", options);
   return day;
  }
  now we put value of "module.exports(getDate);" // Do not use () otherwise it will activate the function we just need to call it.

  Now in app.js , value of date variable becomes funtion getDate
  so console.log(date()) gives us Monday , August 8   // need to apply () here as we are calling the function bound to that variable date.

  Now we can use date() wherever we want to use it , store it in variable day and use it
  let day = date();
  res.render("list", { kindOfDay: day, newListItems: items });

  Now code in date.js becomes re-usable
  Let say we write another function in date.js
  function getDay() {
    let today = new Date();
    let options = {
      weekday : 'long'
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
  }
  Now module.exports = getDate already so how do we do it ?
  we know module.exports is a Javascript Object
  so we do
  module.exports.getDate = getDate  // for getDate function
  module.exports.getDay = getDay  // for getDay function

  Now in app.js
  console.log(date) gives
  {getDate : [Function : getDate] , getDay : [Function: getDay]}

  now place where we wanted getDate we do
  var day = date.getDate()
  res.render("list", { kindOfDay: day, newListItems: items });

  and place where we wanted getDay we do
  var day = date.getDay()
  res.render("list", { kindOfDay: day, newListItems: items });

  ********************* Shortcuts to make code short *************************
  Instead of writing module.exports we can also write exports
  and write in date.js like
  exports.getDay = () => {
    let today = new Date();
    let options = {
      weekday : 'long'
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
  }

  or

  exports.getDay = function() {
    let today = new Date();
    let options = {
      weekday : 'long'
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
  }

  we can change let -> const in date.js as there value will not change in future

  ****************************** Fun Fact JS Array ****************************
  const array = [];
  // we can think that we have declared above array as const so now we cannot push items in it
  // but its not like that in js , we can still push elements in array
  array.push('A);  // ["A"]
  but we cannot assign array to a new Array
  array = ["B"]; // Not possible
  Sameway with objects , object declared const
  we cannot assign it to another object but we can value the value associated with one of its key
  const obj = {'key' : 'value'};
  obj = {'another_key' : 'another_value'}
  obj.another_key = 'other_value';  // this is possible
  obj = obj{"new_key" : 'new_value'}; // not possible
*/

// let items = ["Buy Food", "Cook Food", "Eat Food"];
let items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  // console.log(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
