"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameConstrain = void 0;
const helpers_1 = require("./helpers");
class UserNameConstrain {
    constructor(nameRule) {
        this.nameRule = nameRule;
    }
    evaluate(user) {
        return (0, helpers_1.getRegexpFromWildcardPattern)(this.nameRule).test(user.name);
    }
}
exports.UserNameConstrain = UserNameConstrain;
//# sourceMappingURL=userName.js.map