---
sidebar: auto
---

# Contributing

## How to publish a new release
To release in2iframeconsent on [npmjs.com](https://www.npmjs.com/) a user account is needed.
In addition, the user must belong to the in2code organization.

### Create a new release branch with GitFlow
```shell
git flow release start 3.0.0
```

### Configure account
Log in with your npmjs.com account on the terminal

```shell
$ npm login
```

### Increase version number
The version number must be incremented in the [package.json](../../package.json).
Here you should use the same version number as in the release branch.

> To automatically adjust the version number in the [package-lock.json](../../package-lock.json) execute `npm install`.

### Build distribution files
Before a release all distribution files must be compiled and committed.

```shell
$ npm install && npm run build

$ git commit -m "Build version 3.0.0 🔨"
```

### Publish
in2iframeconsent can only be published with two-factor authentication. 
Therefore, you will be asked for a one-time password.

```shell
$ npm publish
```
