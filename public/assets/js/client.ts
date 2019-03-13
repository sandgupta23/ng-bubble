// /*TODO:
// * 1. remove hoverd-parent class from component as a part of cleanup
// * 2. use ng-probe to find parent component
// * 3. use ng-probe to display component variables
// * 4. use ng-probe to edit component variables
// * */
//
// enum EEditorInput {
//   componentfiles = "componentfiles",
//   filecontent = "filecontent",
//   componentstr = "componentstr",
//   searchfiles = "searchfiles",
// }
//
// /*TODO: this should not be needed*/
// interface IWSData {
//   type: EWSTypes,
//   error?: number,
//   errorMessage?: string,
//   payload?: ILineFinderData
// }
//
// //TODO: duplicate interfaces and enums
// enum EWSTypes {
//   SEARCH = 'SEARCH',
//   COMPONENT_FILE_SEARCH = 'COMPONENT_FILE_SEARCH',
//   open = 'open',
//   openByPath = 'openByPath',
//   getFileByPath = 'getFileByPath',
//   setFileByPath = 'setFileByPath',
//   reIndex = 'reIndex',
//   ack = 'ack',
// }
//
// interface ILineFinderData {
//   id?: string,
//   tagName?: string,
//   targetTagName?: string,
//   classList?: string[],
//   innerText?: string,
//   file?: string,
//   pathToOpen?: string
//   editor?: string,
//   action?: string,
// }
//
// declare let ng: any;
// declare let CodeMirror: any;
// // (function () {
// //   var styles = document.createElement('link');
// //   styles.rel = 'stylesheet';
// //   styles.type = 'text/css';
// //   styles.media = 'screen';
// //   styles.href = 'http://localhost:11637/assets/css/styles.css';
// //   document.getElementsByTagName('head')[0].appendChild(styles);
// // //
// // })();
//
// (function () {
//   let COMPONENT_PREFIX = 'app';
//   let awaitingResponses = {};
//   let socket = new WebSocket("ws://localhost:11640");
//   socket.onopen = function (event) {
//     console.log("ws started");
//   };
//   socket.onclose = function (event) {
//     console.log(event);
//     setTimeout(() => {
//       location.reload();
//     }, 2000)
//   };
//   socket.onerror;
//   socket.onmessage = function (event) {
//
//     console.log("onmessage", event.data);
//     toggleLoader(false);
//     let data: IWSData = JSON.parse(event.data);
//     let payload: any = data.payload;
//     if (data.type === EWSTypes.SEARCH) {
//       let files = payload.files || [];
//       setEditorAttribute(EEditorInput.searchfiles, JSON.stringify(files));
//     }
//     if (data.type === EWSTypes.COMPONENT_FILE_SEARCH) {
//       let files = payload.files || [];
//       setEditorAttribute(EEditorInput.componentfiles, JSON.stringify(files));
//     }
//     if (data.type === EWSTypes.getFileByPath) {
//       debugger;
//       /*TODO: unfortunate key naming here*/
//       let fileContent = payload.file || [];
//       setEditorAttribute(EEditorInput.filecontent, fileContent);
//     }
//   };
//
//   function sendMessage(data: IWSData) {
//     toggleLoader(true);
//     console.log("sendMessage", data);
//     socket.send(JSON.stringify(data));
//   }
//
//
//   if ((<any>window).NG_BUBBLE_IMPORTED) {
//     console.error("Error: ng-bubble has been imported more than once");
//     return;
//   }
//   let $editorEl = document.getElementsByTagName('user-poll')[0];
//   $editorEl.addEventListener("searchTrigger$", (event: CustomEvent) => {
//     let keyword = event.detail;
//     sendMessage({type: EWSTypes.SEARCH, payload: {file: keyword}});
//   });
//   $editorEl.addEventListener("getFileTrigger$", (event: CustomEvent) => {
//     let keyword = event.detail;
//     sendMessage({type: EWSTypes.getFileByPath, payload: {pathToOpen: keyword}});
//   });
//   let componentInstanceInCodeMirror: object;
//   let startWithAppRegex = new RegExp('^app-', 'i');
//   const BACKEND_ROOT = 'http://localhost:11637';
//   const BG_HIGHLIGHTED_CLASS = 'bg-highlighted';
//   document.addEventListener('dblclick', ($event) => {
//
//     toggleLoader(true);
//     let target = $event.target as HTMLElement;
//     let componentNode: HTMLElement | null = findParentComponentElement(target);
//     if (componentNode) {
//       let componentInstance = getComponentInstanceFromComponentNode(componentNode);
//       let codeStr = stringify1(componentInstance);
//       $editorEl.setAttribute(EEditorInput.componentstr, codeStr);
//       addOptionsToCodemirrorSelect(componentInstance);
//       // setCodeStrInCodeMirror(codeStr);
//       componentInstanceInCodeMirror = componentInstance;
//       initSelect();
//     }
//     let codeText = "";//element.innerHTML;;
//     if (!componentNode) {
//       console.log("NG-BUBBLE:: COULDNT FIND COMPONENT");
//     }
//     let componentTag = componentNode && componentNode.tagName || "";
//     let payload: ILineFinderData = {
//       tagName: componentTag,
//       targetTagName: target.tagName,
//       id: target.id,
//       classList: Array.from(target.classList),
//       innerText: target.innerText,
//       file: removeComponentPrefix(componentTag) + ".component" //app-test will become test.component
//     };
//
//     sendMessage({type: EWSTypes.open, payload});
//     sendMessage({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
//   });
//
//
//   function removeComponentPrefix(tag: string) {
//     if (!tag) return;
//     /*replace app- from app-test*/
//     return tag.toLowerCase().replace(new RegExp(`^${COMPONENT_PREFIX}-`), "");
//   }
//
//   function findParentComponentElement(el: HTMLElement, parentLevel: number = 1): HTMLElement | null {
//     let level = 0;
//     while (level !== parentLevel && el.tagName !== 'body') {
//       el = el.parentElement as HTMLElement;
//       if (!el) {
//         break;
//       }
//       if (startWithAppRegex.test(el.tagName)) {
//         level++;
//       }
//     }
//     return level === parentLevel ? el : null;
//   }
//
//   function toggleLoader(show: boolean) {
//
//     let image = show ? 'http://localhost:11637/assets/imgs/loader-svg.svg' : 'http://localhost:11637/assets/imgs/ng-bubble-icon.png';
//     let logoElements: HTMLCollection = document.getElementsByClassName('ng-bubble-icon');
//     for (let key in logoElements) {
//       (<any>logoElements[key]).src = image;
//     }
//
//   }
//
//   function setEditorAttribute(key: EEditorInput, value: any) {
//     $editorEl.setAttribute(key, value);
//   }
//
//   function makeGetReq(url: string) {
//     toggleLoader(true);
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("GET", `${BACKEND_ROOT}/${url}`, true);
//     xhttp.send();
//     return new Promise((resolve, reject) => {
//       xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//           console.log("success");
//           console.log(xhttp.responseText);
//           try {
//             resolve(JSON.parse(xhttp.responseText));
//           } catch (e) {
//             reject("something went wrong");
//           } finally {
//             toggleLoader(false);
//           }
//         }
//       };
//     })
//   }
//
//   function sendNgTag(payload: ILineFinderData) {
//
//
//     // console.log(data);
//     // /*TODO: typescript fuck up*/
//     // let url = `open?file=${tag}&exact=${exact}&codeText=${codeText}`;
//     // // let urlObj = new URL(url);
//     // if (data) {
//     //     let dataStr = JSON.stringify(data);
//     //     url = `open?file=${tag}&exact=${exact}&codeText=${codeText}&data=${dataStr}`;
//     // }
//
//     // makeGetReq(url)
//     //     .then(() => {
//     //         console.log("success");
//     //     })
//   }
//
//   // function sendFilePath(path: string, editor: string) {
//   //     let url = `open?path=${path}&editor=${editor}`;
//   //     makeGetReq(url)
//   //         .then(() => {
//   //             console.log("success");
//   //         })
//   // }
//
//   function getFileNames(searchTerm: string) {
//     new Promise((resolve, reject) => {
//
//     })
//   }
//
//
//   let $search = document.getElementById('ng-bubble-search') as HTMLInputElement;
//   let $rowWrapper = document.getElementById('row-wrapper') as HTMLDivElement;
//   let resultRows = document.getElementsByClassName('row-wrapper-item');
//   $search.addEventListener("input", function ($event) {
//     let searchTerm = $search.value;
//     // sendMessage({type: EWSTypes.SEARCH, payload: {file: searchTerm}});
//     // let url = `search?file=${searchTerm}`;
//     // makeGetReq(url)
//     //   .then((val: any) => {
//     //     // let files = val.files;
//     //     // let newRowsStr = "";
//     //     // files.forEach((file: any) => {
//     //     //   newRowsStr +=
//     //     //     `<div class="row-wrapper-item" style="display: flex; align-content: center" title=${file.path} data-path=${file.path}>
//     //     //                 <span>${file.name}</span>
//     //     //                 <img class="editor-logo" data-editor="webstorm" title="Open in Webstorm" style="width: 15px; height: 15px; margin-right: 5px; margin-left: auto" src="http://resources.jetbrains.com/storage/products/webstorm/img/meta/webstorm_logo_300x300.png" alt="">
//     //     //                 <img class="editor-logo" data-editor="vscode" title="Open in VScode" style="width: 15px; height: 15px; margin-right: 10px" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg" alt="">
//     //     //              </div>`;
//     //     // });
//     //     // $rowWrapper.innerHTML = newRowsStr;
//     //   });
//   });
//
// // var elem = document.getElementById('ng-bubble-search');
// // elem.addEventListener('keydown', function(e){
// //     alert();
// //     if (e.keyCode == 13) {
// //         console.log('You pressed a "enter" key in somewhere');
// //     }
// // });
//
//   let highligtedRowCount = -1;
//
//   console.log("helloooooooooooooooooooooooooo")
//
//   let $Component: HTMLElement;
//   let $hoveredComponentOriginalInnerHtml: string;
//   let $appenededElement: HTMLElement;
//   let $appenededElements: HTMLElement[] = [];
//
//   function removeChildFromParent($el: HTMLElement) {
//     let parent = $el.parentElement;
//     // if(parent) parent.removeChild($el);
//   }
//
//   function removeChildrenWithClassName(className: string) {
//     let elements = Array.from(document.getElementsByClassName(className));
//     elements.forEach((el) => {
//       el.parentNode && el.parentNode.removeChild(el);
//     });
//   }
//
  document.addEventListener('mouseover', ($event) => {
    if (!$event.ctrlKey) {
      return;
    }
    let target = $event.target as HTMLElement;

  });
