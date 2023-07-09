"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask2Tag = void 0;
const core_1 = require("@vulcan-sql/core");
const Mask2FunctionalTag = async ({ args, sql }) => {
    let { len = 3, padding = 5 } = args;
    let paddingString = '';
    while (padding--)
        paddingString += 'x';
    return `CONCAT(SUBSTR(${sql}, 0, ${len + 1}), '${paddingString}')`;
};
exports.Mask2Tag = (0, core_1.createTagExtension)('mask2', Mask2FunctionalTag);
