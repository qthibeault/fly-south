'use strict';

const fs = require('./filesystem');
const util = require('util');

module.exports = function (name) {
    return fs.getConfigFile(name)
        .then(function (config) {
            const output = util.inspect(config, {
                colors: true,
                depth: null
            });
            console.log(output);
        })
}