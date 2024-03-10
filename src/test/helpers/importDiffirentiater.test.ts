import * as assert from 'assert';
// import the functions you want to test
import { diffirentiateImports, checkForLocalImports } from '../../helpers/importFilter';

suite('Import differentiation Test Suite', () => {

    test('differentiateImports correctly separates local and module imports', () => {
        const imports = [
            "import React from 'react';",
            "import { useState } from 'react';",
            "import myLocalComponent from './components/MyLocalComponent';",
            "import anotherLocalComponent from './AnotherLocalComponent';"
        ];
        
        const [localImports, moduleImports] = diffirentiateImports(imports);

        assert.deepStrictEqual(localImports, [
            "import myLocalComponent from './components/MyLocalComponent';",
            "import anotherLocalComponent from './AnotherLocalComponent';"
        ]);

        assert.deepStrictEqual(moduleImports, [
            "import React from 'react';",
            "import { useState } from 'react';"
        ]);
    });

    test('checkForLocalImports correctly identifies local imports', () => {
        const imports = [
            "import lodash from 'lodash';",
            "import myUtil from './utils/myUtil';",
            "import anotherUtil from '../anotherUtil';"
        ];

        const localImports = checkForLocalImports(imports);

        assert.deepStrictEqual(localImports, [
            "import myUtil from './utils/myUtil';",
            "import anotherUtil from '../anotherUtil';" // Depending on your definition, '../anotherUtil' might also be considered a local import
        ]);
    });

});
