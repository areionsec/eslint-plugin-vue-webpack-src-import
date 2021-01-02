/**
 * @fileoverview Only allows src-relative imports
 * @author Hod Bin Noon
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/only-src-relative-imports'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var errors = [{ messageId: 'onlySrcRelative' }]
var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { modules: true },
  },
})
ruleTester.run('only-src-relative-imports', rule, {
  valid: [
    "import myName from 'vue'",
    "import myName from '@/components/App.vue'",
    // TODO: Detect relative filenames
    "import myName from 'myFile.js'",
  ],

  invalid: [
    {
      code: "import myName from '../otherDir/myFile.js'",
      errors: errors,
    },
    {
      code: "import myName from './otherDir/myFile.js'",
      errors: errors,
    },
    {
      code: "import myName from 'otherDir/myFile.js'",
      errors: errors,
    },
    {
      code: "import myName from 'otherDir/@/myFile.js'",
      errors: errors,
    },
  ],
})
