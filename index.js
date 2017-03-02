'use strict';

const create = require('./lib/create');

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