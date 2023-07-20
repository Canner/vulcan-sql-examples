"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const modules_1 = require("./modules");
class Container {
    get(type) {
        var _a;
        const instance = (_a = this.inversifyContainer) === null || _a === void 0 ? void 0 : _a.get(type);
        if (!instance)
            throw new core_1.InternalError(`Cannot resolve ${type.toString()} in container`);
        return instance;
    }
    getAll(type) {
        var _a;
        const instances = (_a = this.inversifyContainer) === null || _a === void 0 ? void 0 : _a.getAll(type);
        return instances;
    }
    load(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.coreContainer = new core_1.Container();
            yield this.coreContainer.load(config);
            this.inversifyContainer = this.coreContainer.getInversifyContainer();
            this.inversifyContainer.load((0, modules_1.routeGeneratorModule)());
            yield this.inversifyContainer.loadAsync((0, modules_1.extensionModule)(config));
            yield this.inversifyContainer.loadAsync((0, modules_1.applicationModule)());
            yield this.inversifyContainer.loadAsync((0, modules_1.documentRouterModule)());
            yield this.inversifyContainer.loadAsync((0, modules_1.evaluationModule)());
        });
    }
    unload() {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.coreContainer) === null || _a === void 0 ? void 0 : _a.unload());
            yield ((_b = this.inversifyContainer) === null || _b === void 0 ? void 0 : _b.unbindAllAsync());
        });
    }
    getInversifyContainer() {
        return this.inversifyContainer;
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map