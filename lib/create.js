'use strict';

const fs = require('fs');
const appDataPath = require('application-data-path');
const prompt = require('prompt');
const schema = {
    properties: {
        'source': {
            'description': 'Host to copy from',
            'type': 'string',
            'default': 'localhost'
        },
        'target': {
            'description': 'Host to copy to',
            'type': 'string',
            'default': 'localhost'
        },
        'database': {
            'description': 'Database to copy',
            'type': 'string',
            'required': true
        },
        'rename': {
            'description': 'Name of copy target',
            'type': 'string',
            'conform': function (rename) {
                const source = prompt.history('source');
                const target = prompt.history('source');
                if(source === target && rename.length < 1)
                    return false;

                return true;
            }
        },
        'username': {
            'description': 'Username to authenticate with',
            'type': 'string'
        },
        'password': {
            'description': 'Password to authenticate with',
            'type': 'string',
            'hidden': true,
            'replace': '*'
        }
    }
};

function collectInput () {

    return new Promise(function (resolve, reject) {
        prompt.start();
        prompt.get(schema, function (err, results) {
            if(err)
                reject(err);

            prompt.stop();
            resolve(results);
        });
    });

}

function createConfig (name, config) {

    return new Promise(function (resolve, reject) {
        const path = appDataPath('FlySouth');
        fs.writeFile(path + name + '.json', JSON.stringify(config), function(err) {
            if(err)
                reject(err);

            resolve();
        });
    });

}

module.exports = function (name) {

    const createNamedConfig = createConfig.bind(null, name);

    return collectInput()
        .then(createNamedConfig);

}
