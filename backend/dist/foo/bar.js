"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bar(value) {
    if (typeof value !== 'string') {
        throw new Error('The passed value is not a string!');
    }
    return value;
}
exports.bar = bar;
//# sourceMappingURL=bar.js.map