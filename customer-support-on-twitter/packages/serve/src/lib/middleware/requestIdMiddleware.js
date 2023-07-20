"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIdMiddleware = void 0;
const tslib_1 = require("tslib");
const uuid = require("uuid");
const core_1 = require("@vulcan-sql/core");
const models_1 = require("../../models/index");
const core_2 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
let RequestIdMiddleware = class RequestIdMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name) {
        super(config, name);
        // read request-id options from config.
        this.options = this.getOptions() || {
            name: 'X-Request-ID',
            fieldIn: core_1.FieldInType.HEADER,
        };
        // if options has value, but not exist name / field, add default value.
        if (!this.options['name'])
            this.options['name'] = 'X-Request-ID';
        if (!this.options['fieldIn'])
            this.options['fieldIn'] = core_1.FieldInType.HEADER;
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            const { request } = context;
            const { name, fieldIn } = this.options;
            // if header or query location not found request id, set default to uuid
            const requestId = (fieldIn === core_1.FieldInType.HEADER
                ? // make the name to lowercase for consistency in request, because the field name in request will be lowercase
                    request.header[name.toLowerCase()]
                : request.query[name.toLowerCase()]) || uuid.v4();
            /**
             * The asyncReqIdStorage.getStore(...) only worked in context of the asyncReqIdStorage.run(...)
             * so here it worked if the asyncReqIdStorage.getStore(...) called in the next function or inner scope of asyncReqIdStorage.run(...)
             * */
            yield core_1.asyncReqIdStorage.run({ requestId }, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield next();
            }));
        });
    }
};
RequestIdMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('request-id'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_2.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_2.TYPES.ExtensionName)),
    tslib_1.__metadata("design:paramtypes", [Object, String])
], RequestIdMiddleware);
exports.RequestIdMiddleware = RequestIdMiddleware;
//# sourceMappingURL=requestIdMiddleware.js.map