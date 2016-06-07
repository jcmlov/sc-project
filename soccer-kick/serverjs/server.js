var express = require("express");
var mysql = require("mysql");
var pool = mysql.createPool({
	host : "localhost",
	port : 3306,
	user : "study",
	password : "study",
	database : "studydb",
	connectionLimit : 20,
	waitForConnections : false
});

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/soccer-kick/nodeTest", function(req, res) {
	var callback = req.param("callback");
	var memail = req.param("memail");
	var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	if(regex.test(memail) === false) {
		res.send(callback+"({'status' : 'invalid'})")
	} else {
		pool.getConnection(function(err, connection) {
			connection.query("select count(*) cnt from member where memail='" + memail + "'", function(err, rows, fields) {
				if(err) throw err;
				if(rows[0].cnt == 1) {
					res.send(callback+"({'status' : 'fail'})");
				}else {
					res.send(callback+"({'status' : 'ok'})");
				}
				connection.release();
			});
		});		
	}
});

io.on("connection", function(socket) {
	console.log("request connection from client");
	socket.on("fromclient", function(data) {
		socket.emit("toclient", data);
		socket.broadcast.emit("toclient", data);
	});
}); 

http.listen(10001, function() {
	console.log("Node server has benn started on listening port 10001.");
});