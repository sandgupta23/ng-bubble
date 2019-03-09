import { EIdeNames } from "../enums";
export interface ILineFinderData {
    id: string;
    tagName: string;
    targetTagName: string;
    codeText: string;
    classList: string[];
    innerText: string;
    editor: EIdeNames;
    file: string;
    exact: boolean;
    path: string;
    pathToOpen: string;
    files: object;
}
export declare function lineToOpen(file: string, data: ILineFinderData): Promise<number>;
