"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitMiddleware = void 0;
const tslib_1 = require("tslib");
const koa2_ratelimit_1 = require("koa2-ratelimit");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
let RateLimitMiddleware = class RateLimitMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name) {
        super(config, name);
        this.options = this.getOptions() || { max: 60 };
        if (!this.options['max'])
            this.options['max'] = 60;
        this.koaRateLimitFunc = koa2_ratelimit_1.RateLimit.middleware(this.options);
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            return this.koaRateLimitFunc(context, next);
        });
    }
};
RateLimitMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('rate-limit'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__metadata("design:paramtypes", [Object, String])
], RateLimitMiddleware);
exports.RateLimitMiddleware = RateLimitMiddleware;
//# sourceMappingURL=rateLimitMiddleware.js.map