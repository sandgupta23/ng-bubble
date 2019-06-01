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

export async function inquirerInit(localconfig:ILocalConfig, askAll:boolean) {

  let answerObj: ILocalConfig = {};
  let angularConfigDetails = getAngularConfig();
  answerObj.framework = EFramework.ANGULAR;//temp

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
  }

  if(askAll || !answerObj.angularPrefix){
    answerObj.angularPrefix = (await inquirer.prompt([{
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
  let isVscode = false;//checkIfVscode();
  let isWebstorm = false;//checkIfWebstorm();
  if (askAll || localconfig.preferredIde!==EIdeNames.WEBSTORM && localconfig.preferredIde!==EIdeNames.VSCODE) {
    answerObj.preferredIde =  (await inquirer.prompt([{
      type: 'list',
      message: 'Please select your IDE?',
      name: 'preferredIde',
      choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
    }])).preferredIde
  } else {
    answerObj.preferredIde = localconfig.preferredIde
  }

  return answerObj;

}

