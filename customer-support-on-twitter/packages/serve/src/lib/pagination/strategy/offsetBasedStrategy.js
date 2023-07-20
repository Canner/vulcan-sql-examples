"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetBasedStrategy = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const strategy_1 = require("./strategy");
class OffsetBasedStrategy extends strategy_1.PaginationStrategy {
    transform(ctx) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            ['limit', 'offset'].forEach((field) => {
                // Reject the request with duplicated query string. e.g. xxxx?limit=10&limit=100
                if (typeof ctx.request.query[field] === 'object')
                    throw new core_1.UserError(`The query string ${field} should be defined once.`);
            });
            const limitVal = (_a = ctx.request.query['limit']) !== null && _a !== void 0 ? _a : '20';
            const offsetVal = (_b = ctx.request.query['offset']) !== null && _b !== void 0 ? _b : '0';
            return {
                limit: (0, core_1.normalizeStringValue)(limitVal, 'limit', Number.name),
                offset: (0, core_1.normalizeStringValue)(offsetVal, 'offset', Number.name),
            };
        });
    }
}
exports.OffsetBasedStrategy = OffsetBasedStrategy;
//# sourceMappingURL=offsetBasedStrategy.js.map