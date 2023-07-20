import { BuiltInMiddleware } from '../../models/index';
import { KoaContext, Next } from '../../models/index';
import { Options as SslOptions } from 'koa-sslify';
export declare enum ResolverType {
    LOCAL = "LOCAL",
    FORWARDED = "FORWARDED",
    X_FORWARDED_PROTO = "X_FORWARDED_PROTO",
    AZURE_ARR = "AZURE_ARR",
    CUSTOM = "CUSTOM"
}
export declare type EnforceHttpsOptions = Omit<SslOptions, 'resolver'> & {
    type?: string;
    proto?: string;
};
export interface EnforceHttpsConfig {
    enabled: boolean;
    options: EnforceHttpsOptions;
}
export declare class EnforceHttpsMiddleware extends BuiltInMiddleware<EnforceHttpsOptions> {
    private koaEnforceHttps;
    constructor(config: any, name: string);
    handle(context: KoaContext, next: Next): Promise<any>;
    private transformOptions;
    private checkResolverType;
}
/**
 * Get enforce https options in config
 * @param options EnforceHttpsOptions
 * @returns beside you disabled it, or it return enforce https options when setup "enforce-https"( if not found options, default is LOCAL type ).
 */
export declare const getEnforceHttpsOptions: (options?: {
    enabled: boolean;
    options: EnforceHttpsOptions;
} | undefined) => {
    enabled: boolean;
    options: EnforceHttpsOptions;
};
