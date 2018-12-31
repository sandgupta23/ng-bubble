// import {updateLocalConfig} from "./lib/src/config";
let x = require('./lib/src/config');
var inquirer = require('inquirer');

let inquirerPromise = inquirer.prompt([{
    type: 'list',
    message: 'What ide you want to use?',
    name: 'truth',
    choices: ["Webstorm", "VScode"]
}, {
    type: 'list',
    message: 'Is this an Angular 2+ project?',
    name: 'truth',
    choices: ["Yes", "no"]
}
]);


inquirerPromise.then(async (inquirerOutput) => {
    let isAngular = inquirerOutput.isAngular === 'Yes';
    // let preferredIde = inquirerOutput.ide === 'Webstorm' ? EIdeNames.WEBSTORM : EIdeNames.VSCODE;
    let newLocalConfigData = {isAngular:true};
   try {
       await x.updateLocalConfig(newLocalConfigData);
   }catch (e) {
       console.log(e);
   }
    console.log("Thanks. If in future you want to change these options, run: ng-bubble --options");
});