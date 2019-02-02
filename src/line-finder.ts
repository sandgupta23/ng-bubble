/*read the file line by line =>
* remove all extra spaces
* 1. look start tag names (MUST have, because tag names aren't dynamically generated) 1xx
* 2. look for ids (optional) x1x
* 3. look for presence of class names xx1
* */

let i = 1;//starts with 1, not 0
let maxScore = 0;
let maxScoreLine = 0;

export interface ILineFinderData {
    id: string,
    tagName: string,
    classList: string[],
    innerText: string
}

export function lineToOpen(file: string, data: ILineFinderData) {
    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    });
    i = 1;
    maxScoreLine = 1;
    maxScore = 0;
    let maxPossibleScore = getMaxPossibleScore(data);

    data = {
        ...data,
        tagName: data.tagName && data.tagName.toLowerCase().trim(),
        innerText: data.innerText && removeAdditionalSpaces(data.innerText),
    };

    return new Promise((resolve, reject) => {
        lineReader.on('line', function (line: string) {
            if (!line) {
                ++i;
                return;
            }
            line = line.trim();
            let score = getScore(line, data);
            if (score > maxScore) {
                maxScore = score;
                maxScoreLine = i
            }

            if (maxScore >= maxPossibleScore) {
                resolve(maxScoreLine);
                /*todo: stop reading the line here*/
                return;
            }
            ++i;
        });
        lineReader.on('close', function (line: string) {
            resolve(maxScoreLine);
        });
    });
}

function getMaxPossibleScore(data: ILineFinderData) {
    return Number("1" + (data.id ? 1 : 0) + data.classList.length + (data.innerText ? 1 : 0));
}

function getScore(htmlLine: string, lineFinderData: ILineFinderData) {
    let scoreStr = tagScore(htmlLine, lineFinderData.tagName)
        + ""
        + idScore(htmlLine, lineFinderData.id)
        + ""
        + classScore(htmlLine, lineFinderData.classList)
        + ""
        + getInnerTextScore(htmlLine, lineFinderData.innerText);
    console.log(tagScore(htmlLine, lineFinderData.tagName));
    console.log(idScore(htmlLine, lineFinderData.id));
    console.log(classScore(htmlLine, lineFinderData.classList));
    console.log(getInnerTextScore(htmlLine, lineFinderData.innerText));
    return Number(scoreStr);
}


function getInnerTextScore(htmlLine: string, innerText: string) {
    return htmlLine.includes(innerText) ? 1 : 0;
}

function removeAdditionalSpaces(str: string) {
    return str && str.replace(/\s+/g, ' ').trim();
}

function tagScore(htmlStr: string, tag: string) {
    tag = tag.toLowerCase().trim();
    return htmlStr.includes(`<${tag}`) ? 1 : 0;
}

function idScore(htmlStr: string, id: string) {
    id = id.toLowerCase().trim();
    return (htmlStr.includes(`id='${id}'`) || htmlStr.includes(`id="${id}"`)) ? 1 : 0;
}

function classScore(htmlStr: string, classList: string[]) {
    let score = 0;
    let regex = /class="(.*?)"/g;
    let realClassArr: any;
    try {
        let matchedGroup = (<any>regex).exec(htmlStr)[1];
        if(!matchedGroup) return score;
        realClassArr = matchedGroup.split(" ");
    } catch (e) {
        console.log(e);
        return score;
    }
    classList.forEach((expectedClassName) => {
        let classFound = realClassArr.find((realClass: string) => realClass === expectedClassName);
        if (classFound) ++score;
    });
    return score;
}