import { BuiltInMiddleware, BaseAuthenticator, AuthOptions } from '../../../models/index';
declare type AuthenticatorMap = {
    [name: string]: BaseAuthenticator<any>;
};
export declare abstract class BaseAuthMiddleware extends BuiltInMiddleware<AuthOptions> {
    protected options: AuthOptions;
    protected authenticators: AuthenticatorMap;
    constructor(config: any, name: string, authenticators: BaseAuthenticator<any>[]);
    initialize(): Promise<void>;
}
export {};
