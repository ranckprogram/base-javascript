var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');


//同步读取密钥和签名证书
var options = {
	key: fs.readFileSync('../ca/server.key'),
	cert: fs.readFileSync('../ca/server.crt')
};

var app = express();
var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);


app.use(express.static('../position'));

app.get('/', function(req, res, next) {
	res.send('Hello Express+https');
});

//https监听3000端口
httpsServer.listen(3000);
//http监听3001端口
httpServer.listen(3001);
