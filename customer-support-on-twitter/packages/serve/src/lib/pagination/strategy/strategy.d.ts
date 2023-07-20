import { KoaContext } from '../../../models/index';
export declare abstract class PaginationStrategy<T> {
    abstract transform(ctx: KoaContext): Promise<T>;
}
