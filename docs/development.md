# Development tips

## 1. How to release in2iframeconsent
To release in2iframeconsent on [npmjs.com](https://www.npmjs.com/) a user account is needed. 
In addition, the user must belong to the in2code organization.

### Steps before a release:
Releases can **ONLY** be executed on the master branch, so you should change the branch.

### Steps for a release:
#### 1. Release on Github
Before you publish the package on [npmjs.com](https://www.npmjs.com/), you should publish a regular release on Github.

#### 2. Login into [npmjs.com](https://www.npmjs.com/) account on terminal
```shell
$ npm login
```
#### 3. Publish Package
The ```npm install``` installs a utility to make it easier to publish NPM packages.
To publish the package just enter the following command and follow the steps.

```bash
$ np
```
