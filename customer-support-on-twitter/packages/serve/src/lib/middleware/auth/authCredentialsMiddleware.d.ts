import { ICoreOptions } from '@vulcan-sql/core';
import { Next, KoaContext, BaseAuthenticator } from '../../../models/index';
import { BaseAuthMiddleware } from './authMiddleware';
/** The middleware responsible for checking request auth credentials.
 *  It seek the 'auth' module name to match data through built-in and customized authenticator by BaseAuthenticator
 * */
export declare class AuthCredentialsMiddleware extends BaseAuthMiddleware {
    private projectOptions;
    constructor(config: any, name: string, authenticators: BaseAuthenticator<any>[], projectOptions: Partial<ICoreOptions>);
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<any>;
}
