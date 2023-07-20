import { BaseAuthenticator, KoaContext, AuthStatus } from '../../models/index';
import 'koa-bodyparser';
export interface PasswordFileUserOptions {
    name: string;
    attr: {
        [field: string]: string | boolean | number;
    };
}
interface PasswordFileOptions {
    /** password file path */
    ['path']?: string;
    /** each user information */
    ['users']?: Array<PasswordFileUserOptions>;
}
/** The password-file authenticator.
 *
 * Setting the password file with {username}:{bcrypt-password} format, we use the bcrypt round 10.
 * Then authenticate by passing encode base64 {username}:{password} to authorization.
 */
export declare class PasswordFileAuthenticator extends BaseAuthenticator<PasswordFileOptions> {
    private usersCredentials;
    private options;
    /** read password file and users info to initialize user credentials */
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
export {};
