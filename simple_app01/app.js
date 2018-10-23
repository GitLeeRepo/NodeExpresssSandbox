/*
    From: Brad Traversy's Express Crash Course YouTube video:
            https://www.youtube.com/watch?v=gnsO8-xJ8rs
    with some changes/addiions by me
*/

// note this example is using pre-ES6 syntax
// use import for ES6
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


// test object for JSON parsing
var people = [
    {
        name: 'Billy',
        age: 33
    },
    {
        name: 'Bobby',
        age: 55
    },
    {
        name: 'Sarah',
        age: 31
    }
]


/******** middleware ********/


// custom middleware
var logger = function(req, res, next) {
    console.log('Logging ' + req.ip + ' remote connection');
    // or: console.log('Logging ' +  req.connection.remoteAddress + ' remote connection');;
    next();
}
app.use(logger); // call whenever app is loaded

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// static folder middleware for css files and any other static resources
// create this as a subdirectory of your project folder
app.use(express.static(path.join(__dirname, 'public')));


/******** Route handler **********/


// handling GET requests to document root, 
// you would use post for POST requests
app.get('/', function(req, res){
    //res.send('<p>Hello World from simple Express App</p>');

    // you can only have one res.send/json per route
    // comment out the ones not currently used
    //res.send(path.join(__dirname, 'public'));
    res.json(people);
})


app.listen(3000, function() {
    console.log('Server started on port 3000');
})