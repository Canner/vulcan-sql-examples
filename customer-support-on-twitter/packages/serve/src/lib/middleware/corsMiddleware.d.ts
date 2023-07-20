import * as cors from '@koa/cors';
import { BuiltInMiddleware, KoaContext, Next } from '../../models/index';
export declare type CorsOptions = cors.Options;
export declare class CorsMiddleware extends BuiltInMiddleware<CorsOptions> {
    private koaCors;
    handle(context: KoaContext, next: Next): Promise<any>;
}
