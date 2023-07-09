"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixFilterRunner = void 0;
const core_1 = require("@vulcan-sql/core");
class PrefixFilterRunner extends core_1.FilterRunner {
    filterName = 'prefix';
    async transform(options) {
        return `${options.args?.pre || 'vulcan'}-${options.value}`;
    }
}
exports.PrefixFilterRunner = PrefixFilterRunner;
