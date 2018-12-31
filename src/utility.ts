import * as path from 'path';
const util = require('util');
const tcpPortUsed = require('tcp-port-used');
const writeTemplate = require('./template');
const exec = util.promisify(require('child_process').exec);

export function getAngular2JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular-cli.json');
}

export function getAngular5JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular.json');
}

export function getLocalConfigFilePath() {
    return path.join(process.cwd(), 'ng-bubble-local.json');
}

export function getGlobalConfigFilePath() {
    return path.join(__dirname, "/../../", 'ng-bubble-global.json');
}

export async function runAppOnFreePort(app:any, port:number, ctrl:boolean) {

    let inUse = await tcpPortUsed.check(port, '127.0.0.1');
    while (inUse) {
        console.log(`Port ${port} is in use, trying ${port + 1}`);
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


export async function openInIde(path:string, currentIde: string) {
    let ideCmd = currentIde === 'ws' || currentIde === 'webstorm' ? 'webstorm.exe' : 'code -r';
    await exec(`${ideCmd} ${path}`);
}

export function exactMatchedFileIndex(foundItems:any, searchTerm:string) {
    // {folders: folders, files: files}
    let angularSuffix = '.component.html';
    let ionicSuffix = '.page.html';
    return foundItems.files.findIndex((file:any) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}


