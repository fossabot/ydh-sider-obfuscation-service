# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `master` branch kept in a stable state.
When you submit pull requests, please make sure to fork from and submit back to `master`.

Other processes and specifications that are in use in this repository are:

-   [Semantic versioning](https://semver.org/)
-   [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) following the @commitlint/config-conventional config
-   [Prettier](https://prettier.io/) style guide

## Getting Started

As noted in the prerequisites section of the readme file, this project requires that you have Node.js installed.

With those in place, you can fork the repository, clone it, and then run `npm install` to install all development dependencies.
Make a copy of `.env.template` in the root directory and rename to `.env`, configuring the environment variables as required.

### Development Workflow

After cloning and installing all the dependencies, there are several commands available for local development:

-   `npm run lint` - Lints everything in src directory
-   `npm run jest` - Runs Jest over all tests in src directory
-   `npm test` - Runs `npm run lint` and `npm run jest` together
-   `npm run start:dev` - Starts a development server with live reload, available on `localhost:8204` unless you specify your own port

### Production Workflow

-   `npm start` - Runs a production version. No live reload.

## Pull Request Checklist

Prior to submitting a pull request back to the main repository, please make sure you have completed the following steps:

1. Pull request base branch is set to `master`. All pull requests should be forked from and merged back to `master`
2. Run `npm test` to check the code adheres to the defined style and that it passes the Jest tests
3. Run `npm run lint:prettier` to run the Prettier code formatter over the code

## Release Process

When cutting a release, the following steps need to be performed:

1. Create a release branch with the convention `release/x.x.x`
2. `package.json` needs to have a version update based on the content being released, remembering to adhere to semantic versioning
3. Generate the changelog with `npm run changelog`
4. Create a tag for the version; the naming convention is the version (vx.x.x)
5. Push the tag to the repository
6. Draft a release in the release tab with release notes, copying the notes from the changelog

## Issues

Please file your issues [here](https://github.com/Fdawgs/ydh-sider-obfuscation-service/issues) and try to provide as much information in the template as possible/relevant.
