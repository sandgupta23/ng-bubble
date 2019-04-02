import { ILineFinderData } from "./line-finder";
import { EIdeNames } from "../enums";
export declare function getAngular2JsonPath(): string;
export declare function getAngular5JsonPath(): string;
export declare function getVscodePath(): string;
export declare function getWebstormPath(): string;
/**
 * getAngularConfig:
 * Check if repo is either angular 2+ or angular 5+
 * if either is true, return angular-cli.json/angular.json path
 * */
export declare function getAngularConfig(): {
    path: string;
    version: number;
} | null;
export declare function checkIfVscode(): boolean;
export declare function checkIfWebstorm(): boolean;
export declare function createConfigJSonFileIfNotPresent(): void;
export declare function getLocalConfigFilePath(): string;
export declare function getGlobalConfigFilePath(): string;
export declare function runAppOnFreePort(app: any, port: number, ctrl: boolean): Promise<void>;
export declare function openInIde(path: string, currentIde: EIdeNames, codeText: string, data?: ILineFinderData, lineNumber?: number): Promise<void>;
export declare function getFileContent(path: string): Promise<any>;
export declare function setFileContent(path: string, data: string): Promise<any>;
export declare function exactMatchedFileIndex(foundItems: any, searchTerm: string): any;
export declare function areTwoSetsEqual(a: Set<any>, b: Set<any>): boolean;
export declare function getAngular2Prefix(config: any): any;
export declare function getAngular5Projects(config: any): string[];
