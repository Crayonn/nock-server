const express = require('express');
class ReloadRouter {
    handler() {
        return (req, res, next) => {
            this.route(req, res, next);
        };
    }

    reload(handlers) {
        const newRouter = express.Router();
        if (handlers.length) {
            newRouter.use(handlers);
        }

        this.route = newRouter;
    }
}
exports.ReloadRouter = ReloadRouter;
module.exports = new ReloadRouter();
