"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModeMiddleware = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../../src/models/index");
/* istanbul ignore file */
class TestModeMiddleware extends models_1.BaseRouteMiddleware {
    constructor() {
        var _a;
        super(...arguments);
        this.mode = ((_a = this.getConfig()) === null || _a === void 0 ? void 0 : _a['mode']) || false;
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            context.response.set('test-mode', String(this.mode));
            yield next();
        });
    }
}
exports.TestModeMiddleware = TestModeMiddleware;
//# sourceMappingURL=testModeMiddleware.js.map