import * as path from 'path';
import * as fs from 'fs';
import {ILineFinderData, lineToOpen} from "./line-finder";
import {EIdeNames} from "../enums";

const util = require('util');
const tcpPortUsed = require('tcp-port-used');
const writeTemplate = require('./template');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const writeFile = util.promisify(require('fs').writeFile);

export function getAngular2JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular-cli.json');
}

export function getAngular5JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular.json');
}

export function createConfigJSonFileIfNotPresent() {
    let localConfigPath = getLocalConfigFilePath();
    let isPresent = fs.existsSync(localConfigPath);
    if (!isPresent) fs.writeFileSync(localConfigPath, "");
}

export function getLocalConfigFilePath() {
    // console.log("local config path :", path.join(process.cwd(), 'ng-bubble-local.json') );
    return path.join(process.cwd(), 'ng-bubble-local.json');
}

export function getGlobalConfigFilePath() {
    return path.join(__dirname, "/../../", 'ng-bubble-global.json');
}

export async function runAppOnFreePort(app: any, port: number, ctrl: boolean) {

    let inUse = await tcpPortUsed.check(port, '127.0.0.1');
    while (inUse) {
        //console.log(`Port ${port} is in use, trying ${port + 1}`);
        inUse = await tcpPortUsed.check(++port, '127.0.0.1');
    }
    writeTemplate(port, ctrl);
    app.listen(port, function () {
        console.log('ng-bubble is Running on port ' + port);
        console.log("Please make sure to add following script into your index.html");
        console.log(`
        <script async src="http://localhost:${port}/assets/js/client.js"></script>
    `)
    });
}

/*todo: redundant arguments*/
export async function openInIde(path: string, currentIde: EIdeNames, codeText: string, data?: ILineFinderData, lineNumber:number=0) {
    // if (data) lineNumber = await lineToOpen(path, data);
    let ideCmd = currentIde === EIdeNames.WEBSTORM ? 'webstorm.exe' : `code -g`;
    await exec(`${ideCmd} ${path}:${lineNumber?lineNumber:""}`);
}


export async function getFileContent(path:string) {
    let fileContent;
    try {
        fileContent = await readFile(path);
        return fileContent.toString();
    }catch (e) {
        console.log(e);
    }
    return fileContent;
}
export async function setFileContent(path:string, data:string) {
    let fileContent;
    try {
        return await writeFile(path, data);
    }catch (e) {
        console.log(e);
    }
    return null;
}

function getLineNumberOfTextInFile(path: string, codeText: string) {

}

export function exactMatchedFileIndex(foundItems: any, searchTerm: string) {
    // {folders: folders, files: files}
    let angularSuffix = '.component.html';
    let ionicSuffix = '.page.html';
    return foundItems.files.findIndex((file: any) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}

export function areTwoSetsEqual(a: Set<any>, b: Set<any>) {
    return a.size === b.size && [...a].every(value => b.has(value));
}


