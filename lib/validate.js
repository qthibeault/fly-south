'use strict';

const revalidator = require('revalidator');
const schema = require('../schema/migration');

module.exports = function (config) {

    return new Promise(function (resolve, reject) {

        const validationResult = revalidator.validate(config, schema);
        if (!validationResult.valid) {
            reject(validationResult.errors);
        }

        // Prevent trying to copy a database to itself
        if (config.source === config.target) {
            if (!config.rename || config.rename.length < 1) {
                reject('Rename field must be present and not empty when copying inside the same database');
            }   
        }

        resolve(config);
    });

};