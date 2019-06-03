import * as tslib_1 from "tslib";
import * as fs from 'fs';
import * as path from 'path';
import { getLocalConfig } from "./config";
var SCAN_EXCLUDED = [
    '.',
    'node_modules',
    'out-tsc',
    'dist',
    '!',
    'tmp',
    'lib',
    '.git',
];
module.exports = function scan(dir, alias) {
    var walkRes = walk(dir, alias);
    // 
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
    var localConfig = getLocalConfig();
    var SCAN_EXCLUDED_COMBINED = (localConfig && localConfig.SCAN_EXCLUDED) || [];
    SCAN_EXCLUDED_COMBINED = tslib_1.__spread(SCAN_EXCLUDED_COMBINED, SCAN_EXCLUDED);
    return fs.readdirSync(dir).filter(function (f) {
        var x = SCAN_EXCLUDED.findIndex(function (e) {
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