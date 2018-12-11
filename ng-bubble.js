#!/usr/bin/env node

let path = require('path');
let cors = require('cors');
let tcpPortUsed = require('tcp-port-used');

let express = require('express');
let contentDisposition = require('content-disposition');
let pkg = require(path.join(__dirname, 'package.json'));
let url = require('url');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let scan = require('./scan');
let writeTemplate = require('./template');
let folders = [], files = [];

// Parse command line options

let program = require('commander');

program
    .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
    .option('--ctrl <ctrl>', 'Enable click ctrl press along with doubleclick')
    .parse(process.argv);


let port = program.port || 11637;
let ctrl = program.ctrl || 'n';
if (!(ctrl === 'y' || ctrl === 'yes' || ctrl === 'n' || ctrl === 'no')) {
    // throw "ctrl can only have: y, yes, n, no";
    console.log("ERROR: ctrl can only have: y, yes, n, no");
    return;
}
ctrl = ctrl === 'y' || ctrl === 'yes';

// Scan the directory in which the script was called. It will
// add the 'files/' prefix to all files and folders, so that
// download links point to our /files route

let root = process.cwd();
// let tree = scan('.', root);
let tree = scan(root, "");
// console.log(tree);


// Ceate a new express app

let app = express();
app.use(cors());
// Serve static files from the public folder

app.use('/', express.static(path.join(__dirname, 'public')));

// Serve files from the current directory under the /files route

app.use('/files', express.static(process.cwd(), {
    index: false,
    setHeaders: function (res, path) {

        // Set header to force files to download
        // console.log(path);
        res.setHeader('Content-Disposition', contentDisposition(path))

    }
}));

// This endpoint is requested by our frontend JS

app.get('/scan', function (req, res) {
    res.send(tree);
});

app.get('/open', function (req, res) {//path
    files = [];
    folders = [];
    let url_parts = url.parse(req.url, true);
    let file = url_parts.query.file.toLowerCase();

    file = file.replace('app-', '') + '.component.html';
    console.log(file);
    let foundItems = searchData(tree.items, file);
    // console.log(file);
    // console.log(JSON.stringify(tree.items));
    try {
        if (!(foundItems && foundItems.files && foundItems.files.length > 0)) throw "asdas";
        openInVScode(foundItems.files[0].path);
        res.status(200).json(foundItems.files);
    } catch (e) {
        // console.log(JSON.stringify(searchData));
        // res.status(500).send("Error opening the the file");
        res.send(JSON.stringify(searchData));
    }
});

function findPathByFileName(fileName) {
    let absolutePathsOfAllHtmlFilesInProvidedDir = htmlsDebug.split(',');
    // let fileName = this.constructor.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1.').toLowerCase();
    let fileNameDelimitedArr = fileName.toLowerCase().split('-');
    fileName =
        fileNameDelimitedArr.slice(0, fileNameDelimitedArr.length).join('-') + '.component.html';
    fileName = fileName.replace('app-', '');
    return absolutePathsOfAllHtmlFilesInProvidedDir.find(name => name.includes(fileName));
}

async function openInVScode(path) {
    await exec(`code -r ${path}`);
}

function searchData(data, searchTerms) {

    for (let d of data) {
    // data.forEach(function (d) {
        if (d.type === 'folder') {
            searchData(d.items, searchTerms);
            // console.log(d.name.toLowerCase());
            if (d.name.toLowerCase().match(searchTerms)) {
                folders.push(d);
            }
        }
        else if (d.type === 'file') {
            console.log(d.name.toLowerCase(), searchTerms.toLowerCase());
            if (d.name.toLowerCase() === searchTerms.toLowerCase()) {
                files.push(d);
            }
        }
    }
    return {folders: folders, files: files};
}

async function runAppOnFreePort() {

    let inUse = await tcpPortUsed.check(port, '127.0.0.1');
    while (inUse) {
        console.log(`Port ${port} is in use, trying ${port + 1}`);
        inUse = await tcpPortUsed.check(++port, '127.0.0.1');
    }
    writeTemplate(port, ctrl);
    app.listen(port , function () {
        console.log('ng-bubble is Running on port ' + port);
        console.log("Please make sure to add following script into your index.html");
        console.log(`
        <script async src="http://localhost:${port}/assets/js/client.js"></script>
    `)
    });

}

runAppOnFreePort();

