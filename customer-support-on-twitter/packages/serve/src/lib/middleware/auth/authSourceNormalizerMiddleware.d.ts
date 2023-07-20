import { ICoreOptions } from '@vulcan-sql/core';
import { AuthSourceOptions, BuiltInMiddleware, KoaContext, Next } from '../../../models/index';
/** The middleware responsible for normalizing the auth source e.g: query sting / payload and move to header is header not set it.
 *  It seek the 'auth-source' module name to match data.
 * */
export declare class AuthSourceNormalizerMiddleware extends BuiltInMiddleware<AuthSourceOptions> {
    private options;
    private projectOptions;
    constructor(config: any, name: string, projectOptions: Partial<ICoreOptions>);
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<any>;
}
