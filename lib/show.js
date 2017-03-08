'use strict';

const fs = require('./filesystem');
const util = require('util');

module.exports = function (name) {
    return fs.getConfigFile(name)
        .then(function (config) {
            console.dir(config, {
                colors: true,
                depth: null
            });
        });
}