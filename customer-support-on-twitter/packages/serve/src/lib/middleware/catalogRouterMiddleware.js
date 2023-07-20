"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRouterMiddleware = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const types_1 = require("../../containers/types");
let CatalogRouterMiddleware = class CatalogRouterMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name, catalogRouter) {
        super(config, name);
        this.catalogRouter = catalogRouter;
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.catalogRouter.activate)
                this.catalogRouter.activate();
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const execute = this.catalogRouter.handle.bind(this.catalogRouter);
            yield execute(context, next);
        });
    }
};
CatalogRouterMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.TYPES.Extension_CatalogRouter)),
    tslib_1.__metadata("design:paramtypes", [Object, String, models_1.CatalogRouter])
], CatalogRouterMiddleware);
exports.CatalogRouterMiddleware = CatalogRouterMiddleware;
//# sourceMappingURL=catalogRouterMiddleware.js.map