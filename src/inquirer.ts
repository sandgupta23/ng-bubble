import {EIdeNames} from "../enums";
const inquirer: any = require('inquirer');

export function inquirerInit() {
    return inquirer.prompt([{
        type: 'list',
        message: 'What ide you want to use?',
        name: 'ide',
        choices: [EIdeNames.WEBSTORM, EIdeNames.VSCODE]
    }, {
        type: 'list',
        message: 'Shortcut for opening component in IDE',
        name: 'ctrl',
        choices: ["Double click", "Ctrl + Double click"]
    }, {
        type: 'list',
        message: 'Experimental: Should ng-bubble try to guess html markup location while opening html file?',
        name: 'guess',
        choices: ["Yes", "No"]
    }, {
        type: 'input',
        message: 'What is your component selector root? Default is app-.',
        name: 'componentSelector',

        validate: (value: string) => {
            if (!value || !(value.trim())) {
                return true; //we will use default, if nothing is provided: app-
            }
            if (value.endsWith("-")) {
                return true;
            } else {
                return `Error: Provided:${value}. Must end with hyphen (-). Example: app-`
            }
        }
    }
    ]);

};