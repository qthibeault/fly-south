'use strict';

const create = require('./lib/create');
const fs = require('./lib/filesystem');

function createMigration (name) {
    return create(name)
        .then(() => {
            console.log(`Created configuration ${name} successfully;`)
            process.exit(0);
        })
        .catch(function(err) {
            console.error(`Could not create configuration ${name}`);
            console.error(err);
            process.exit(-1);
        });
}

function runMigration (name) {

}

function listMigrations () {
    return fs.getConfigs()
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

function removeMigration () {

}

function showMigration () {

}

module.exports = {
    createMigration,
    runMigration,
    listMigrations,
    removeMigration,
    showMigration
};