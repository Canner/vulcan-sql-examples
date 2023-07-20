"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@vulcan-sql/core");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
const constraints_1 = require("./constraints");
// Single allow condition are combined with AND logic
// Only the user who has name admin and has group attribute with value admin can access this profile.
// - name: 'pg-admin'
//  driver: 'pg'
//  connection: xx
//  allow:
//    - name: admin
//      attributes:
//        name: group
//        value: admin
//
// Multiple allow conditions are combined with OR logic.
// admin, someoneelse, and those who have group attribute with value admin can access this profile.
// - name: 'pg-admin'
//   driver: 'pg'
//   connection: xx
//   allow:
//    - name: admin
//    - name: someoneelse
//    - attributes:
//        name: group
//        value: admin
const logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
let Evaluator = class Evaluator {
    constructor(profiles = []) {
        this.profiles = new Map();
        for (const profile of profiles) {
            if (!profile.allow) {
                logger.warn(`Profile ${profile.name} doesn't have allow property, which means nobody can use it`);
                continue;
            }
            logger.debug(`profile: ${profile.name}, allow: ${profile.allow}`);
            this.profiles.set(profile.name, this.getConstraints(profile.allow));
        }
    }
    evaluateProfile(user, candidates) {
        for (const candidate of candidates) {
            const orConstraints = this.profiles.get(candidate);
            if (!orConstraints)
                throw new core_1.InternalError(`Profile candidate ${candidate} doesn't have any rule.`);
            const isQualified = this.evaluateOrConstraints(user, orConstraints);
            if (isQualified)
                return candidate;
        }
        return null;
    }
    evaluateOrConstraints(user, orConstraints) {
        for (const constraints of orConstraints) {
            if (this.evaluateAndConstraints(user, constraints))
                return true;
        }
        return false;
    }
    evaluateAndConstraints(user, andConstraints) {
        for (const constraint of andConstraints) {
            if (!constraint.evaluate(user || { name: '', attr: {} }))
                return false;
        }
        return true;
    }
    getConstraints(allow) {
        const orConstraints = [];
        const rules = [];
        // allow: admin or allow: *
        if (typeof allow === 'string')
            rules.push({ name: allow });
        // allow:
        //   name: admin
        else if (!(0, lodash_1.isArray)(allow))
            rules.push(allow);
        else {
            allow.forEach((rule) => {
                // allow:
                //   - *
                if (typeof rule === 'string')
                    rules.push({ name: rule });
                // allow:
                //   - name: admin
                else
                    rules.push(rule);
            });
        }
        for (const rule of rules) {
            const andConstraints = [];
            if (rule['name'])
                andConstraints.push(new constraints_1.UserNameConstrain(rule['name']));
            if (rule['attributes'])
                andConstraints.push(new constraints_1.UserAttributesConstrain(rule['attributes']));
            orConstraints.push(andConstraints);
        }
        return orConstraints;
    }
};
Evaluator = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.multiInject)(core_1.TYPES.Profile)),
    tslib_1.__param(0, (0, inversify_1.optional)()),
    tslib_1.__metadata("design:paramtypes", [Array])
], Evaluator);
exports.Evaluator = Evaluator;
//# sourceMappingURL=evaluator.js.map