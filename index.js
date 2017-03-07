'use strict';

const util = require('util');
const create = require('./lib/create');
const fs = require('./lib/filesystem');

function createMigration (name) {
    return create(name)
        .then(() => {
            console.log(`Created configuration ${name} successfully`)
            process.exit(0);
        })
        .catch(function(err) {
            console.error(`Could not create migration configuration ${name}`);
            console.error(err);
            process.exit(-1);
        });
}

function runMigration (name) {

}

function listMigrations () {
    return fs.getConfigFiles()
        .then(function (files) {
            console.log('Available migrations:')
            files.forEach(function (file) {
                console.log(file.slice(0, file.length - 5));
            });
        })
        .then(function () {
            process.exit(0);
        })
        .catch(function (err) {
            console.error(`Could not list migration configurations`);
            console.error(err);
            process.exit(-1);
        });
}

function removeMigration (name) {
    return fs.removeConfigFile(name)
        .then(function () {
            console.log(`Successfully removed migration configuration ${name}`);
            process.exit(0);
        })
        .catch(function (err) {
            console.error(`Could not remove migration configuration ${name}`);
            console.error(err);
            process.exit(-1);
        })
}

function showMigration (name) {
    return fs.getConfigFile(name)
        .then(function (config) {
            const output = util.inspect(config, {
                colors: true,
                depth: null
            });
            console.log(output);
        })
        .then(function () {
            process.exit(0);
        })
        .catch(function (err) {
            console.error(`Could not retrieve migration configuration ${name}`);
            console.error(err);
            process.exit(-1);
        });
}

module.exports = {
    createMigration,
    runMigration,
    listMigrations,
    removeMigration,
    showMigration
};