"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsPublicEndpoint = void 0;
const utils_1 = require("../../document-router/utils");
const checkIsPublicEndpoint = (projectOptions, currentPath) => {
    var _a;
    const docUrlPrefix = (0, utils_1.getDocUrlPrefix)(((_a = projectOptions['redoc']) === null || _a === void 0 ? void 0 : _a.url) || '');
    const publicPaths = [
        '/auth/token',
        '/auth/available-types',
        `/${docUrlPrefix}`,
        `/${docUrlPrefix}/spec`,
        `/${docUrlPrefix}/redoc`,
    ];
    return publicPaths.includes(currentPath);
};
exports.checkIsPublicEndpoint = checkIsPublicEndpoint;
//# sourceMappingURL=utils.js.map