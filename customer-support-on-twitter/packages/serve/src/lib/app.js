"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VulcanApplication = void 0;
const tslib_1 = require("tslib");
const Koa = require("koa");
const KoaRouter = require("koa-router");
const koaParseBody = require("koa-bodyparser");
const lodash_1 = require("lodash");
const route_1 = require("./route");
const inversify_1 = require("inversify");
const containers_1 = require("../containers");
let VulcanApplication = class VulcanApplication {
    constructor(generator, routeMiddlewares = []) {
        this.generator = generator;
        this.routeMiddlewares = routeMiddlewares;
        this.app = new Koa();
        this.restfulRouter = new KoaRouter();
        this.graphqlRouter = new KoaRouter();
        // add koa parser body for parsing POST json and form data
        this.app.use(koaParseBody());
    }
    /**
     * Get request handler callback function, used in createServer function in http / https.
     */
    getHandler() {
        return this.app.callback();
    }
    buildRoutes(schemas, apiTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // setup API route according to api types and api schemas
            const routeMapper = {
                [route_1.APIProviderType.RESTFUL]: (routes) => this.setRestful(routes),
                [route_1.APIProviderType.GRAPHQL]: (routes) => this.setGraphQL(routes),
            };
            // check existed at least one type, if not provide, default is restful
            const types = (0, lodash_1.uniq)(apiTypes || [route_1.APIProviderType.RESTFUL]);
            for (const type of types) {
                const routes = yield this.generator.multiGenerate(schemas, type);
                yield routeMapper[type](routes);
            }
        });
    }
    // Setup restful routes to server
    setRestful(routes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(routes.map((route) => {
                // currently only provide get method
                this.restfulRouter.get(route.urlPath, route.respond.bind(route));
            }));
            this.app.use(this.restfulRouter.routes());
            this.app.use(this.restfulRouter.allowedMethods());
        });
    }
    setGraphQL(routes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(routes);
            // TODO: Still building GraphQL...
            this.app.use(this.graphqlRouter.routes());
            this.app.use(this.restfulRouter.allowedMethods());
        });
    }
    /** load built-in and extensions middleware classes for app used */
    useMiddleware() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const middleware of this.routeMiddlewares) {
                if (middleware.activate)
                    yield middleware.activate();
                this.app.use(middleware.handle.bind(middleware));
            }
        });
    }
};
VulcanApplication = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(containers_1.TYPES.RouteGenerator)),
    tslib_1.__param(1, (0, inversify_1.multiInject)(containers_1.TYPES.Extension_RouteMiddleware)),
    tslib_1.__param(1, (0, inversify_1.optional)()),
    tslib_1.__metadata("design:paramtypes", [route_1.RouteGenerator, Array])
], VulcanApplication);
exports.VulcanApplication = VulcanApplication;
//# sourceMappingURL=app.js.map