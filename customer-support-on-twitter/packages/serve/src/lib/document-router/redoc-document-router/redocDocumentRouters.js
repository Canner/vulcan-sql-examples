"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedocDocumentRouters = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const nunjucks = require("nunjucks");
const Router = require("koa-router");
const models_1 = require("../../../models/index");
const fs = require("fs");
const path = require("path");
const inversify_1 = require("inversify");
const utils_1 = require("../utils");
let RedocDocumentRouters = class RedocDocumentRouters extends models_1.DocumentRouter {
    constructor(config, moduleName, artifactBuilder, projectOption) {
        var _a;
        super(config, moduleName, artifactBuilder);
        this.router = new Router();
        this.docContent = '';
        // remove leading, trailing slashes
        this.urlPrefix = (0, utils_1.getDocUrlPrefix)(((_a = this.getConfig()) === null || _a === void 0 ? void 0 : _a.url) || '');
        this.projectOption = projectOption;
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Set routes
            // html index
            this.router.get(`/${this.urlPrefix}`, (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
                ctx.response.body = this.docContent;
            }));
            // spec file
            // TODO: it should be spec.json but extension will be removed by response-format/middleware, wait for fixing
            const specUrl = `/${this.urlPrefix}/spec`;
            this.router.get(specUrl, (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
                ctx.response.body = yield this.getSpec(core_1.DocumentSpec.oas3);
            }));
            // redoc js file
            // redoc's package.json point to bundles/redoc.lib.js file which we can't use directly
            // we should use the file redoc.standalone.js at the same folder instead.
            const redocPath = path.resolve(__dirname, 'template', 'redoc.standalone.js');
            // TODO: it should be redoc.js but extension will be removed by response-format/middleware, wait for fixing
            const bundleFileUrl = `/${this.urlPrefix}/redoc`;
            this.router.get(bundleFileUrl, (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
                ctx.response.body = fs.createReadStream(redocPath);
                ctx.set('Content-Type', 'application/javascript');
            }));
            // Load template and render it
            const template = yield fs.promises.readFile(path.resolve(__dirname, 'template', 'redoc.html'), 'utf-8');
            this.docContent = nunjucks.renderString(template, {
                title: `${this.projectOption.name} - Vulcan`,
                specUrl,
                bundleFileUrl,
            });
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.router.routes()(context, next);
        });
    }
};
RedocDocumentRouters = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('redoc'),
    (0, core_1.VulcanExtensionId)(core_1.DocumentRouterType.redoc),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(core_1.TYPES.ArtifactBuilder)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_1.TYPES.ProjectOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object, core_1.ProjectOptions])
], RedocDocumentRouters);
exports.RedocDocumentRouters = RedocDocumentRouters;
//# sourceMappingURL=redocDocumentRouters.js.map