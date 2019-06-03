export function sendData(ws, data) {
    var parsedData = '';
    try {
        parsedData = JSON.stringify(data);
    }
    catch (e) {
    }
    ws.send(parsedData);
}
//# sourceMappingURL=ws.js.map