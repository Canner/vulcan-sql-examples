import { KoaContext } from '../../../models/index';
import { CursorPagination } from '@vulcan-sql/core';
import { PaginationStrategy } from './strategy';
export declare class CursorBasedStrategy extends PaginationStrategy<CursorPagination> {
    transform(ctx: KoaContext): Promise<CursorPagination>;
}
