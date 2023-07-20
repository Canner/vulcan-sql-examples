"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormatter = void 0;
const tslib_1 = require("tslib");
const Stream = require("stream");
const core_1 = require("@vulcan-sql/core");
const responseFormatter_1 = require("../../models/extensions/responseFormatter");
const lodash_1 = require("lodash");
const logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
class JsonStringTransformer extends Stream.Transform {
    constructor(options) {
        /**
         * make the json stream source (writable stream) is object mode to get data row directly from data readable stream.
         * make the json stream transformed destination (readable stream) is not object mode
         */
        options = options || {
            writableObjectMode: true,
            readableObjectMode: false,
        };
        if ((0, lodash_1.isUndefined)(options.readableObjectMode))
            options.readableObjectMode = false;
        if ((0, lodash_1.isUndefined)(options.writableObjectMode))
            options.writableObjectMode = true;
        super(options);
        this.first = true;
    }
    _transform(chunk, _encoding, callback) {
        if (this.first) {
            this.push((0, responseFormatter_1.toBuffer)('['));
            this.first = false;
        }
        else {
            this.push((0, responseFormatter_1.toBuffer)(','));
        }
        this.push((0, responseFormatter_1.toBuffer)(JSON.stringify(chunk)));
        callback(null);
    }
    _final(callback) {
        // if first is still true, means no data.
        if (this.first)
            this.push((0, responseFormatter_1.toBuffer)('['));
        this.push((0, responseFormatter_1.toBuffer)(']'));
        callback(null);
    }
}
let JsonFormatter = class JsonFormatter extends responseFormatter_1.BaseResponseFormatter {
    format(data) {
        const jsonStream = new JsonStringTransformer();
        // Read data stream and convert the format to json format stream.
        data
            .pipe(jsonStream)
            .on('error', (err) => {
            logger.warn(`read stream failed, detail error ${err}`);
            throw new core_1.InternalError(`read data in the stream for formatting to json failed.`);
        })
            .on('end', () => {
            logger.debug('convert to json format stream > done.');
        });
        return jsonStream;
    }
    toResponse(stream, ctx) {
        // set json stream to response in context ( data is json stream, no need to convert. )
        ctx.response.body = stream;
        ctx.response.set('Content-type', 'application/json');
    }
};
JsonFormatter = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)(),
    (0, core_1.VulcanExtensionId)('json')
], JsonFormatter);
exports.JsonFormatter = JsonFormatter;
//# sourceMappingURL=jsonFormatter.js.map