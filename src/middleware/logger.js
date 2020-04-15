const utils = require('../utils');
module.exports = function logger() {
    return function (req, res, next) {
        const start = Date.now();
        next();
        const end = Date.now();
        utils.info(`[logger]  url -> ${req.url}  ${end - start}ms`);
    };
};
