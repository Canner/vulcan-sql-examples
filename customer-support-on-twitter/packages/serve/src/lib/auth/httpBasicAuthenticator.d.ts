import { BaseAuthenticator, KoaContext, AuthStatus } from '../../models/index';
import 'koa-bodyparser';
interface AuthUserOptions {
    name: string;
    attr: {
        [field: string]: string | boolean | number;
    };
}
interface HTPasswdFileOptions {
    /** password file path */
    ['path']: string;
    /** each user information */
    ['users']?: Array<AuthUserOptions>;
}
export interface AuthUserListOptions {
    name: string;
    md5Password: string;
    attr: {
        [field: string]: string | boolean | number;
    };
}
export interface BasicOptions {
    ['htpasswd-file']?: HTPasswdFileOptions;
    ['users-list']?: Array<AuthUserListOptions>;
}
/** The http basic authenticator.
 *
 *  Able to set user credentials by file path through "htpasswd-file" or list directly in config by "users-list".
 *  The password must hash by md5 when setting into "htpasswd-file" or "users-list".
 *
 *  It authenticate by passing encode base64 {username}:{password} to authorization
 */
export declare class BasicAuthenticator extends BaseAuthenticator<BasicOptions> {
    private usersCredentials;
    private options;
    /** read basic options to initialize and load user credentials */
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
