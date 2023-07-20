"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../models/index");
const core_1 = require("@vulcan-sql/core");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware extends models_1.BuiltInMiddleware {
    constructor() {
        super(...arguments);
        this.logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            try {
                yield next();
            }
            catch (e) {
                this.logger.warn(e);
                const { requestId } = core_1.asyncReqIdStorage.getStore() || {};
                // Set status code
                if (e instanceof core_1.VulcanError) {
                    context.response.status = e.httpCode || 500;
                }
                // Only set error message when this is an user error
                if (e instanceof core_1.UserError) {
                    context.response.body = {
                        code: e.code,
                        message: e.message,
                        requestId,
                    };
                }
                else {
                    context.response.body = {
                        message: 'An internal error occurred',
                        requestId,
                    };
                }
            }
        });
    }
};
ErrorHandlerMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('error-handler')
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=errorHandlerMIddleware.js.map