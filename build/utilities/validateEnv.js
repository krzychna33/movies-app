"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
var envalid_1 = require("envalid");
exports.validateEnv = function () {
    envalid_1.cleanEnv(process.env, {
        PORT: envalid_1.port(),
    });
};
