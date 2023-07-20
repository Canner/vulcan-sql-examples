"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsMiddleware = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const models_1 = require("../../../models/index");
const authMiddleware_1 = require("./authMiddleware");
const containers_1 = require("../../../containers/index");
const inversify_1 = require("inversify");
const utils_1 = require("./utils");
/** The middleware responsible for checking request auth credentials.
 *  It seek the 'auth' module name to match data through built-in and customized authenticator by BaseAuthenticator
 * */
let AuthCredentialsMiddleware = class AuthCredentialsMiddleware extends authMiddleware_1.BaseAuthMiddleware {
    constructor(config, name, authenticators, projectOptions) {
        super(config, name, authenticators);
        this.projectOptions = projectOptions;
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
        });
    }
    handle(context, next) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // return to stop the middleware, if disabled
            if (!this.enabled)
                return next();
            // The endpoint not need contains auth credentials
            if ((0, utils_1.checkIsPublicEndpoint)(this.projectOptions, context.path))
                return next();
            const authorize = (_a = context.request) === null || _a === void 0 ? void 0 : _a.headers['authorization'];
            if (!authorize) {
                throw new core_1.UserError('Please provide proper authorization information', {
                    httpCode: 401,
                    code: 'vulcan.unauthorized',
                });
            }
            // pass current context to auth token for users
            for (const name of Object.keys(this.authenticators)) {
                const authenticator = this.authenticators[name];
                if (!authorize.toLowerCase().startsWith(authenticator.getExtensionId())) {
                    continue;
                }
                // auth token
                const result = yield authenticator.authCredential(context);
                // if state is indeterminate, change to next authentication
                if (result.status === models_1.AuthStatus.INDETERMINATE)
                    continue;
                // if state is failed, return directly
                if (result.status === models_1.AuthStatus.FAIL) {
                    context.status = 401;
                    context.body = {
                        type: result.type,
                        message: result.message || 'verify token failed',
                    };
                    return;
                }
                // set auth user information to context
                context.state.user = result.user;
                yield next();
                return;
            }
            throw new core_1.UserError('All types of authenticator failed.', {
                httpCode: 401,
                code: 'vulcan.unauthorized',
            });
        });
    }
};
AuthCredentialsMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('auth'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.multiInject)(containers_1.TYPES.Extension_Authenticator)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_1.TYPES.ProjectOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Array, Object])
], AuthCredentialsMiddleware);
exports.AuthCredentialsMiddleware = AuthCredentialsMiddleware;
//# sourceMappingURL=authCredentialsMiddleware.js.map