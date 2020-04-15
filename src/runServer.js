const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const cors = require('cors');
const readMockFiles = require('./readMockFiles');
const utils = require('./utils');
const reloadRouter = require('./reloadRouter');
const logger = require('./middleware/logger');

module.exports = function runServer(config) {
    let app = express();
    let isReady = false;
    app.use(cors());
    app.use(logger());
    app.use(config.baseUrl, reloadRouter.handler());
    readMockFiles(config, app);

    if (config.watch) {
        watch(config);
    }

    const {port, host} = config;
    app.listen(port, host, () => {
        utils.log(`Mock server running on ${host}:${port}`);
    });

    function watch(config) {
        const watcher = chokidar.watch(path.resolve(config.root, config.rootDir));

        function watchFn(path) {
            if (!isReady) {
                return;
            }
            utils.log(`${path} changed`);
            utils.log('reload success');
            readMockFiles(config, app);
        }

        watcher
            .on('unlink', watchFn)
            .on('add', watchFn)
            .on('change', watchFn)
            .on('ready', () => {
                isReady = true;
            });
    }
};
