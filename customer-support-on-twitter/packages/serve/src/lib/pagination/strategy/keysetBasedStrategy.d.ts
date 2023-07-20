import { KeysetPagination } from '@vulcan-sql/core';
import { KoaContext } from '../../../models/index';
import { PaginationStrategy } from './strategy';
export declare class KeysetBasedStrategy extends PaginationStrategy<KeysetPagination> {
    private keyName?;
    constructor(keyName?: string);
    transform(ctx: KoaContext): Promise<KeysetPagination>;
}
