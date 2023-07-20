/// <reference types="node" />
import * as Stream from 'stream';
import { BaseResponseFormatter } from '../../models/extensions/responseFormatter';
import { KoaContext } from '../../models/index';
declare class JsonStringTransformer extends Stream.Transform {
    private first;
    constructor(options?: Stream.TransformOptions);
    _transform(chunk: any, _encoding: BufferEncoding, callback: Stream.TransformCallback): void;
    _final(callback: (error?: Error | null) => void): void;
}
export declare class JsonFormatter extends BaseResponseFormatter {
    format(data: Stream.Readable): JsonStringTransformer;
    toResponse(stream: Stream.Readable | Stream.Transform, ctx: KoaContext): void;
}
export {};
