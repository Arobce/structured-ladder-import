import * as assert from 'assert';
import * as vscode from 'vscode';
import { sortByLength } from '../../helpers/importSorter';
import { ImportLengthObject } from '../../type/index.type'; // Adjust the import path as necessary

suite('Import Sorter Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('sortByLength sorts imports by text length', () => {
        const inputArray: ImportLengthObject[] = [
            { text: 'import React from "react";', length: 24 },
            { text: 'import { RouterProvider } from "react-router-dom";', length: 47 },
            { text: 'import ReactDOM from "react-dom/client";', length: 38 },
            { text: 'wor', length: 3 }
        ];
        const sortedImports = sortByLength(inputArray);
        const expectedOutput = [
            'wor', 
            'import React from "react";', 
            'import ReactDOM from "react-dom/client";', 
            'import { RouterProvider } from "react-router-dom";'
        ];

        // Extract text from sorted imports for assertion
        const actualOutput = sortedImports.map(importObj => importObj.text);

        assert.deepStrictEqual(actualOutput, expectedOutput);
    });

    test('sortByLength handles empty array', () => {
        const inputArray: ImportLengthObject[] = [];
        const sortedImports = sortByLength(inputArray);
        const expectedOutput: string[] = [];
        
        // Extract text from sorted imports for assertion
        const actualOutput = sortedImports.map(importObj => importObj.text);

        assert.deepStrictEqual(actualOutput, expectedOutput);
    });

    test('sortByLength handles array with imports of same text length', () => {
        const inputArray: ImportLengthObject[] = [
            { text: 'abc', length: 3 },
            { text: 'xyz', length: 3 },
            { text: 'def', length: 3 }
        ];
        const sortedImports = sortByLength(inputArray);
        const expectedOutput = ['abc', 'xyz', 'def']; // Assuming stable sort

        // Extract text from sorted imports for assertion
        const actualOutput = sortedImports.map(importObj => importObj.text);

        assert.deepStrictEqual(actualOutput, expectedOutput);
    });
});