//
//   function showComponentMarkerOnComponent($component: HTMLElement): HTMLElement {
//     $component.classList.add('hovered-parent');
//     // $hoveredComponentOriginalInnerHtml = $component.innerHTML;
//     $appenededElement = createComponentMarker($component.tagName);
//     $component.insertBefore($appenededElement, $component.firstChild);
//     // console.log('creating marker on component:', $component, $appenededElement);
//     return $appenededElement;
//   }
//
//   var codemirror: any;
//   setTimeout(() => {
//     debugger;
//     codemirror = CodeMirror.fromTextArea(document.getElementById('ng-bubble-editor'), {
//       lineNumbers: true,
//       lineWrapping: true,
//       theme: 'night',
//       rtlMoveVisually: false,
//       direction: 'ltr',
//       moveInputWithCursor: false,
//       extraKeys: {
//         'Ctrl-Q': function (codemirror: any) {
//           codemirror.foldCode(codemirror.getCursor());
//         },
//         "Ctrl-Space": "autocomplete",
//       },
//       foldGutter: true,
//       gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
//     });
//
//     let saveEditorButton$ = <HTMLElement>document.getElementById('save-editor');
//     saveEditorButton$.addEventListener('click', () => {
//       debugger;
//       let fileContent = codemirror.getValue()
//       sendMessage({
//         type: EWSTypes.setFileByPath, payload: {
//           file: fileContent,
//           pathToOpen: pathToOpen
//         }
//       });
//     });
//
//     let windowMinimize$ = <HTMLElement>document.getElementById('window-minimize');
//     windowMinimize$.addEventListener('click', (event) => {
//       let target = <HTMLElement>event.target;
//       debugger;
//       let codeMirrorBody = <HTMLElement>document.getElementById('editor-body');
//       if (hasClass(target, 'fa-window-minimize')) {
//         codeMirrorBody.style.display = 'none';
//         console.log(event.target);
//         target.classList.remove('fa-window-minimize');
//         target.classList.add('fa-window-restore');
//       } else {
//         codeMirrorBody.style.display = 'flex';
//         console.log(event.target);
//         target.classList.remove('fa-window-restore');
//         target.classList.add('fa-window-minimize');
//       }
//
//     });
//
//     let windowMaximize$ = <HTMLElement>document.getElementById('window-maximize');
//
//     windowMaximize$.addEventListener('click', (event) => {
//       let target = <HTMLElement>event.target;
//       debugger;
//       let codeMirrorBody = <HTMLElement>document.getElementById('editor-body');
//       if (hasClass(target, 'fa-window-maximize')) {
//         // codeMirrorBody.style.height = '';
//         console.log(event.target);
//         target.classList.remove('fa-window-maximize');
//         target.classList.add('fa-window-restore');
//       } else {
//         codeMirrorBody.style.display = 'flex';
//         console.log(event.target);
//         target.classList.remove('fa-window-restore');
//         target.classList.add('fa-window-maximize');
//       }
//
//     });
//
//   }, 3000);
//
//   function createComponentMarker(hoveredComponentTagName: string) {
//     hoveredComponentTagName = hoveredComponentTagName.split('-').join('_');
//     // console.log(hoveredComponentTagName);
//     let span0 = document.createElement('SPAN');
//     span0.classList.add('appened-el');
//     span0.appendChild(document.createTextNode(hoveredComponentTagName));
//
//     let span01 = document.createElement('SPAN');
//     // span01.appendChild(document.createTextNode(hoveredComponentTagName));
//     span01.classList.add('appened-el-child');
//     span01.classList.add('hide-menu');
//
//     let ul02 = document.createElement('UL');
//     let li21 = document.createElement('li');
//     let li22 = document.createElement('li');
//     let li23 = document.createElement('li');
//     let li24 = document.createElement('li');
//     let li25 = document.createElement('li');
//     [li21, li22, li23, li24, li25].forEach((el) => {
//       el.classList.add('appened-el-child-item');
//     });
//
//     let openHtml = document.createTextNode('openHtml');
//     let openParent = document.createTextNode('openParent');
//     let ShowBranch = document.createTextNode('ShowBranch');
//     let ReIndex = document.createTextNode('ReIndex');
//     let displayProps = document.createTextNode('displayProps');
//
//     let openHtmlAttr = document.createAttribute('data-item');
//     let openParentAttr = document.createAttribute('data-item');
//     let ShowBranchAttr = document.createAttribute('data-item');
//     let ReIndexAttr = document.createAttribute('data-item');
//     let displayPropsAttr = document.createAttribute('data-item');
//     //
//     openHtmlAttr.value = 'openHtml';
//     openParentAttr.value = 'openParent';
//     ShowBranchAttr.value = 'ShowBranch';
//     ReIndexAttr.value = 'ReIndex';
//     displayPropsAttr.value = 'displayProps';
//
//     li21.appendChild(openHtml);
//     li22.appendChild(openParent);
//     li23.appendChild(ShowBranch);
//     li24.appendChild(ReIndex);
//     li25.appendChild(displayProps);
//
//     li21.setAttributeNode(openHtmlAttr);
//     li22.setAttributeNode(openParentAttr);
//     li23.setAttributeNode(ShowBranchAttr);
//     li24.setAttributeNode(ReIndexAttr);
//     li25.setAttributeNode(displayPropsAttr);
//
//     ul02.appendChild(li21);
//     ul02.appendChild(li22);
//     ul02.appendChild(li23);
//     ul02.appendChild(li24);
//     ul02.appendChild(li25);
//
//     span01.appendChild(ul02);
//     span0.appendChild(span01);
//     return span0;
//   }
//
//   function showBranches(target: HTMLElement) {
//     let parent: HTMLElement | null = target, child: HTMLElement | null = target;
//     while (parent) {
//       parent = findParentComponentElement(parent, 1);
//       parent && showComponentMarkerOnComponent(parent);
//     }
//
//     // while (child){
//     //   child = findParentComponentElement(target, -1);
//     //   child && showComponentMarkerOnComponent(child);
//     // }
//   }
//
//
//   function hideAllMenus() {
//     let elements = Array.from(document.getElementsByClassName('appened-el-child'));
//     elements.forEach((el) => {
//       el.classList.add('hide-menu');
//       el.classList.remove('show-menu');
//     })
//   }
//
//   document.addEventListener('click', function (e: any) {
//     let target: HTMLElement = e.target;
//     if (!hasClass(target, 'appened-el') && !hasClass(target, 'appened-el-child') && !hasClass(target, 'appened-el-child-item')) {
//       // hideAllMenus();
//       removeChildrenWithClassName('appened-el');
//     }
//     if (hasClass(target, 'appened-el-child')) {
//
//       createMenu(target);
//       e.stopPropagation();
//     } else if (hasClass(target, 'appened-el-child-item')) {
//       e.stopPropagation();
//       let action = target.getAttribute('data-item');
//       // @ts-ignore
//       let tagName: string = "";
//       let targetTagName;
//       let component: HTMLElement | null = findParentComponentElement(target, 1);
//       if (action === 'openTs' || action === "openHtml" || action === "") {
//         if (!component) return;
//         // let dataTagName: any = target.parentElement.parentElement.getAttribute('data-tagName');
//         // tagName = dataTagName;
//         tagName = component.tagName;
//       } else if (action === 'openParent') {
//         let component: HTMLElement | null = findParentComponentElement(target, 1);
//         if (!component) return;
//         let parentComponent = findParentComponentElement(component, 1);
//         if (!parentComponent) return;
//         tagName = parentComponent.tagName;
//         targetTagName = component.tagName;
//       } else if (action === 'ReIndex') {
//         sendMessage({type: EWSTypes.reIndex});
//         return;
//       } else if (action === 'ShowBranch') {
//         // sendMessage({type: EWSTypes.reIndex});
//         let component = findParentComponentElement(target, 1);
//         component && showBranches(component);
//         return;
//       } else if (action === 'displayProps') {
//
//         let componentNode: HTMLElement | null = findParentComponentElement(target);
//         if (componentNode) {
//           let componentInstance = getComponentInstanceFromComponentNode(componentNode);
//           let codeStr = stringify1(componentInstance);
//           addOptionsToCodemirrorSelect(componentInstance);
//           setCodeStrInCodeMirror(codeStr);
//           componentInstanceInCodeMirror = componentInstance;
//           initSelect();
//         }
//
//         return;
//       }
//
//       sendMessage({type: EWSTypes.open, payload: {tagName: tagName, targetTagName}});
//     }
//   }, false);
//
//
//   function getComponentInstanceFromComponentNode(component: HTMLElement) {
//     return ng.probe(component).componentInstance;
//   }
//
//   var SELECT_INIT = false;
//
//   function initSelect() {
//     let select = <HTMLSelectElement>document.getElementById('ng-bubble-editor-controls-select');
//     if (!select) return;
//     if (!SELECT_INIT) {
//       select.addEventListener('change', (event: any) => {
//         SELECT_INIT = true;
//         debugger;
//         let key = select.value;
//         let keys: string[];
//         keys = !key || key === 'All' ? [] : [key];
//         let codeStr = stringify1(componentInstanceInCodeMirror, keys);
//         setCodeStrInCodeMirror(codeStr);
//       });
//     }
//   }
//
//   function addOptionsToCodemirrorSelect(componentInstance: object) {
//     let select = document.getElementById('ng-bubble-editor-controls-select');
//     if (!select) return;
//     let str = `<option value="All">All</option>`;
//     Object.keys(componentInstance).forEach((key) => {
//       str += `<option value="${key}">${key}</option>`;
//     });
//     select.innerHTML = str;
//     select.addEventListener('change', () => {
//       // select.value
//     });
//   }
//
//   function setCodeStrInCodeMirror(codeStr: string) {
//     let editor = document.getElementById('ng-bubble-editor');
//     if (editor) {
//       codemirror.getDoc().setValue(codeStr);
//       codemirror.operation(function () {
//         for (var l = codemirror.firstLine(); l <= codemirror.lastLine(); ++l)
//           if (l > 1) {
//             codemirror.foldCode({line: l, ch: 0}, null, "fold");
//           }
//       });
//     }
//   }
//
//
//   /*TODO:check if any key is circular, improve it*/
//   function stringify1(obj: any, keys?: string[]) {
//     let newObj: any = {};
//     let keysToStringify: string[] = (Array.isArray(keys) && keys.length > 0 && keys) || Object.keys(obj);
//     keysToStringify.forEach((key) => {
//       if (typeof obj[key] !== "object") {
//         newObj[key] = obj[key]
//       } else {
//         try {
//           JSON.stringify(obj[key]);
//           newObj[key] = obj[key]
//         } catch (e) {
//           newObj[key] = '[NG BUBBLE ::: CIRCULAR_OBJECT]'
//         }
//       }
//     });
//     return JSON.stringify(newObj, null, "\t");
//   }
//
//   function createMenu(x: HTMLElement) {
//     x.classList.remove('hide-menu');
//   }
//
//   // Array.from(document.getElementsByClassName("appened-el-child")).forEach(function (element) {
//   //   element.addEventListener('click', createMenu);
//   // });
//
//
//   function hasClass(element: HTMLElement, thatClass: string) {
//     // var className = " " + className + " ";
//     return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + thatClass + " ") > -1
//   }
//
//   function toggleHighlightRow(index: number, doHighlight: boolean) {
//     try {
//       let resultRows = document.getElementsByClassName('row-wrapper-item');
//       let ele = resultRows[index];
//       if (doHighlight === false) {
//         ele.classList.remove(BG_HIGHLIGHTED_CLASS);
//       } else {
//         resultRows[index].classList.add(BG_HIGHLIGHTED_CLASS);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
//
//   $search.addEventListener("keydown", function ($event: KeyboardEvent) {
//     console.log($event.keyCode);
//     console.log("keydown pressed");
//     let resultRows = document.getElementsByClassName('row-wrapper-item');
//     toggleHighlightRow(highligtedRowCount, false);
//     if ($event.keyCode === 38) {//up arrow
//       if (highligtedRowCount <= 0) {
//         highligtedRowCount = resultRows.length - 1;
//       } else {
//         highligtedRowCount--;
//       }
//     } else if ($event.keyCode === 40) {// down arrow
//       if (highligtedRowCount >= resultRows.length - 1) {
//         highligtedRowCount = 0;
//       } else {
//         highligtedRowCount++;
//       }
//     }
//
//     if ($event.keyCode === 13) {// enter key
//
//       let searchTerm = (resultRows[highligtedRowCount] as HTMLDivElement).innerText;
//       pathToOpen = <string>getHighlightedRow$().getAttribute('data-path');
//       // sendNgTag(searchTerm, true);
//       sendMessage({
//         type: EWSTypes.getFileByPath,
//         payload: {
//           pathToOpen: pathToOpen
//         }
//       });
//     }
//     toggleHighlightRow(highligtedRowCount, true);
//   });
//
//   var pathToOpen: string;
//
//   function getHighlightedRow$() {
//     return document.getElementsByClassName('row-wrapper-item')[highligtedRowCount]
//   }
//
//   $rowWrapper.addEventListener("click", function ($event: Event) {
//     $event.stopPropagation();
//     let $target = $event.target as HTMLElement;
//     let $row: HTMLElement;
//     let editor: any = "";
//     if (hasClass($target, 'row-wrapper-item')) {
//       $row = $target;
//     } else {
//       $row = $target.parentElement as HTMLElement;
//       /*check if editor logos are clicked*/
//       if (hasClass($target, 'editor-logo')) {
//         editor = $target.getAttribute('data-editor');
//       }
//     }
//     let path: any = $row.getAttribute('data-path');
//     sendMessage({payload: {pathToOpen: path, editor}, type: EWSTypes.openByPath});
//   });
//
//   let $initImg = document.getElementById('init-img') as HTMLImageElement;
//   let $ngBubbleContainer = document.getElementById('ng-bubble-container') as HTMLDivElement;
//   console.log($ngBubbleContainer);
//   $ngBubbleContainer.addEventListener('click', ($event) => {
//     $event.stopPropagation();
//     if ($event.target === $ngBubbleContainer) {
//       toggleSearchBar();
//     }
//   });
//
//   console.log($initImg);
//
//   $initImg.addEventListener('click', () => {
//     toggleSearchBar();
//   });
//
//
//   function toggleSearchBar() {
//
//     if (hasClass($ngBubbleContainer, 'display-none')) {
//       $ngBubbleContainer.classList.remove('display-none');
//     } else {
//       $ngBubbleContainer.classList.add('display-none');
//     }
//   }
//
// }());
// var NG_BUBBLE_IMPORTED = true;