/*TODO:
* 1. remove hoverd-parent class from component as a part of cleanup
* 2. use ng-probe to find parent component
* 3. use ng-probe to display component variables
* 4. use ng-probe to edit component variables
* */
//TODO: duplicate interfaces and enums
var EWSTypes;
(function (EWSTypes) {
    EWSTypes["SEARCH"] = "SEARCH";
    EWSTypes["open"] = "open";
    EWSTypes["openByPath"] = "openByPath";
    EWSTypes["getFileByPath"] = "getFileByPath";
    EWSTypes["setFileByPath"] = "setFileByPath";
    EWSTypes["reIndex"] = "reIndex";
    EWSTypes["ack"] = "ack";
})(EWSTypes || (EWSTypes = {}));
(function () {
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = 'http://localhost:11637/assets/css/styles.css';
    document.getElementsByTagName('head')[0].appendChild(styles);
    //
})();
(function () {
    var awaitingResponses = {};
    var socket = new WebSocket("ws://localhost:11640");
    socket.onopen = function (event) {
        console.log("ws started");
    };
    socket.onclose = function (event) {
        console.log(event);
        // alert('ws closed');
        setTimeout(function () {
            location.reload();
        }, 2000);
    };
    socket.onerror;
    socket.onmessage = function (event) {
        toggleLoader(false);
        var data = JSON.parse(event.data);
        var payload = data.payload;
        debugger;
        if (data.type === EWSTypes.SEARCH) {
            var files = payload.files;
            var newRowsStr_1 = "";
            files.forEach(function (file) {
                newRowsStr_1 +=
                    "<div class=\"row-wrapper-item\" style=\"display: flex; align-content: center\" title=" + file.path + " data-path=" + file.path + ">\n                        <span>" + file.name + "</span>\n                        <img class=\"editor-logo\" data-editor=\"webstorm\" title=\"Open in Webstorm\" style=\"width: 15px; height: 15px; margin-right: 5px; margin-left: auto\" src=\"http://resources.jetbrains.com/storage/products/webstorm/img/meta/webstorm_logo_300x300.png\" alt=\"\">\n                        <img class=\"editor-logo\" data-editor=\"vscode\" title=\"Open in VScode\" style=\"width: 15px; height: 15px; margin-right: 10px\" src=\"https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg\" alt=\"\">\n                     </div>";
            });
            $rowWrapper.innerHTML = newRowsStr_1;
        }
        else if (data.type === EWSTypes.getFileByPath) {
            var fileData = payload.file;
            setCodeStrInCodeMirror(fileData);
        }
    };
    function sendMessage(data) {
        toggleLoader(true);
        console.log("sendMessage", data);
        socket.send(JSON.stringify(data));
    }
    if (window.NG_BUBBLE_IMPORTED) {
        console.error("Error: ng-bubble has been imported more than once");
        return;
    }
    var $body = document.getElementsByTagName('body')[0];
    $body.innerHTML += "\n<img id=\"init-img\" class=\"radiate-out-on-hover\" style=\"\"\n     src=\"https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png\" alt=\"\">\n     <button id=\"button1\">button1</button>\n     <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.2/css/all.css\" integrity=\"sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr\" crossorigin=\"anonymous\">\n     <link rel=\"stylesheet\" href=\"http://localhost:11637/assets/css/codemirror/night.css\">\n     <link rel=\"stylesheet\" href=\"http://localhost:11637/assets/css/codemirror/night.css\">\n     <script src=\"http://localhost:11637/assets/js/codemirror/addon/brace-fold.js\"></script>\n     <script src=\"http://localhost:11637/assets/js/codemirror/addon/foldcode.js\"></script>\n     <script src=\"http://localhost:11637/assets/js/codemirror/addon/foldgutter.js\"></script>\n     <script src=\"http://localhost:11637/assets/js/codemirror/addon/markdown-fold.js\"></script>\n     \n<!--<div id=\"init-img\" class=\"radiate-out-on-hover \">-->\n    <!--<img class=\"ng-bubble-icon\" style=\"width: 100%; height: 100%\"-->\n     <!--src=\"http://localhost:11637/assets/imgs/ng-bubble-icon.png\" alt=\"\">-->\n<!--</div>-->\n\n<div style=\"height: 30vw; width: 30vw; background-color: rgb(51, 51, 51); color: #ccc; \nposition: fixed; right: 0;bottom: 0; z-index:100000000000000; display: flex;flex-direction: column;\n\">\n \n  <div id=\"ng-bubble-editor-controls-1\" style=\"display: flex; justify-content: flex-end; height: 40px; align-items: flex-end; padding-bottom: 5px; background-color: rgb(60, 60, 60)\"> \n  <i style=\"font-size: 12px;\n    margin-left: 10px; color: #cccccc\">app.component.html</i>\n  <select id=\"ng-bubble-editor-controls-select\"></select>\n  <span style=\"margin-left: auto\" \"></span>\n    <i class=\"fa fa-expand\" style=\"margin-right: 10px\"></i>\n    <i class=\"fa fa-window-minimize\" style=\"margin-right: 10px\"></i>\n    <!--<span>\uD83D\uDCDD</span>-->\n    <!--<span id=\"ng-bubble-editor-controls-1-name\" style=\"margin-left: auto\"></span>-->\n  </div>\n  \n  <!--<div id=\"ng-bubble-editor-controls-2\" style=\"display: flex; justify-content: flex-end\">-->\n    <!--<span>\uD83D\uDD04</span>-->\n    <!--<span>\u2B05\uFE0F</span>-->\n    <!--<span>\u27A1\uFE0F</span>-->\n    <!--<span>\u2B06\uFE0F</span>-->\n    <!--<span style=\"margin-right: auto\">\u2B07\uFE0F</span>-->\n    <!---->\n    <!--<select id=\"ng-bubble-editor-controls-select\">-->\n      <!---->\n    <!--</select>-->\n    <!---->\n    <!---->\n    <!--<span title=\"Save changes\" style=\"margin-right: 10px\">\uD83D\uDCBE</span>-->\n    <!--<span title=\"Minimize\">\uD83D\uDDD5</span>-->\n  <!--</div>-->\n  <div style=\"display: flex;width: 100%;height: 100%; flex-grow: 1; position: relative\">\n    <div style=\"flex-basis: 40px; flex-shrink: 0; display: flex;  flex-direction: column; align-items: center\">\n    <img src=\"https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg\" class=\"vs-code-grey\"></img>\n    <i class=\"fa fa-search\"></i>\n    <i id=\"save-editor\" class=\"fa fa-save\"></i>\n    <i class=\"fa fa-repeat\" style=\"font-size: 13px !important;\"></i>\n    <i class=\"fa fa-angle-left\"></i>\n    <i class=\"fa fa-angle-right\"></i>\n    <i class=\"fa fa-angle-down\"></i>\n    <i class=\"fa fa-angle-up\"></i>\n</div>\n    <textarea style=\"height: 100%; flex-grow: 1; background-color: black; border: 1px solid black\" id=\"ng-bubble-editor\"></textarea>\n    <div id=\"ng-bubble-container\" class=\"display-none\">\n    <main class=\"ng-bubble-autocomplete\">\n        <div style=\"position: relative;\">\n            <input id=\"ng-bubble-search\" type=\"text\"\n            placeholder=\"Search files and folders\"\n                   autofocus\n                   style=\"height: 30px; width: 100%;\n                   outline: none;\n           border: 1px solid transparent;\n           font-size: 11px;\n           color: white;\n            padding-left: 10px; background-color: rgba(60, 60, 60, 0.90)!important\">\n            <!--<img class=\"ng-bubble-icon\"-->\n                 <!--style=\"position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%; max-height: 100px\"-->\n                 <!--src=\"http://localhost:11637/assets/imgs/ng-bubble-icon.png\" alt=\"\">-->\n            <div id=\"row-wrapper\" style=\"position: absolute; top: 100%; left: 0; right: 0\">\n                <!--<div style=\"padding: 7px; border: 1px solid #e95420;\">-->\n                    <!--<strong style=\"font-size: 11px; color:  #ccc\">Search files and folders</strong>-->\n                <!--</div>-->\n            </div>\n        </div>\n\n    </main>\n\n</div>\n  </div>\n</div>\n\n\n<!--<div id=\"ng-bubble-container\" class=\"display-none\" style=\"background-color: rgba(233,84,32,0.29)\">-->\n    <!--<main class=\"ng-bubble-autocomplete\">-->\n        <!--<div style=\"position: relative;\">-->\n            <!--<input id=\"ng-bubble-search\" type=\"text\"-->\n                   <!--autofocus-->\n                   <!--style=\"height: 44px; width: 100%;-->\n                   <!--border-top-left-radius: 8px;-->\n                   <!--border-top-right-radius: 8px;-->\n                   <!--outline: none;-->\n           <!--border: 1px solid #a3421c;-->\n           <!--font-size: 30px;-->\n           <!--color: white;-->\n            <!--padding-left: 10px; background-color: rgba(233,84,32,0.64)!important\">-->\n            <!--<img class=\"ng-bubble-icon\"-->\n                 <!--style=\"position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%; max-height: 100px\"-->\n                 <!--src=\"http://localhost:11637/assets/imgs/ng-bubble-icon.png\" alt=\"\">-->\n            <!--<div id=\"row-wrapper\" style=\"position: absolute; top: 100%; left: 0; right: 0\">-->\n                <!--<div style=\"padding: 7px; border: 1px solid #e95420;\">-->\n                    <!--<strong style=\"font-size: 13px; color:  #e95420\">Search files and folders</strong>-->\n                <!--</div>-->\n            <!--</div>-->\n        <!--</div>-->\n\n    <!--</main>-->\n\n<!--</div>-->\n";
    // let x:HTMLElement|null = document.getElementById('button1');
    //  // x.click = ()=>console.log(ng);
    // if(x){
    //   x.addEventListener('click', ()=>{
    //     console.log(ng);
    //   })
    // }
    var componentInstanceInCodeMirror;
    var startWithAppRegex = new RegExp('^app-', 'i');
    var BACKEND_ROOT = 'http://localhost:11637';
    var BG_HIGHLIGHTED_CLASS = 'bg-highlighted';
    document.addEventListener('dblclick', function ($event) {
        toggleLoader(true);
        var target = $event.target;
        var componentNode = findParentComponentElement(target);
        if (componentNode) {
            var componentInstance = getComponentInstanceFromComponentNode(componentNode);
            var codeStr = stringify1(componentInstance);
            addOptionsToCodemirrorSelect(componentInstance);
            setCodeStrInCodeMirror(codeStr);
            componentInstanceInCodeMirror = componentInstance;
            initSelect();
        }
        var codeText = ""; //element.innerHTML;;
        if (!componentNode) {
            console.log("NG-BUBBLE:: COULDNT FIND COMPONENT");
        }
        var payload = {
            tagName: componentNode && componentNode.tagName || "",
            targetTagName: target.tagName,
            id: target.id,
            classList: Array.from(target.classList),
            innerText: target.innerText
        };
        console.log(target);
        sendMessage({ type: EWSTypes.open, payload: payload });
    });
    function findParentComponentElement(el, parentLevel) {
        if (parentLevel === void 0) { parentLevel = 1; }
        var level = 0;
        while (level !== parentLevel && el.tagName !== 'body') {
            el = el.parentElement;
            if (!el) {
                break;
            }
            if (startWithAppRegex.test(el.tagName)) {
                level++;
            }
        }
        return level === parentLevel ? el : null;
    }
    function toggleLoader(show) {
        var image = show ? 'http://localhost:11637/assets/imgs/loader-svg.svg' : 'http://localhost:11637/assets/imgs/ng-bubble-icon.png';
        var logoElements = document.getElementsByClassName('ng-bubble-icon');
        for (var key in logoElements) {
            logoElements[key].src = image;
        }
    }
    function makeGetReq(url) {
        toggleLoader(true);
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
                    finally {
                        toggleLoader(false);
                    }
                }
            };
        });
    }
    function sendNgTag(payload) {
        // console.log(data);
        // /*TODO: typescript fuck up*/
        // let url = `open?file=${tag}&exact=${exact}&codeText=${codeText}`;
        // // let urlObj = new URL(url);
        // if (data) {
        //     let dataStr = JSON.stringify(data);
        //     url = `open?file=${tag}&exact=${exact}&codeText=${codeText}&data=${dataStr}`;
        // }
        // makeGetReq(url)
        //     .then(() => {
        //         console.log("success");
        //     })
    }
    // function sendFilePath(path: string, editor: string) {
    //     let url = `open?path=${path}&editor=${editor}`;
    //     makeGetReq(url)
    //         .then(() => {
    //             console.log("success");
    //         })
    // }
    function getFileNames(searchTerm) {
        new Promise(function (resolve, reject) {
        });
    }
    var $search = document.getElementById('ng-bubble-search');
    var $rowWrapper = document.getElementById('row-wrapper');
    var resultRows = document.getElementsByClassName('row-wrapper-item');
    $search.addEventListener("input", function ($event) {
        var searchTerm = $search.value;
        sendMessage({ type: EWSTypes.SEARCH, payload: { file: searchTerm } });
        // let url = `search?file=${searchTerm}`;
        // makeGetReq(url)
        //   .then((val: any) => {
        //     // let files = val.files;
        //     // let newRowsStr = "";
        //     // files.forEach((file: any) => {
        //     //   newRowsStr +=
        //     //     `<div class="row-wrapper-item" style="display: flex; align-content: center" title=${file.path} data-path=${file.path}>
        //     //                 <span>${file.name}</span>
        //     //                 <img class="editor-logo" data-editor="webstorm" title="Open in Webstorm" style="width: 15px; height: 15px; margin-right: 5px; margin-left: auto" src="http://resources.jetbrains.com/storage/products/webstorm/img/meta/webstorm_logo_300x300.png" alt="">
        //     //                 <img class="editor-logo" data-editor="vscode" title="Open in VScode" style="width: 15px; height: 15px; margin-right: 10px" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg" alt="">
        //     //              </div>`;
        //     // });
        //     // $rowWrapper.innerHTML = newRowsStr;
        //   });
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
    var $Component;
    var $hoveredComponentOriginalInnerHtml;
    var $appenededElement;
    var $appenededElements = [];
    function removeChildFromParent($el) {
        var parent = $el.parentElement;
        // if(parent) parent.removeChild($el);
    }
    function removeChildrenWithClassName(className) {
        var elements = Array.from(document.getElementsByClassName(className));
        elements.forEach(function (el) {
            el.parentNode && el.parentNode.removeChild(el);
        });
    }
    document.addEventListener('mouseover', function ($event) {
        if (!$event.ctrlKey) {
            return;
        }
        var target = $event.target;
        console.log(target);
        if (hasClass(target, 'appened-el')) {
            return;
        }
        if ($Component === target) {
            return;
        }
        /*remove stuff from previously hovered component*/
        // $appenededElements.forEach(($el)=>{
        //   removeChildFromParent($el);
        // });
        // $appenededElements = [];
        removeChildrenWithClassName('appened-el');
        if ($Component) {
            $Component.classList.remove('hovered-parent');
        }
        // while (target && !startWithAppRegex.test(target.tagName)) {
        //   target = target.parentElement as HTMLElement;
        // }
        var $parentComponentElement = findParentComponentElement(target, 1);
        if (!$parentComponentElement)
            return;
        $Component = $parentComponentElement;
        $appenededElement = showComponentMarkerOnComponent($Component);
        // $appenededElements.push($appenededElement);
        // console.log($appenededElements);
        $Component.classList.add('hovered-parent');
        // $appenededElement = document.createElement('SPAN');
        // let textEl = document.createTextNode($hoveredComponent.tagName);
        // $appenededElement.appendChild(textEl);
        //
        // $appenededElement.classList.add('appened-el');
        // $hoveredComponentOriginalInnerHtml = $Component.innerHTML;
        $appenededElement = createComponentMarker($Component.tagName);
        // $hoveredComponent.appendChild($appenededElement);
        $Component.insertBefore($appenededElement, $Component.firstChild);
        //     $hoveredComponent.innerHTML = `
        //             <span class="appened-el">
        //                    ${$hoveredComponent.tagName}
        //                    <span class="appened-el-child hide-menu" data-tagName="${$hoveredComponent.tagName}">
        //                    <ul>
        //                       <li class="appened-el-child-item" data-item="openHtml">openHtml</li>
        //                       <li class="appened-el-child-item" data-item="openParent">openParent</li>
        //                       <li class="appened-el-child-item" data-item="ShowBranch">ShowBranch</li>
        //                       <li class="appened-el-child-item" data-item="ReIndex">ReIndex</li>
        //                    </ul>
        // </span>
        //             </span>`
        //       + $hoveredComponent.innerHTML;
    });
    function showComponentMarkerOnComponent($component) {
        $component.classList.add('hovered-parent');
        // $hoveredComponentOriginalInnerHtml = $component.innerHTML;
        $appenededElement = createComponentMarker($component.tagName);
        $component.insertBefore($appenededElement, $component.firstChild);
        // console.log('creating marker on component:', $component, $appenededElement);
        return $appenededElement;
    }
    var codemirror;
    setTimeout(function () {
        codemirror = CodeMirror.fromTextArea(document.getElementById('ng-bubble-editor'), {
            lineNumbers: true,
            lineWrapping: true,
            theme: 'night',
            rtlMoveVisually: false,
            direction: 'ltr',
            moveInputWithCursor: false,
            extraKeys: {
                'Ctrl-Q': function (codemirror) {
                    codemirror.foldCode(codemirror.getCursor());
                },
                "Ctrl-Space": "autocomplete"
            },
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
        var saveEditorButton$ = document.getElementById('save-editor');
        saveEditorButton$.addEventListener('click', function () {
            debugger;
            var fileContent = codemirror.getValue();
            sendMessage({
                type: EWSTypes.setFileByPath, payload: {
                    file: fileContent,
                    pathToOpen: pathToOpen
                }
            });
        });
    }, 3000);
    function createComponentMarker(hoveredComponentTagName) {
        hoveredComponentTagName = hoveredComponentTagName.split('-').join('_');
        // console.log(hoveredComponentTagName);
        var span0 = document.createElement('SPAN');
        span0.classList.add('appened-el');
        span0.appendChild(document.createTextNode(hoveredComponentTagName));
        var span01 = document.createElement('SPAN');
        // span01.appendChild(document.createTextNode(hoveredComponentTagName));
        span01.classList.add('appened-el-child');
        span01.classList.add('hide-menu');
        var ul02 = document.createElement('UL');
        var li21 = document.createElement('li');
        var li22 = document.createElement('li');
        var li23 = document.createElement('li');
        var li24 = document.createElement('li');
        var li25 = document.createElement('li');
        [li21, li22, li23, li24, li25].forEach(function (el) {
            el.classList.add('appened-el-child-item');
        });
        var openHtml = document.createTextNode('openHtml');
        var openParent = document.createTextNode('openParent');
        var ShowBranch = document.createTextNode('ShowBranch');
        var ReIndex = document.createTextNode('ReIndex');
        var displayProps = document.createTextNode('displayProps');
        var openHtmlAttr = document.createAttribute('data-item');
        var openParentAttr = document.createAttribute('data-item');
        var ShowBranchAttr = document.createAttribute('data-item');
        var ReIndexAttr = document.createAttribute('data-item');
        var displayPropsAttr = document.createAttribute('data-item');
        //
        openHtmlAttr.value = 'openHtml';
        openParentAttr.value = 'openParent';
        ShowBranchAttr.value = 'ShowBranch';
        ReIndexAttr.value = 'ReIndex';
        displayPropsAttr.value = 'displayProps';
        li21.appendChild(openHtml);
        li22.appendChild(openParent);
        li23.appendChild(ShowBranch);
        li24.appendChild(ReIndex);
        li25.appendChild(displayProps);
        li21.setAttributeNode(openHtmlAttr);
        li22.setAttributeNode(openParentAttr);
        li23.setAttributeNode(ShowBranchAttr);
        li24.setAttributeNode(ReIndexAttr);
        li25.setAttributeNode(displayPropsAttr);
        ul02.appendChild(li21);
        ul02.appendChild(li22);
        ul02.appendChild(li23);
        ul02.appendChild(li24);
        ul02.appendChild(li25);
        span01.appendChild(ul02);
        span0.appendChild(span01);
        return span0;
    }
    function showBranches(target) {
        var parent = target, child = target;
        while (parent) {
            parent = findParentComponentElement(parent, 1);
            parent && showComponentMarkerOnComponent(parent);
        }
        // while (child){
        //   child = findParentComponentElement(target, -1);
        //   child && showComponentMarkerOnComponent(child);
        // }
    }
    function hideAllMenus() {
        var elements = Array.from(document.getElementsByClassName('appened-el-child'));
        elements.forEach(function (el) {
            el.classList.add('hide-menu');
            el.classList.remove('show-menu');
        });
    }
    document.addEventListener('click', function (e) {
        var target = e.target;
        if (!hasClass(target, 'appened-el') && !hasClass(target, 'appened-el-child') && !hasClass(target, 'appened-el-child-item')) {
            // hideAllMenus();
            removeChildrenWithClassName('appened-el');
        }
        if (hasClass(target, 'appened-el-child')) {
            createMenu(target);
            e.stopPropagation();
        }
        else if (hasClass(target, 'appened-el-child-item')) {
            e.stopPropagation();
            var action = target.getAttribute('data-item');
            // @ts-ignore
            var tagName = "";
            var targetTagName = void 0;
            var component = findParentComponentElement(target, 1);
            if (action === 'openTs' || action === "openHtml" || action === "") {
                if (!component)
                    return;
                // let dataTagName: any = target.parentElement.parentElement.getAttribute('data-tagName');
                // tagName = dataTagName;
                tagName = component.tagName;
            }
            else if (action === 'openParent') {
                var component_1 = findParentComponentElement(target, 1);
                if (!component_1)
                    return;
                var parentComponent = findParentComponentElement(component_1, 1);
                if (!parentComponent)
                    return;
                tagName = parentComponent.tagName;
                targetTagName = component_1.tagName;
            }
            else if (action === 'ReIndex') {
                sendMessage({ type: EWSTypes.reIndex });
                return;
            }
            else if (action === 'ShowBranch') {
                // sendMessage({type: EWSTypes.reIndex});
                var component_2 = findParentComponentElement(target, 1);
                component_2 && showBranches(component_2);
                return;
            }
            else if (action === 'displayProps') {
                var componentNode = findParentComponentElement(target);
                if (componentNode) {
                    var componentInstance = getComponentInstanceFromComponentNode(componentNode);
                    var codeStr = stringify1(componentInstance);
                    addOptionsToCodemirrorSelect(componentInstance);
                    setCodeStrInCodeMirror(codeStr);
                    componentInstanceInCodeMirror = componentInstance;
                    initSelect();
                }
                return;
            }
            sendMessage({ type: EWSTypes.open, payload: { tagName: tagName, targetTagName: targetTagName } });
        }
    }, false);
    function getComponentInstanceFromComponentNode(component) {
        return ng.probe(component).componentInstance;
    }
    var SELECT_INIT = false;
    function initSelect() {
        var select = document.getElementById('ng-bubble-editor-controls-select');
        if (!select)
            return;
        if (!SELECT_INIT) {
            select.addEventListener('change', function (event) {
                SELECT_INIT = true;
                debugger;
                var key = select.value;
                var keys;
                keys = !key || key === 'All' ? [] : [key];
                var codeStr = stringify1(componentInstanceInCodeMirror, keys);
                setCodeStrInCodeMirror(codeStr);
            });
        }
    }
    function addOptionsToCodemirrorSelect(componentInstance) {
        var select = document.getElementById('ng-bubble-editor-controls-select');
        if (!select)
            return;
        var str = "<option value=\"All\">All</option>";
        Object.keys(componentInstance).forEach(function (key) {
            str += "<option value=\"" + key + "\">" + key + "</option>";
        });
        select.innerHTML = str;
        select.addEventListener('change', function () {
            // select.value
        });
    }
    function setCodeStrInCodeMirror(codeStr) {
        var editor = document.getElementById('ng-bubble-editor');
        if (editor) {
            codemirror.getDoc().setValue(codeStr);
            codemirror.operation(function () {
                for (var l = codemirror.firstLine(); l <= codemirror.lastLine(); ++l)
                    if (l > 1) {
                        codemirror.foldCode({ line: l, ch: 0 }, null, "fold");
                    }
            });
        }
    }
    /*TODO:check if any key is circular, improve it*/
    function stringify1(obj, keys) {
        var newObj = {};
        var keysToStringify = (Array.isArray(keys) && keys.length > 0 && keys) || Object.keys(obj);
        keysToStringify.forEach(function (key) {
            if (typeof obj[key] !== "object") {
                newObj[key] = obj[key];
            }
            else {
                try {
                    JSON.stringify(obj[key]);
                    newObj[key] = obj[key];
                }
                catch (e) {
                    newObj[key] = '[NG BUBBLE ::: CIRCULAR_OBJECT]';
                }
            }
        });
        return JSON.stringify(newObj, null, "\t");
    }
    function createMenu(x) {
        x.classList.remove('hide-menu');
    }
    // Array.from(document.getElementsByClassName("appened-el-child")).forEach(function (element) {
    //   element.addEventListener('click', createMenu);
    // });
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
            pathToOpen = getHighlightedRow$().getAttribute('data-path');
            // sendNgTag(searchTerm, true);
            sendMessage({
                type: EWSTypes.getFileByPath,
                payload: {
                    pathToOpen: pathToOpen
                }
            });
        }
        toggleHighlightRow(highligtedRowCount, true);
    });
    var pathToOpen;
    function getHighlightedRow$() {
        return document.getElementsByClassName('row-wrapper-item')[highligtedRowCount];
    }
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
        sendMessage({ payload: { pathToOpen: path, editor: editor }, type: EWSTypes.openByPath });
    });
    var $initImg = document.getElementById('init-img');
    var $ngBubbleContainer = document.getElementById('ng-bubble-container');
    console.log($ngBubbleContainer);
    $ngBubbleContainer.addEventListener('click', function ($event) {
        $event.stopPropagation();
        if ($event.target === $ngBubbleContainer) {
            toggleSearchBar();
        }
    });
    console.log($initImg);
    $initImg.addEventListener('click', function () {
        toggleSearchBar();
    });
    function toggleSearchBar() {
        if (hasClass($ngBubbleContainer, 'display-none')) {
            $ngBubbleContainer.classList.remove('display-none');
        }
        else {
            $ngBubbleContainer.classList.add('display-none');
        }
    }
}());
var NG_BUBBLE_IMPORTED = true;
