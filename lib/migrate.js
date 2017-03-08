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

            MongoClient.connect(config.target + '/' + config.database)
                .then(function (db) {

                    return db.dropDatabase()
                        .then(function () {
                            const command = { 
                                copydb: 1, 
                                fromhost: config.source, 
                                fromdb: config.database, 
                                todb: "test_dup" 
                            };
                            const admin = db.admin();

                            return admin.command(command)
                        });

                })

        });

}