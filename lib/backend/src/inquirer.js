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
const enums_1 = require("../enums");
const utility_1 = require("./utility");
const enum_1 = require("../../enum");
const fs = require("fs");
const inquirer = require('inquirer');
function inquirerInit(localconfig, askAll) {
    return __awaiter(this, void 0, void 0, function* () {
        let answerObj = {};
        let angularConfigDetails = utility_1.getAngularConfig();
        answerObj.framework = enum_1.EFramework.ANGULAR; //temp
        /*
        //TODO: use following for react support
        if (angularConfigDetails) answerObj.framework = EFramework.ANGULAR;
        else {
          answerObj.framework = (await inquirer.prompt([{
            type: 'list',
            message: 'Please select your framework.',
            name: 'framework',
            choices: [EFramework.ANGULAR, EFramework.REACT]
          }])).framework
        }
        */
        /**
         * Our only goal here is to know angular prefix.
         * If its angular project, detect or ask for component prefix
         * */
        answerObj.componentSelector = localconfig.componentSelector;
        if (!answerObj.angularPrefix && angularConfigDetails) {
            let config = JSON.parse(fs.readFileSync(angularConfigDetails.path).toString());
            if (angularConfigDetails.version >= 5) {
                let projectName = config['defaultProject'];
                if (!projectName) {
                    let projects = utility_1.getAngular5Projects(config);
                    projectName = (yield inquirer.prompt([{
                            type: 'list',
                            message: 'Please select your Project.',
                            name: 'projectName',
                            choices: projects
                        }])).projectName;
                }
                answerObj.angularPrefix = config['projects'][projectName].prefix;
            }
            else {
                answerObj.angularPrefix = utility_1.getAngular2Prefix(config);
            }
        }
        if (askAll || !answerObj.angularPrefix) {
            answerObj.angularPrefix = (yield inquirer.prompt([{
                    type: 'input',
                    message: 'What is your component selector prefix (default = app)?',
                    name: 'angularPrefix',
                }])).angularPrefix;
        }
        /**
         * try to figure out IDE else prompt if not sure.
         * Problem: auto detection of ide isnt always accurate.
         * As of now we have to ask manually, if ide info doesnt exist
         * */
        let isVscode = false; //checkIfVscode();
        let isWebstorm = false; //checkIfWebstorm();
        if (askAll || localconfig.preferredIde !== enums_1.EIdeNames.WEBSTORM && localconfig.preferredIde !== enums_1.EIdeNames.VSCODE) {
            answerObj.preferredIde = (yield inquirer.prompt([{
                    type: 'list',
                    message: 'Please select your IDE?',
                    name: 'preferredIde',
                    choices: [enums_1.EIdeNames.WEBSTORM, enums_1.EIdeNames.VSCODE]
                }])).preferredIde;
        }
        else {
            answerObj.preferredIde = localconfig.preferredIde;
        }
        return answerObj;
    });
}
exports.inquirerInit = inquirerInit;
//# sourceMappingURL=inquirer.js.map