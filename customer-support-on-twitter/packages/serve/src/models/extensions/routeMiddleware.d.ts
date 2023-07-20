import { ExtensionBase } from '@vulcan-sql/core';
import { KoaContext, Next } from '../index';
export interface BuiltInMiddlewareConfig<Option = any> {
    enabled: boolean;
    options: Option;
}
export declare abstract class BaseRouteMiddleware<C = any> extends ExtensionBase<C> {
    abstract handle(context: KoaContext, next: Next): Promise<void>;
}
export declare abstract class BuiltInMiddleware<Option = any> extends BaseRouteMiddleware<BuiltInMiddlewareConfig<Option>> {
    protected enabled: boolean;
    constructor(config: any, name: string);
    protected getOptions(): Option | undefined;
}
