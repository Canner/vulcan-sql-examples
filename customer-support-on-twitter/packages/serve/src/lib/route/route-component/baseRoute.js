"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
class BaseRoute {
    // TODO: Too many injection from constructor, we should try to use container or compose some components
    constructor({ apiSchema, reqTransformer, reqValidator, paginationTransformer, templateEngine, evaluator, }) {
        this.apiSchema = apiSchema;
        this.reqTransformer = reqTransformer;
        this.reqValidator = reqValidator;
        this.paginationTransformer = paginationTransformer;
        this.templateEngine = templateEngine;
        this.evaluator = evaluator;
    }
    handle(user, transformed, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { reqParams, pagination } = transformed;
            // could template name or template path, use for template engine
            const { templateSource, profiles } = this.apiSchema;
            const profile = this.evaluator.evaluateProfile(user, profiles);
            if (!profile)
                throw new core_1.UserError(`No profile found`, {
                    httpCode: 403,
                    code: 'vulcan.forbidden',
                });
            const result = yield this.templateEngine.execute(templateSource, {
                parameters: reqParams,
                user,
                req,
                profileName: profile,
            }, pagination);
            return result;
        });
    }
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=baseRoute.js.map