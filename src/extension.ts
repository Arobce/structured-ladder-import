// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { diffirentiateImports } from './helpers/importFilter';
import { sortByLength } from './helpers/importSorter';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "structured-ladder-import" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('structured-ladder-import.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from structured-ladder-import!');
	// });

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
    const text = editor.document.getText(selection);

    const imports = text.split('\n');
    const [localImports, moduleImports] = diffirentiateImports(imports);

	const sortedLocalImports = sortByLength(localImports);
	const sortedModuleImports = sortByLength(moduleImports);

    // Combine the sorted imports with a line gap between them
    const newText = sortedModuleImports.join('\n') + '\n\n' + sortedLocalImports.join('\n');

    // Replace the selected text with the new sorted imports
    editor.edit((editBuilder) => {
        editBuilder.replace(selection, newText);
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
