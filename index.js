var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('Hello world!'));

var port = process.env.NODE_ENV == 'production' ? (process.env.port || 80) : 4000;
var server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
