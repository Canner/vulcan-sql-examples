"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocRouterMiddleware = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const containers_1 = require("../../containers/index");
const compose = require("koa-compose");
let DocRouterMiddleware = class DocRouterMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name, documentRouterFactory, options) {
        super(config, name);
        this.servers = [];
        for (const serverType of options.router) {
            this.servers.push(documentRouterFactory(serverType));
        }
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const serve of this.servers)
                yield serve.activate();
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const execute = compose(this.servers.map((server) => server.handle.bind(server)));
            yield execute(context, next);
        });
    }
};
DocRouterMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(containers_1.TYPES.Factory_DocumentRouter)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_1.TYPES.DocumentOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Function, core_1.DocumentOptions])
], DocRouterMiddleware);
exports.DocRouterMiddleware = DocRouterMiddleware;
//# sourceMappingURL=docRouterMiddleware.js.map