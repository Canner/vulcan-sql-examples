"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTokenAuthenticator = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
const lodash_1 = require("lodash");
require("koa-bodyparser");
/** The simple-token authenticator. setting the token and auth token directly to authorization.
 *
 * Token could be any format e.g: md5, base64 encode, sha..., but must set it in the token field of "simple-token" list too.
 *  */
let SimpleTokenAuthenticator = class SimpleTokenAuthenticator extends models_1.BaseAuthenticator {
    constructor() {
        super(...arguments);
        this.options = [];
        this.usersCredentials = {};
    }
    /** read simple-token and users info to initialize user credentials */
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.options = this.getOptions() || this.options;
            for (const option of this.options) {
                const { name, token, attr } = option;
                this.usersCredentials[token] = { name, attr };
            }
        });
    }
    getTokenInfo(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = ctx.request.body['token'];
            if (!token)
                throw new core_1.UserError('please provide "token".');
            return {
                token: token,
            };
        });
    }
    authCredential(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const incorrect = {
                status: models_1.AuthStatus.INDETERMINATE,
                type: this.getExtensionId(),
            };
            if ((0, lodash_1.isEmpty)(this.options) || !this.getOptions())
                return incorrect;
            // validate request auth token
            const authorize = context.request.headers['authorization'];
            const token = authorize.trim().split(' ')[1];
            try {
                return yield this.validate(token);
            }
            catch (err) {
                // if not found matched user credential, return failed
                return {
                    status: models_1.AuthStatus.FAIL,
                    type: this.getExtensionId(),
                    message: err.message,
                };
            }
        });
    }
    validate(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // if authenticated
            if (!(token in this.usersCredentials))
                throw new core_1.UserError(`authenticate user by "${this.getExtensionId()}" type failed.`);
            return {
                status: models_1.AuthStatus.SUCCESS,
                type: this.getExtensionId(),
                user: {
                    name: this.usersCredentials[token].name,
                    attr: this.usersCredentials[token].attr,
                },
            };
        });
    }
};
SimpleTokenAuthenticator = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('auth'),
    (0, core_1.VulcanExtensionId)(models_1.AuthType.SimpleToken)
], SimpleTokenAuthenticator);
exports.SimpleTokenAuthenticator = SimpleTokenAuthenticator;
//# sourceMappingURL=simpleTokenAuthenticator.js.map