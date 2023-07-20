import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { AuthUserInfo } from './extensions/authenticator';
declare type KoaContext = RouterContext<{
    user: AuthUserInfo;
}>;
export { KoaContext, Next };
