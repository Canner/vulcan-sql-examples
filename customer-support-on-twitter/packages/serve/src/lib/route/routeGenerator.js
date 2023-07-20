"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteGenerator = exports.APIProviderType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const route_component_1 = require("./route-component");
const inversify_1 = require("inversify");
const core_2 = require("@vulcan-sql/core");
const types_1 = require("../../containers/types");
const evaluator_1 = require("../evaluator");
var APIProviderType;
(function (APIProviderType) {
    APIProviderType["RESTFUL"] = "RESTFUL";
    APIProviderType["GRAPHQL"] = "GRAPHQL";
})(APIProviderType = exports.APIProviderType || (exports.APIProviderType = {}));
let RouteGenerator = class RouteGenerator {
    constructor(reqTransformer, reqValidator, paginationTransformer, templateEngine, evaluator) {
        this.apiOptions = {
            [APIProviderType.RESTFUL]: route_component_1.RestfulRoute,
            [APIProviderType.GRAPHQL]: route_component_1.GraphQLRoute,
        };
        this.reqValidator = reqValidator;
        this.reqTransformer = reqTransformer;
        this.paginationTransformer = paginationTransformer;
        this.templateEngine = templateEngine;
        this.evaluator = evaluator;
    }
    generate(apiSchema, optionType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(optionType in this.apiOptions))
                throw new core_1.ConfigurationError(`The API type: ${optionType} currently not provided now`);
            return new this.apiOptions[optionType]({
                apiSchema,
                reqTransformer: this.reqTransformer,
                reqValidator: this.reqValidator,
                paginationTransformer: this.paginationTransformer,
                templateEngine: this.templateEngine,
                evaluator: this.evaluator,
            });
        });
    }
    multiGenerate(schemas, optionType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.all(schemas.map((schema) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.generate(schema, optionType); })));
        });
    }
};
RouteGenerator = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.RequestTransformer)),
    tslib_1.__param(1, (0, inversify_1.inject)(types_1.TYPES.RequestValidator)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.TYPES.PaginationTransformer)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_2.TYPES.TemplateEngine)),
    tslib_1.__param(4, (0, inversify_1.inject)(types_1.TYPES.Evaluator)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, core_1.TemplateEngine,
        evaluator_1.Evaluator])
], RouteGenerator);
exports.RouteGenerator = RouteGenerator;
//# sourceMappingURL=routeGenerator.js.map