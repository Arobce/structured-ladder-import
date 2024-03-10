import * as assert from 'assert';
import * as vscode from 'vscode';
import { sortByLength } from '../../helpers/importSorter';

suite('Import Sorter Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('sortByLength sorts strings by length', () => {
        const inputArray = ['import React from "react";',
            'import { RouterProvider } from "react-router-dom";',
            'import ReactDOM from "react-dom/client";',
            'wor'];
        const expectedOutput = ['wor', 
        'import React from "react";', 
        'import ReactDOM from "react-dom/client";', 
        'import { RouterProvider } from "react-router-dom";'];
        assert.deepStrictEqual(sortByLength(inputArray), expectedOutput);
    });

    test('sortByLength handles empty array', () => {
        const inputArray: string[] = [];
        const expectedOutput: string[] = [];
        assert.deepStrictEqual(sortByLength(inputArray), expectedOutput);
    });

    test('sortByLength handles array with strings of same length', () => {
        const inputArray = ['abc', 'xyz', 'def'];
        const expectedOutput = ['abc', 'xyz', 'def']; // Assuming stable sort, the order remains as is
        assert.deepStrictEqual(sortByLength(inputArray), expectedOutput);
    });
});
