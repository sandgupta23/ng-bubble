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
const path = require("path");
const fs = require("fs");
const enums_1 = require("../enums");
const util = require('util');
const tcpPortUsed = require('tcp-port-used');
const writeTemplate = require('./template');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const writeFile = util.promisify(require('fs').writeFile);
function getAngular2JsonPath() {
    return path.join(process.cwd(), 'angular-cli.json');
}
exports.getAngular2JsonPath = getAngular2JsonPath;
function getAngular5JsonPath() {
    return path.join(process.cwd(), 'angular.json');
}
exports.getAngular5JsonPath = getAngular5JsonPath;
function getVscodePath() {
    return path.join(process.cwd(), '.vscode');
}
exports.getVscodePath = getVscodePath;
function getWebstormPath() {
    return path.join(process.cwd(), '.idea');
}
exports.getWebstormPath = getWebstormPath;
/**
 * getAngularConfig:
 * Check if repo is either angular 2+ or angular 5+
 * if either is true, return angular-cli.json/angular.json path
 * */
function getAngularConfig() {
    let path = fs.existsSync(getAngular5JsonPath()) && getAngular5JsonPath();
    if (path)
        return { path, version: 5 };
    path = path || (fs.existsSync(getAngular2JsonPath()) && getAngular2JsonPath());
    if (path)
        return { path, version: 2 };
    else
        return null;
}
exports.getAngularConfig = getAngularConfig;
function checkIfVscode() {
    return fs.existsSync(getVscodePath());
}
exports.checkIfVscode = checkIfVscode;
function checkIfWebstorm() {
    return fs.existsSync(getWebstormPath());
}
exports.checkIfWebstorm = checkIfWebstorm;
function createConfigJSonFileIfNotPresent() {
    let localConfigPath = getLocalConfigFilePath();
    let isPresent = fs.existsSync(localConfigPath);
    if (!isPresent)
        fs.writeFileSync(localConfigPath, "");
}
exports.createConfigJSonFileIfNotPresent = createConfigJSonFileIfNotPresent;
function getLocalConfigFilePath() {
    //
    return path.join(process.cwd(), '.ng-bubble-local');
}
exports.getLocalConfigFilePath = getLocalConfigFilePath;
function getGlobalConfigFilePath() {
    return path.join(__dirname, "/../../", '.ng-bubble-global.json');
}
exports.getGlobalConfigFilePath = getGlobalConfigFilePath;
function runAppOnFreePort(app, port, ctrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // let inUse = await tcpPortUsed.check(port, '127.0.0.1');
        // while (inUse) {
        //
        // inUse = await tcpPortUsed.check(++port, '127.0.0.1');
        // }
        writeTemplate(port, ctrl);
        app.listen(port, function () {
            console.log('ng-bubble is Running on port ' + port);
            console.log("Please make sure to add following script into your index.html");
            console.log(`
        <js-bubble></js-bubble>
        <script src="http://localhost:11637/assets/js/js-bubble.js"></script>    `);
        });
    });
}
exports.runAppOnFreePort = runAppOnFreePort;
/*todo: redundant arguments*/
function openInIde(path, currentIde, codeText, data, lineNumber = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (data) lineNumber = await lineToOpen(path, data);
        let ideCmd = currentIde === enums_1.EIdeNames.WEBSTORM ? 'webstorm.exe' : `code -g`;
        yield exec(`${ideCmd} ${path}:${lineNumber ? lineNumber : ""}`);
    });
}
exports.openInIde = openInIde;
function getFileContent(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent;
        try {
            fileContent = yield readFile(path);
            return fileContent.toString();
        }
        catch (e) {
        }
        return fileContent;
    });
}
exports.getFileContent = getFileContent;
function setFileContent(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent;
        try {
            return yield writeFile(path, data);
        }
        catch (e) {
        }
        return null;
    });
}
exports.setFileContent = setFileContent;
function getLineNumberOfTextInFile(path, codeText) {
}
function exactMatchedFileIndex(foundItems, searchTerm) {
    // {folders: folders, files: files}
    let angularSuffix = '.component.html';
    let ionicSuffix = '.page.html';
    return foundItems.files.findIndex((file) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}
exports.exactMatchedFileIndex = exactMatchedFileIndex;
function areTwoSetsEqual(a, b) {
    return a.size === b.size && [...a].every(value => b.has(value));
}
exports.areTwoSetsEqual = areTwoSetsEqual;
function getAngular2Prefix(config) {
    return config.apps[0].prefix;
}
exports.getAngular2Prefix = getAngular2Prefix;
function getAngular5Projects(config) {
    return Object.keys(config.projects);
}
exports.getAngular5Projects = getAngular5Projects;
//# sourceMappingURL=utility.js.map