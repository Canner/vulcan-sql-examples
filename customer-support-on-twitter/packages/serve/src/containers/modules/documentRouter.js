"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRouterModule = void 0;
const tslib_1 = require("tslib");
const containers_1 = require("../index");
const inversify_1 = require("inversify");
const documentRouterModule = () => new inversify_1.AsyncContainerModule((bind) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    bind(containers_1.TYPES.Factory_DocumentRouter).toAutoNamedFactory(containers_1.TYPES.Extension_DocumentRouter);
}));
exports.documentRouterModule = documentRouterModule;
//# sourceMappingURL=documentRouter.js.map