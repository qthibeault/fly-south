'use strict';

const fs = require('./filesystem');
const MongoClient = require('mongodb').MongoClient;

module.exports = function (name) {

    return fs.getConfigFile()
        .then(function (config) {

            // Validate config
            // Throw error if bad

            // connect to Destination Database
            // Go to admin Database
            // authenticate
            // Drop target Database
            // Init copy function

        });

}