"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLogMiddleware = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const bytes = require("bytes");
const models_1 = require("../../models/index");
let AccessLogMiddleware = class AccessLogMiddleware extends models_1.BuiltInMiddleware {
    constructor() {
        super(...arguments);
        this.logger = (0, core_1.getLogger)({
            scopeName: 'ACCESS_LOG',
            options: this.getOptions(),
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            const { request: req, response: resp, params } = context;
            const reqSize = req.length ? bytes(req.length).toLowerCase() : 'none';
            const respSize = resp.length ? bytes(resp.length).toLowerCase() : 'none';
            this.logger.info(`--> ${req.ip} -- "${req.method} ${req.path}" -- size: ${reqSize}`);
            this.logger.info(` -> header: ${JSON.stringify(req.header)}`);
            this.logger.info(` -> query: ${JSON.stringify(req.query)}`);
            this.logger.info(` -> params: ${JSON.stringify(params)}`);
            yield next();
            this.logger.info(`<-- status: ${resp.status} -- size: ${respSize}`);
            this.logger.info(` <- header: ${JSON.stringify(resp.header)}`);
        });
    }
};
AccessLogMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('access-log')
], AccessLogMiddleware);
exports.AccessLogMiddleware = AccessLogMiddleware;
//# sourceMappingURL=accessLogMiddleware.js.map