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
export function doesClassMatch(text, classList) {
    var regex = /class="(.*)"/g;
    var classStr = regex.exec(text)[1];
    classStr.split(' '); //TODO: consider multiple spaces as well
}
export function doesIdMatch() {
}
//# sourceMappingURL=file-reader.js.map