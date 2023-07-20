"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegexpFromWildcardPattern = exports.escapeRegExp = void 0;
const escapeRegExp = (s) => {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
exports.escapeRegExp = escapeRegExp;
const getRegexpFromWildcardPattern = (wildcardString) => {
    const escapedString = (0, exports.escapeRegExp)(wildcardString);
    return new RegExp('^' + escapedString.replace(/\\\*/g, '.*') + '$');
};
exports.getRegexpFromWildcardPattern = getRegexpFromWildcardPattern;
//# sourceMappingURL=helpers.js.map