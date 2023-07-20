"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSourceNormalizerMiddleware = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const models_1 = require("../../../models/index");
const class_validator_1 = require("class-validator");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
/** The middleware responsible for normalizing the auth source e.g: query sting / payload and move to header is header not set it.
 *  It seek the 'auth-source' module name to match data.
 * */
let AuthSourceNormalizerMiddleware = class AuthSourceNormalizerMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name, projectOptions) {
        super(config, name);
        this.options = this.getOptions() || {};
        this.projectOptions = projectOptions;
    }
    onActivate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.enabled) {
                // normalized options
                this.options.in = this.options.in || models_1.AuthSourceTypes.QUERY;
                if (!Object.keys(models_1.AuthSourceTypes).includes(this.options.in.toUpperCase()))
                    throw new core_1.ConfigurationError(`The "${this.options.in}" not support, only supported: ${Object.keys(models_1.AuthSourceTypes)}`);
                this.options.key = this.options.key || 'auth';
            }
        });
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            const { in: sourceIn, key } = this.options;
            let payload = undefined;
            const mapper = {
                [models_1.AuthSourceTypes.QUERY]: context.request.query,
                [models_1.AuthSourceTypes.PAYLOAD]: context.request.body,
            };
            // The endpoint not need contains auth credentials
            if ((0, utils_1.checkIsPublicEndpoint)(this.projectOptions, context.path))
                return next();
            try {
                // normalize auth source to header
                payload = (mapper[sourceIn.toUpperCase()] || {});
                if (key in payload && (0, class_validator_1.isBase64)(payload[key])) {
                    // decode base64
                    const token = Buffer.from(payload[key], 'base64').toString();
                    // parse json format to object
                    const credentials = JSON.parse(token);
                    // check the "Authorization" is found ( currently only support "Authorization" )
                    const found = (0, lodash_1.chain)(credentials)
                        .keys()
                        .map((credential) => (0, lodash_1.capitalize)(credential))
                        .includes('Authorization')
                        .value();
                    if (found && !context.request.headers['authorization'])
                        context.request.headers.authorization = credentials['Authorization'];
                }
            }
            catch (error) {
                logger.debug('normalize auth payload source failed, reason =>', error.message);
            }
            yield next();
        });
    }
};
AuthSourceNormalizerMiddleware = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)('auth-source'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(core_1.TYPES.ProjectOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object])
], AuthSourceNormalizerMiddleware);
exports.AuthSourceNormalizerMiddleware = AuthSourceNormalizerMiddleware;
//# sourceMappingURL=authSourceNormalizerMiddleware.js.map