"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseFormatter = exports.toBuffer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const lodash_1 = require("lodash");
const types_1 = require("../../containers/types");
const toBuffer = (str) => {
    return Buffer.from(str, 'utf8');
};
exports.toBuffer = toBuffer;
let BaseResponseFormatter = class BaseResponseFormatter extends core_1.ExtensionBase {
    formatToResponse(ctx) {
        // keep response body the same if it is not provided by template engine, e.g. document router content ...etc.
        if (!(0, lodash_1.has)(ctx.response.body, 'data') || !(0, lodash_1.has)(ctx.response.body, 'columns')) {
            return;
        }
        // if response has data and columns.
        const { data, columns } = ctx.response.body;
        const formatted = this.format(data, columns);
        // koa destroy the stream when connection close, we need to destroy our upstream too to notice them to release the resource.
        formatted.on('close', () => {
            data.destroy();
        });
        // set formatted stream to response in context
        this.toResponse(formatted, ctx);
        return;
    }
};
BaseResponseFormatter = tslib_1.__decorate([
    (0, core_1.VulcanExtension)(types_1.TYPES.Extension_Formatter)
], BaseResponseFormatter);
exports.BaseResponseFormatter = BaseResponseFormatter;
//# sourceMappingURL=responseFormatter.js.map