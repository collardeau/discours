var path = require('path');

module.exports = {
  paths: {
    build: path.resolve(__dirname, 'public', 'build'),
    main: path.resolve(__dirname, 'app', 'main.js'),
    nodeModules: path.resolve(__dirname, 'node_modules'),
    DB: 'http://discours.firebaseIO.com',
    logDB: 'http://discours-log.firebaseIO.com',
    devDB: 'http://dev-discours.firebaseIO.com',
    devLog: 'http://dev-log-discours.firebaseIO.com'
  }
};


