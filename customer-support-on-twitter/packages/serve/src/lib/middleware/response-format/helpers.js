"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsableFormat = void 0;
const core_1 = require("@vulcan-sql/core");
/**
 *
 * @param context koa context
 * @param formatters the formatters which built-in and loaded extensions.
 * @returns the format name used to format response
 */
const checkUsableFormat = ({ context, supportedFormats, defaultFormat, }) => {
    // find last matched value be format
    const pathFormat = context.path.split('.')[1];
    // match result for searching in Accept header.
    const acceptFormat = context.accepts(supportedFormats);
    // if path ending has no format
    if (!pathFormat) {
        // Use the default format when "supportedFormats" is [].
        if (supportedFormats.length === 0)
            return defaultFormat;
        // get default when "Accept" header also not matched or "Accept" header not in request (shows by */*)
        if (!acceptFormat || acceptFormat == '*/*')
            return defaultFormat;
        // if accept format existed, use "Accept" first matched format by support format order
        return acceptFormat;
    }
    // if path ending has format but not matched
    if (!supportedFormats.includes(pathFormat)) {
        // Throw error if user request with url ending format, but not matched.
        throw new core_1.UserError(`Url ending format not matched in "formats" options`, {
            httpCode: 415,
        });
    }
    // if path ending has format and matched, no matter Accept matched or not, use path ending format
    return pathFormat;
};
exports.checkUsableFormat = checkUsableFormat;
//# sourceMappingURL=helpers.js.map