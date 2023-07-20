"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeGeneratorModule = void 0;
const inversify_1 = require("inversify");
const serve_1 = require("../../index");
const types_1 = require("../types");
const routeGeneratorModule = () => new inversify_1.ContainerModule((bind) => {
    // Request Transformer
    bind(types_1.TYPES.RequestTransformer)
        .to(serve_1.RequestTransformer)
        .inSingletonScope();
    // Request Validator
    bind(types_1.TYPES.RequestValidator)
        .to(serve_1.RequestValidator)
        .inSingletonScope();
    // Pagination Transformer
    bind(types_1.TYPES.PaginationTransformer)
        .to(serve_1.PaginationTransformer)
        .inSingletonScope();
    // Route Generator
    bind(types_1.TYPES.RouteGenerator)
        .to(serve_1.RouteGenerator)
        .inSingletonScope();
});
exports.routeGeneratorModule = routeGeneratorModule;
//# sourceMappingURL=routeGenerator.js.map