"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocUrlPrefix = void 0;
// get the doc default url prefix if not setting up
const getDocUrlPrefix = (url) => {
    return url.replace(/\/+$/, '').replace(/^\/+/, '') || 'doc';
};
exports.getDocUrlPrefix = getDocUrlPrefix;
//# sourceMappingURL=utils.js.map