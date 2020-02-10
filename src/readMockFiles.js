const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const express = require('express');
const reloadRouter = require('./reloadRouter');
function getPath(root, filename) {
    return path.resolve(root, filename);
}

function checkMothod(method, url) {
    const methods = [
        'get',
        'post',
        'put',
        'delete',
        'patch'
    ];

    const isCurMethod = methods.some(m => m === method);

    if (!isCurMethod) {
        utils.error(`${url} => 请使用get、post、put、delete、patch方法请求`);
    }

    return isCurMethod;
}

function register(objectKey = '', mockObject, app) {
    const [methodStr, url] = (objectKey || '').split(' ');
    const method = (methodStr || 'GET').toLowerCase();

    if (!checkMothod(method, url)) {
        return;
    }

    app[method](url, function (req, res) {
        if (utils.isFunction(mockObject[objectKey])) {
            mockObject[objectKey](req, res);
        }
        else {
            res.json(mockObject[objectKey]);
        }
    });
}

function requireUnCache(path) {
    const mod = require.cache[path];

    // 防止内存泄漏
    if (mod && mod.parent) {
        const index = mod.parent.children.indexOf(mod);
        if (index >= 0) {
            mod.parent.children.splice(index, 1);
        }
    }

    delete require.cache[path];
    return require(path);
}
function readFile(rootFile, fileType, baseUrl, app) {
    const filenames = fs.readdirSync(rootFile);

    filenames.forEach(function (filename) {
        const allPath = getPath(rootFile, filename);

        const stat = fs.statSync(allPath);
        if (stat.isDirectory()) {
            readFile(allPath, fileType, baseUrl, app);
        }
        else if (stat.isFile() && fileType.test(allPath)) {
            let mockObject = requireUnCache(allPath);

            const route = express.Router();
            Object.keys(mockObject).forEach(key => register(key, mockObject, route));
            reloadRouter.reload([route]);
        }
    });
}

module.exports = function readMockFiles(config, app) {
    const {root, extensions, rootDir, baseUrl} = config;
    const isFileExist = fs.existsSync(root);

    if (isFileExist) {
        const rootFile = getPath(root, rootDir);
        readFile(rootFile, extensions, baseUrl, app);
    }
    else {
        utils.error('没有找到mock路径');
    }
};
