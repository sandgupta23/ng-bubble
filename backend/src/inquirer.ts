import {EIdeNames} from "../enums";
import {
  getAngularConfig,
  checkIfVscode,
  checkIfWebstorm,
  getAngular2Prefix,
  getAngular5Projects
} from "./utility";
import {ILocalConfig} from "../interfaces";
import {EFramework} from "../../enum";
import * as fs from 'fs';

const inquirer: any = require('inquirer');

export async function inquirerInit() {

  let answerObj: ILocalConfig = {};
  let angularConfigDetails = getAngularConfig();
  if (angularConfigDetails) answerObj.framework = EFramework.ANGULAR;
  else {
    answerObj.framework = (await inquirer.prompt([{
      type: 'list',
      message: 'Please select your framework.',
      name: 'framework',
      choices: [EFramework.ANGULAR, EFramework.REACT]
    }])).framework
  }


  /*if its angular project, detect or ask for component prefix*/
  if (angularConfigDetails) {
    let config:any = JSON.parse(fs.readFileSync(angularConfigDetails.path).toString());
    if (angularConfigDetails.version >= 5) {
      let projectName: string = config['defaultProject'];
      if (!projectName) {
        let projects: string[] = getAngular5Projects(config);
        projectName = (await inquirer.prompt([{
          type: 'list',
          message: 'Please select your Project.',
          name: 'projectName',
          choices: projects
        }])).projectName;
      }
      answerObj.angularPrefix = config['projects'][projectName].prefix;
    } else {
      answerObj.angularPrefix = getAngular2Prefix(config);
    }
  }else {
    answerObj.angularPrefix = (await inquirer.prompt([{
      type: 'input',
      message: 'What is your component selector prefix (default = app).',
      name: 'angularPrefix',
    }])).angularPrefix;
  }


  /*try to figure out IDE else prompt if not sure*/
  let isVscode = false;//checkIfVscode();
  let isWebstorm = false;//checkIfWebstorm();
  if (isVscode && isWebstorm || (!isVscode && !isWebstorm)) {
    answerObj.preferredIde =  (await inquirer.prompt([{
      type: 'list',
      message: 'Please select your IDE.',
      name: 'preferredIde',
      choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
    }])).preferredIde
  } else {
    answerObj.preferredIde = isVscode ? EIdeNames.VSCODE : EIdeNames.WEBSTORM;
  }

  return answerObj;

}
