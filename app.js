const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");

const simpleGameLogic = require("./server/simpleGameLogic");

const PORT = 3001;

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
	// socket.on('startGame', () => {
		simpleGameLogic(socket);
	// });

	socket.on('disconnect', () => {
		console.log('client is disconnected');
	})
});

server.listen(PORT, () => {
	console.log(`Started up at port ${PORT}`);
});

module.exports = app;