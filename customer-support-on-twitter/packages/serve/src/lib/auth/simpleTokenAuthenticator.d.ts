import { BaseAuthenticator, KoaContext, AuthStatus } from '../../models/index';
import 'koa-bodyparser';
export declare type SimpleTokenOptions = Array<{
    name: string;
    token: string;
    attr: {
        [field: string]: string | boolean | number;
    };
}>;
/** The simple-token authenticator. setting the token and auth token directly to authorization.
 *
 * Token could be any format e.g: md5, base64 encode, sha..., but must set it in the token field of "simple-token" list too.
 *  */
export declare class SimpleTokenAuthenticator extends BaseAuthenticator<SimpleTokenOptions> {
    private options;
    private usersCredentials;
    /** read simple-token and users info to initialize user credentials */
    onActivate(): Promise<void>;
    getTokenInfo(ctx: KoaContext): Promise<{
        token: string;
    }>;
    authCredential(context: KoaContext): Promise<{
        status: AuthStatus;
        type: string;
    }>;
    private validate;
}
