"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptAdapter = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const log_1 = require("../../src/lib/log");
class ScriptAdapter {
    execute(path, projectName) {
        try {
            shelljs_1.default.exec(`PROJECT_NAME=${projectName} bash ${path}`);
        }
        catch (err) {
            // @ts-ignore
            (0, log_1.log)("ERR", err.message);
        }
        finally {
            process.exit(0);
        }
    }
}
exports.ScriptAdapter = ScriptAdapter;
