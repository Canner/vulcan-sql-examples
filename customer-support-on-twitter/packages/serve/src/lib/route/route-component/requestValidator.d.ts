import { APISchema, IValidatorLoader } from '@vulcan-sql/core';
import { RequestParameters } from './requestTransformer';
export interface IRequestValidator {
    validate(reqParams: RequestParameters, apiSchema: APISchema): Promise<void>;
}
export declare class RequestValidator implements IRequestValidator {
    private validatorLoader;
    constructor(loader: IValidatorLoader);
    validate(reqParams: RequestParameters, apiSchema: APISchema): Promise<void>;
    private validateFieldFormat;
}
