export interface ILineFinderData {
    id: string;
    tagName: string;
    classList: string[];
    innerText: string;
}
export declare function lineToOpen(file: string, data: ILineFinderData): Promise<{}>;
