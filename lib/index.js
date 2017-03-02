'use strict';

const create = require('./create');

function createMigration(name) {
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

module.exports = {
    createMigration
};