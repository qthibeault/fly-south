'use strict';

const figlet = require('figlet');
const program = require('commander');
const create = require('./lib/create')

const app = program
    .version('0.0.1')
    .command('create <name>')
    .action(function (name) {
        console.log('Creating a new migration configuration');
        create(name)
            .then(() => {
                process.exit(0);
            });
    });

module.exports = app;
