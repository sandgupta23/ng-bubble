import * as tslib_1 from "tslib";
import { EIdeNames } from "../enums";
import { getAngularConfig, getAngular2Prefix, getAngular5Projects } from "./utility";
import { EFramework } from "../../enum";
import * as fs from 'fs';
var inquirer = require('inquirer');
export function inquirerInit(localconfig, askAll) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var answerObj, angularConfigDetails, config, projectName, projects, _a, isVscode, isWebstorm, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    answerObj = {};
                    angularConfigDetails = getAngularConfig();
                    answerObj.framework = EFramework.ANGULAR; //temp
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
                    if (!(!answerObj.angularPrefix && angularConfigDetails)) return [3 /*break*/, 4];
                    config = JSON.parse(fs.readFileSync(angularConfigDetails.path).toString());
                    if (!(angularConfigDetails.version >= 5)) return [3 /*break*/, 3];
                    projectName = config['defaultProject'];
                    if (!!projectName) return [3 /*break*/, 2];
                    projects = getAngular5Projects(config);
                    return [4 /*yield*/, inquirer.prompt([{
                                type: 'list',
                                message: 'Please select your Project.',
                                name: 'projectName',
                                choices: projects
                            }])];
                case 1:
                    projectName = (_c.sent()).projectName;
                    _c.label = 2;
                case 2:
                    answerObj.angularPrefix = config['projects'][projectName].prefix;
                    return [3 /*break*/, 4];
                case 3:
                    answerObj.angularPrefix = getAngular2Prefix(config);
                    _c.label = 4;
                case 4:
                    if (!(askAll || !answerObj.angularPrefix)) return [3 /*break*/, 6];
                    _a = answerObj;
                    return [4 /*yield*/, inquirer.prompt([{
                                type: 'input',
                                message: 'What is your component selector prefix (default = app)?',
                                name: 'angularPrefix',
                            }])];
                case 5:
                    _a.angularPrefix = (_c.sent()).angularPrefix;
                    _c.label = 6;
                case 6:
                    isVscode = false;
                    isWebstorm = false;
                    if (!(askAll || localconfig.preferredIde !== EIdeNames.WEBSTORM && localconfig.preferredIde !== EIdeNames.VSCODE)) return [3 /*break*/, 8];
                    _b = answerObj;
                    return [4 /*yield*/, inquirer.prompt([{
                                type: 'list',
                                message: 'Please select your IDE?',
                                name: 'preferredIde',
                                choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
                            }])];
                case 7:
                    _b.preferredIde = (_c.sent()).preferredIde;
                    return [3 /*break*/, 9];
                case 8:
                    answerObj.preferredIde = localconfig.preferredIde;
                    _c.label = 9;
                case 9: return [2 /*return*/, answerObj];
            }
        });
    });
}
//# sourceMappingURL=inquirer.js.map