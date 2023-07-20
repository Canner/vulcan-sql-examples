"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const core_1 = require("@vulcan-sql/core");
let RequestValidator = class RequestValidator {
    constructor(loader) {
        this.validatorLoader = loader;
    }
    // validate each parameters of request and transform the request content of koa ctx to "RequestParameters" format
    validate(reqParams, apiSchema) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(apiSchema.request.map((schemaParam) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { fieldName, validators } = schemaParam;
                // validate format through validators
                yield this.validateFieldFormat(reqParams[fieldName], validators);
            })));
        });
    }
    // validate one parameter by input validator
    validateFieldFormat(fieldValue, schemaValidators) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(schemaValidators.map((schemaValidator) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const validator = this.validatorLoader.getValidator(schemaValidator.name);
                validator.validateData(fieldValue, schemaValidator.args);
            })));
        });
    }
};
RequestValidator = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ValidatorLoader)),
    tslib_1.__metadata("design:paramtypes", [Object])
], RequestValidator);
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=requestValidator.js.map