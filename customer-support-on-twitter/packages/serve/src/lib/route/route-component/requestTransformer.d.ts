import { APISchema, FieldDataType, FieldInType } from '@vulcan-sql/core';
import { KoaContext } from '../../../models/index';
export interface RequestParameters {
    [name: string]: any;
}
export interface IRequestTransformer {
    transform(ctx: KoaContext, apiSchema: APISchema): Promise<RequestParameters>;
}
export declare class RequestTransformer implements IRequestTransformer {
    static readonly fieldInMapper: {
        [type in FieldInType]: (ctx: KoaContext, fieldName: string) => string;
    };
    static readonly convertTypeMapper: {
        [type in FieldDataType]: (value: string, name: string) => any;
    };
    transform(ctx: KoaContext, apiSchema: APISchema): Promise<RequestParameters>;
    private convertDataType;
}
