'use strict';

const schema = require('../schema/migration');
const validate = require('./validate');
const filesystem = require('./filesystem');
const prompt = require('prompt');

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

function createConfig (name, config) {

    return filesystem
        .createConfigFile(name, config);

}

module.exports = function (name) {

    const createNamedConfig = createConfig.bind(null, name);

    return collectInput()
        .then(validate)
        .then(createNamedConfig);

}
