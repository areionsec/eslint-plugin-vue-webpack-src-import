# eslint-plugin-vue-webpack-src-import

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/areionsec/eslint-plugin-vue-webpack-src-import/Node.js%20CI)](https://github.com/areionsec/eslint-plugin-vue-webpack-src-import/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster)
[![GitHub](https://img.shields.io/github/license/areionsec/eslint-plugin-vue-webpack-src-import)](https://github.com/areionsec/eslint-plugin-vue-webpack-src-import/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/eslint-plugin-vue-webpack-src-import)](https://www.npmjs.com/package/eslint-plugin-vue-webpack-src-import)
[![nycrc config on GitHub](https://img.shields.io/nycrc/areionsec/eslint-plugin-vue-webpack-src-import?config=.nycrc.json)](https://github.com/areionsec/eslint-plugin-vue-webpack-src-import/blob/master/.nycrc.json)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/areionsec/eslint-plugin-vue-webpack-src-import)](https://lgtm.com/projects/g/areionsec/eslint-plugin-vue-webpack-src-import/)

Vue CLI defines at sign (`@`) as an alias to `src/`, allowing for src-relative imports.
This plugin standardizes relative imports to use this alias when possible.

Fixes importing from `../../components/MyComponent.vue` to `@/components/MyComponent.vue`.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-webpack-src-import`:

```
$ npm install eslint-plugin-vue-webpack-src-import --save-dev
```


## Usage

Add `vue-webpack-src-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "vue-webpack-src-import"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vue-webpack-src-import/only-src-relative-imports": "error"
    }
}
```

## Supported Rules

### only-src-relative-imports

> Detects and fixes relative import that are not relative to '@/'
