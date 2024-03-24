import * as assert from 'assert';
import * as vscode from 'vscode';
import { getFilteredSortedImports } from '../../feat/importFilterSorter';
import { ImportLengthObject } from '../../type/index.type'; // Adjust the import path as necessary

suite('getFilteredSortedImports Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests for getFilteredSortedImports.');

    test('Correctly sorts and differentiates module and local imports', () => {
        const importsText = 
`import React from 'react';
import { useState } from 'react';
import MyComponent from './MyComponent';
import AnotherComponent from '../AnotherComponent';
`;

        const expectedOutput =
            `import React from 'react';
import { useState } from 'react';

import MyComponent from './MyComponent';
import AnotherComponent from '../AnotherComponent';`;

        const result = getFilteredSortedImports(importsText);
        assert.strictEqual(result, expectedOutput);
    });

    test('Handles only module imports correctly', () => {
        const importsText = `import lodash from 'lodashass';
import moment from 'moment';
`;
        const expectedOutput =
            `import moment from 'moment';
import lodash from 'lodashass';`;

        const result = getFilteredSortedImports(importsText);
        assert.strictEqual(result, expectedOutput);
    });

    test('Handles only local imports correctly', () => {
        const importsText = 
        `import LocalSecond from './LocalSecond';
import LocalFirst from './LocalFirst';`;

        const expectedOutput =
            `import LocalFirst from './LocalFirst';
import LocalSecond from './LocalSecond';`;

        const result = getFilteredSortedImports(importsText);
        assert.strictEqual(result, expectedOutput);
    });

    test('Handles mixed complex imports', () => {
        const importsText = 
        `import { Button, Alert } from 'react-bootstrap';
import HelperUtil from '../../utils/HelperUtil';
import { useState, useEffect } from 'react';
import CustomComponent from './CustomComponent';`;

        const expectedOutput =
            `import { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';

import HelperUtil from '../../utils/HelperUtil';
import CustomComponent from './CustomComponent';`;

        const result = getFilteredSortedImports(importsText);
        assert.strictEqual(result, expectedOutput);
    });


    test('Handles multiline imports correctly', () => {
        const importsText = 
        `import {
deletePreference,
updatePreference as updatePreferenceService,
} from "../services/preferences.service";
import Pagination from '../components/Pagination.component';
import LoadingSpinner from '../components/loading.component';
import { IPreferenceItem } from '../types/preferences.type';
import { getAllPreference } from '../services/preferences.service';`;

        const expectedOutput =
            `import {
deletePreference,
updatePreference as updatePreferenceService,
} from "../services/preferences.service";
import Pagination from '../components/Pagination.component';
import { IPreferenceItem } from '../types/preferences.type';
import LoadingSpinner from '../components/loading.component';
import { getAllPreference } from '../services/preferences.service';`;

        const result = getFilteredSortedImports(importsText);
        assert.strictEqual(result, expectedOutput);
    });
});
