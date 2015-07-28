var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());
/**app.use(session({
  secret: 'password',
  key: 'sid',
  cookie: {
    secure: false
    }
    }));**/

app.use(session({
    cookie: { maxAge: 1000*60*2 } ,
    secret: "session secret" ,
    store:new MongoStore({
            db: 'express',
            host: '127.0.0.1',
            port: 27017,
            collection: 'session',
            autoReconnect:true
    })
}));

app.get('/', function(req, res){
  res.sendfile('./index.html');
});
app.post('/',function(req,res){
  req.session.name=req.body.name;
  res.redirect('/info');
});
app.get('/info',function(req,res){
  res.send('<div style="color:red;font-size:30;">'+req.session.name+'</div>'+'<div><a href="/">back</a></div>');
});

app.listen(3000);
