/**
 * @fileoverview Only allows src-relative imports
 * @author Hod Bin Noon
 */
'use strict'

var path = require('path')
var _ = require('lodash')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Only allows src-relative imports',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      onlySrcRelative: 'Only use src-relative imports',
    },
    schema: [],
  },

  create: function (context) {
    const srcPath =
      context.parserOptions.__mockSrcAliasPath ?? path.resolve('src')
    const stripSrcPattern = new RegExp(`^(${_.escapeRegExp(srcPath)})`, 'g')

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    const isRelativePath = (p) => p && !p.startsWith('@/') && p.includes('/')
    const getCurPath = () => path.dirname(context.getFilename())
    const getAbsolutePath = (p) => path.join(getCurPath(), p)
    const isSafePath = (p) => p.startsWith(srcPath)
    const stripSrcPath = (p) => p.replace(stripSrcPattern, '')

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    function checkImportForRelative(node) {
      const origPath = node.source.value
      if (isRelativePath(origPath)) {
        context.report({
          node: node,
          loc: node.source.loc,
          messageId: 'onlySrcRelative',
          fix: function (fixer) {
            const absolutePath = getAbsolutePath(origPath)
            if (!isSafePath(absolutePath)) {
              return
            }
            return fixer.replaceText(
              node.source,
              `'@${stripSrcPath(absolutePath)}'`
            )
          },
        })
      }
    }

    return {
      ImportDeclaration(node) {
        checkImportForRelative(node)
      },
    }
  },
}
