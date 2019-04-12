// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('./test.html')
// });
//
// let i = 0;
// let maxScore = 0;
// let maxScoreLine = 0;
//
// /*read the file line by line =>
// * remove all extra spaces
// * 1. look start tag names (MUST have, because tag names aren't dynamically generated) 1xx
// * 2. look for ids (optional) x1x
// * 3. look for presence of class names xx1
// * */
//
// // lineReader.on('line', function (line) {
// //     let regex = /class="(.*)"/g;
// //     let x = regex.exec(line)[1];
// //     
// //     ++i;
// // });
//
//
// /*read the file line by line =>
// * remove all extra spaces
// * 1. look start tag names (MUST have, because tag names aren't dynamically generated) 1xx
// * 2. look for ids (optional) x1x
// * 3. look for presence of class names xx1
// * */
//
// function lineToOpen(file, data) {
//     let lineReader = require('readline').createInterface({
//         input: require('fs').createReadStream(file)
//     });
//
//     lineReader.on('line', function (line) {
//         let score = getScore(line, data);
//         if (score > maxScore) {
//             maxScore = score;
//             maxScoreLine = i
//         }
//         ++i;
//     });
// }
//
// // let htmlLine = '<div id="mainbar" class="sandeep kumar gupta" role="main" aria-label="question and answers">';
// // let data = {
// //     id: 'mainbar',
// //     tagName:"div",
// //     classList : ["kumar", "gupta"]
// // };
// // 
//
//
// function getScore(htmlLine, htmlData) {
//     let scoreStr = tagScore(htmlLine, htmlData.tagName) + "" + idScore(htmlLine, htmlData.id) + "" + classScore(htmlLine, htmlData.classList);
//     
//     
//     
//     return Number(scoreStr);
// }
//
// function removeAdditionalSpaces(str) {
//     return str && str.replace(/\s+/g, ' ').trim();
// }
//
// function tagScore(htmlStr, tag) {
//     tag = tag.toLowerCase().trim();
//     return htmlStr.startsWith(`<${tag}`) ? 1 : 0;
// }
//
// function idScore(htmlStr, id) {
//     id = id.toLowerCase().trim();
//     return (htmlStr.includes(`id='${id}'`) || htmlStr.includes(`id="${id}"`)) ? 1 : 0;
// }
//
// function classScore(htmlStr, classList) {
//     let score = 0;
//     let regex = /class="(.*?)"/g;
//     let realClassArr = regex.exec(htmlStr)[1].split(" ");
//     classList.forEach((expectedClassName) => {
//         let classFound = realClassArr.find((realClass) => realClass === expectedClassName);
//         if (classFound) ++score;
//     });
//     return score;
// }