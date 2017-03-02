'use strict';

const program = require('commander');
const services = require('./lib');

const app = program
    .version('0.0.1')
    .command('create <name>', { default: true })
        .action(services.createMigration)
    .command('migrate <name>')
        .action(function (name) {
            console.log(`Running migration [${name}]`);
            // TODO
        });

module.exports = app;
