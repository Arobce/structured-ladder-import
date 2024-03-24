import * as assert from 'assert';
import { differentiateImports } from '../../helpers/importFilter';
import { ImportLengthObject } from '../../type/index.type';

suite('Import differentiation Test Suite', () => {

    test('differentiateImports correctly separates local and module imports', () => {
        const imports: ImportLengthObject[] = [
            { text: "import React from 'react';", length: 28 },
            { text: "import { useState } from 'react';", length: 34 },
            { text: "import myLocalComponent from './components/MyLocalComponent';", length: 55 },
            { text: "import anotherLocalComponent from './AnotherLocalComponent';", length: 56 }
        ];
        
        const [localImports, moduleImports] = differentiateImports(imports);

        assert.deepStrictEqual(localImports, [
            { text: "import myLocalComponent from './components/MyLocalComponent';", length: 55 },
            { text: "import anotherLocalComponent from './AnotherLocalComponent';", length: 56 }
        ]);

        assert.deepStrictEqual(moduleImports, [
            { text: "import React from 'react';", length: 28 },
            { text: "import { useState } from 'react';", length: 34 }
        ]);
    });
});
