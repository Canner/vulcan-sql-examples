import * as Stream from 'stream';
export declare const arrayToStream: (data: Array<any>) => Stream;
export declare const streamToString: (stream: Stream) => Promise<unknown>;
