'use strict';

const fs = require('./filesystem');
const MongoClient = require('mongodb').MongoClient;
const revalidator = require('revalidator');
const schema = require('../schema/migration');

module.exports = function (name) {

    return fs.getConfigFile()
        .then(function (config) {

            const validationResult = revalidator.validate(config, schema);
            if (!validationResult.valid) {
                throw validationResult.errors;
            }

            // connect to Destination Database
            // Go to admin Database
            // authenticate
            // Drop target Database
            // Init copy function

        });

}