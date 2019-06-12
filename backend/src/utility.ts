import * as path from 'path';
import * as fs from 'fs';
import {ILineFinderData} from './line-finder';
import {EIdeNames} from '../enums';
import {SERVER_PORT, WEBSOCKET_PORT} from './constants';

const util = require('util');
const tcpPortUsed = require('tcp-port-used');
const writeTemplate = require('./template');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const writeFile = util.promisify(require('fs').writeFile);
export const root = process.cwd();

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
  let path = fs.existsSync(getAngular5JsonPath()) && getAngular5JsonPath();
  if (path) {
    return {path, version: 5};
  }
  path = path || (fs.existsSync(getAngular2JsonPath()) && getAngular2JsonPath());
  if (path) {
    return {path, version: 2};
  } else {
    return null;
  }
}

export function checkIfVscode() {
  return fs.existsSync(getVscodePath());
}

export function checkIfWebstorm() {
  return fs.existsSync(getWebstormPath());
}

export function createConfigJSonFileIfNotPresent() {
  const localConfigPath = getLocalConfigFilePath();
  const isPresent = fs.existsSync(localConfigPath);
  if (!isPresent) {
    fs.writeFileSync(localConfigPath, '');
  }
}

export function getLocalConfigFilePath() {
  return path.join(process.cwd(), '.ng-bubble-local');
}

export function getGlobalConfigFilePath() {
  return path.join(__dirname, '/../../', '.ng-bubble-global.json');
}

export function runAppOnFreePort(app: any, port: number, ctrl: boolean) {
  return new Promise((resolve, reject) => {
    /*
  let inUse = await tcpPortUsed.check(port, '127.0.0.1');
  while (inUse) {
    inUse = await tcpPortUsed.check(++port, '127.0.0.1');
  }
  */
    writeTemplate(port, ctrl);

    app.listen(port, function (error: any) {

      console.log(`ng-bubble is Running on port ${SERVER_PORT} and ${WEBSOCKET_PORT}`);
      console.log('Please make sure to add following script into your index.html');
      logInfo(`
        <js-bubble></js-bubble>
        <script src="http://localhost:${SERVER_PORT}/assets/js/js-bubble.js"></script>
`);
      resolve();
    }).on('error', function (error: any) {
      if (error) {
        logServerBusyError();
        reject();
      }
    });
  });
}

/*todo: redundant arguments*/
export async function openInIde(path: string, currentIde: EIdeNames, codeText: string, data?: ILineFinderData, lineNumber: number = 0) {
  try {
    let ideCmd = currentIde === EIdeNames.WEBSTORM ? 'webstorm.exe' : `code -g`;
    if (currentIde === EIdeNames.WEBSTORM) {
      ideCmd = 'webstorm.exe';
    } else if (currentIde === EIdeNames.VSCODE) {
      ideCmd = 'code -g';
    } else {
      ideCmd = currentIde; /*user provided cli*/
    }


    console.log(`Opening ${path}(${lineNumber}:0)`);
    await exec(`${ideCmd} ${path}:${lineNumber ? lineNumber : ''}`);
  } catch (e) {
    console.error(e);
  }
}


export async function getFileContent(path: string) {
  let fileContent;
  try {
    fileContent = await readFile(path);
    return fileContent.toString();
  } catch (e) {

  }
  return fileContent;
}

export async function setFileContent(path: string, data: string) {
  try {
    return await writeFile(path, data);
  } catch (e) {
    console.log(e);
  }
  return null;
}

function getLineNumberOfTextInFile(path: string, codeText: string) {

}

export function exactMatchedFileIndex(foundItems: any, searchTerm: string) {
  // {folders: folders, files: files}
  const angularSuffix = '.component.html';
  const ionicSuffix = '.page.html';
  return foundItems.files.findIndex((file: any) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}

export function areTwoSetsEqual(a: Set<any>, b: Set<any>) {
  return a.size === b.size && [...a].every(value => b.has(value));
}

export function getAngular2Prefix(config: any) {
  return config.apps[0].prefix;
}

export function getHtmlOrTsFile(items: { path: '' }[]) {
  items = items.filter((item) => !item.path.endsWith('.spec.ts'));
  return (items.find((item) => item.path.endsWith('.html'))
    || items.find((item) => item.path.endsWith('.ts'))
    || items[0]).path;
}

export function getAngular5Projects(config: any) {
  return Object.keys(config.projects);
}

export function logDanger(message: string) {
  console.log('\x1b[31m', message, '\x1b[0m');
}

export function logInfo(message: string) {
  console.log('\x1b[33m%s\x1b[0m', message, '\x1b[0m');
}

export function logServerBusyError() {
  logDanger(`ERROR: ng-bubble is already running. Please make sure ports ${SERVER_PORT} and ${WEBSOCKET_PORT} are free.`);
}

