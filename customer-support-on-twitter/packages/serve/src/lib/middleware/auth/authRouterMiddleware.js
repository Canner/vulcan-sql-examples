"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouterMiddleware = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const Router = require("koa-router");
const authMiddleware_1 = require("./authMiddleware");
const core_1 = require("@vulcan-sql/core");
/** The middleware responsible for mounting endpoint for getting token info or user profile by request.
 *  It seek the 'auth' module name to match data through built-in and customized authenticator by BaseAuthenticator
 * */
let AuthRouterMiddleware = class AuthRouterMiddleware extends authMiddleware_1.BaseAuthMiddleware {
    constructor() {
        super(...arguments);
        this.router = new Router();
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            // setup route when enabled
            if (this.enabled)
                this.setRoutes();
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // return to stop the middleware, if disabled
            if (!this.enabled)
                return next();
            // run each auth route
            yield this.router.routes()(context, next);
        });
    }
    setRoutes() {
        // mount post /auth/token info endpoint
        this.mountTokenEndpoint();
        // mount get /auth/user-profile endpoint
        this.mountUserProfileEndpoint();
        // mount get /auth/available-types endpoint
        this.mountAvailableTypesEndpoint();
    }
    /* add Getting auth token info endpoint  */
    mountTokenEndpoint() {
        this.router.post(`/auth/token`, (context) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((0, lodash_1.isEmpty)(context.request.body)) {
                context.status = 400;
                context.body = { message: 'Please provide request parameters.' };
                return;
            }
            // Get request payload
            const type = context.request.body['type'];
            if (!type) {
                const msg = `Please provide auth "type", supported types: ${Object.keys(this.options)}.`;
                context.status = 400;
                context.body = { message: msg };
                return;
            }
            // type does not set up in options
            if (!this.options[type]) {
                const msg = `auth type "${type}" does not support, only supported: ${Object.keys(this.options)}.`;
                context.status = 400;
                context.body = { message: msg };
                return;
            }
            try {
                const result = yield this.authenticators[type].getTokenInfo(context);
                context.body = result;
                return;
            }
            catch (err) {
                context.status = 400;
                context.body = {
                    message: err.message,
                };
            }
        }));
    }
    mountUserProfileEndpoint() {
        // The route should work after the token authenticated
        this.router.get(`/auth/user-profile`, (context) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!context.state.user) {
                context.status = 404;
                context.body = {
                    message: 'User profile not found.',
                };
                return;
            }
            context.body = Object.assign({}, context.state.user);
            return;
        }));
    }
    // get the available auth types
    mountAvailableTypesEndpoint() {
        this.router.get(`/auth/available-types`, (context) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const names = Object.keys(this.authenticators);
            const availableTypes = names.filter((name) => !(0, lodash_1.isEmpty)(this.options[name]));
            context.body = availableTypes;
        }));
    }
};
AuthRouterMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('auth')
], AuthRouterMiddleware);
exports.AuthRouterMiddleware = AuthRouterMiddleware;
//# sourceMappingURL=authRouterMiddleware.js.map