/*read the file line by line =>
* remove all extra spaces
* 1. look start tag names (MUST have, because tag names aren't dynamically generated) 1xx
* 2. look for ids (optional) x1x
* 3. look for presence of class names xx1
* */
import * as tslib_1 from "tslib";
var i = 1; //starts with 1, not 0
var maxScore = 0;
var maxScoreLine = 0;
export function lineToOpen(file, data) {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    });
    i = 1;
    maxScoreLine = 1;
    maxScore = 0;
    var maxPossibleScore = getMaxPossibleScore(data);
    data = tslib_1.__assign({}, data, { targetTagName: data.targetTagName && data.targetTagName.toLowerCase().trim(), innerText: data.innerText && removeAdditionalSpaces(data.innerText) });
    return new Promise(function (resolve, reject) {
        lineReader.on('line', function (line) {
            if (!line) {
                ++i;
                return;
            }
            line = line.trim();
            var score = getScore(line, data);
            if (score > maxScore) {
                maxScore = score;
                maxScoreLine = i;
            }
            if (maxScore >= maxPossibleScore) {
                resolve(maxScoreLine);
                /*todo: stop reading the line here*/
                return;
            }
            ++i;
        });
        lineReader.on('close', function (line) {
            resolve(maxScoreLine);
        });
    });
}
function getMaxPossibleScore(data) {
    if (!data || !data.classList) {
        return 0;
    }
    return Number("1" + (data.id ? 1 : 0) + data.classList.length + (data.innerText ? 1 : 0));
}
function getScore(htmlLine, lineFinderData) {
    var scoreStr = (tagScore(htmlLine, lineFinderData.targetTagName)
        + getInnerTextScore(htmlLine, lineFinderData.innerText)
        + idScore(htmlLine, lineFinderData.id))
        + ""
        + classScore(htmlLine, lineFinderData.classList);
    // 
    // 
    // 
    // 
    return Number(scoreStr);
}
function getInnerTextScore(htmlLine, innerText) {
    if (!htmlLine || !innerText) {
        return 0;
    }
    return htmlLine.includes(innerText) ? 1 : 0;
}
function removeAdditionalSpaces(str) {
    return str && str.replace(/\s+/g, ' ').trim();
}
function tagScore(htmlStr, tag) {
    if (!htmlStr || !tag) {
        return 0;
    }
    tag = tag.toLowerCase().trim();
    return htmlStr.includes("<" + tag) ? 1 : 0;
}
function idScore(htmlStr, id) {
    if (!htmlStr || !id) {
        return 0;
    }
    id = id.toLowerCase().trim();
    return (htmlStr.includes("id='" + id + "'") || htmlStr.includes("id=\"" + id + "\"")) ? 1 : 0;
}
function classScore(htmlStr, classList) {
    if (!htmlStr || !classList) {
        return 0;
    }
    var score = 0;
    var regex = /class="(.*?)"/g;
    var realClassArr;
    try {
        var matchedGroup = regex.exec(htmlStr)[1];
        if (!matchedGroup)
            return score;
        realClassArr = matchedGroup.split(" ");
    }
    catch (e) {
        return score;
    }
    classList.forEach(function (expectedClassName) {
        var classFound = realClassArr.find(function (realClass) { return realClass === expectedClassName; });
        if (classFound)
            ++score;
    });
    return score;
}
var address = {
    country: {
        name: 'Japan',
        city: {
            name: 'Tokyo',
            town: {
                name: 'korushawa'
            }
        }
    },
    nearbyCountry: 'Korea'
};
//# sourceMappingURL=line-finder.js.map