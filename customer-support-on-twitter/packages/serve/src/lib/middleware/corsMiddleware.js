"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const tslib_1 = require("tslib");
const cors = require("@koa/cors");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
let CorsMiddleware = class CorsMiddleware extends models_1.BuiltInMiddleware {
    constructor() {
        super(...arguments);
        this.koaCors = cors(this.getOptions());
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            return this.koaCors(context, next);
        });
    }
};
CorsMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('cors')
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;
//# sourceMappingURL=corsMiddleware.js.map