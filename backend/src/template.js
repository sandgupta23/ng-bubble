"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
function getTemplate(port, shouldUseMouseClick) {
    let shouldUseMouseClickText = 'if (!window.event.ctrlKey) return';
    return `
let startWithAppRegex = new RegExp('^app-','i');
document.addEventListener('dblclick',($event)=>{
    ${shouldUseMouseClick ? shouldUseMouseClickText : ""}
    let element = $event.target;
    while (!startWithAppRegex.test(element.tagName)){
        element = element.parentElement;
    }
    sendNgTag(element.tagName);
});

function sendNgTag(tag) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
        }
    };
    xhttp.open("GET", \`http://localhost:${port}/open?file=\${tag}\`, true);
    xhttp.send();
}
`;
}
module.exports = function writeTemplate(port, shouldUseMouseClick) {
    // try {
    //     fs.writeFileSync(path.join(__dirname, 'public/assets/js/client.js'), getTemplate(port, shouldUseMouseClick));
    // }catch (e) {
    //     console.error(e);
    // }
};
//# sourceMappingURL=template.js.map