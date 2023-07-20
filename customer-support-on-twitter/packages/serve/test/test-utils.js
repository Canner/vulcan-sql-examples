"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToString = exports.arrayToStream = void 0;
const Stream = require("stream");
/* istanbul ignore file */
const arrayToStream = (data) => {
    return new Stream.Readable({
        objectMode: true,
        read() {
            // make the data push by array order.
            this.push(data.shift() || null);
        },
    });
};
exports.arrayToStream = arrayToStream;
const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
};
exports.streamToString = streamToString;
//# sourceMappingURL=test-utils.js.map