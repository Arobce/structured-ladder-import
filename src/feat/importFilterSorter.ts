import { diffirentiateImports } from "../helpers/importFilter";
import { sortByLength } from "../helpers/importSorter";

export const getFilteredSortedImports = (imports: Array<String>) => {
    const [localImports, moduleImports] = diffirentiateImports(imports);

    const sortedLocalImports = sortByLength(localImports);
    const sortedModuleImports = sortByLength(moduleImports);

    return getCorrectTextFormat(sortedLocalImports, sortedModuleImports);
};

export const getCorrectTextFormat = (sortedLocalImports: Array<String>, sortedModuleImports: Array<String>) => {
    // Determine if there's only one type of imports to decide on adding a newline
    const shouldAddNewline = sortedLocalImports.length > 0 && sortedModuleImports.length > 0;

    // Combine the sorted imports with a conditional line gap between them
    const text = sortedModuleImports.join('\n') +
        (shouldAddNewline ? '\n\n' : '') +
        sortedLocalImports.join('\n');

    return text;
};