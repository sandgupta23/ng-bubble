export const DOM = function() {
  let $root;
  let init = function ($shadow: ShadowRoot) {
    console.log($shadow);

    $shadow.innerHTML += `
<img id="init-img" class="radiate-out-on-hover" style=""
     src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/magnifyingglass-512.png" alt="">
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
     <link rel="stylesheet" href="http://localhost:11637/assets/css/codemirror/night.css">
     <link rel="stylesheet" href="http://localhost:11637/assets/css/codemirror/night.css">
     <link rel="stylesheet" href="http://localhost:11637/assets/css/styles.css"></link>
     <script src="http://localhost:11637/assets/js/codemirror/addon/brace-fold.js"></script>
     <script src="http://localhost:11637/assets/js/codemirror/addon/foldcode.js"></script>
     <script src="http://localhost:11637/assets/js/codemirror/addon/foldgutter.js"></script>
     <script src="http://localhost:11637/assets/js/codemirror/addon/markdown-fold.js"></script>

<div style="width: 30vw; min-width: 400px; background-color: rgb(51, 51, 51); color: #ccc; position: fixed; right: 0;bottom: 0; z-index:100000000000000; display: flex;flex-direction: column;">
 
  <div id="ng-bubble-editor-controls-1" style="display: flex; justify-content: flex-end; height: 40px; align-items: flex-end; padding-bottom: 5px; background-color: rgb(60, 60, 60)"> 
  <i style="font-size: 12px;
    margin-left: 10px; color: #cccccc">app.component.html</i>
  <select id="ng-bubble-editor-controls-select"></select>
  <span style="margin-left: auto" "></span>
    <i id="window-maximize" class="fa fa-expand" style="margin-right: 10px"></i>
    <i id="window-minimize" class="fa fa-window-minimize" style="margin-right: 10px"></i>
    <!--<span>📝</span>-->
    <!--<span id="ng-bubble-editor-controls-1-name" style="margin-left: auto"></span>-->
  </div>
  
  <!--<div id="ng-bubble-editor-controls-2" style="display: flex; justify-content: flex-end">-->
    <!--<span>🔄</span>-->
    <!--<span>⬅️</span>-->
    <!--<span>➡️</span>-->
    <!--<span>⬆️</span>-->
    <!--<span style="margin-right: auto">⬇️</span>-->
    <!---->
    <!--<select id="ng-bubble-editor-controls-select">-->
      <!---->
    <!--</select>-->
    <!---->
    <!---->
    <!--<span title="Save changes" style="margin-right: 10px">💾</span>-->
    <!--<span title="Minimize">🗕</span>-->
  <!--</div>-->
  <!--TODO: remove display: none;-->
  <div id="editor-body" style="display: flex;width: 100%;flex-grow: 1; position: relative; height: 30vw; display: none;">
    <div style="flex-basis: 40px; flex-shrink: 0; display: flex;   flex-direction: column; align-items: center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg" class="vs-code-grey">
    <i class="fa fa-search"></i>
    <i id="save-editor" class="fa fa-save"></i>
    <i class="fa fa-repeat" style="font-size: 13px !important;"></i>
    <i class="fa fa-angle-left"></i>
    <i class="fa fa-angle-right"></i>
    <i class="fa fa-angle-down"></i>
    <i class="fa fa-angle-up"></i>
</div>
    <textarea style="height: 100%; flex-grow: 1; background-color: black; border: 1px solid black" id="ng-bubble-editor"></textarea>
    <div id="ng-bubble-container" class="display-none">
    <main class="ng-bubble-autocomplete">
        <div style="position: relative;">
            <input id="ng-bubble-search" type="text"
            placeholder="Search files and folders"
                   autofocus
                   style="height: 30px; width: 100%;
                   outline: none;
           border: 1px solid transparent;
           font-size: 11px;
           color: white;
            padding-left: 10px; background-color: rgba(60, 60, 60, 0.90)!important">
            <!--<img class="ng-bubble-icon"-->
                 <!--style="position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%; max-height: 100px"-->
                 <!--src="http://localhost:11637/assets/imgs/ng-bubble-icon.png" alt="">-->
            <div id="row-wrapper" style="position: absolute; top: 100%; left: 0; right: 0">
                <!--<div style="padding: 7px; border: 1px solid #e95420;">-->
                    <!--<strong style="font-size: 11px; color:  #ccc">Search files and folders</strong>-->
                <!--</div>-->
            </div>
        </div>

    </main>

</div>
  </div>
</div>


<!--<div id="ng-bubble-container" class="display-none" style="background-color: rgba(233,84,32,0.29)">-->
    <!--<main class="ng-bubble-autocomplete">-->
        <!--<div style="position: relative;">-->
            <!--<input id="ng-bubble-search" type="text"-->
                   <!--autofocus-->
                   <!--style="height: 44px; width: 100%;-->
                   <!--border-top-left-radius: 8px;-->
                   <!--border-top-right-radius: 8px;-->
                   <!--outline: none;-->
           <!--border: 1px solid #a3421c;-->
           <!--font-size: 30px;-->
           <!--color: white;-->
            <!--padding-left: 10px; background-color: rgba(233,84,32,0.64)!important">-->
            <!--<img class="ng-bubble-icon"-->
                 <!--style="position: absolute; right: 3%; height: 70%; transform: translateY(50%); bottom: 50%; max-height: 100px"-->
                 <!--src="http://localhost:11637/assets/imgs/ng-bubble-icon.png" alt="">-->
            <!--<div id="row-wrapper" style="position: absolute; top: 100%; left: 0; right: 0">-->
                <!--<div style="padding: 7px; border: 1px solid #e95420;">-->
                    <!--<strong style="font-size: 13px; color:  #e95420">Search files and folders</strong>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

    <!--</main>-->

<!--</div>-->
`;
  }
};