"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInMiddleware = exports.BaseRouteMiddleware = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
const types_1 = require("../../containers/types");
const core_2 = require("@vulcan-sql/core");
let BaseRouteMiddleware = class BaseRouteMiddleware extends core_1.ExtensionBase {
};
BaseRouteMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanExtension)(types_1.TYPES.Extension_RouteMiddleware)
], BaseRouteMiddleware);
exports.BaseRouteMiddleware = BaseRouteMiddleware;
let BuiltInMiddleware = class BuiltInMiddleware extends BaseRouteMiddleware {
    constructor(config, name) {
        var _a;
        super(config, name);
        const value = (_a = this.getConfig()) === null || _a === void 0 ? void 0 : _a['enabled'];
        this.enabled = (0, lodash_1.isUndefined)(value) ? true : value;
    }
    getOptions() {
        var _a;
        if (this.getConfig())
            return (_a = this.getConfig()) === null || _a === void 0 ? void 0 : _a['options'];
        return undefined;
    }
};
BuiltInMiddleware = tslib_1.__decorate([
    tslib_1.__param(0, (0, inversify_1.inject)(core_2.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_2.TYPES.ExtensionName)),
    tslib_1.__metadata("design:paramtypes", [Object, String])
], BuiltInMiddleware);
exports.BuiltInMiddleware = BuiltInMiddleware;
//# sourceMappingURL=routeMiddleware.js.map