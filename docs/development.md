# Development tips

## 1. How to release in2iframeconsent
To release in2iframeconsent on [npmjs.com](https://www.npmjs.com/) a user account is needed.
In addition, the user must belong to the in2code organization.


### Steps for a release:
#### 1. Create a release branch with GitFlow

#### 2. Login into [npmjs.com](https://www.npmjs.com/) account on terminal
```shell
$ npm login
```

#### 3. Increase version number
The version number must be incremented in the [package.json](../package.json).
Here you should use the same version number as in the release branch.

> To automatically adjust the version number in the [package-lock.json](../package-lock.json) execute `npm install`.

#### 4. Build distribution files
Before a release all distribution files must be compiled and committed.
```shell
$ npm install && npm run build

$ git commit -m "Build version 3.0.0 🔨"
```

#### 3. Publish on [npmjs.com](https://www.npmjs.com/)
in2iframeconsent can only be published with two-factor authentication. Therefore, you will be asked for a one-time password.
```shell
$ npm publish
```
