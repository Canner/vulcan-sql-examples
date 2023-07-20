"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInRouteMiddlewares = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./corsMiddleware"), exports);
tslib_1.__exportStar(require("./requestIdMiddleware"), exports);
tslib_1.__exportStar(require("./accessLogMiddleware"), exports);
tslib_1.__exportStar(require("./rateLimitMiddleware"), exports);
tslib_1.__exportStar(require("./auth"), exports);
tslib_1.__exportStar(require("./response-format"), exports);
tslib_1.__exportStar(require("./enforceHttpsMiddleware"), exports);
tslib_1.__exportStar(require("./docRouterMiddleware"), exports);
tslib_1.__exportStar(require("./errorHandlerMIddleware"), exports);
const corsMiddleware_1 = require("./corsMiddleware");
const auth_1 = require("./auth");
const rateLimitMiddleware_1 = require("./rateLimitMiddleware");
const requestIdMiddleware_1 = require("./requestIdMiddleware");
const accessLogMiddleware_1 = require("./accessLogMiddleware");
const response_format_1 = require("./response-format");
const enforceHttpsMiddleware_1 = require("./enforceHttpsMiddleware");
const docRouterMiddleware_1 = require("./docRouterMiddleware");
const errorHandlerMIddleware_1 = require("./errorHandlerMIddleware");
const catalogRouterMiddleware_1 = require("./catalogRouterMiddleware");
// The array is the middleware running order
exports.BuiltInRouteMiddlewares = [
    requestIdMiddleware_1.RequestIdMiddleware,
    errorHandlerMIddleware_1.ErrorHandlerMiddleware,
    accessLogMiddleware_1.AccessLogMiddleware,
    corsMiddleware_1.CorsMiddleware,
    enforceHttpsMiddleware_1.EnforceHttpsMiddleware,
    rateLimitMiddleware_1.RateLimitMiddleware,
    auth_1.AuthSourceNormalizerMiddleware,
    auth_1.AuthCredentialsMiddleware,
    auth_1.AuthRouterMiddleware,
    response_format_1.ResponseFormatMiddleware,
    docRouterMiddleware_1.DocRouterMiddleware,
    catalogRouterMiddleware_1.CatalogRouterMiddleware,
];
//# sourceMappingURL=index.js.map