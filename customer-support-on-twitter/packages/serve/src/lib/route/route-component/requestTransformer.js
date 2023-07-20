"use strict";
var RequestTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTransformer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
let RequestTransformer = RequestTransformer_1 = class RequestTransformer {
    transform(ctx, apiSchema) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const paramList = yield Promise.all(apiSchema.request.map((schemaReqParam) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { fieldName, fieldIn, type } = schemaReqParam;
                // Get request value according field-in type
                const fieldValue = RequestTransformer_1.fieldInMapper[fieldIn](ctx, fieldName);
                const formattedValue = yield this.convertDataType(fieldName, fieldValue, type);
                // transform format to { name: value }
                return { [fieldName]: formattedValue };
            })));
            // combine all param list to one object for { name: value } format
            const params = (0, lodash_1.assign)({}, ...paramList);
            return params;
        });
    }
    // check data type of one parameter by input type and convert it
    convertDataType(name, value, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!Object.values(core_1.FieldDataType).includes(type))
                throw new core_1.ConfigurationError(`The ${type} type not been implemented now.`);
            return RequestTransformer_1.convertTypeMapper[type](value, name);
        });
    }
};
RequestTransformer.fieldInMapper = {
    [core_1.FieldInType.HEADER]: (ctx, fieldName) => ctx.request.header[fieldName],
    [core_1.FieldInType.QUERY]: (ctx, fieldName) => ctx.request.query[fieldName],
    [core_1.FieldInType.PATH]: (ctx, fieldName) => ctx.params[fieldName],
};
RequestTransformer.convertTypeMapper = {
    [core_1.FieldDataType.NUMBER]: (value, name) => (0, core_1.normalizeStringValue)(value, name, Number.name),
    [core_1.FieldDataType.STRING]: (value, name) => (0, core_1.normalizeStringValue)(value, name, String.name),
    [core_1.FieldDataType.BOOLEAN]: (value, name) => (0, core_1.normalizeStringValue)(value, name, Boolean.name),
};
RequestTransformer = RequestTransformer_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], RequestTransformer);
exports.RequestTransformer = RequestTransformer;
//# sourceMappingURL=requestTransformer.js.map