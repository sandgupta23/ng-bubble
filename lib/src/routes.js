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
const scan = require('./scan');
const root = process.cwd();
let folders = [], files = [];
function routesInit(app) {
    let ide_user_input = app.locals.ide_user_input;
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
        let pathToBeOpened;
        let url_parts = url.parse(req.url, true);
        pathToBeOpened = url_parts.query.path;
        let ide_clicked = url_parts.query.editor;
        if (!pathToBeOpened) {
            /*if there is no path, get filename and create path*/
            let file = url_parts.query.file.toLowerCase();
            let isExactSearch = url_parts.query.exact;
            let searchTerm = isExactSearch ? file : file.replace('app-', '');
            let foundItems = searchData(tree.items, searchTerm);
            if (!(foundItems && foundItems.files && foundItems.files.length > 0))
                throw new Error('"no matching files found"');
            let exactMatchIndex = utility_1.exactMatchedFileIndex(foundItems, searchTerm);
            pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
        }
        try {
            let currentIde = ide_clicked ? ide_clicked : ide_user_input;
            yield utility_1.openInIde(pathToBeOpened, currentIde);
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