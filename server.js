'use strict';

const sequelize = require('./db/sequelize');
const app = require('./app');

const {PORT} = require('./config');

let server;

function runServer(port) {
  return new Promise((resolve, reject) => {
    try {
      server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main ===module) {
  runServer(PORT).catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = {runServer, closeServer};