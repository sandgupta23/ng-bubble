import * as fs from 'fs';
import * as util from 'util'

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);;

/*detect if its an angular project*/
import {IGlobalConfig, ILocalConfig} from "../interfaces";
import {getAngular2JsonPath, getAngular5JsonPath, getGlobalConfigFilePath, getLocalConfigFilePath} from "./utility";

/**
 * detectAngular
 * Checks if a project is angular or not by finding angular.json or angular-cli.json at its root
 * */
export async function detectAngular() {
    let angular2 = getAngular2JsonPath();
    let angular5 = getAngular5JsonPath();
    return fs.existsSync(angular2) || fs.existsSync(angular5);
}

export function getLocalConfig() {
    let localConfigFilePath = getLocalConfigFilePath();
    let data = fs.readFileSync(localConfigFilePath).toString('utf8');
    if(data){
        try {
            return JSON.parse(data)
        }catch (e) {
            console.log(e);
        }
    }
    return {};
}
export async function updateLocalConfig(newLocalConfigData: ILocalConfig) {
    let oldLocalConfigData = await getLocalConfig();
    let newData = {...oldLocalConfigData, ...newLocalConfigData};
    let localConfigPath = getLocalConfigFilePath();
    console.log(localConfigPath, newLocalConfigData);
    return await writeFileAsync(localConfigPath, JSON.stringify(newData));
}


export function getGlobalConfig() {
    let globalConfigFilePath = getGlobalConfigFilePath();

    let data = fs.readFileSync(globalConfigFilePath).toString('utf8');
    if(data){
        try {
            return JSON.parse(data)
        }catch (e) {
            console.log(e);
        }
    }
    return {};
}

export async function updateGlobalConfig(newGlobalConfigData: IGlobalConfig) {
    let oldGlobalConfigData = await getGlobalConfig();
    let newData = {...oldGlobalConfigData, ...newGlobalConfigData};
    let localConfigPath = getGlobalConfigFilePath();
    return await writeFileAsync(localConfigPath, JSON.stringify(newData));
}


