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
        if(config.source === config.target && config.rename === undefined) {
            reject('Rename field must be present when copying inside the same database');
        }

        resolve(config);
    });

} 