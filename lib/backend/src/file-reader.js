"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function getLineCountByText(path:string, lineObj: ILineSearchTextObj){
//     let lineReader = readline.createInterface({
//         input: require('fs').createReadStream('./test.html')
//     });
//
//     let i = 0;
//
//     lineReader.on('line', function (line:string) {
//         let regex: RegExp = /class="(.*)"/g;
//         let x = (<any>regex).exec(line)[1] as string;
//         
//         ++i;
//     });
// }
function doesClassMatch(text, classList) {
    let regex = /class="(.*)"/g;
    let classStr = regex.exec(text)[1];
    classStr.split(' '); //TODO: consider multiple spaces as well
}
exports.doesClassMatch = doesClassMatch;
function doesIdMatch() {
}
exports.doesIdMatch = doesIdMatch;
//# sourceMappingURL=file-reader.js.map