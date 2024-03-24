import { ImportLengthObject } from "../type/index.type";

export const differentiateImports = (imports: ImportLengthObject[]) => {
    const localImports : ImportLengthObject[] = [];
    const moduleImports : ImportLengthObject[] = [];

    imports.forEach((importItem) => {
        if (importItem.text.includes('./') || importItem.text.includes('../')) {
            localImports.push(importItem);
        } else {
            moduleImports.push(importItem);
        }
    });

    return [localImports, moduleImports];
};

export const getImportsInAnArray = (imports: string) => {
    const lines = imports.split('\n');
    return getImportLengthObjectArray(lines);
};

const getImportLengthObjectArray = (lines: string[]) => {
    const importsLengthObjectArray: ImportLengthObject[] = [];
    let multiLineImport = '';

    lines.forEach((line, index) => {
        multiLineImport += line;

        if (line.includes(';')) {
            importsLengthObjectArray.push({
                text: multiLineImport,
                length: line.length
            });
            multiLineImport = '';
        } else {
            multiLineImport += '\n';  // Keep collecting multi-line import
        }
    });

    return importsLengthObjectArray;
};