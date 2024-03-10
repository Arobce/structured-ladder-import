export const sortByLength = (sortItems: Array<String>) => {
    return sortItems.sort((a, b) => {
        return a.length - b.length;
    });
};