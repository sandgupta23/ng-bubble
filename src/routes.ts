import {Request, Response} from "express";
import {exactMatchedFileIndex, openInIde, runAppOnFreePort} from "./utility";
import * as url from 'url';
const scan = require('./scan');
const root = process.cwd();

let folders: any[] = [], files: any = [];

export function routesInit(app:any) {
    let ide_user_input = app.locals.ide_user_input;
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
        let pathToBeOpened;
        let url_parts = url.parse(req.url, true);
        pathToBeOpened = url_parts.query.path;
        let ide_clicked = url_parts.query.editor;
        if (!pathToBeOpened) {
            /*if there is no path, get filename and create path*/
            let file = (url_parts.query.file as string).toLowerCase();
            let isExactSearch = url_parts.query.exact;
            let searchTerm = isExactSearch ? file : file.replace('app-', '');
            let foundItems = searchData(tree.items, searchTerm);
            if (!(foundItems && foundItems.files && foundItems.files.length > 0)) throw new Error('"no matching files found"');
            let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
            pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
        }

        try {
            let currentIde = ide_clicked ? ide_clicked : ide_user_input;
            await openInIde(pathToBeOpened, currentIde);
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