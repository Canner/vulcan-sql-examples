"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAuthMiddleware = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const core_1 = require("@vulcan-sql/core");
const models_1 = require("../../../models/index");
const containers_1 = require("../../../containers/index");
let BaseAuthMiddleware = class BaseAuthMiddleware extends models_1.BuiltInMiddleware {
    constructor(config, name, authenticators) {
        super(config, name);
        this.options = this.getOptions() || {};
        this.authenticators = authenticators.reduce((prev, authenticator) => {
            prev[authenticator.getExtensionId()] = authenticator;
            return prev;
        }, {});
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const names = Object.keys(this.authenticators);
            if (this.enabled && !(0, lodash_1.isEmpty)(this.options)) {
                // check setup auth type in options also valid in authenticators
                Object.keys(this.options).map((type) => {
                    if (!names.includes(type))
                        throw new core_1.ConfigurationError(`The auth type "${type}" in options not supported, authenticator only supported ${names}.`);
                });
            }
            for (const name of names) {
                const authenticator = this.authenticators[name];
                if (authenticator.activate)
                    yield authenticator.activate();
            }
        });
    }
};
BaseAuthMiddleware = tslib_1.__decorate([
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.multiInject)(containers_1.TYPES.Extension_Authenticator)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Array])
], BaseAuthMiddleware);
exports.BaseAuthMiddleware = BaseAuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map