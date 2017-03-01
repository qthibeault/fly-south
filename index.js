'use strict';

const figlet = require('figlet');
const program = require('commander');
const create = require('./lib/create')

const app = program
    .version('0.0.1')
    .command('create <name>', { default: true });
    .action(function (name) {
        console.log('Creating a new migration configuration');
        create(name)
            .then(() => {
                console.log(`Created configuration ${name} successfully;`)
                process.exit(0);
            })
            .catch(function(err) {
                console.error(`Could not create configuration ${name}`);
                console.error(err);
                process.exit(-1);
            });
    });

module.exports = app;
