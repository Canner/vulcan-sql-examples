"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationModule = void 0;
const tslib_1 = require("tslib");
const evaluator_1 = require("../../lib/evaluator/index");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const evaluationModule = () => new inversify_1.AsyncContainerModule((bind) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    bind(types_1.TYPES.Evaluator).to(evaluator_1.Evaluator).inSingletonScope();
}));
exports.evaluationModule = evaluationModule;
//# sourceMappingURL=evaluation.js.map