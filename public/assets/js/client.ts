/*TODO: this should not be needed*/
interface IWSData {
  type: EWSTypes,
  error?: number,
  errorMessage?: string,
  payload?: ILineFinderData
}

//TODO: duplicate interfaces and enums
enum EWSTypes {
  SEARCH = 'SEARCH',
  open = 'open',
  openByPath = 'openByPath',
  reIndex = 'reIndex',
  ack = 'ack',
}

interface ILineFinderData {
  id?: string,
  tagName?: string,
  targetTagName?: string,
  classList?: string[],
  innerText?: string,
  file?: string,
  pathToOpen?: string
  editor?: string,
  action?: string,
}


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

  let awaitingResponses = {};
  let socket = new WebSocket("ws://localhost:11640");
  socket.onopen = function (event) {
    console.log("ws started");
  };
  socket.onclose = function (event) {
    console.log(event);
    // alert('ws closed');
    setTimeout(() => {
      location.reload();
    }, 2000)
  };
  socket.onerror;
  socket.onmessage = function (event) {

    toggleLoader(false);
    let data: IWSData = JSON.parse(event.data);


    if (data.type === EWSTypes.SEARCH) {

      let payload: any = data.payload;
      let files = payload.files;
      let newRowsStr = "";
      files.forEach((file: any) => {
        newRowsStr +=
          `<div class="row-wrapper-item" style="display: flex; align-content: center" title=${file.path} data-path=${file.path}>
                        <span>${file.name}</span>
                        <img class="editor-logo" data-editor="webstorm" title="Open in Webstorm" style="width: 15px; height: 15px; margin-right: 5px; margin-left: auto" src="http://resources.jetbrains.com/storage/products/webstorm/img/meta/webstorm_logo_300x300.png" alt="">
                        <img class="editor-logo" data-editor="vscode" title="Open in VScode" style="width: 15px; height: 15px; margin-right: 10px" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg" alt="">
                     </div>`;
      });
      $rowWrapper.innerHTML = newRowsStr;
    }

  };

  function sendMessage(data: IWSData) {
    console.log("sendMessage", data);
    socket.send(JSON.stringify(data));
  }


  if ((<any>window).NG_BUBBLE_IMPORTED) {
    console.error("Error: ng-bubble has been imported more than once");
    return;
  }
  let $body = document.getElementsByTagName('body')[0];

  $body.innerHTML += `
<!--<img id="init-img" class="radiate-out-on-hover" style=""-->
     <!--src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png" alt="">-->
<div id="init-img" class="radiate-out-on-hover ">
    <img class="ng-bubble-icon" style="width: 100%; height: 100%"
     src="http://localhost:11637/assets/imgs/ng-bubble-icon.png" alt="">
</div>

<div id="ng-bubble-container" class="display-none" style="background-color: rgba(233,84,32,0.29)">
    <main class="ng-bubble-autocomplete">
        <div style="position: relative;">
            <input id="ng-bubble-search" type="text"
                   autofocus
                   style="height: 44px; width: 100%;
                   border-top-left-radius: 8px;
                   border-top-right-radius: 8px;
                   outline: none;
           border: 1px solid #a3421c;
           font-size: 30px;
           color: white;
            padding-left: 10px; background-color: rgba(233,84,32,0.64)!important">
            <img class="ng-bubble-icon"
                 style="position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%; max-height: 100px"
                 src="http://localhost:11637/assets/imgs/ng-bubble-icon.png" alt="">
            <div id="row-wrapper" style="position: absolute; top: 100%; left: 0; right: 0">
                <div style="padding: 7px; border: 1px solid #e95420;">
                    <strong style="font-size: 13px; color:  #e95420">Search files and folders</strong>
                </div>
            </div>
        </div>

    </main>

</div>
`;


  let startWithAppRegex = new RegExp('^app-', 'i');
  const BACKEND_ROOT = 'http://localhost:11637';
  const BG_HIGHLIGHTED_CLASS = 'bg-highlighted';
  document.addEventListener('dblclick', ($event) => {

    toggleLoader(true);
    let target = $event.target as HTMLElement;
    let componentNode: HTMLElement | null = findParentComponentElement(target);
    // while (!startWithAppRegex.test(componentNode.tagName)) {
    //   componentNode = componentNode.parentElement as HTMLElement;
    // }
    let codeText = "";//element.innerHTML;;
    if (!componentNode) {
      console.log("NG-BUBBLE:: COULDNT FIND COMPONENT");
    }
    let payload: ILineFinderData = {
      tagName: componentNode && componentNode.tagName || "",
      targetTagName: target.tagName,
      id: target.id,
      classList: Array.from(target.classList),
      innerText: target.innerText
    };
    console.log(target);
    sendMessage({type: EWSTypes.open, payload});
  });

  function findParentComponentElement(el: HTMLElement, parentLevel: number = 1): HTMLElement | null {
    let level = 0;
    while (level !== parentLevel && el.tagName !== 'body') {
      el = el.parentElement as HTMLElement;
      if (startWithAppRegex.test(el.tagName)) {
        level++;
      }
    }
    return level === parentLevel ? el : null;
  }

  function toggleLoader(show: boolean) {

    let image = show ? 'http://localhost:11637/assets/imgs/loader-svg.svg' : 'http://localhost:11637/assets/imgs/ng-bubble-icon.png';
    let logoElements: HTMLCollection = document.getElementsByClassName('ng-bubble-icon');
    for (let key in logoElements) {
      (<any>logoElements[key]).src = image;
    }

  }

  function makeGetReq(url: string) {
    toggleLoader(true);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${BACKEND_ROOT}/${url}`, true);
    xhttp.send();
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("success");
          console.log(xhttp.responseText);
          try {
            resolve(JSON.parse(xhttp.responseText));
          } catch (e) {
            reject("something went wrong");
          } finally {
            toggleLoader(false);
          }
        }
      };
    })
  }

  function sendNgTag(payload: ILineFinderData) {


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

  function getFileNames(searchTerm: string) {
    new Promise((resolve, reject) => {

    })
  }


  let $search = document.getElementById('ng-bubble-search') as HTMLInputElement;
  let $rowWrapper = document.getElementById('row-wrapper') as HTMLDivElement;
  let resultRows = document.getElementsByClassName('row-wrapper-item');
  $search.addEventListener("input", function ($event) {
    let searchTerm = $search.value;
    sendMessage({type: EWSTypes.SEARCH, payload: {file: searchTerm}});
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

  let highligtedRowCount = -1;

  console.log("helloooooooooooooooooooooooooo")

  let $Component: HTMLElement;
  let $hoveredComponentOriginalInnerHtml: string;
  let $appenededElement: HTMLElement;
  let $appenededElements: HTMLElement[] = [];

  function removeChildFromParent($el: HTMLElement) {
    let parent = $el.parentElement;
    // if(parent) parent.removeChild($el);
  }

  function removeChildrenWithClassName(className: string) {
    let elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((el) => {
      el.parentNode && el.parentNode.removeChild(el);
    });
  }

  document.addEventListener('mouseover', ($event) => {
    if (!$event.ctrlKey) {
      return;
    }
    let target = $event.target as HTMLElement;

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

    let $parentComponentElement = findParentComponentElement(target, 1);
    if (!$parentComponentElement) return;
    $Component = $parentComponentElement;
    $appenededElement = showComponentMarkerOnComponent($Component);
    $appenededElements.push($appenededElement);
    console.log($appenededElements);

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

  function showComponentMarkerOnComponent($component: HTMLElement): HTMLElement {
    $component.classList.add('hovered-parent');
    // $hoveredComponentOriginalInnerHtml = $component.innerHTML;
    $appenededElement = createComponentMarker($component.tagName);
    $component.insertBefore($appenededElement, $component.firstChild);
    return $appenededElement;
  }


  function createComponentMarker(hoveredComponentTagName: string) {
    hoveredComponentTagName = hoveredComponentTagName.split('-').join('_');
    // console.log(hoveredComponentTagName);
    let span0 = document.createElement('SPAN');
    span0.classList.add('appened-el');
    span0.appendChild(document.createTextNode(hoveredComponentTagName));

    let span01 = document.createElement('SPAN');
    // span01.appendChild(document.createTextNode(hoveredComponentTagName));
    span01.classList.add('appened-el-child');
    span01.classList.add('hide-menu');

    let ul02 = document.createElement('UL');
    let li21 = document.createElement('li');
    let li22 = document.createElement('li');
    let li23 = document.createElement('li');
    let li24 = document.createElement('li');
    [li21, li22, li23, li24].forEach((el) => {
      el.classList.add('appened-el-child-item');
    });

    let openHtml = document.createTextNode('openHtml');
    let openParent = document.createTextNode('openParent');
    let ShowBranch = document.createTextNode('ShowBranch');
    let ReIndex = document.createTextNode('ReIndex');

    let openHtmlAttr = document.createAttribute('data-item');
    let openParentAttr = document.createAttribute('data-item');
    let ShowBranchAttr = document.createAttribute('data-item');
    let ReIndexAttr = document.createAttribute('data-item');

    openHtmlAttr.value = 'openHtml';
    openParentAttr.value = 'openParent';
    ShowBranchAttr.value = 'ShowBranch';
    ReIndexAttr.value = 'ReIndex';

    li21.appendChild(openHtml);
    li22.appendChild(openParent);
    li23.appendChild(ShowBranch);
    li24.appendChild(ReIndex);

    li21.setAttributeNode(openHtmlAttr);
    li22.setAttributeNode(openParentAttr);
    li23.setAttributeNode(ShowBranchAttr);
    li24.setAttributeNode(ReIndexAttr);

    ul02.appendChild(li21);
    ul02.appendChild(li22);
    ul02.appendChild(li23);
    ul02.appendChild(li24);

    span01.appendChild(ul02);
    span0.appendChild(span01);
    return span0;
  }

  function showBranches(target: HTMLElement) {
    let parent: HTMLElement | null = target, child: HTMLElement | null = target;
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
    let elements = Array.from(document.getElementsByClassName('appened-el-child'));
    elements.forEach((el)=>{
      el.classList.add('hide-menu');
      el.classList.remove('show-menu');
    })
  }

  document.addEventListener('click', function (e: any) {
    let target: HTMLElement = e.target;
    if (!hasClass(target, 'appened-el') && !hasClass(target, 'appened-el-child') && !hasClass(target, 'appened-el-child-item')) {
      // hideAllMenus();
      removeChildrenWithClassName('appened-el');
    }
    if (hasClass(target, 'appened-el-child')) {

      createMenu(target);
      e.stopPropagation();
    } else if (hasClass(target, 'appened-el-child-item')) {
      e.stopPropagation();
      let action = target.getAttribute('data-item');
      // @ts-ignore
      let tagName: string = "";
      let targetTagName;
      let component: HTMLElement | null = findParentComponentElement(target, 1);
      if (action === 'openTs' || action === "openHtml" || action === "") {
        if (!component) return;
        // let dataTagName: any = target.parentElement.parentElement.getAttribute('data-tagName');
        // tagName = dataTagName;
        tagName = component.tagName;
      } else if (action === 'openParent') {
        let component: HTMLElement | null = findParentComponentElement(target, 1);
        if (!component) return;
        let parentComponent = findParentComponentElement(component, 1);
        if (!parentComponent) return;
        tagName = parentComponent.tagName;
        targetTagName = component.tagName;
      } else if (action === 'ReIndex') {
        sendMessage({type: EWSTypes.reIndex});
        return;
      } else if (action === 'ShowBranch') {
        // sendMessage({type: EWSTypes.reIndex});
        let component = findParentComponentElement(target, 1);
        component && showBranches(component);
        return;
      }

      sendMessage({type: EWSTypes.open, payload: {tagName: tagName, targetTagName}});
    }
  }, false);

  function createMenu(x: HTMLElement) {
    x.classList.remove('hide-menu');
  }

  // Array.from(document.getElementsByClassName("appened-el-child")).forEach(function (element) {
  //   element.addEventListener('click', createMenu);
  // });


  function hasClass(element: HTMLElement, thatClass: string) {
    // var className = " " + className + " ";
    return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + thatClass + " ") > -1
  }

  function toggleHighlightRow(index: number, doHighlight: boolean) {
    try {
      let resultRows = document.getElementsByClassName('row-wrapper-item');
      let ele = resultRows[index];
      if (doHighlight === false) {
        ele.classList.remove(BG_HIGHLIGHTED_CLASS);
      } else {
        resultRows[index].classList.add(BG_HIGHLIGHTED_CLASS);
      }
    } catch (e) {
      console.log(e);
    }
  }

  $search.addEventListener("keydown", function ($event: KeyboardEvent) {
    console.log($event.keyCode);
    console.log("keydown pressed");
    let resultRows = document.getElementsByClassName('row-wrapper-item');
    toggleHighlightRow(highligtedRowCount, false);
    if ($event.keyCode === 38) {//up arrow
      if (highligtedRowCount <= 0) {
        highligtedRowCount = resultRows.length - 1;
      } else {
        highligtedRowCount--;
      }
    } else if ($event.keyCode === 40) {// down arrow
      if (highligtedRowCount >= resultRows.length - 1) {
        highligtedRowCount = 0;
      } else {
        highligtedRowCount++;
      }
    }

    if ($event.keyCode === 13) {// enter key

      let searchTerm = (resultRows[highligtedRowCount] as HTMLDivElement).innerText;
      let path: any = getHighlightedRow$().getAttribute('data-path');
      // sendNgTag(searchTerm, true);
      sendMessage({
        type: EWSTypes.openByPath,
        payload: {
          pathToOpen: path
        }
      });
    }
    toggleHighlightRow(highligtedRowCount, true);
  });


  function getHighlightedRow$() {
    return document.getElementsByClassName('row-wrapper-item')[highligtedRowCount]
  }

  $rowWrapper.addEventListener("click", function ($event: Event) {
    $event.stopPropagation();
    let $target = $event.target as HTMLElement;
    let $row: HTMLElement;
    let editor: any = "";
    if (hasClass($target, 'row-wrapper-item')) {
      $row = $target;
    } else {
      $row = $target.parentElement as HTMLElement;
      /*check if editor logos are clicked*/
      if (hasClass($target, 'editor-logo')) {
        editor = $target.getAttribute('data-editor');
      }
    }
    let path: any = $row.getAttribute('data-path');
    sendMessage({payload: {pathToOpen: path, editor}, type: EWSTypes.openByPath});
  });

  let $initImg = document.getElementById('init-img') as HTMLImageElement;
  let $ngBubbleContainer = document.getElementById('ng-bubble-container') as HTMLDivElement;
  console.log($ngBubbleContainer);
  $ngBubbleContainer.addEventListener('click', ($event) => {
    $event.stopPropagation();
    if ($event.target === $ngBubbleContainer) {
      toggleSearchBar();
    }
  });

  console.log($initImg);

  $initImg.addEventListener('click', () => {
    toggleSearchBar();
  });

  function toggleSearchBar() {

    if (hasClass($ngBubbleContainer, 'display-none')) {
      $ngBubbleContainer.classList.remove('display-none');
    } else {
      $ngBubbleContainer.classList.add('display-none');
    }
  }

}());
var NG_BUBBLE_IMPORTED = true;