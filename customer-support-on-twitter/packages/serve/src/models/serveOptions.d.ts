import { ICoreOptions } from '@vulcan-sql/core';
import { APIProviderType } from '../lib/route/index';
export interface sslFileOptions {
    key: string;
    cert: string;
    /** certificate bundle */
    ca: string;
}
export interface ServeConfig extends ICoreOptions {
    ['port']?: number;
    ['types']?: Array<APIProviderType>;
    /** When 'enforce-https' is enabled and type is LOCAL in middleware, need the ssl key and cert*/
    ['ssl']?: sslFileOptions;
}
