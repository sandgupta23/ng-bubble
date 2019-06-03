// const fs = require('fs');
import * as fs from 'fs';
var path = require('path');
function getTemplate(port, shouldUseMouseClick) {
    return ("\n        let el = document.createElement('js-bubble');\n        let src = document.createElement('script');\n        src.setAttribute('src', 'http://localhost:" + port + "/assets/js/js-bubble.js');\n        let body = document.body;\n        body.appendChild(el);\n        body.appendChild(src);\n      ");
}
module.exports = function writeTemplate(port, shouldUseMouseClick) {
    try {
        fs.writeFileSync(path.join(__dirname, '../../../', 'public/assets/js/init.js'), getTemplate(port, shouldUseMouseClick), { flag: 'w' });
    }
    catch (e) {
    }
};
//# sourceMappingURL=template.js.map