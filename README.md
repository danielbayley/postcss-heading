[PostCSS] `:heading` [Plugin]
=============================
PostCSS _[polyfill]_ to use the [`:heading`] [pseudo-class] selector today.

Usage
-----
`pre.css`:
~~~ css
:heading {
  font-weight: bold;
  text-decoration: underline;
}
~~~
~~~ js
import fs from "node:fs/promises"
import postcss from "postcss"
import plugin  from "postcss-heading"

const from = "pre.css"
const css  = await fs.readFile(from, new TextDecoder)
const post = await postcss(plugin).process(css, { from, to: "post.css" })
console.log(post.css)
~~~
`post.css`:
~~~ css
:is(h1, h2, h3, h4, h5, h6) {
  font-weight: bold;
  text-decoration: underline;
}
~~~

Examples
--------
Also [process]es [functional] pseudo-class [`:heading()`]s:
~~~ css
:heading(2, 4) {
  font-weight: bold;
  text-decoration: underline;
}
~~~
`post.css`:
~~~ css
:is(h2, h4) {
  font-weight: bold;
  text-decoration: underline;
}
~~~

## Install
~~~ sh
pnpm add postcss postcss-heading
~~~
> [!IMPORTANT]
> This package is _[ESM]_ [only], so must be [`import`]ed instead of [`require`]d,
> and [depends] on [_Node_.js] [`>=`][][`20`].

Specify this requirement with [`engines`] and/or [`devEngines`]:
~~~ jsonc
// package.json
"type": "module",
"engines": {
  "node": ">=20"
},
"devEngines": {
  "runtime": {
    "name": "node",
    "version": ">=20"
  }
},
~~~

License
-------
[MIT] © [Daniel Bayley]

[MIT]:              LICENSE.md
[Daniel Bayley]:    https://github.com/danielbayley

[_Node_.js]:        https://nodejs.org
[ESM]:              https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules
[only]:             https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[`import`]:         https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
[`require`]:        https://nodejs.org/api/modules.html#requireid
[depends]:          https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
[`>=`]:             https://docs.npmjs.com/cli/v6/using-npm/semver#ranges
[`20`]:             https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md
[`engines`]:        https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
[`devEngines`]:     https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines

[postcss]:          https://postcss.org
[process]:          https://postcss.org/api#processor
[plugin]:           https://postcss.org/docs/postcss-plugins
[polyfill]:         https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#readme
[`:heading`]:       https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:heading
[`:heading()`]:     https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:heading_function
[pseudo-class]:     https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/Pseudo-classes
[functional]:       https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/Pseudo-classes#functional_pseudo-classes
