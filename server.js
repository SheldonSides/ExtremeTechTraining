var express = require('express');
    stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


//sets views locations and view engine
app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

function compile(str,path)
{
    return stylus(str).set('filename', path);
}

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

//routes request
app.get('*',function(req, res){
    res.render('index');
});

//routes static page request
app.use(express.static(__dirname + "/public"));

var port = 8080;

app.listen(port);

console.log("listening on port " + port + "...");