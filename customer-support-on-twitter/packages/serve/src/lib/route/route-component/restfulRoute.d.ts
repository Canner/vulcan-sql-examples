import { BaseRoute, RouteOptions } from './baseRoute';
import { KoaContext } from '../../../models/index';
export declare class RestfulRoute extends BaseRoute {
    readonly urlPath: string;
    constructor(options: RouteOptions);
    respond(ctx: KoaContext): Promise<void>;
    protected prepare(ctx: KoaContext): Promise<{
        reqParams: import("./requestTransformer").RequestParameters;
        pagination: import("@vulcan-sql/core").Pagination | undefined;
    }>;
    private combineURLs;
}
