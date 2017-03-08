'use strict';

const fs = require('./filesystem');

module.exports = function () {
    return fs.getConfigFiles()
        .then(function (files) {
            console.log('Available migrations:')
            files.forEach(function (file) {
                console.log(file.slice(0, file.length - 5));
            });
        });
}