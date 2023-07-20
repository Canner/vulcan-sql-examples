import { BuiltInMiddleware, CatalogRouter, KoaContext, Next } from '../../models/index';
export declare class CatalogRouterMiddleware extends BuiltInMiddleware {
    private catalogRouter;
    constructor(config: any, name: string, catalogRouter: CatalogRouter);
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<void>;
}
