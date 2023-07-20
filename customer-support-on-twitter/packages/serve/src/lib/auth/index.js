"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInAuthenticators = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./simpleTokenAuthenticator"), exports);
tslib_1.__exportStar(require("./passwordFileAuthenticator"), exports);
tslib_1.__exportStar(require("./httpBasicAuthenticator"), exports);
const simpleTokenAuthenticator_1 = require("./simpleTokenAuthenticator");
const passwordFileAuthenticator_1 = require("./passwordFileAuthenticator");
const httpBasicAuthenticator_1 = require("./httpBasicAuthenticator");
exports.BuiltInAuthenticators = [
    httpBasicAuthenticator_1.BasicAuthenticator,
    simpleTokenAuthenticator_1.SimpleTokenAuthenticator,
    passwordFileAuthenticator_1.PasswordFileAuthenticator,
];
//# sourceMappingURL=index.js.map