import { BuiltInMiddleware, KoaContext, Next } from '../../models/index';
export declare class ErrorHandlerMiddleware extends BuiltInMiddleware {
    private logger;
    handle(context: KoaContext, next: Next): Promise<any>;
}
