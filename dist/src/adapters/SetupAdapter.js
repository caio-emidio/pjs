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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupAdapter = void 0;
const YAML = __importStar(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
class SetupAdapter {
    create(setup) {
        const parsedStepsToCommand = setup.steps.map(step => {
            return `# ${step.description.toUpperCase()}
    ${step.command}`;
        });
        const script = `# THIS IS A AUTO-GENERATED FILE BY PJS
  # DO NOT EDIT THIS FILE DIRECTLY

  ${parsedStepsToCommand.join("\n")}`;
        fs_1.default.writeFileSync(path_1.default.join(os_1.default.homedir(), ".config", "pjs", "setups", `${setup.alias}.sh`), script);
        return;
    }
    list(filterByType) {
        const rawFile = fs_1.default.readFileSync(path_1.default.join(os_1.default.homedir(), ".config", "pjs", "setups.yaml"), "utf8");
        const setups = YAML.parse(rawFile);
        switch (!!filterByType) {
            case true:
                return setups.filter(setup => setup.type === filterByType);
            case false:
                return setups;
        }
    }
}
exports.SetupAdapter = SetupAdapter;