import * as assert from 'assert';
import * as vscode from 'vscode';
import { getFilteredSortedImports } from '../../feat/importFilterSorter';

suite('getFilteredSortedImports Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests for getFilteredSortedImports.');

    test('Correctly sorts and differentiates module and local imports', () => {
        const imports = [
            "import React from 'react';", // module
            "import { useState } from 'react';", // module
            "import MyComponent from './MyComponent';", // local
            "import AnotherComponent from '../AnotherComponent';" // local
        ];
        const expectedOutput =
            `import React from 'react';
import { useState } from 'react';

import MyComponent from './MyComponent';
import AnotherComponent from '../AnotherComponent';`;

        assert.strictEqual(getFilteredSortedImports(imports), expectedOutput);
    });

    test('Handles only module imports correctly', () => {
        const imports = [
            "import lodash from 'lodash';", // module
            "import moment from 'moment';" // module
        ];
        const expectedOutput =
            `import lodash from 'lodash';
import moment from 'moment';`;

        assert.strictEqual(getFilteredSortedImports(imports), expectedOutput);
    });

    test('Handles only local imports correctly', () => {
        const imports = [
            "import LocalFirst from './LocalFirst';", // local
            "import LocalSecond from './LocalSecond';" // local
        ];
        const expectedOutput =
            `import LocalFirst from './LocalFirst';
import LocalSecond from './LocalSecond';`;

        assert.strictEqual(getFilteredSortedImports(imports), expectedOutput);
    });

    test('Handles mixed complex imports', () => {
        const imports = [
            "import { Button, Alert } from 'react-bootstrap';", // module
            "import HelperUtil from '../../utils/HelperUtil';", // local
            "import { useState, useEffect } from 'react';", // module
            "import CustomComponent from './CustomComponent';" // local
        ];
        const expectedOutput =
            `import { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';

import HelperUtil from '../../utils/HelperUtil';
import CustomComponent from './CustomComponent';`;

        assert.strictEqual(getFilteredSortedImports(imports), expectedOutput);
    });
});
