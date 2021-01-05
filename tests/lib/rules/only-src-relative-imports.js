/**
 * @fileoverview Only allows src-relative imports
 * @author Hod Bin Noon
 */
'use strict'

var _ = require('lodash')
var resolve = require('resolve')
var simple = require('simple-mock')

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/only-src-relative-imports'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var errors = [{ messageId: 'onlySrcRelative' }]
var filename = '/checkout/src/dir/oneFile.js'
var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { modules: true },
    __mockSrcAliasPath: '/checkout/src',
  },
})
var importSpecifiers = [
  'defaultExport',
  '* as name',
  '{ export1 }',
  '{ export1 as alias1 }',
  '{ export1, export2 }',
  '{ foo, bar }',
  '{ export1, export2 as alias2 }',
  'defaultExport, { export1 }',
  'defaultExport, * as name',
]

var installedPackages = [
  'vue',
  'vue/something',
  '@vue-cli',
  '@vue-cli/something',
]
var sources = [
  'vue',
  '@/components/App.vue',
  '@vue-cli',
  '@vue-cli/something',
  'vue/something',
  ['myFile.js', '@/dir/myFile.js'],
  ['../../otherDir/myFile.js', '../../otherDir/myFile.js'],
  ['../otherDir/myFile.js', '@/otherDir/myFile.js'],
  ['./otherDir/myFile.js', '@/dir/otherDir/myFile.js'],
  ['otherDir/myFile.js', '@/dir/otherDir/myFile.js'],
  ['otherDir/@/myFile.js', '@/dir/otherDir/@/myFile.js'],
]

var origResolveSync = resolve.sync
function mockResolveSync(id) {
  if (installedPackages.includes(id)) {
    return true
  }
  return origResolveSync(id)
}
simple.mock(resolve, 'sync').callFn(mockResolveSync)

function buildImportStmt(specifier, source, isDynamic) {
  if (specifier) {
    if (isDynamic) {
      return `import ${specifier} from '${source}'`
    } else {
      return `var ${specifier} = import('${source}')`
    }
  } else {
    if (isDynamic) {
      return `import '${source}'`
    } else {
      return `import('${source}')`
    }
  }
}

function getTable() {
  var valids = []
  var invalids = []
  for (var isDynamic in [false, true]) {
    for (var source of sources) {
      for (var importSpecifier of importSpecifiers) {
        if (_.isArray(source)) {
          invalids.push({
            code: buildImportStmt(importSpecifier, source[0], isDynamic),
            output: buildImportStmt(importSpecifier, source[1], isDynamic),
            filename: filename,
            errors: errors,
          })
        } else {
          valids.push(buildImportStmt(importSpecifier, source, isDynamic))
        }
      }
    }
  }
  return { valid: valids, invalid: invalids }
}

ruleTester.run('only-src-relative-imports', rule, getTable())
