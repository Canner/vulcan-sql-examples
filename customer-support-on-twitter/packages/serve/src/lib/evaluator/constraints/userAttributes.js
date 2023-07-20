"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAttributesConstrain = void 0;
const helpers_1 = require("./helpers");
class UserAttributesConstrain {
    constructor(attributes) {
        this.attributes = attributes;
    }
    evaluate(user) {
        // user should have all attribute to pass the evaluation.
        // allow:
        //   attributes:
        //     group: admin
        //     enabled: true
        // --> group = 'admin AND enabled = 'true'
        for (const attributeName in this.attributes) {
            if (!this.doesUserHasAttributeWithValue(user, attributeName, String(this.attributes[attributeName])))
                return false;
        }
        return true;
    }
    doesUserHasAttributeWithValue(user, attributeName, attributeValue) {
        for (const userAttributeName in user.attr) {
            if (
            // attribute name passes the pattern
            (0, helpers_1.getRegexpFromWildcardPattern)(attributeName).test(userAttributeName) &&
                // attribute value passes the pattern
                (0, helpers_1.getRegexpFromWildcardPattern)(attributeValue).test(String(user.attr[userAttributeName])))
                return true;
        }
        return false;
    }
}
exports.UserAttributesConstrain = UserAttributesConstrain;
//# sourceMappingURL=userAttributes.js.map