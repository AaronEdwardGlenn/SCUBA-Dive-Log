const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());
app.use(express.static('public'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/dives', require('./routes/dives')); 

app.use(require('./lib/middleware/not-found'));
app.use(require('./lib/middleware/error'));

module.exports = app;
