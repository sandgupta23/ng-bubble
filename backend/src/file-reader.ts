interface ILineSearchTextObj {
  className: string [],
  id: string,
  codeText: string
}

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

export function doesClassMatch(text: string, classList: string[]) {
  let regex: RegExp = /class="(.*)"/g;
  let classStr: string = (<any>regex).exec(text)[1];
  classStr.split(' ');//TODO: consider multiple spaces as well

}

export function doesIdMatch() {

}