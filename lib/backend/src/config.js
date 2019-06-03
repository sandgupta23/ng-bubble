import * as tslib_1 from "tslib";
import * as fs from 'fs';
import * as util from 'util';
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);
;
import { getAngular2JsonPath, getAngular5JsonPath, getGlobalConfigFilePath, getLocalConfigFilePath } from "./utility";
/**
 * detectAngular
 * Checks if a project is angular or not by finding angular.json or angular-cli.json at its root
 * */
export function detectAngular() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var angular2, angular5;
        return tslib_1.__generator(this, function (_a) {
            angular2 = getAngular2JsonPath();
            angular5 = getAngular5JsonPath();
            return [2 /*return*/, fs.existsSync(angular2) || fs.existsSync(angular5)];
        });
    });
}
export function getLocalConfig() {
    var localConfigFilePath = getLocalConfigFilePath();
    var data = fs.readFileSync(localConfigFilePath).toString('utf8');
    if (data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
        }
    }
    return {};
}
export function updateLocalConfig(newLocalConfigData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var oldLocalConfigData, newData, localConfigPath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLocalConfig()];
                case 1:
                    oldLocalConfigData = _a.sent();
                    newData = tslib_1.__assign({}, oldLocalConfigData, newLocalConfigData);
                    localConfigPath = getLocalConfigFilePath();
                    return [4 /*yield*/, writeFileAsync(localConfigPath, JSON.stringify(newData))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function getGlobalConfig() {
    var globalConfigFilePath = getGlobalConfigFilePath();
    var data = fs.readFileSync(globalConfigFilePath).toString('utf8');
    if (data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
        }
    }
    return {};
}
export function updateGlobalConfig(newGlobalConfigData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var oldGlobalConfigData, newData, localConfigPath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGlobalConfig()];
                case 1:
                    oldGlobalConfigData = _a.sent();
                    newData = tslib_1.__assign({}, oldGlobalConfigData, newGlobalConfigData);
                    localConfigPath = getGlobalConfigFilePath();
                    return [4 /*yield*/, writeFileAsync(localConfigPath, JSON.stringify(newData))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=config.js.map