# Hazelcast Hive

![](./hive.png)

Design system built with A11Y in mind. Developed as a [Lerna](https://lerna.js.org/) monorepo with shared frontend libraries for a variety of Hazelcast product offerings.  
**Design system is available live at URL**: https://5f80b6aa3ceb290022dfea61-hxuybnauer.chromatic.com/?path=/story/getting-started-intro--page

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Global CSS](#global-css)
- [SSR](#ssr)
  - [Stable IDs](#stable-ids)
- [Project structure](#project-structure)
  - [Automated visual regression testing](#automated-visual-regression-testing)
- [How-to](#how-to)
  - [Install PnpM](#install-pnpm)
  - [Setup](#setup)
    - [Under the hood](#under-the-hood)
  - [Deploy](#deploy)
  - [Add a new shared dependency](#add-a-new-shared-dependency)
  - [Add a new local dependency (for one package only)](#add-a-new-local-dependency-for-one-package-only)
  - [Make changes to several packages and test it](#make-changes-to-several-packages-and-test-it)
  - [Run storybook for development](#run-storybook-for-development)
  - [Run linting](#run-linting)
  - [Run unit tests](#run-unit-tests)
  - [Run visual regression tests](#run-visual-regression-tests)
  - [Approve the updated for visual regression test screenshots](#approve-the-updated-for-visual-regression-test-screenshots)
  - [Generate new screenshots for the new/updated components](#generate-new-screenshots-for-the-newupdated-components)
  - [Run all checks at once](#run-all-checks-at-once)
- [Releasing a new version](#releasing-a-new-version)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

1. `npm i @hazelcast/ui` (`npm i @hazelcast/ui@next` - canary version) - set of Hive UI components
2. `npm i @hazelcast/services` (`npm i @hazelcast/services@next` - canary version) - Hive services
3. `npm i @hazelcast/helpers` (`npm i @hazelcast/helpers@next` - canary version) - Hiver helpers
4. `npm i -D @hazelcast/test-helpers` (`npm i -D @hazelcast/test-helpers@next` - canary version) - Hive test helpers

## Usage

Be aware, that we compile our TypeScript code to the modern `ES2018` JavaScript. To run it in legacy environment, please, configure webpack or any other bundler accordingly.
Moreover, we do not do anything about styles (`scss` in our case). We just import them as modules. Please, configure webpack or any other bundler to handle them.

The latest version of the design system is accessible at https://master--5f80b6aa3ceb290022dfea61.chromatic.com/.

## Global CSS

This library is used from Next.js projects.
Individual projects should transpile @hazelcast/ui.
However, Next.js still [forbids](https://github.com/vercel/next.js/blob/master/errors/css-global.md) to import files with .css / .scss extension unless they're in \_app.tsx

So please make sure to import the following global styles in your projects if you need them.

```typescript
import '@hazelcast/ui/styles/datepicker.scss'
```

or

```typescript
import '@hazelcast/ui/styles/datepicker.module.scss'
```

if you need a CSS modules version

## SSR

### Stable IDs

We use [`react-uid`](https://github.com/thearnica/react-uid) to generate stable IDs. you'll need `UIDReset` and `UIDFork` (optionally) to properly handle SSR. See the [README](https://github.com/thearnica/react-uid#code-splitting).

## Project structure

`packages` contains a list of published packages:

- `helpers` (full name `@hazelcast/helpers`)
- `services` (full name `@hazelcast/services`)
- `test-helpers` (full name `@hazelcast/test-helpers`)
- `ui` (full name `@hazelcast/ui`)

### Automated visual regression testing

Uses stories from [Storybook](https://storybook.js.org/) as test cases. In other words, any story is going to result in a set of screenshots. Moreover, any story is required to have an associated set of screenshots. Based on [Loki](https://loki.js.org/), which uses headless Chrome to render the screenshots in Docker.

## How-to

### Install [PnpM](https://pnpm.io/installation)

```
npm install -g pnpm
```

### Setup

```
pnpm i
```

#### Under the hood

It runs a regular `pnpm install` and executes a `postinstall` hook. In that hook it runs:

- `pnpm run compile`
  Our child packages are written in TypeScript. To import them from `node_modules` in other packages they must be compiled to JavaScript first.

### Deploy

Every commit to `master` is automatically deployed new canary version of the package (`@hazelcast/xxx@next`) by [Hazelcast Jenkins](http://jenkins.hazelcast.com/view/Frontend%20Shared/job/frontend-shared-master/).

### Add a new shared dependency

In the root folder run

```
pnpm add [-D] dependency-name
```

### Add a new local dependency (for one package only)

In the root folder run (replace @hazelcast/ui with @hazelcast/helpers, @hazelcast/test-helpers or @hazelcast/services if needed)

```
pnpm add --filter @hazelcast/ui dependency-name
```

### Make changes to several packages and test it

When Lerna does the bootstrapping, it creates symlinks to the local packages other packages depend on. In our case, `@hazelcast/ui` depends on `@hazelcast/helpers`. Lerna is going to create a symlink `./packages/ui/node_modules/@hazelcast/helpers` that points to `./packages/helpers`. When we change our TypeScript code, the associated compiled JavaScript is not updated automatically. So if we change something in `@hazelcast/helpers` and we want to test how it works in `@hazelcast/ui`, we need to compile our changes in `@hazelcast/helpers`. To do that we have two options:

1. Compile all packages with `pnpm run compile` in the root directory
2. Compile a specific package, e.g. `cd packages/helpers && pnpm run compile`

Now we can use the updated code in `@hazelcast/ui`.

### Run storybook for development

In the root directory

```
pnpm start
```

### Run linting

In the root directory

```
pnpm run lint
```

### Run unit tests

In the root directory

```
pnpm test
```

### Run visual regression tests

In the root directory

```
pnpm run build-storybook
pnpm run test:visual
```

### Approve the updated for visual regression test screenshots

Say, we have changed something in our components.
First we need to run the visual regression tests to make sure that the change affected how the component is displayed.

```
pnpm run build-storybook
pnpm run test:visual
```

Now, if the test suite failed, we need to go to `packages/ui/.loki` and manually review the screenshots in the `current` folder and the diff in the `difference` folder. If we like what we see, we need to run `pnpm run test:visual:approve` in the `packages/ui` folder. It will update the reference screenshots.

### Generate new screenshots for the new/updated components

Go to `packages/ui` and run command for screenshot generation. The command builds storybook and updates screenshots.

```
cd packages/ui
pnpm run generate-screenshots
```

In case you see an error in the console `error:0308010C:digital envelope routines`

try to run first

```shell
export NODE_OPTIONS=--openssl-legacy-provider
```

### Run all checks at once

```
pnpm run verify-all
```

If you PR passes this check locally, it is almost guaranteed to pass it on the CI.

## Releasing a new version

Assuming you're on latest master and the build is alright (`pnpm run build` runs without errors).

1. First we create a release branch for the next version locally (in this case v1.1.0):

```
git checkout -b release/v1.1.0
```

We push this new branch to Github:

```
git push -u origin release/v1.1.0
```

2. Then we run `lerna version`:
   This updates the package versions (in package.json, package-lock.json), creates a commit with necessary tags and pushes to Github automatically.

```
pnpm exec lerna version 1.1.0
```

At this point you should create a pull request and merge the new version branch (v1.1.0) to master.

3. Now, after merging this pull request, we have the latest version available on GitHub. And it will be automatically published to npm with the required tags and releases;

Wait for a few seconds/minutes (depends on how busy npm is at the time), and you should see the latest version we just released in the list returned by:

```
pnpm view @hazelcast/ui versions
```

If something went wrong and npm did not create a new release, then you can manually inform it about our new release:

```
pnpm exec lerna publish from-git
```
