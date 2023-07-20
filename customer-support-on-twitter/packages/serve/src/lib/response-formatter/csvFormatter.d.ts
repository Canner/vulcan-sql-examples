/// <reference types="node" />
import * as Stream from 'stream';
import { DataColumn } from '@vulcan-sql/core';
import { KoaContext } from '../../models/index';
import { BaseResponseFormatter } from '../../models/extensions/responseFormatter';
/**
 * convert the array string to one line string for csv format
 * @param arrString
 */
export declare const arrStringToCsvString: (arrString: string) => string;
declare class CsvTransformer extends Stream.Transform {
    private columns;
    private readonly PREPEND_UTF8_BOM;
    constructor({ columns, options, }: {
        columns: string[];
        options?: Stream.TransformOptions;
    });
    _transform(chunk: any, _encoding: BufferEncoding, callback: Stream.TransformCallback): void;
}
export declare class CsvFormatter extends BaseResponseFormatter {
    format(data: Stream.Readable, columns?: DataColumn[]): CsvTransformer;
    toResponse(stream: Stream.Readable | Stream.Transform, ctx: KoaContext): void;
}
export {};
