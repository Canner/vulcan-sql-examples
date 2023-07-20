import { KoaContext } from '../../../models/index';
import { APISchema, Pagination } from '@vulcan-sql/core';
export interface IPaginationTransformer {
    transform(ctx: KoaContext, apiSchema: APISchema): Promise<Pagination | undefined>;
}
export declare class PaginationTransformer {
    transform(ctx: KoaContext, apiSchema: APISchema): Promise<import("@vulcan-sql/core").OffsetPagination | import("@vulcan-sql/core").CursorPagination | import("@vulcan-sql/core").KeysetPagination | undefined>;
}
