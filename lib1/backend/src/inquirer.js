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
function inquirerInit() {
    return __awaiter(this, void 0, void 0, function* () {
        let answerObj = {};
        let angularConfigDetails = utility_1.getAngularConfig();
        if (angularConfigDetails)
            answerObj.framework = enum_1.EFramework.ANGULAR;
        else {
            answerObj.framework = inquirer.prompt([{
                    type: 'list',
                    message: 'Please select your framework.',
                    name: 'ide',
                    choices: [enum_1.EFramework.ANGULAR, enum_1.EFramework.REACT]
                }]);
        }
        /*if its angular project, detect or ask for component prefix*/
        if (angularConfigDetails) {
            let config = fs.readFileSync(angularConfigDetails.path).toString();
            if (angularConfigDetails.version >= 5) {
                answerObj.angularPrefix = utility_1.getAngular2Prefix(config);
            }
            else {
                let projectName = config['defaultProject'];
                if (!projectName) {
                    let projects = utility_1.getAngular5Project(config);
                    projectName = yield inquirer.prompt([{
                            type: 'list',
                            message: 'Please select your Project.',
                            name: 'ide',
                            choices: projects
                        }]);
                }
                answerObj.angularPrefix = config['projects'][projectName].prefix;
            }
        }
        /*try to figure out IDE else prompt if not sure*/
        let isVscode = utility_1.checkIfVscode();
        let isWebstorm = utility_1.checkIfWebstorm();
        if (isVscode && isWebstorm || (!isVscode && !isWebstorm)) {
            answerObj.preferredIde = yield inquirer.prompt([{
                    type: 'list',
                    message: 'Please select your IDE.',
                    name: 'ide',
                    choices: [enums_1.EIdeNames.WEBSTORM, enums_1.EIdeNames.VSCODE]
                }]);
        }
        else {
            answerObj.preferredIde = isVscode ? enums_1.EIdeNames.VSCODE : enums_1.EIdeNames.WEBSTORM;
        }
        return answerObj;
    });
}
exports.inquirerInit = inquirerInit;
//# sourceMappingURL=inquirer.js.map