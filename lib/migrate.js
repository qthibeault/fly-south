'use strict';

const fs = require('./filesystem');
const validate = require('./validate');
const MongoClient = require('mongodb').MongoClient;

module.exports = function (name) {

    return fs.getConfigFile(name)
        .then(validate)
        .then(function (config) {

            // connect to Destination Database
            // Go to admin Database
            // authenticate
            // Drop target Database
            // Init copy function

            const mongoUrl = config.target + '/' + config.database;
            const copyCommand = {
                copydb: 1,
                fromhost: config.source,
                fromdb: config.database,
                todb: config.rename || config.database
            };

            MongoClient.connect(mongoUrl)
                .then(function (db) {
                    return db.authenticate(config.username, config.password)
                        .then(function() {
                            return db.dropDatabase(copyCommand.todb);
                        })
                        .then(function() {
                            return db.admin();
                        });
                })
                .then(function(adminDb) {
                    return adminDb.authenticate(config.username, config.password)
                        .then(function() {
                            return adminDb.command(copyCommand);
                        });
                });
        });

}
