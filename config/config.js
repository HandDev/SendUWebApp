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
        db: 'mongodb://104.41.183.65:27017/UserManage'
    },

    test: {
        root: rootPath,
        app: {
            name: 'sendumainapp'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://104.41.183.65:27017/UserManage'
    },

    production: {
        root: rootPath,
        app: {
            name: 'sendumainapp'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://104.41.183.65:27017/UserManage'
    }
};

module.exports = config[env];
