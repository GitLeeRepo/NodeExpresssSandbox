// note this example is using pre-ES6 syntax
// use import for ES6
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// object for testing JSON parsing

var person = {
    name: 'Billy',
    age: 33
}


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
    var opt = 4;
    const minOpt = 1;
    const maxOpt = 4;
    var heading = '<h1>Node + Express Demo</h1>';
    var options = '<ul>' + 
            '<li>1 = This option</li>' +
            '<li>2 = parse object to json</li>' +
            '<li>3 = display app path</li>' +
            '<li>4 = display the query string</li>' +
            '</ul>';

    if (typeof req.query.q == 'undefined') {
        opt= -1;
    }
    else {

        num = parseInt(req.query.q, 10);

        if (num >= minOpt && num <= maxOpt) {
            opt = num;
        }
        else {
            opt = -1;
        }
    }


    //note you can only have one res.send/res.json per route
    switch (opt) {
        case 1:
            res.send(heading + options);
            break;
        case 2:
            res.json(person);
            break;
        case 3:
            res.send(heading + path.join(__dirname, 'public'));
            break;
        case 4:
            res.send(heading + 'query string value (req.query.q) = ' + req.query.q + '<br>');
            break;
        default:
            res.send(heading + '<p>No valid optition parameter sent as query string on the end of the url. Append "?q=#" to the url, ' + 
                    'where # is ' + minOpt + ' through ' + maxOpt + ' options:</p>' + options);
    }
})



app.listen(3000, function() {
    console.log('Server started on port 3000');
})