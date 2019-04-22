"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require('fs');
const fs = require("fs");
var path = require('path');
function getTemplate(port, shouldUseMouseClick) {
    // let el = document.createElement('js-bubble');
    // let src = document.createElement('src');
    // src.setAttribute('src', `http://localhost:${port}/assets/js/js-bubble.js`);
    // let body = document.body;
    // body.appendChild(el);
    // body.appendChild(src);
    return (`
        let el = document.createElement('js-bubble');
        let src = document.createElement('script');
        src.setAttribute('src', 'http://localhost:${port}/assets/js/js-bubble.js');
        let body = document.body;
        body.appendChild(el);
        body.appendChild(src);
      `);
}
module.exports = function writeTemplate(port, shouldUseMouseClick) {
    try {
        fs.writeFileSync(path.join(__dirname, '../../../', 'public/assets/js/init.js'), getTemplate(port, shouldUseMouseClick), { flag: 'w' });
    }
    catch (e) {
        //console.error(e);
    }
};
//# sourceMappingURL=template.js.map