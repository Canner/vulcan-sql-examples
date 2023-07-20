"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorBasedStrategy = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const strategy_1 = require("./strategy");
class CursorBasedStrategy extends strategy_1.PaginationStrategy {
    transform(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const checkFelidInQueryString = ['limit', 'cursor'].every((field) => Object.keys(ctx.request.query).includes(field));
            if (!checkFelidInQueryString)
                throw new core_1.UserError(`The ${core_1.PaginationMode.CURSOR} must provide limit and cursor in query string.`);
            const limitVal = ctx.request.query['limit'];
            const cursorVal = ctx.request.query['cursor'];
            return {
                limit: (0, core_1.normalizeStringValue)(limitVal, 'limit', Number.name),
                cursor: (0, core_1.normalizeStringValue)(cursorVal, 'cursor', String.name),
            };
        });
    }
}
exports.CursorBasedStrategy = CursorBasedStrategy;
//# sourceMappingURL=cursorBasedStrategy.js.map