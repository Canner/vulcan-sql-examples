export * from './simpleTokenAuthenticator';
export * from './passwordFileAuthenticator';
export * from './httpBasicAuthenticator';
import { SimpleTokenAuthenticator } from './simpleTokenAuthenticator';
import { PasswordFileAuthenticator } from './passwordFileAuthenticator';
import { BasicAuthenticator } from './httpBasicAuthenticator';
export declare const BuiltInAuthenticators: (typeof SimpleTokenAuthenticator | typeof PasswordFileAuthenticator | typeof BasicAuthenticator)[];
