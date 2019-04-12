"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendData(ws, data) {
    let parsedData = '';
    try {
        parsedData = JSON.stringify(data);
    }
    catch (e) {
    }
    ws.send(parsedData);
}
exports.sendData = sendData;
//# sourceMappingURL=ws.js.map