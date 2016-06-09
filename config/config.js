var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'codebakerymainapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://52.160.105.205/newDB'
  },

  test: {
    root: rootPath,
    app: {
      name: 'codebakerymainapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://52.160.105.205/newDB'
  },

  production: {
    root: rootPath,
    app: {
      name: 'codebakerymainapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://52.160.105.205/newDB'
  }
};

module.exports = config[env];
