import { IPaginationTransformer } from 'index';
import { APISchema, TemplateEngine } from '@vulcan-sql/core';
import { RestfulRoute, GraphQLRoute, IRequestValidator, IRequestTransformer } from './route-component';
import { Evaluator } from '../evaluator';
export declare enum APIProviderType {
    RESTFUL = "RESTFUL",
    GRAPHQL = "GRAPHQL"
}
export declare class RouteGenerator {
    private reqValidator;
    private reqTransformer;
    private paginationTransformer;
    private templateEngine;
    private evaluator;
    private apiOptions;
    constructor(reqTransformer: IRequestTransformer, reqValidator: IRequestValidator, paginationTransformer: IPaginationTransformer, templateEngine: TemplateEngine, evaluator: Evaluator);
    generate(apiSchema: APISchema, optionType: APIProviderType): Promise<RestfulRoute | GraphQLRoute>;
    multiGenerate(schemas: Array<APISchema>, optionType: APIProviderType): Promise<(RestfulRoute | GraphQLRoute)[]>;
}
