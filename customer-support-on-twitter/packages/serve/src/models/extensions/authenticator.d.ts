import { ExtensionBase } from '@vulcan-sql/core';
import { KoaContext } from '../index';
export declare enum AuthType {
    Basic = "basic",
    PasswordFile = "password-file",
    SimpleToken = "simple-token"
}
export interface AuthUserInfo {
    name: string;
    attr: {
        [field: string]: string | boolean | number | any[];
    };
}
export declare enum AuthStatus {
    /**
     * SUCCESS: Request format correct and match the one of user credentials
     * INDETERMINATE: Request format is unclear for authenticator needed, skip and check next authenticator
     * FAIL: Request format correct, but not match the user credentials
     */
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    INDETERMINATE = "INDETERMINATE"
}
export interface AuthResult {
    status: AuthStatus;
    type: string;
    message?: string;
    user?: AuthUserInfo;
    [key: string]: any;
}
export interface IAuthenticator {
    /** get token related information */
    getTokenInfo(context: KoaContext): Promise<any>;
    /** auth credential (e.g: token) to get user info  */
    authCredential(context: KoaContext): Promise<AuthResult>;
}
export declare abstract class BaseAuthenticator<AuthTypeOption> extends ExtensionBase implements IAuthenticator {
    abstract getTokenInfo(context: KoaContext): Promise<Record<string, any>>;
    abstract authCredential(context: KoaContext): Promise<AuthResult>;
    protected getOptions(): AuthTypeOption | undefined;
}
