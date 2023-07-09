"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskTagRunner = void 0;
const core_1 = require("@vulcan-sql/core");
const nunjucks = __importStar(require("nunjucks"));
class MaskTagRunner extends core_1.TagRunner {
    tags = ['mask', 'endmask'];
    async run({ args, contentArgs }) {
        // Get the arguments
        let { len = 3, padding = 5 } = args[0]; // TODO: Fix the argument type
        // Render sqls
        const sql = (await Promise.all(contentArgs.map((content) => content()))).join('\n');
        let paddingString = '';
        while (padding--)
            paddingString += 'x';
        // Use SafeString to avoid auto escaping
        return new nunjucks.runtime.SafeString(`CONCAT(SUBSTR(${sql}, 0, ${len + 1}), '${paddingString}')`);
    }
}
exports.MaskTagRunner = MaskTagRunner;
