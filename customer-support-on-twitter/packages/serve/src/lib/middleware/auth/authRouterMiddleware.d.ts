import { Next, KoaContext } from '../../../models/index';
import { BaseAuthMiddleware } from './authMiddleware';
/** The middleware responsible for mounting endpoint for getting token info or user profile by request.
 *  It seek the 'auth' module name to match data through built-in and customized authenticator by BaseAuthenticator
 * */
export declare class AuthRouterMiddleware extends BaseAuthMiddleware {
    private router;
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<any>;
    private setRoutes;
    private mountTokenEndpoint;
    private mountUserProfileEndpoint;
    private mountAvailableTypesEndpoint;
}
