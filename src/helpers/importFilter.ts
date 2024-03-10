export const diffirentiateImports = (imports: Array<String>) => {
    const localImports = checkForLocalImports(imports);
    const moduleImports = imports.filter((item) => {
        return !localImports.includes(item);
    });

    return [localImports, moduleImports];
};

export const checkForLocalImports = (importItems: Array<String>) => {
    return importItems.filter((item) => item.includes('./') || item.includes('../'));
};