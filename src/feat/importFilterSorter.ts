import { differentiateImports, getImportsInAnArray } from "../helpers/importFilter";
import { sortByLength } from "../helpers/importSorter";
import { ImportLengthObject } from "../type/index.type";

export const getFilteredSortedImports = (importsText: string) => {
    const imports = getImportsInAnArray(importsText);

    const [localImports, moduleImports] = differentiateImports(imports);

    const sortedLocalImports = sortByLength(localImports);
    const sortedModuleImports = sortByLength(moduleImports);

    return formatImportsText(sortedLocalImports, sortedModuleImports);
};

export const formatImportsText = (sortedLocalImports: ImportLengthObject[], sortedModuleImports: ImportLengthObject[]) => {
    const localImports = sortedLocalImports.map(importObject => importObject.text);
	const moduleImports = sortedModuleImports.map(importObject => importObject.text);
    
    const shouldAddNewline = sortedLocalImports.length > 0 && sortedModuleImports.length > 0;
    // Combine the sorted imports with a conditional line gap between them
    const newImports = moduleImports.join('\n') +
        (shouldAddNewline ? '\n\n' : '') +
        localImports.join('\n');

    return newImports;
};