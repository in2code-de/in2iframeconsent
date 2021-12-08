# Development tips

---

## 1. How to release in2iframeconsent
To release in2iframeconsent on [npmjs.com](https://www.npmjs.com/) a user account is needed. 
In addition, the user must belong to the in2code organization.

> **IMPORTANT:** NP is a tool for easier publishing of NPM packages. To ensure a smooth experience, 
> the develop branch should be merged into the Master Branch before running NP. 
> If possible, GitFlow should NOT be used for this, since NP tags the master branch itself, resulting in duplicate tags
> if used in combination with GitFlow.

### Release Process:

#### 1. Build distribution files
```bash
$ npm install && npm run build
```

#### 2. Login into [npmjs.com](https://www.npmjs.com/) account on terminal
```shell
$ npm login
```
#### 3. Publish Package
The ```npm install``` installs a utility to make it easier to publish NPM packages.
To publish the package just enter the following command and follow the steps.
NP publishes the package on NPM and creates a new commit + tag on the master branch.

```bash
$ np
```
---
