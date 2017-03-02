'use strict';

const os = require('os');
const fs = require('fs');

const getConfigDir = function () {

    return new Promise(function (resolve, reject) {
        const configDir = os.homedir() + '/.config/flysouth/';

        fs.stat(configDir, function (err, stats) {
            if (err) {
                console.log('Creating config directory');
                fs.mkdir(configDir, function (err) {
                    if (err)
                        reject(err);

                    resolve(configDir);
                });
            }

            else if (!stats.isDirectory()) {
                reject(new Error(`${configDir} is not a directory`));
            }

            else {
                resolve(configDir);
            }

        });
    })
    .catch(function (err) {
        console.error('Could not verify config directory');
        process.exit(-1);
    });
};

const createConfigFile = function (name, config) {

    return getConfigDir()
        .then(function (configDir) {
            return new Promise(function (resolve, reject) {
                const filename = configDir + name + '.json';
                fs.writeFile(filename, JSON.stringify(config), 'utf8', function (err) {
                    if(err)
                        reject(err);

                    resolve();
                });
            });
        })
        .catch(function (err) {
            console.error(`Could not create migration file ${name}.json`);
            process.exit(-1);
        });

};

const getConfigFile = function (name) {
    return getConfigDir()
        .then(function (configDir) {
            return new Promise(function (resolve, reject) {
                const filename = configDir + name + '.json';
                fs.readFile(filename, 'utf8', function (err, data) {
                    if(err)
                        reject(err);
                    resolve(data);
                });
            });
        })
        .then(function (config) {
            if (typeof config !== 'object') {
                return JSON.parse(config);
            }
            return config;
        });
}

module.exports = {
    getConfigDir,
    createConfigFile,
    getConfigFile
};
