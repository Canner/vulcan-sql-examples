import { KoaContext } from '../../../models/index';
import { OffsetPagination } from '@vulcan-sql/core';
import { PaginationStrategy } from './strategy';
export declare class OffsetBasedStrategy extends PaginationStrategy<OffsetPagination> {
    transform(ctx: KoaContext): Promise<OffsetPagination>;
}
