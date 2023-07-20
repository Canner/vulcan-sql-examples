"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysetBasedStrategy = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const strategy_1 = require("./strategy");
class KeysetBasedStrategy extends strategy_1.PaginationStrategy {
    constructor(keyName) {
        super();
        this.keyName = keyName;
    }
    transform(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.keyName)
                throw new core_1.UserError(`The keyset pagination need to set "keyName" in schema for indicate what key need to do filter.`);
            const checkFelidInQueryString = ['limit', this.keyName].every((field) => Object.keys(ctx.request.query).includes(field));
            if (!checkFelidInQueryString)
                throw new core_1.UserError(`The ${core_1.PaginationMode.KEYSET} must provide limit and key name in query string.`);
            const limitVal = ctx.request.query['limit'];
            const keyNameVal = ctx.request.query[this.keyName];
            return {
                limit: (0, core_1.normalizeStringValue)(limitVal, 'limit', Number.name),
                [this.keyName]: (0, core_1.normalizeStringValue)(keyNameVal, this.keyName, String.name),
            };
        });
    }
}
exports.KeysetBasedStrategy = KeysetBasedStrategy;
//# sourceMappingURL=keysetBasedStrategy.js.map