"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const config_1 = require("./config");
const SCAN_EXCLUDED = [
    '.',
    'node_modules',
    'out-tsc',
    'dist',
    '!',
    'tmp',
    'dist',
    'lib',
    '.git',
];
module.exports = function scan(dir, alias) {
    let walkRes = walk(dir, alias);
    // console.log(walkRes);
    return {
        name: alias,
        type: 'folder',
        path: alias,
        items: walkRes
    };
};
function walk(dir, prefix) {
    prefix = prefix || '';
    if (!fs.existsSync(dir)) {
        return [];
    }
    let localConfig = config_1.getLocalConfig();
    let SCAN_EXCLUDED_COMBINED = (localConfig && localConfig.SCAN_EXCLUDED) || [];
    SCAN_EXCLUDED_COMBINED = [...SCAN_EXCLUDED_COMBINED, ...SCAN_EXCLUDED];
    return fs.readdirSync(dir).filter(function (f) {
        let x = SCAN_EXCLUDED.findIndex((e) => {
            return e === f || e === f[0];
        }) === -1;
        return x;
    }).map(function (f) {
        var p = (dir + '/' + f).replace('./', ''), stat = fs.statSync(p);
        var complatePath = path.join(prefix, p);
        if (stat.isDirectory()) {
            return {
                name: f,
                type: 'folder',
                path: prefix + '/' + p,
                items: walk(p, prefix)
            };
        }
        return {
            name: f,
            type: 'file',
            path: complatePath,
            size: stat.size
        };
    });
}
;
//# sourceMappingURL=scan.js.map