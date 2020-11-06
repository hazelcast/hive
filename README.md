# frontend-shared

[Lerna](https://lerna.js.org/) monorepo with shared frontend libraries for a variety of Hazelcast product offerings.  
**Design system URL**: https://master--5f80b6aa3ceb290022dfea61.chromatic.com/

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [Under the hood](#under-the-hood)
- [Usage](#usage)
- [Project structure](#project-structure)
  - [Automated visual regression testing](#automated-visual-regression-testing)
- [How-to](#how-to)
  - [Add a new shared dependency](#add-a-new-shared-dependency)
  - [Add a new local dependency (for one package only)](#add-a-new-local-dependency-for-one-package-only)
  - [Make changes to several packages and test it](#make-changes-to-several-packages-and-test-it)
  - [Run storybook for development](#run-storybook-for-development)
  - [Run linting](#run-linting)
  - [Run unit tests](#run-unit-tests)
  - [Run visual regression tests](#run-visual-regression-tests)
  - [Approve the updated for visual regression test screenshots](#approve-the-updated-for-visual-regression-test-screenshots)
  - [Generate new screenshots for the new components](#generate-new-screenshots-for-the-new-components)
  - [Run all checks at once](#run-all-checks-at-once)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm ci
```

### Under the hood

It runs a regular `npm ci` and executes a `postinstall` hook. In that hook it runs:

1. `lerna bootstrap`
   Installs dependencies for all packages.
2. `link-parent-bin`
   Creates symlinks in `packages/*/node_modules/.bin` to all executables in `node_modules/.bin`.
   We store shared dependencies at the root level. This command allows us to run executables from these modules in our child packages.
3. `lerna run compile`
   Our child packages are written in TypeScript. To import them from `node_modules` in other packages they must be compiled to JavaScript first.

## Usage

Be aware, that we compile our TypeScript code to the modern `ES2018` JavaScript. To run it in legacy environment, please, configure webpack or any other bundler accordingly.
Moreover, we do not do anything about styles (`scss` in our case). We just import them as modules. Please, configure webpack or any other bundler to handle them.

The latest version of the design system is accessible at https://master--5f80b6aa3ceb290022dfea61.chromatic.com/.

## Project structure

`packages` contains a list of published packages:

- `helpers` (full name `@hazelcast/helpers`)
- `services` (full name `@hazelcast/services`)
- `test-helpers` (full name `@hazelcast/test-helpers`)
- `ui` (full name `@hazelcast/ui`)

### Automated visual regression testing

Uses stories from [Storybook](https://storybook.js.org/) as test cases. In other words, any story is going to result in a set of screenshots. Moreover, any story is required to have an associated set of screenshots. Based on [Loki](https://loki.js.org/), which uses headless Chrome to render the screenshots in Docker.

## How-to

### Add a new shared dependency

In the root folder run

```
npm i [-D] dependency-name
```

If it contains an executable we want to run in our child packages, run `npm run link-parent-bin` after it.
If it is a production (not dev only) dependency for one or several of our child packages, add it to their `package.json` as a peer dependency.

### Add a new local dependency (for one package only)

In the root folder run (replace @hazelcast/ui with @hazelcast/helpers, @hazelcast/test-helpers or @hazelcast/services if needed)

```
lerna add --scope @hazelcast/ui dependency-name
```

### Make changes to several packages and test it

When Lerna does the bootstrapping, it creates symlinks to the local packages other packages depend on. In our case, `@hazelcast/ui` depends on `@hazelcast/helpers`. Lerna is going to create a symlink `./packages/ui/node_modules/@hazelcast/helpers` that points to `./packages/helpers`. When we change our TypeScript code, the associated compiled JavaScript is not updated automatically. So if we change something in `@hazelcast/helpers` and we want to test how it works in `@hazelcast/ui`, we need to compile our changes in `@hazelcast/helpers`. To do that we have two options:

1. Compile all packages with `npm run compile` in the root directory
2. Compile a specific package, e.g. `cd packages/helpers && npm run compile`

Now we can use the updated code in `@hazelcast/ui`.

### Run storybook for development

In the root directory

```
npm start
```

### Run linting

In the root directory

```
npm run lint
```

### Run unit tests

In the root directory

```
npm test
```

### Run visual regression tests

In the root directory

```
npm run build-storybook
npm run test:visual
```

### Approve the updated for visual regression test screenshots

Say, we have changed something in our components.
First we need to run the visual regression tests to make sure that the change affected how the component is displayed.

```
npm run build-storybook
npm run test:visual
```

Now, if the test suite failed, we need to go to `packages/ui/.loki` and manually review the screenshots in the `current` folder and the diff in the `difference` folder. If we like what we see, we need to run `npm run test:visual:approve` in the `packages/ui` folder. It will update the reference screenshots.

### Generate new screenshots for the new components

```
cd packages/ui
npm run generate-screenshots
```

### Run all checks at once

```
npm run verify-all
```

If you PR passes this check locally, it is almost guaranteed to pass it on the CI.
