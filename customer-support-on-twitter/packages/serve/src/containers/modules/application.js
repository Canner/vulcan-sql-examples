"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationModule = void 0;
const tslib_1 = require("tslib");
const serve_1 = require("../../index");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const applicationModule = () => new inversify_1.AsyncContainerModule((bind) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    bind(types_1.TYPES.VulcanApplication).to(serve_1.VulcanApplication);
}));
exports.applicationModule = applicationModule;
//# sourceMappingURL=application.js.map