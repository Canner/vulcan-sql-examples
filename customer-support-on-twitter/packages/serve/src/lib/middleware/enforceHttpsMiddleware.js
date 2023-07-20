"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnforceHttpsOptions = exports.EnforceHttpsMiddleware = exports.ResolverType = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const core_1 = require("@vulcan-sql/core");
const core_2 = require("@vulcan-sql/core");
const models_1 = require("../../models/index");
const koa_sslify_1 = require("koa-sslify");
const koa_sslify_2 = require("koa-sslify");
// resolver type for sslify options
var ResolverType;
(function (ResolverType) {
    /* use local server to run https server, suit for local usage. */
    ResolverType["LOCAL"] = "LOCAL";
    /*
     * RFC standard header (RFC7239) to carry information in a organized way for reverse proxy used.
     *  However, currently only little reverse proxies support it. e.g: nginx supported.
     *  refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded
     *  refer: https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/
     */
    ResolverType["FORWARDED"] = "FORWARDED";
    /*
     * X-Forwarded-Proto header flag is one of the de-facto standard (But not RFC standard) to check and enforce https or not, almost reverse proxies supported.
     * e.g: Heroku, GKE ingress, AWS ELB, nginx.
     */
    ResolverType["X_FORWARDED_PROTO"] = "X_FORWARDED_PROTO";
    /*
     * if use Azure Application Request Routing as reverse proxy, then it use X-ARR-SSL header flag to check and enforce https.
     * refer: https://abhimantiwari.github.io/blog/ARR/
     */
    ResolverType["AZURE_ARR"] = "AZURE_ARR";
    /* customize the header flag to check and enforce https, when use the type, need to define an custom header flag for checking and enforcing https */
    ResolverType["CUSTOM"] = "CUSTOM";
})(ResolverType = exports.ResolverType || (exports.ResolverType = {}));
// enforce https middleware
let EnforceHttpsMiddleware = class EnforceHttpsMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name) {
        super(config, name);
        this.koaEnforceHttps = (0, koa_sslify_2.default)(
        // if not setup "enforce-https", default sslify is LOCAL type
        this.getOptions() ? this.transformOptions(this.getOptions()) : undefined);
        const rawOptions = this.getOptions();
        const options = rawOptions ? this.transformOptions(rawOptions) : undefined;
        this.koaEnforceHttps = (0, koa_sslify_2.default)(options);
    }
    handle(context, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.enabled)
                return next();
            else
                return this.koaEnforceHttps(context, next);
        });
    }
    transformOptions(rawOptions) {
        // given default value if not exist.
        rawOptions.type = rawOptions.type || ResolverType.LOCAL;
        // check incorrect type
        this.checkResolverType(rawOptions.type);
        const type = rawOptions.type.toUpperCase();
        const resolverMapper = {
            [ResolverType.LOCAL.toString()]: () => koa_sslify_1.httpsResolver,
            [ResolverType.FORWARDED.toString()]: () => koa_sslify_1.forwardedResolver,
            [ResolverType.X_FORWARDED_PROTO.toString()]: () => koa_sslify_1.xForwardedProtoResolver,
            [ResolverType.AZURE_ARR.toString()]: () => koa_sslify_1.azureResolver,
        };
        // if type is CUSTOM
        if (type === ResolverType.CUSTOM) {
            if (!rawOptions.proto)
                throw new core_1.ConfigurationError('The "CUSTOM" type need also provide "proto" in options.');
            return Object.assign({ resolver: (0, koa_sslify_1.customProtoHeaderResolver)(rawOptions.proto) }, (0, lodash_1.omit)(rawOptions, ['type', 'proto']));
        }
        // if not CUSTOM.
        return Object.assign({ resolver: resolverMapper[type]() }, (0, lodash_1.omit)(rawOptions, ['type', 'proto']));
    }
    checkResolverType(type) {
        // check incorrect type
        if (!(type.toUpperCase() in ResolverType))
            throw new core_1.ConfigurationError(`The type is incorrect, only support type in ${JSON.stringify(Object.keys(ResolverType))}.`);
    }
};
EnforceHttpsMiddleware = tslib_1.__decorate([
    (0, core_2.VulcanInternalExtension)('enforce-https'),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__metadata("design:paramtypes", [Object, String])
], EnforceHttpsMiddleware);
exports.EnforceHttpsMiddleware = EnforceHttpsMiddleware;
/**
 * Get enforce https options in config
 * @param options EnforceHttpsOptions
 * @returns beside you disabled it, or it return enforce https options when setup "enforce-https"( if not found options, default is LOCAL type ).
 */
const getEnforceHttpsOptions = (options) => {
    // if not given "enforce-https" options, return default options
    if (!options)
        return {
            enabled: true,
            options: { type: ResolverType.LOCAL },
        };
    return {
        enabled: (0, lodash_1.isUndefined)(options['enabled']) ? true : false,
        options: options['options'] ||
            { type: ResolverType.LOCAL },
    };
};
exports.getEnforceHttpsOptions = getEnforceHttpsOptions;
//# sourceMappingURL=enforceHttpsMiddleware.js.map