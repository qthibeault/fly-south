'use strict';

const filesystem = require('./filesystem');
const prompt = require('prompt');
const schema = require('../schema/migration');

function collectInput () {

    return new Promise(function (resolve, reject) {
        prompt.start();
        prompt.get(schema, function (err, results) {
            if(err)
                reject(err);

            prompt.stop();
            resolve(results);
        });
    });

}

function validateConfig (config) {

    return new Promise(function (resolve, reject) {
        
        // Prevent trying to copy a database to itself
        if(config.source === config.target && config.rename === undefined) {
            reject('Rename field must be present when copying inside the same database');
        }

        resolve();
    });
}

function createConfig (name, config) {

    return filesystem
        .createConfigFile(name, config);

}

module.exports = function (name) {

    const createNamedConfig = createConfig.bind(null, name);

    return collectInput()
        .then(validateConfig)
        .then(createNamedConfig);

}
