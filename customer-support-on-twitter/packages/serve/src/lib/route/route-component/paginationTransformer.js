"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationTransformer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const pagination_1 = require("../../pagination/index");
const inversify_1 = require("inversify");
let PaginationTransformer = class PaginationTransformer {
    transform(ctx, apiSchema) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { pagination } = apiSchema;
            if (pagination) {
                if (!Object.values(core_1.PaginationMode).includes(pagination.mode))
                    throw new core_1.ConfigurationError(`The pagination only support ${Object.keys(core_1.PaginationMode)}`);
                const offset = new pagination_1.OffsetBasedStrategy();
                const cursor = new pagination_1.CursorBasedStrategy();
                const keyset = new pagination_1.KeysetBasedStrategy(pagination.keyName);
                const strategyMapper = {
                    [core_1.PaginationMode.OFFSET]: offset.transform.bind(offset),
                    [core_1.PaginationMode.CURSOR]: cursor.transform.bind(cursor),
                    [core_1.PaginationMode.KEYSET]: keyset.transform.bind(keyset),
                };
                return yield strategyMapper[pagination.mode](ctx);
            }
            return undefined;
        });
    }
};
PaginationTransformer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PaginationTransformer);
exports.PaginationTransformer = PaginationTransformer;
//# sourceMappingURL=paginationTransformer.js.map