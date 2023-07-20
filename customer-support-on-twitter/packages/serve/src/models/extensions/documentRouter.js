"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRouter = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const types_1 = require("../../containers/types");
const core_2 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
let DocumentRouter = class DocumentRouter extends core_1.ExtensionBase {
    constructor(config, moduleName, artifactBuilder) {
        super(config, moduleName);
        this.artifactBuilder = artifactBuilder;
    }
    getSpec(type = core_1.DocumentSpec.oas3) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.artifactBuilder.getArtifact(core_1.BuiltInArtifactKeys.Specs)[type];
        });
    }
};
DocumentRouter = tslib_1.__decorate([
    (0, core_1.VulcanExtension)(types_1.TYPES.Extension_DocumentRouter, { enforcedId: true }),
    tslib_1.__param(0, (0, inversify_1.inject)(core_2.TYPES.ExtensionConfig)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_2.TYPES.ExtensionName)),
    tslib_1.__param(2, (0, inversify_1.inject)(core_2.TYPES.ArtifactBuilder)),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object])
], DocumentRouter);
exports.DocumentRouter = DocumentRouter;
//# sourceMappingURL=documentRouter.js.map