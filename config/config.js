var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'sendumainapp'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://127.0.0.1:27017/SendU'
    },

    test: {
        root: rootPath,
        app: {
            name: 'sendumainapp'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://127.0.0.1:27017/SendU'
    },

    production: {
        root: rootPath,
        app: {
            name: 'sendumainapp'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://127.0.0.1:27017/SendU'
    }
};

module.exports = config[env];
