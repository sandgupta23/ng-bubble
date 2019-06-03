import * as tslib_1 from "tslib";
import * as path from 'path';
import * as fs from 'fs';
import { EIdeNames } from '../enums';
import { SERVER_PORT, WEBSOCKET_PORT } from './constants';
var util = require('util');
var tcpPortUsed = require('tcp-port-used');
var writeTemplate = require('./template');
var exec = util.promisify(require('child_process').exec);
var readFile = util.promisify(require('fs').readFile);
var writeFile = util.promisify(require('fs').writeFile);
export var root = process.cwd();
export function getAngular2JsonPath() {
    return path.join(process.cwd(), 'angular-cli.json');
}
export function getAngular5JsonPath() {
    return path.join(process.cwd(), 'angular.json');
}
export function getVscodePath() {
    return path.join(process.cwd(), '.vscode');
}
export function getWebstormPath() {
    return path.join(process.cwd(), '.idea');
}
/**
 * getAngularConfig:
 * Check if repo is either angular 2+ or angular 5+
 * if either is true, return angular-cli.json/angular.json path
 * */
export function getAngularConfig() {
    var path = fs.existsSync(getAngular5JsonPath()) && getAngular5JsonPath();
    if (path)
        return { path: path, version: 5 };
    path = path || (fs.existsSync(getAngular2JsonPath()) && getAngular2JsonPath());
    if (path)
        return { path: path, version: 2 };
    else
        return null;
}
export function checkIfVscode() {
    return fs.existsSync(getVscodePath());
}
export function checkIfWebstorm() {
    return fs.existsSync(getWebstormPath());
}
export function createConfigJSonFileIfNotPresent() {
    var localConfigPath = getLocalConfigFilePath();
    var isPresent = fs.existsSync(localConfigPath);
    if (!isPresent)
        fs.writeFileSync(localConfigPath, '');
}
export function getLocalConfigFilePath() {
    return path.join(process.cwd(), '.ng-bubble-local');
}
export function getGlobalConfigFilePath() {
    return path.join(__dirname, '/../../', '.ng-bubble-global.json');
}
export function runAppOnFreePort(app, port, ctrl) {
    return new Promise(function (resolve, reject) {
        /*
      let inUse = await tcpPortUsed.check(port, '127.0.0.1');
      while (inUse) {
        inUse = await tcpPortUsed.check(++port, '127.0.0.1');
      }
      */
        writeTemplate(port, ctrl);
        app.listen(port, function (error) {
            console.log("ng-bubble is Running on port " + SERVER_PORT + " and " + WEBSOCKET_PORT);
            console.log('Please make sure to add following script into your index.html');
            logDanger("\n        <js-bubble></js-bubble>                                              \n        <script src=\"http://localhost:" + SERVER_PORT + "/assets/js/js-bubble.js\"></script>\n");
            resolve();
        }).on('error', function (error) {
            if (error) {
                logServerBusyError();
                reject();
            }
        });
    });
}
/*todo: redundant arguments*/
export function openInIde(path, currentIde, codeText, data, lineNumber) {
    if (lineNumber === void 0) { lineNumber = 0; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ideCmd;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ideCmd = currentIde === EIdeNames.WEBSTORM ? 'webstorm.exe' : "code -g";
                    console.log("Opening: Line " + lineNumber + " in " + path);
                    return [4 /*yield*/, exec(ideCmd + " " + path + ":" + (lineNumber ? lineNumber : ''))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getFileContent(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, readFile(path)];
                case 1:
                    fileContent = _a.sent();
                    return [2 /*return*/, fileContent.toString()];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, fileContent];
            }
        });
    });
}
export function setFileContent(path, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, e_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, writeFile(path, data)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, null];
            }
        });
    });
}
function getLineNumberOfTextInFile(path, codeText) {
}
export function exactMatchedFileIndex(foundItems, searchTerm) {
    // {folders: folders, files: files}
    var angularSuffix = '.component.html';
    var ionicSuffix = '.page.html';
    return foundItems.files.findIndex(function (file) { return file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix; });
}
export function areTwoSetsEqual(a, b) {
    return a.size === b.size && tslib_1.__spread(a).every(function (value) { return b.has(value); });
}
export function getAngular2Prefix(config) {
    return config.apps[0].prefix;
}
export function getHtmlOrTsFile(items) {
    items = items.filter(function (item) { return !item.path.endsWith('.spec.ts'); });
    return (items.find(function (item) { return item.path.endsWith('.html'); })
        || items.find(function (item) { return item.path.endsWith('.ts'); })
        || items[0]).path;
}
export function getAngular5Projects(config) {
    return Object.keys(config.projects);
}
export function logDanger(message) {
    console.log('\x1b[31m', message, '\x1b[0m');
}
export function logInfo(message) {
    console.log('\x1b[33m%s\x1b[0m', message, '\x1b[0m');
}
export function logServerBusyError() {
    logDanger("ERROR: ng-bubble is already running. Please make sure ports " + SERVER_PORT + " and " + WEBSOCKET_PORT + " are free.");
}
//# sourceMappingURL=utility.js.map