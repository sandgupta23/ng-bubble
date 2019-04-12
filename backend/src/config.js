"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
;
const utility_1 = require("./utility");
/**
 * detectAngular
 * Checks if a project is angular or not by finding angular.json or angular-cli.json at its root
 * */
function detectAngular() {
    return __awaiter(this, void 0, void 0, function* () {
        let angular2 = utility_1.getAngular2JsonPath();
        let angular5 = utility_1.getAngular5JsonPath();
        return fs.existsSync(angular2) || fs.existsSync(angular5);
    });
}
exports.detectAngular = detectAngular;
function getLocalConfig() {
    let localConfigFilePath = utility_1.getLocalConfigFilePath();
    let data = fs.readFileSync(localConfigFilePath).toString('utf8');
    if (data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
            
        }
    }
    return {};
}
exports.getLocalConfig = getLocalConfig;
function updateLocalConfig(newLocalConfigData) {
    return __awaiter(this, void 0, void 0, function* () {
        let oldLocalConfigData = yield getLocalConfig();
        let newData = Object.assign({}, oldLocalConfigData, newLocalConfigData);
        let localConfigPath = utility_1.getLocalConfigFilePath();
        
        return yield writeFileAsync(localConfigPath, JSON.stringify(newData));
    });
}
exports.updateLocalConfig = updateLocalConfig;
function getGlobalConfig() {
    let globalConfigFilePath = utility_1.getGlobalConfigFilePath();
    let data = fs.readFileSync(globalConfigFilePath).toString('utf8');
    if (data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
            
        }
    }
    return {};
}
exports.getGlobalConfig = getGlobalConfig;
function updateGlobalConfig(newGlobalConfigData) {
    return __awaiter(this, void 0, void 0, function* () {
        let oldGlobalConfigData = yield getGlobalConfig();
        let newData = Object.assign({}, oldGlobalConfigData, newGlobalConfigData);
        let localConfigPath = utility_1.getGlobalConfigFilePath();
        return yield writeFileAsync(localConfigPath, JSON.stringify(newData));
    });
}
exports.updateGlobalConfig = updateGlobalConfig;
//# sourceMappingURL=config.js.map