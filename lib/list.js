'use strict';

const fs = require('./filesystem');

module.exports = function () {
    return fs.getConfigFiles()
        .then(function (files) {
            if (files.length < 1) {
                console.log('No migrations available');
            } else {
                console.log('Available migrations:')
                files.forEach(function (file) {
                    console.log(file.slice(0, file.length - 5));
                });
            }
        });
}