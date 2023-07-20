"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestfulRoute = void 0;
const tslib_1 = require("tslib");
const baseRoute_1 = require("./baseRoute");
class RestfulRoute extends baseRoute_1.BaseRoute {
    constructor(options) {
        super(options);
        const { apiSchema } = options;
        this.urlPath = this.combineURLs('/api', apiSchema.urlPath);
    }
    respond(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformed = yield this.prepare(ctx);
            const authUser = ctx.state.user;
            const req = ctx.request;
            const result = yield this.handle(authUser, transformed, req);
            ctx.response.body = {
                data: result.getData(),
                columns: result.getColumns(),
            };
        });
    }
    prepare(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get request data from context
            const reqParams = yield this.reqTransformer.transform(ctx, this.apiSchema);
            // validate request format
            yield this.reqValidator.validate(reqParams, this.apiSchema);
            // get pagination data from context
            const pagination = yield this.paginationTransformer.transform(ctx, this.apiSchema);
            return {
                reqParams,
                pagination,
            };
        });
    }
    combineURLs(baseURL, relativeURL = '') {
        return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
    }
}
exports.RestfulRoute = RestfulRoute;
//# sourceMappingURL=restfulRoute.js.map