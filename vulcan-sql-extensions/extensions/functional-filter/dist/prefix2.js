"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask2Tag = void 0;
const core_1 = require("@vulcan-sql/core");
const Prefix2FunctionFilter = async ({ args, value }) => {
    return `${args.pre || 'vulcan'}-${value}`;
};
exports.Mask2Tag = (0, core_1.createFilterExtension)('prefix2', Prefix2FunctionFilter);
