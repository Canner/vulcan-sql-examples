"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskTagBuilder = void 0;
const core_1 = require("@vulcan-sql/core");
class MaskTagBuilder extends core_1.TagBuilder {
    // Claim the tag name, tell us when should we give you the control.
    tags = ['mask', 'endmask'];
    // When the target tags are found, we call parse() function, you need to return an AST node
    parse(parser) {
        // SELECT {% mask len=3 %} id {% endmask %} FROM users;
        // Tokens: mask
        // consume mask tag
        parser.nextToken();
        // Tokens: len=3
        // parseSignature is a helper function to parse the arguments of tag
        // e.g. len=3 -> {len: 3}
        const argsNodeToPass = parser.parseSignature(true, true);
        // Tokens: %}
        // consume end tag token
        parser.nextToken();
        // Tokens: id {%
        // parseUntilBlocks is a helper function to parse tokens between current position to the targe blocks
        const requestQuery = parser.parseUntilBlocks('endmask');
        // Tokens: endmask %}
        // advanceAfterBlockEnd is a helper function to advance after the end block %}
        parser.advanceAfterBlockEnd();
        return this.createAsyncExtensionNode(argsNodeToPass, [requestQuery]);
    }
}
exports.MaskTagBuilder = MaskTagBuilder;
