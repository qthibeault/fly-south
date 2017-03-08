'use strict';

const fs = require('./filesystem');

module.exports = function (name) {
    return fs.removeConfigFile(name);
}