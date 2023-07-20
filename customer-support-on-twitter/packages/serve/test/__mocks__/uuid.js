"use strict";
// stub uuid v4 in test.
Object.defineProperty(exports, "__esModule", { value: true });
exports.v4 = void 0;
const faker_1 = require("@faker-js/faker");
// create fake uuid value and make it fixed.
const uuid = faker_1.default.datatype.uuid();
const v4 = () => uuid;
exports.v4 = v4;
//# sourceMappingURL=uuid.js.map