"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLRoute = void 0;
const tslib_1 = require("tslib");
/* istanbul ignore file */
const baseRoute_1 = require("./baseRoute");
class GraphQLRoute extends baseRoute_1.BaseRoute {
    constructor(options) {
        super(options);
        const { apiSchema } = options;
        this.operationName = apiSchema.operationName;
    }
    makeTypeDefs() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // TODO: generate graphql type by api schema
        });
    }
    respond(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transformed = yield this.prepare(ctx);
            const authUser = ctx.state.user;
            const req = ctx.request;
            yield this.handle(authUser, transformed, req);
            // TODO: get template engine handled result and return response by checking API schema
            return transformed;
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepare(_ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /**
             * TODO: the graphql need to transform from body.
             * Therefore, current request and pagination transformer not suitable (need to provide another graphql transform method or class)
             */
            return {
                reqParams: {},
            };
        });
    }
}
exports.GraphQLRoute = GraphQLRoute;
//# sourceMappingURL=graphQLRoute.js.map