var http = require("http");
http.createServer(function (req, res) {
    console.log('req!!!');
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end("<html><h1>안녕하세요</h1></html>");
}).listen(3000);
console.log('sever is ready');
