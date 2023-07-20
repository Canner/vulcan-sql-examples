/// <reference types="node" />
import { DataColumn, ExtensionBase } from '@vulcan-sql/core';
import * as Stream from 'stream';
import { KoaContext } from '../index';
export declare type BodyResponse = {
    data: Stream.Readable;
    columns: DataColumn[];
    [key: string]: any;
};
export declare const toBuffer: (str: string) => Buffer;
export interface IFormatter {
    format(data: Stream.Readable, columns?: DataColumn[]): Stream.Readable | Stream.Transform;
    toResponse(stream: Stream.Readable | Stream.Transform, ctx: KoaContext): void;
    formatToResponse(ctx: KoaContext): void;
}
export declare abstract class BaseResponseFormatter extends ExtensionBase implements IFormatter {
    formatToResponse(ctx: KoaContext): void;
    /**
     * Define how to format original data stream with option columns to formatted stream.
     * @param data data stream
     * @param columns data columns
     */
    abstract format(data: Stream.Readable, columns?: DataColumn[]): Stream.Readable | Stream.Transform;
    /**
     * Define how to set the formatted stream to context in response
     * @param stream formatted stream
     * @param ctx koa context
     */
    abstract toResponse(stream: Stream.Readable | Stream.Transform, ctx: KoaContext): void;
}
