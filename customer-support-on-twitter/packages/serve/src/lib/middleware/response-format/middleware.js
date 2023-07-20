"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatMiddleware = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../../models/index");
const helpers_1 = require("./helpers");
const core_1 = require("@vulcan-sql/core");
const core_2 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const containers_1 = require("../../../containers/index");
let ResponseFormatMiddleware = class ResponseFormatMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name, formatters) {
        super(config, name);
        const options = this.getOptions() || {};
        const formats = options.formats || [];
        this.formatters = formatters.reduce((prev, formatter) => {
            prev[formatter.getExtensionId()] = formatter;
            return prev;
        }, {});
        this.supportedFormats = formats.map((format) => format.toLowerCase());
        this.defaultFormat = !options.default ? 'json' : options.default;
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.enabled) {
                if (!Object.keys(this.formatters).includes(this.defaultFormat))
                    throw new core_1.InternalError(`The type "${this.defaultFormat}" in "default" not implement extension`);
                this.supportedFormats.map((format) => {
                    if (!Object.keys(this.formatters).includes(format))
                        throw new core_1.InternalError(`The type "${format}" in "formats" not implement extension`);
                });
            }
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // return to skip the middleware, if disabled
            if (!this.enabled)
                return next();
            // TODO: replace the hardcoded api with configurable prefix
            // Only handle the path for Vulcan API
            if (!context.request.path.startsWith('/api'))
                return next();
            // get supported and request format to use.
            const format = (0, helpers_1.checkUsableFormat)({
                context,
                supportedFormats: this.supportedFormats,
                defaultFormat: this.defaultFormat,
            });
            context.request.path = context.request.path.split('.')[0];
            // go to next to run middleware and route
            yield next();
            // format the response and route handler ran.
            this.formatters[format].formatToResponse(context);
            return;
        });
    }
};
ResponseFormatMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('response-format'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_2.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_2.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.multiInject)(containers_1.TYPES.Extension_Formatter)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Array])
], ResponseFormatMiddleware);
exports.ResponseFormatMiddleware = ResponseFormatMiddleware;
//# sourceMappingURL=middleware.js.map