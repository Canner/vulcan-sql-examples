import { FieldInType } from '@vulcan-sql/core';
import { BuiltInMiddleware, KoaContext, Next } from '../../models/index';
export interface RequestIdOptions {
    name: string;
    fieldIn: FieldInType.HEADER | FieldInType.QUERY;
}
export declare class RequestIdMiddleware extends BuiltInMiddleware<RequestIdOptions> {
    private options;
    constructor(config: any, name: string);
    handle(context: KoaContext, next: Next): Promise<any>;
}
