"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRouters = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const Router = require("koa-router");
const models_1 = require("../../models/index");
const inversify_1 = require("inversify");
const utils_1 = require("../document-router/utils");
let CatalogRouters = class CatalogRouters extends models_1.CatalogRouter {
    constructor(config, moduleName, projectOptions, artifactBuilder) {
        super(config, moduleName, projectOptions, artifactBuilder);
        this.router = new Router();
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.router.get('/catalog/schemas/:base64UrlPath', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
                const { base64UrlPath } = ctx.params;
                const urlPath = Buffer.from(base64UrlPath, 'base64').toString();
                const schemas = yield this.getArtifactSchemas();
                const [schema] = schemas.filter((schema) => {
                    return schema.urlPath === urlPath;
                });
                if (!schema) {
                    ctx.response.status = 404;
                    ctx.response.body = 'Not Found';
                    return;
                }
                const responseFormatOption = this.getProjectOptionsByKey('response-format');
                const baseUrl = `${ctx.protocol}://${ctx.host}`;
                const result = Object.assign(Object.assign({}, schema), { url: `${baseUrl}/api${schema.urlPath}`, apiDocUrl: `${baseUrl}${this.getAPIDocUrl(schema)}`, shareKey: this.getShareKey(ctx.request.headers.authorization), responseFormat: responseFormatOption.enabled
                        ? (responseFormatOption === null || responseFormatOption === void 0 ? void 0 : responseFormatOption.options) || []
                        : [] });
                ctx.response.body = result;
            }));
            this.router.get('/catalog/schemas', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
                const schemas = yield this.getArtifactSchemas();
                const baseUrl = `${ctx.protocol}://${ctx.host}`;
                const result = schemas.map((schema) => {
                    return Object.assign(Object.assign({}, schema), { url: `${baseUrl}/api${schema.urlPath}`, apiDocUrl: `${baseUrl}${this.getAPIDocUrl(schema)}`, shareKey: this.getShareKey(ctx.request.headers.authorization) });
                });
                ctx.response.body = result;
            }));
        });
    }
    getShareKey(authorization) {
        var _a;
        if (!authorization)
            return '';
        const authSourceOption = this.getProjectOptionsByKey('auth-source');
        const token = Buffer.from(JSON.stringify({ Authorization: authorization })).toString('base64');
        const key = (authSourceOption && ((_a = authSourceOption === null || authSourceOption === void 0 ? void 0 : authSourceOption.options) === null || _a === void 0 ? void 0 : _a.key)) || 'auth';
        return `?${key}=${token}`;
    }
    // Make API doc(redoc) url for catalog
    // redoc generated url path example: /artist/:id -> /doc#operation/get/artist/:id
    getAPIDocUrl(schema) {
        const redocOption = this.getProjectOptionsByKey('redoc');
        const docPath = (0, utils_1.getDocUrlPrefix)((redocOption === null || redocOption === void 0 ? void 0 : redocOption.url) || '');
        // currently vulcan-sql only support get method
        const operationPrefix = 'operation/get';
        return `/${docPath}#${operationPrefix}${schema.urlPath}`;
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.router.routes()(context, next);
        });
    }
};
CatalogRouters = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(core_1.TYPES.ProjectOptions)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_1.TYPES.ArtifactBuilder)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object, core_1.VulcanArtifactBuilder])
], CatalogRouters);
exports.CatalogRouters = CatalogRouters;
//# sourceMappingURL=catalogRouters.js.map