import { AuthUserInfo, KoaContext } from '../../../models/index';
import { APISchema, TemplateEngine, Pagination } from '@vulcan-sql/core';
import { IRequestValidator } from './requestValidator';
import { IRequestTransformer, RequestParameters } from './requestTransformer';
import { IPaginationTransformer } from './paginationTransformer';
import { Evaluator } from '../../evaluator/index';
import { KoaRequest } from '@vulcan-sql/core';
export interface TransformedRequest {
    reqParams: RequestParameters;
    pagination?: Pagination;
}
export interface RouteOptions {
    apiSchema: APISchema;
    reqTransformer: IRequestTransformer;
    reqValidator: IRequestValidator;
    paginationTransformer: IPaginationTransformer;
    templateEngine: TemplateEngine;
    evaluator: Evaluator;
}
export interface IRoute {
    respond(ctx: KoaContext): Promise<any>;
}
export declare abstract class BaseRoute implements IRoute {
    readonly apiSchema: APISchema;
    protected readonly reqTransformer: IRequestTransformer;
    protected readonly reqValidator: IRequestValidator;
    protected readonly templateEngine: TemplateEngine;
    protected readonly paginationTransformer: IPaginationTransformer;
    private evaluator;
    constructor({ apiSchema, reqTransformer, reqValidator, paginationTransformer, templateEngine, evaluator, }: RouteOptions);
    abstract respond(ctx: KoaContext): Promise<any>;
    protected abstract prepare(ctx: KoaContext): Promise<TransformedRequest>;
    protected handle(user: AuthUserInfo, transformed: TransformedRequest, req: KoaRequest): Promise<import("@vulcan-sql/core").DataResult>;
}
