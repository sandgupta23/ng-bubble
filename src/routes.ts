import {Request, Response} from "express";
import {exactMatchedFileIndex, openInIde, runAppOnFreePort} from "./utility";
import * as url from 'url';
import {ILineFinderData} from "./line-finder";
import {getLocalConfig} from "./config";
const scan = require('./scan');
const root = process.cwd();
// const root = "D:\\nodebook\\master_bot_plateform\\bot_platform-fe";

let folders: any[] = [], files: any = [];

export function routesInit(app:any) {
    let localConfig = getLocalConfig();
    let ide_user_input = localConfig && localConfig.preferredIde;
    let tree = scan(root, "");

    app.get('/scan', function (req :Request, res: Response) {
        res.send(tree);
    });

    app.get('/search', function (req :Request, res: Response) {//path
        files = [];
        folders = [];
        let url_parts = url.parse(req.url, true);
        let file = (url_parts.query.file as string).toLowerCase();
        let pathToBeOpened;
        try {
            let foundItems = searchData(tree.items, file);
            res.status(200).json(foundItems);
        } catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });

    app.get('/open', async (req :Request, res: Response) => {//path
        files = [];
        folders = [];
        let pathToBeOpened, codeText:string, data: ILineFinderData = {classList:[], id:"", tagName:"", innerText: ""};
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        pathToBeOpened = query.path;
        try {
            data = query.data && JSON.parse(<string>query.data);
        }catch (e) {
            res.status(401).send("can't parse data");
            console.log("can't parse");
        }
        codeText = query.codeText as string;
        let ide_clicked = query.editor;
        if (!pathToBeOpened) {
            /*if there is no path, get filename and create path*/
            let file = (query.file as string).toLowerCase();
            let isExactSearch = query.exact === "true" ;
            let searchTerm = isExactSearch ? file : file.replace('app-', '');
            let foundItems = searchData(tree.items, searchTerm);
            if (!(foundItems && foundItems.files && foundItems.files.length > 0)){
                res.status(200).json({messgage:"ng-bubble: no matching file found", index: tree.items});
                return;
            }
            let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
            pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
        }

        try {
            let currentIde = ide_clicked ? ide_clicked : ide_user_input;
            await openInIde(pathToBeOpened, currentIde, codeText, data);
            res.status(200).json("ng-bubble: success");
        } catch (e) {
            console.error(e);
            res.status(422).send(e);
        }
    });

    function searchData(data:any, searchTerms:string) {
    /*TODO: make it a pure function*/
        for (let d of data) {
            if (d.type === 'folder') {
                searchData(d.items, searchTerms);
                if (d.name.toLowerCase().match(searchTerms)) {
                    folders.push(d);
                }
            } else if (d.type === 'file') {
                if (d.name.toLowerCase().match(searchTerms)) {
                    files.push(d);
                }
            }
        }
        return {folders: folders, files: files};
    }


}