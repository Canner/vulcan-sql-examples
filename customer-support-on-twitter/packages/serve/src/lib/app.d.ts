import { APISchema } from '@vulcan-sql/core';
import { APIProviderType, RouteGenerator } from './route';
import { BaseRouteMiddleware } from '../models';
export declare class VulcanApplication {
    private app;
    private restfulRouter;
    private graphqlRouter;
    private generator;
    private routeMiddlewares;
    constructor(generator: RouteGenerator, routeMiddlewares?: BaseRouteMiddleware[]);
    /**
     * Get request handler callback function, used in createServer function in http / https.
     */
    getHandler(): (req: import("http").IncomingMessage | import("http2").Http2ServerRequest, res: import("http").ServerResponse | import("http2").Http2ServerResponse) => void;
    buildRoutes(schemas: Array<APISchema>, apiTypes?: Array<APIProviderType>): Promise<void>;
    private setRestful;
    private setGraphQL;
    /** load built-in and extensions middleware classes for app used */
    useMiddleware(): Promise<void>;
}
