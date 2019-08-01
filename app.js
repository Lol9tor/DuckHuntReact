const express = require('express');
const bodyParser = require('body-parser');

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
app.use('/', express.static('./duck_hunt/build/'));
// app.use('/*', express.static('/dist/'));
app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, () => {
	console.log(`Started up at port ${PORT}`);
});

module.exports = app;