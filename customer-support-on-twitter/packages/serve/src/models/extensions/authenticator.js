"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAuthenticator = exports.AuthStatus = exports.AuthType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const types_1 = require("../../containers/types");
var AuthType;
(function (AuthType) {
    AuthType["Basic"] = "basic";
    AuthType["PasswordFile"] = "password-file";
    AuthType["SimpleToken"] = "simple-token";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
var AuthStatus;
(function (AuthStatus) {
    /**
     * SUCCESS: Request format correct and match the one of user credentials
     * INDETERMINATE: Request format is unclear for authenticator needed, skip and check next authenticator
     * FAIL: Request format correct, but not match the user credentials
     */
    AuthStatus["SUCCESS"] = "SUCCESS";
    AuthStatus["FAIL"] = "FAIL";
    AuthStatus["INDETERMINATE"] = "INDETERMINATE";
})(AuthStatus = exports.AuthStatus || (exports.AuthStatus = {}));
let BaseAuthenticator = class BaseAuthenticator extends core_1.ExtensionBase {
    getOptions() {
        if (!this.getConfig())
            return undefined;
        if (!this.getConfig()['options'])
            return undefined;
        const options = this.getConfig()['options'][this.getExtensionId()];
        return options;
    }
};
BaseAuthenticator = tslib_1.__decorate([
    (0, core_1.VulcanExtension)(types_1.TYPES.Extension_Authenticator, { enforcedId: true })
], BaseAuthenticator);
exports.BaseAuthenticator = BaseAuthenticator;
//# sourceMappingURL=authenticator.js.map