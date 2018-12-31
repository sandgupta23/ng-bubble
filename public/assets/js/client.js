var $body = document.getElementsByTagName('body')[0];
$body.innerHTML += "\n<!--<img id=\"init-img\" class=\"radiate-out-on-hover\" style=\"\"-->\n     <!--src=\"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png\" alt=\"\">-->\n<div id=\"init-img\" class=\"radiate-out-on-hover\">\n    <img style=\"width: 100%; height: 100%\"\n     src=\"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png\" alt=\"\">\n</div>\n\n<div id=\"ng-bubble-container\" class=\"display-none\" style=\"background-color: rgba(233,84,32,0.29)\">\n    <main class=\"ng-bubble-autocomplete\">\n        <div style=\"position: relative;\">\n            <input id=\"ng-bubble-search\" type=\"text\"\n                   autofocus\n                   style=\"height: 44px; width: 100%;\n                   border-top-left-radius: 8px;\n                   border-top-right-radius: 8px;\n                   outline: none;\n           border: 1px solid #a3421c;\n           font-size: 30px;\n           color: white;\n            padding-left: 10px; background-color: rgba(233,84,32,0.64)!important\">\n            <img style=\"position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%;\"\n                 src=\"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png\" alt=\"\">\n            <div id=\"row-wrapper\" style=\"position: absolute; top: 100%; left: 0; right: 0\">\n                <div style=\"padding: 7px; border: 1px solid #e95420;\">\n                    <strong style=\"font-size: 13px; color:  #e95420\">Search files and folders</strong>\n                </div>\n            </div>\n        </div>\n\n    </main>\n\n</div>\n";
console.log("hello");
;
var startWithAppRegex = new RegExp('^app-', 'i');
var BACKEND_ROOT = 'http://localhost:11637';
var BG_HIGHLIGHTED_CLASS = 'bg-highlighted';
document.addEventListener('dblclick', function ($event) {
    var element = $event.target;
    while (!startWithAppRegex.test(element.tagName)) {
        element = element.parentElement;
    }
    sendNgTag(element.tagName, false);
});
;
function makeGetReq(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", BACKEND_ROOT + "/" + url, true);
    xhttp.send();
    return new Promise(function (resolve, reject) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("success");
                console.log(xhttp.responseText);
                try {
                    resolve(JSON.parse(xhttp.responseText));
                }
                catch (e) {
                    reject("something went wrong");
                }
            }
        };
    });
}
function sendNgTag(tag, exact) {
    var url = "open?file=" + tag + "&exact=" + exact;
    makeGetReq(url)
        .then(function () {
        console.log("success");
    });
}
function sendFilePath(path, editor) {
    var url = "open?path=" + path + "&editor=" + editor;
    makeGetReq(url)
        .then(function () {
        console.log("success");
    });
}
function getFileNames(searchTerm) {
    new Promise(function (resolve, reject) {
    });
}
var $search = document.getElementById('ng-bubble-search');
var $rowWrapper = document.getElementById('row-wrapper');
var resultRows = document.getElementsByClassName('row-wrapper-item');
$search.addEventListener("input", function ($event) {
    var searchTerm = $search.value;
    var url = "search?file=" + searchTerm;
    makeGetReq(url)
        .then(function (val) {
        var files = val.files;
        var newRowsStr = "";
        files.forEach(function (file) {
            newRowsStr +=
                "<div class=\"row-wrapper-item\" style=\"display: flex; align-content: center\" title=" + file.path + " data-path=" + file.path + ">\n                        <span>" + file.name + "</span>\n                        <img class=\"editor-logo\" data-editor=\"webstorm\" title=\"Open in Webstorm\" style=\"width: 15px; height: 15px; margin-right: 5px; margin-left: auto\" src=\"http://resources.jetbrains.com/storage/products/webstorm/img/meta/webstorm_logo_300x300.png\" alt=\"\">\n                        <img class=\"editor-logo\" data-editor=\"vscode\" title=\"Open in VScode\" style=\"width: 15px; height: 15px; margin-right: 10px\" src=\"https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg\" alt=\"\">\n                     </div>";
        });
        $rowWrapper.innerHTML = newRowsStr;
    });
});
// var elem = document.getElementById('ng-bubble-search');
// elem.addEventListener('keydown', function(e){
//     alert();
//     if (e.keyCode == 13) {
//         console.log('You pressed a "enter" key in somewhere');
//     }
// });
var highligtedRowCount = -1;
console.log("helloooooooooooooooooooooooooo");
var $hoveredComponent;
var $appenededElement;
document.addEventListener('mouseover', function ($event) {
    if (!$event.ctrlKey) {
        return;
    }
    var target = $event.target;
    if (hasClass(target, 'appened-el')) {
        return;
    }
    if ($hoveredComponent === target) {
        return;
    }
    /*remove stuff from previously hovered componet*/
    if ($hoveredComponent) {
        $hoveredComponent.classList.remove('hovered-parent');
        $hoveredComponent.removeChild($appenededElement);
    }
    while (target && !startWithAppRegex.test(target.tagName)) {
        target = target.parentElement;
    }
    $hoveredComponent = target;
    if (!$hoveredComponent)
        return;
    $hoveredComponent.classList.add('hovered-parent');
    $appenededElement = document.createElement('SPAN');
    var textEl = document.createTextNode($hoveredComponent.tagName);
    $appenededElement.appendChild(textEl);
    $appenededElement.classList.add('appened-el');
    $hoveredComponent.insertBefore($appenededElement, $hoveredComponent.firstChild);
    // element.innerHTML = `<!--<span style="">${element.tagName}</span>-->` + element.innerHTML;
});
function hasClass(element, thatClass) {
    // var className = " " + className + " ";
    return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + thatClass + " ") > -1;
}
function toggleHighlightRow(index, doHighlight) {
    try {
        var resultRows_1 = document.getElementsByClassName('row-wrapper-item');
        var ele = resultRows_1[index];
        if (doHighlight === false) {
            ele.classList.remove(BG_HIGHLIGHTED_CLASS);
        }
        else {
            resultRows_1[index].classList.add(BG_HIGHLIGHTED_CLASS);
        }
    }
    catch (e) {
        console.log(e);
    }
}
$search.addEventListener("keydown", function ($event) {
    console.log($event.keyCode);
    console.log("keydown pressed");
    var resultRows = document.getElementsByClassName('row-wrapper-item');
    toggleHighlightRow(highligtedRowCount, false);
    if ($event.keyCode === 38) { //up arrow
        if (highligtedRowCount <= 0) {
            highligtedRowCount = resultRows.length - 1;
        }
        else {
            highligtedRowCount--;
        }
    }
    else if ($event.keyCode === 40) { // down arrow
        if (highligtedRowCount >= resultRows.length - 1) {
            highligtedRowCount = 0;
        }
        else {
            highligtedRowCount++;
        }
    }
    if ($event.keyCode === 13) { // enter key
        var searchTerm = resultRows[highligtedRowCount].innerText;
        sendNgTag(searchTerm, true);
    }
    toggleHighlightRow(highligtedRowCount, true);
});
$rowWrapper.addEventListener("click", function ($event) {
    $event.stopPropagation();
    var $target = $event.target;
    var $row;
    var editor = "";
    if (hasClass($target, 'row-wrapper-item')) {
        $row = $target;
    }
    else {
        $row = $target.parentElement;
        /*check if editor logos are clicked*/
        if (hasClass($target, 'editor-logo')) {
            editor = $target.getAttribute('data-editor');
        }
    }
    var path = $row.getAttribute('data-path');
    sendFilePath(path, editor);
});
var $initImg = document.getElementById('init-img');
var $ngBubbleContainer = document.getElementById('ng-bubble-container');
console.log($ngBubbleContainer);
$ngBubbleContainer.addEventListener('click', function ($event) {
    $event.stopPropagation();
    if ($event.target === $ngBubbleContainer) {
        hideSearchBar();
    }
});
$initImg.addEventListener('click', function () {
    hideSearchBar();
});
function hideSearchBar() {
    if (hasClass($ngBubbleContainer, 'display-none')) {
        $ngBubbleContainer.classList.remove('display-none');
    }
    else {
        $ngBubbleContainer.classList.add('display-none');
    }
}
