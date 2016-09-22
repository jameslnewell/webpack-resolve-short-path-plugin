# webpack-resolve-short-path-plugin

Plugin for `enhanced-resolve` (Webpack v2) that resolves paths like `~module` to `<rootPath>/module` so you don't have 
to write relative paths like `../../../module`.

**Why short paths?**

In deeply nested directory structures, using relative paths to require modules above the current module directory can 
be tricky:
 - you have to know the right number of `..`s to use
 - if you ever move the current module you'll need to update the number of `..`s

**Why `~module`?**

*I wanted a short prefix to save typing.* 
> That rules out `<package-name>/module` because forcing developers to change their package name 
in order to achieve a shorter path is lame, and package names may already be used for other purposes.

*I didn't want it to clash with the possible namespace of npm packages.*
> That rules out `app/module`, `src/module`, `@app/module`, `@src/module` etc because `app`, `src`, `@app/module` and 
`@src/module` are all valid npm package names.

*I didn't want it to clash with existing operating system conventions (so it can be reused when bundling applications for NodeJS).*
> That rules out `~/` and `/`.

**Why aren't I using `alias`es or the `modules` directory?**

Using `alias` requires manual setup for every directory in your `rootPath` directory and results in confusion when `alias`es
have been setup for some directories but not all of them.

Using `module` clashes with the possible namespace of npm packages and results in confusion over whether the imported 
module is a npm package in `node_modules` or is a local module in your `rootPath` directory.


## Installation

```bash
npm install --save-dev webpack-resolve-short-path-plugin
```

## Usage

```js
var path = require('path');
var ResolveShortPathPlugin = require('webpack-resolve-short-path-plugin');

module.exports = {
  // ...
  resolve: {
    plugins: [
      new ResolveShortPathPlugin({rootPath: path.join(__dirname, 'src')})
    ]
  },
  // ...
};

```

Example:

`actions/sendForm.js`
```js
export default data => {
  //...
};
```

`components/ContactPage/ContactPage.jsx`
```js
import sendForm from '~actions/sendForm'; //resolves to `../../actions/sendForm`
```