export declare function getAngular2JsonPath(): string;
export declare function getAngular5JsonPath(): string;
export declare function createConfigJSonFileIfNotPresent(): void;
export declare function getLocalConfigFilePath(): string;
export declare function getGlobalConfigFilePath(): string;
export declare function runAppOnFreePort(app: any, port: number, ctrl: boolean): Promise<void>;
export declare function openInIde(path: string, currentIde: string): Promise<void>;
export declare function exactMatchedFileIndex(foundItems: any, searchTerm: string): any;
