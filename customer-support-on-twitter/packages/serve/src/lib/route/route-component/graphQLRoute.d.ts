import { BaseRoute, RouteOptions } from './baseRoute';
import { KoaContext } from '../../../models/index';
export declare class GraphQLRoute extends BaseRoute {
    readonly operationName: string;
    constructor(options: RouteOptions);
    makeTypeDefs(): Promise<void>;
    respond(ctx: KoaContext): Promise<{
        reqParams: {};
    }>;
    protected prepare(_ctx: KoaContext): Promise<{
        reqParams: {};
    }>;
}
