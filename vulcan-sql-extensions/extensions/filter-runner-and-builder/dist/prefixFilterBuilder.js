"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixFilterBuilder = void 0;
const core_1 = require("@vulcan-sql/core");
class PrefixFilterBuilder extends core_1.FilterBuilder {
    filterName = 'prefix';
}
exports.PrefixFilterBuilder = PrefixFilterBuilder;
