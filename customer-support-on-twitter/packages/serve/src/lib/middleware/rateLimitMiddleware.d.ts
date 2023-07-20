import { RateLimitOptions } from 'koa2-ratelimit';
import { BuiltInMiddleware, KoaContext, Next } from '../../models/index';
export { RateLimitOptions };
export declare class RateLimitMiddleware extends BuiltInMiddleware<RateLimitOptions> {
    private options;
    private koaRateLimitFunc;
    constructor(config: any, name: string);
    handle(context: KoaContext, next: Next): Promise<any>;
}
