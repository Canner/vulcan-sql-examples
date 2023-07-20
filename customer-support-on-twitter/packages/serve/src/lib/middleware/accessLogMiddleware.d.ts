import { LoggerOptions } from '@vulcan-sql/core';
import { BuiltInMiddleware, KoaContext, Next } from '../../models/index';
export declare class AccessLogMiddleware extends BuiltInMiddleware<LoggerOptions> {
    private logger;
    handle(context: KoaContext, next: Next): Promise<any>;
}
