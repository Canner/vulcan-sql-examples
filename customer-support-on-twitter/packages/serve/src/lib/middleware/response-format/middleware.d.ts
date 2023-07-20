import { KoaContext, Next } from '../../../models/index';
import { BaseResponseFormatter, BuiltInMiddleware } from '../../../models/index';
export declare type ResponseFormatOptions = {
    formats: string[];
    default: string;
};
export declare class ResponseFormatMiddleware extends BuiltInMiddleware<ResponseFormatOptions> {
    readonly defaultFormat: string;
    readonly supportedFormats: string[];
    private formatters;
    constructor(config: any, name: string, formatters: BaseResponseFormatter[]);
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<any>;
}
