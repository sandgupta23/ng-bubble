"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
const url = require("url");
const config_1 = require("./config");
const scan = require('./scan');
const root = process.cwd();
// const root = "D:\\nodebook\\master_bot_plateform\\bot_platform-fe";
let folders = [], files = [];
function routesInit(app) {
    let localConfig = config_1.getLocalConfig();
    let ide_user_input = localConfig && localConfig.preferredIde;
    let tree = scan(root, "");
    app.get('/scan', function (req, res) {
        res.send(tree);
    });
    app.get('/search', function (req, res) {
        files = [];
        folders = [];
        let url_parts = url.parse(req.url, true);
        let file = url_parts.query.file.toLowerCase();
        let pathToBeOpened;
        try {
            let foundItems = searchData(tree.items, file);
            res.status(200).json(foundItems);
        }
        catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });
    app.get('/open', (req, res) => __awaiter(this, void 0, void 0, function* () {
        files = [];
        folders = [];
        let pathToBeOpened, codeText, data = { classList: [], id: "", tagName: "", innerText: "" };
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        pathToBeOpened = query.path;
        try {
            data = query.data && JSON.parse(query.data);
        }
        catch (e) {
            res.status(401).send("can't parse data");
            console.log("can't parse");
        }
        codeText = query.codeText;
        let ide_clicked = query.editor;
        if (!pathToBeOpened) {
            /*if there is no path, get filename and create path*/
            let file = query.file.toLowerCase();
            let isExactSearch = query.exact === "true";
            let searchTerm = isExactSearch ? file : file.replace('app-', '');
            let foundItems = searchData(tree.items, searchTerm);
            if (!(foundItems && foundItems.files && foundItems.files.length > 0)) {
                res.status(200).json({ messgage: "ng-bubble: no matching file found", index: tree.items });
                return;
            }
            let exactMatchIndex = utility_1.exactMatchedFileIndex(foundItems, searchTerm);
            pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
        }
        try {
            let currentIde = ide_clicked ? ide_clicked : ide_user_input;
            yield utility_1.openInIde(pathToBeOpened, currentIde, codeText, data);
            res.status(200).json("ng-bubble: success");
        }
        catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    }));
    function searchData(data, searchTerms) {
        /*TODO: make it a pure function*/
        for (let d of data) {
            if (d.type === 'folder') {
                searchData(d.items, searchTerms);
                if (d.name.toLowerCase().match(searchTerms)) {
                    folders.push(d);
                }
            }
            else if (d.type === 'file') {
                if (d.name.toLowerCase().match(searchTerms)) {
                    files.push(d);
                }
            }
        }
        return { folders: folders, files: files };
    }
}
exports.routesInit = routesInit;
//# sourceMappingURL=routes.js.map