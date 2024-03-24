import { ImportLengthObject } from "../type/index.type";

export const sortByLength = (sortItems: ImportLengthObject[]) => {
    return sortItems.sort((a, b) => {
        return a.length - b.length;
    });
};