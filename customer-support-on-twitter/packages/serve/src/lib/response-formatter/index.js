"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInFormatters = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./csvFormatter"), exports);
tslib_1.__exportStar(require("./jsonFormatter"), exports);
const csvFormatter_1 = require("./csvFormatter");
const jsonFormatter_1 = require("./jsonFormatter");
exports.BuiltInFormatters = [csvFormatter_1.CsvFormatter, jsonFormatter_1.JsonFormatter];
//# sourceMappingURL=index.js.map