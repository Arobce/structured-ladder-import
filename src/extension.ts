import * as vscode from 'vscode';
import { getImportsInAnArray } from './helpers/importFilter';
import { sortByLength } from './helpers/importSorter';
import { ImportLengthObject } from './type/index.type';
import { getFilteredSortedImports } from './feat/importFilterSorter';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "structured-ladder-import" is now active!');

	let disposable = vscode.commands.registerCommand('structured-ladder-import.sortImports', sortImportsCommand);

	context.subscriptions.push(disposable);
}

const sortImportsCommand = () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showInformationMessage("No editor is active");
        return;
    }

    const selection = editor.selection;
    const importsText = editor.document.getText(selection);
   
    const importFixedText = getFilteredSortedImports(importsText);

    // Replace the selected text with the new sorted imports
    editor.edit((editBuilder) => {
        editBuilder.replace(selection, importFixedText);
    }).then(success => {
        if (success) {
            vscode.window.showInformationMessage('Imports sorted!');
        } else {
            vscode.window.showInformationMessage('Failed to sort imports.');
        }
    });
};


// This method is called when your extension is deactivated
export function deactivate() { }
