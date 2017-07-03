const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const friendsRouter = require('./routes/friends');
const hospitalizationsRouter = require('./routes/hospitalizations');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/friends', friendsRouter);
app.use('/hospitalizations', hospitalizationsRouter);

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not found'});
});

module.exports = app;