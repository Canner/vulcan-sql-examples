"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const middleware_1 = require("../../lib/middleware/index");
const response_formatter_1 = require("../../lib/response-formatter/index");
const auth_1 = require("../../lib/auth");
const document_router_1 = require("../../lib/document-router");
const catalog_router_1 = require("../../lib/catalog-router");
const extensionModule = (options) => new inversify_1.AsyncContainerModule((bind) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const loader = new core_1.ExtensionLoader(options);
    // Internal extension modules
    // route middlewares (single module)
    loader.loadInternalExtensionModule(middleware_1.BuiltInRouteMiddlewares);
    // formatter (single module)
    loader.loadInternalExtensionModule(response_formatter_1.BuiltInFormatters);
    // authenticator (single module)
    loader.loadInternalExtensionModule(auth_1.BuiltInAuthenticators);
    // document router (single module)
    loader.loadInternalExtensionModule(document_router_1.BuiltInDocumentRouters);
    // catalog router (single module)
    loader.loadInternalExtensionModule(catalog_router_1.BuiltInCatalogRouters);
    loader.bindExtensions(bind);
}));
exports.extensionModule = extensionModule;
//# sourceMappingURL=extension.js.map