# Development tips

## 1. How to release in2iframeconsent
To release in2iframeconsent on [npmjs.com](https://www.npmjs.com/) a user account is needed. 
In addition, the user must belong to the in2code organization.

### Steps before a release:
Before a release all files must be compiled and commited.
```shell
$ npm install

$ npm run buid

$ git commit -m "Build version 3.0.0 🔨"
```

### Steps for a release:
#### 1. Login into [npmjs.com](https://www.npmjs.com/) account on terminal
```shell
$ npm login
```
#### 2. Increase version number
The version number must be incremented in the [package.json](../package.json). 
Here you should use the same version number as in the release branch tag.

> **IMPORTANT:** Check if the version number is also updated in the [package-lock.json](../package-lock.json) file.
If not, run an ```npm-install``` again.

#### 3. Publish on [npmjs.com](https://www.npmjs.com/)
in2iframeconsent can only be published with two-factor authentication. Therefore you will be asked for a one-time password.
```shell
$ npm publish
```
