# ESLint SharePoint Framework (with React support) Preset

[![npm @latest](https://img.shields.io/npm/v/@voitanos/eslint-preset-spfx-react/latest?style=flat-square)](https://www.npmjs.com/package/@voitanos/eslint-preset-spfx-react)

[![Voitanos on Twitter](https://img.shields.io/badge/Twitter-%40voitanos-blue?style=flat-square)](https://www.twitterl.com/voitanos)

Update your SharePoint Framework v1.12.1+ project to replace the deprecated & outdated TSLint utility in favor of ESLint!

This utility is based on our blog post: **[Get with the times & ditch TSLint in favor of ESLint in SharePoint Framework projects](https://www.voitanos.io/blog/spfx-replace-tslint-with-eslint)**.

> **NOTE**: This preset does not contain any support for SPFx projects that utilize React.

Installing this this preset in your SPFx project will do the following:

1. install all dependencies required for ESLint to support TypeScript & React
1. install a gulp task for running ESLint as part of your toolchain, both independently and also as a pre-task to the existing **build** task
1. copy a bare-bones ESLint configuration file to your project's **./config** folder
1. disable TSLint and remove the **tslint.json** file from your project

## Installation

Install the desired ESLint preset using your package manager of choice:

```console
npm install @voitanos/eslint-preset-spfx-react --save-dev
```

This will install `eslint`, `gulp-eslint`, `eslint-plugin-react`, & two utilities that add TypeScript file support to ESLint as dependencies in your project.

The postinstall script will add a `./config/eslint.json` configuration file for ESLint and the `./.eslintignore` configuration file that tells ESLint what files to ignore.

> **IMPORTANT**: Make sure you install the version of the preset that matches the version of TypeScript you're using in your project. See [Installing specific preset versions](#installing-specific-preset-versions) for details on how to determine the correct version.

> **NOTE**: A specific version of `eslint` is used to support the SPFx supported version of TypeScript as more current versions of `eslint` require newer versions of TypeScript that is not included in default SPFx projects.

### Installing specific preset versions

Figuring out the correct matrix of package versions to install can be challenging. This mostly comes down to TypeScript.

ESLint v6 is supported for use with TypeScript versions >= v3.2.1 and < v3.7.0 while ESLint v7 supports TypeScript >= v3.8. In addition, you must install the correct supporting packages for ESLint and TypeScript based on the version of ESLint you're using.

Sounds confusing, doesn't it?

But no worries! We've done the hard part of figuring out what combinations of versions you need.

#### Determine the TypeScript version of your project

First, determine the version of TypeScript your SPFx project uses:

1. Open the **package.json** file in your SPFx project.
1. Within the `devDependencies` object, look for the package that starts with the name `@microsoft/rush-stack-compiler-`.

    This package is the bridge to a specific version of TypeScript. The TypeScript version is indicated by the last part of the name of the package.

    For example, consider the following entry in the **package.json** file:

    ```json
    {
      ...
      "devDependencies": {
        "@microsoft/rush-stack-compiler-3.7": "0.2.3",
        ...
      }
    }
    ```

    This SPFx project is using **TypeScript v3.7**.

#### Determine the matching preset version

The next step is to determine the corresponding version of the preset that is configured with the version of TypeScript in your project.

The preset NPM package contains distribution tags that are used to alias specific published versions of the package. We use them to indicate which version is built for a specific version of TypeScript.

1. Get a list of all distribution tags by executing the following command:

    ```console
    npm info @voitanos/eslint-preset-spfx-react
    ```

1. Locate the matching TypeScript version. The previous command will write the package information to the console as well as a list of the published distribution tags:

    ```console
    dist-tags:
    latest: 1.0.0             next: 1.1.0-beta.b385582  ts3.7: 1.0.0
    ```

    From this output, you can see three tags:

      - **latest**: the most current stable version of the NPM package that's been published
      - **next**: the next version of the NPM package, usually a beta and used for testing
      - **ts3.7**: the version built for TypeScript v3.7

#### Install a specific preset package version

Using the information above, install the specific preset package:

```console
npm install @voitanos/eslint-preset-spfx-react@ts3.7 --save-dev --save-exact
```

## Validating Installation

To validate a successful install, try it out!

1. Execute the following to see a list of installed tasks:

    ```console
    gulp --tasks
    ```

1. Verify the `eslint` task is present, as you can see below:

    ```console
    ➜ gulp --tasks
    [16:27:33] Tasks for ~/_play/eslint-test1/gulpfile.js
    [16:27:33] ├── clean
    [16:27:33] ├── eslint
    [16:27:33] ├── build
    [16:27:33] ├── default
    [16:27:33] ├── bundle
    [16:27:33] ├── deploy-azure-storage
    [16:27:33] ├── package-solution
    [16:27:33] ├── test
    [16:27:33] ├── serve-deprecated
    [16:27:33] ├── trust-dev-cert
    [16:27:33] ├── untrust-dev-cert
    [16:27:33] ├── test-only
    [16:27:33] └── serve
    ```
