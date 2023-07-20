import { KoaContext } from '../../../models/index';
import { BaseResponseFormatter } from '../../../models/index';
export declare type ResponseFormatterMap = {
    [name: string]: BaseResponseFormatter;
};
/**
 *
 * @param context koa context
 * @param formatters the formatters which built-in and loaded extensions.
 * @returns the format name used to format response
 */
export declare const checkUsableFormat: ({ context, supportedFormats, defaultFormat, }: {
    context: KoaContext;
    supportedFormats: string[];
    defaultFormat: string;
}) => string;
