"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFormatter = exports.arrStringToCsvString = void 0;
const tslib_1 = require("tslib");
const Stream = require("stream");
const core_1 = require("@vulcan-sql/core");
const lodash_1 = require("lodash");
const responseFormatter_1 = require("../../models/extensions/responseFormatter");
const logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
/**
 * convert the array string to one line string for csv format
 * @param arrString
 */
const arrStringToCsvString = (arrString) => {
    return arrString.replace(/^\[/, '').replace(/\\"/g, '""').replace(/\]$/, '');
};
exports.arrStringToCsvString = arrStringToCsvString;
class CsvTransformer extends Stream.Transform {
    constructor({ columns, options, }) {
        /**
         * make the csv stream source (writable stream) is object mode to get data row directly from data readable stream.
         * make the csv stream transformed destination (readable stream) is not object mode
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
        this.PREPEND_UTF8_BOM = '\ufeff';
        this.columns = columns;
        /**
         * add columns name by comma through join for csv title.
         * in order to avoid the non-alphabet characters transform wrong, add PREPEND_UTF8_BOM prefix
         */
        this.push((0, responseFormatter_1.toBuffer)(this.PREPEND_UTF8_BOM));
        this.push((0, responseFormatter_1.toBuffer)(columns.join()));
        this.push((0, responseFormatter_1.toBuffer)('\n'));
    }
    _transform(chunk, _encoding, callback) {
        // chuck => { name: 'jack', age: 18, hobby:['book', 'travel'] }
        // pick value and join it by semicolon, e.g: "\"jack\",18,\"['book', 'travel']\""
        const valuesRow = this.columns.map((column) => 
        // if value is array or object, stringify to fix in one column, e.g: ['book', 'travel'] => "['book', 'travel']"
        (0, lodash_1.isObject)(chunk[column]) || (0, lodash_1.isArray)(chunk[column])
            ? JSON.stringify(chunk[column])
            : chunk[column]);
        // transform format data to buffer
        const dataBuffer = (0, responseFormatter_1.toBuffer)((0, exports.arrStringToCsvString)(JSON.stringify(valuesRow)));
        // run callback and pass the transformed data buffer to transform.push()
        this.push(dataBuffer);
        this.push((0, responseFormatter_1.toBuffer)('\n'));
        callback(null);
    }
}
let CsvFormatter = class CsvFormatter extends responseFormatter_1.BaseResponseFormatter {
    format(data, columns) {
        if (!columns)
            throw new core_1.InternalError('must provide columns');
        // create csv transform stream and define transform to csv way.
        const csvStream = new CsvTransformer({
            columns: columns.map((column) => column.name),
        });
        // start to transform data to csv stream
        data
            .pipe(csvStream)
            .on('error', (err) => {
            logger.warn(`read stream failed, detail error ${err}`);
            throw new core_1.InternalError(`read data in the stream for formatting to csv failed.`);
        })
            .on('end', () => {
            logger.debug('convert to csv format stream > done.');
        });
        return csvStream;
    }
    toResponse(stream, ctx) {
        // get file name by url path. e.g: url = '/urls/orders', result = orders
        const size = ctx.url.split('/').length;
        const filename = ctx.url.split('/')[size - 1];
        // set csv stream to response and header to note the stream will download
        ctx.response.body = stream;
        ctx.response.set('Content-disposition', `attachment; filename=${filename}.csv`);
        ctx.response.set('Content-type', 'text/csv');
    }
};
CsvFormatter = tslib_1.__decorate([
    (0, core_1.VulcanInternalExtension)(),
    (0, core_1.VulcanExtensionId)('csv')
], CsvFormatter);
exports.CsvFormatter = CsvFormatter;
//# sourceMappingURL=csvFormatter.js.map