#!/usr/bin/env node
const program = require('commander');
const init = require('../src');
const utils = require('../src/utils');

program
    .option('-w, --watch', '是否热更新')
    .option('--path <path>', 'mock路径')
    .option('-p, --port <port>', '端口号')
    .option('--host <host>', 'host');

program.parse(process.argv);

const defaultConfig = require('../config');
const getConfig = () => {
    try {
        const configFile = require(`${process.cwd()}/mock.config.js`);
        let cusConfig = configFile.default || configFile;

        if (utils.isFunction(cusConfig)) {
            cusConfig = cusConfig();
        }

        return {
            ...defaultConfig,
            ...cusConfig
        };
    }
    catch (e) {
        return defaultConfig;
    }
};

const config = getConfig();

if (program.path) {
    config.root = program.path;
}

if (program.port) {
    config.port = program.port;
}

if (program.host) {
    config.host = program.host;
}

if (!utils.isRegExp(config.mockPath)) {
    config.mockPath = defaultConfig.mockPath;
}

if (program.watch) {
    config.watch = program.watch;
}

init(config);
