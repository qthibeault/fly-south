'use strict';

const create = require('./lib/create');
const migrate = require('./lib/migrate');
const remove = require('./lib/delete');
const show = require('./lib/show');
const list = require('./lib/list');

function createMigration (name) {
    return create(name)
        .then(() => {
            console.log(`Created migration configuration ${name} successfully`);
            process.exit(0);
        })
        .catch(function(err) {
            console.error(`Could not create migration configuration ${name}`);
            console.error(err);
            process.exit(-1);
        });
}

function runMigration (name) {
    return migrate(name)
        .then(() => {
            console.log(`Migration ${name} successfully started`);
            process.exit(0);
        })
        .catch(function(err) {
            console.error(`Could not create migration configuration ${name}`);
            console.error(err);
            process.exit(-1);
        });
}

function listMigrations () {
    return list()
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
    return remove(name)
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
    return show(name)
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