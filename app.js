/*
require('./hello');
var answer = require('./module/question');
var test = require('./test');

var ask = answer.ask("What is your name ");

console.log(ask)
console.log("...................")

var as = test.Twoanswer();
var test = test.answer();
console.log(test);
console.log(as);
require('./comptional');

console.log("It works!");

var express = require('express');

var app = express();
app.set('port',3000);
var server = app.listen(app.get('port'),function(){
    var port1 = server.address().port;
    console.log("Magic on port: "+ port1);
});

console.log("Me First!");




*/

require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
const { urlencoded } = require('express');

app.set('port',3000);
app.use(bodyParser.urlencoded({extended: false}) );
app.use(bodyParser.json());

app.use('/api',routes);

//use static folder to respond to browser;
app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use("/public/images", express.static(path.join("/public/images"))); 





var server = app.listen(app.get('port'),function(){

    var port = server.address().port;
    console.log("listen to port", port);
})
