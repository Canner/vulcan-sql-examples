"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthenticator = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const readline = require("readline");
const md5 = require("md5");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
const lodash_1 = require("lodash");
require("koa-bodyparser");
/** The http basic authenticator.
 *
 *  Able to set user credentials by file path through "htpasswd-file" or list directly in config by "users-list".
 *  The password must hash by md5 when setting into "htpasswd-file" or "users-list".
 *
 *  It authenticate by passing encode base64 {username}:{password} to authorization
 */
let BasicAuthenticator = class BasicAuthenticator extends models_1.BaseAuthenticator {
    constructor() {
        super(...arguments);
        this.usersCredentials = {};
        this.options = {};
    }
    /** read basic options to initialize and load user credentials */
    onActivate() {
        var e_1, _a;
        var _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.options = this.getOptions() || this.options;
            // load "users-list" in options
            for (const option of this.options['users-list'] || []) {
                const { name, md5Password, attr } = option;
                this.usersCredentials[name] = { md5Password, attr };
            }
            // load "htpasswd-file" in options
            if (!this.options['htpasswd-file'])
                return;
            const { path, users } = this.options['htpasswd-file'];
            if (!fs.existsSync(path) || !fs.statSync(path).isFile())
                return;
            const reader = readline.createInterface({
                input: fs.createReadStream(path),
            });
            try {
                // username:md5Password
                for (var reader_1 = tslib_1.__asyncValues(reader), reader_1_1; reader_1_1 = yield reader_1.next(), !reader_1_1.done;) {
                    const line = reader_1_1.value;
                    const name = line.split(':')[0] || '';
                    const md5Password = line.split(':')[1] || '';
                    // if users exist the same name, add attr to here, or as empty
                    this.usersCredentials[name] = {
                        md5Password,
                        attr: ((_b = users === null || users === void 0 ? void 0 : users.find((user) => user.name === name)) === null || _b === void 0 ? void 0 : _b.attr) || {},
                    };
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (reader_1_1 && !reader_1_1.done && (_a = reader_1.return)) yield _a.call(reader_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    getTokenInfo(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const username = ctx.request.body['username'];
            const password = ctx.request.body['password'];
            if (!username || !password)
                throw new core_1.UserError('please provide "username" and "password".');
            const token = Buffer.from(`${username}:${password}`).toString('base64');
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
            // will not auth user if vulcan.yaml didn't configure this authenticator
            if ((0, lodash_1.isEmpty)(this.options) || !this.getOptions())
                return incorrect;
            // validate request auth token
            const authorize = context.request.headers['authorization'];
            const token = authorize.trim().split(' ')[1];
            const bareToken = Buffer.from(token, 'base64').toString();
            try {
                return yield this.validate(bareToken);
            }
            catch (err) {
                // if not found matched user credential, add WWW-Authenticate and return failed
                context.set('WWW-Authenticate', this.getExtensionId());
                return {
                    status: models_1.AuthStatus.FAIL,
                    type: this.getExtensionId(),
                    message: err.message,
                };
            }
        });
    }
    validate(baredToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const username = baredToken.split(':')[0] || '';
            // bare password from Basic specification
            const password = baredToken.split(':')[1] || '';
            // if authenticated, return user data
            if (!(username in this.usersCredentials) ||
                !(md5(password) === this.usersCredentials[username].md5Password))
                throw new core_1.UserError(`authenticate user by "${this.getExtensionId()}" type failed.`);
            return {
                status: models_1.AuthStatus.SUCCESS,
                type: this.getExtensionId(),
                user: {
                    name: username,
                    attr: this.usersCredentials[username].attr,
                },
            };
        });
    }
};
BasicAuthenticator = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('auth'),
    (0, core_1.VulcanExtensionId)(models_1.AuthType.Basic)
], BasicAuthenticator);
exports.BasicAuthenticator = BasicAuthenticator;
//# sourceMappingURL=httpBasicAuthenticator.js.map