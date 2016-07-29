[![Build Status](https://travis-ci.org/cfpb/hmda-platform-ui.svg?branch=master)](https://travis-ci.org/cfpb/hmda-platform-ui)

# HMDA Platform UI

### This project is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress, and not the final implementation for the HMDA Platform UI, unless otherwise indicated.

## Introduction to HMDA

For more information on HMDA, checkout the [About HMDA page](http://www.consumerfinance.gov/data-research/hmda/learn-more) on the CFPB website.

## The Platform UI

This repo contains the code for the entirety of the HMDA platform front-end, working directly with the [HMDA platform back-end](https://github.com/cfpb/hmda-platform). The various parts of the platform UI are:

- filing interface
  - from authentication -> data submission -> validation -> signed submission

## Dependencies

We use npm to manage front-end dependencies. You should have [npm installed](https://nodejs.org/en/).

See the [package.json](https://github.com/cfpb/hmda-platform-ui/blob/master/package.json) file for application dependencies.

## Installation

``` shell
$ git clone git@github.com:cfpb/hmda-platform-ui.git
$ npm install
```

## Building and viewing

There are several npm scripts available to run, see [package.json](https://github.com/cfpb/hmda-platform-ui/blob/master/package.json) `scripts` section. For local development the most useful is:

``` shell
npm run watch
```

This script will build the application and make the site available to preview at `http://localhost:3000/`.

## How to test the software

``` shell
$ npm test
```

## Known issues

This repo is a work in progress.

## Getting help

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

[CONTRIBUTING](CONTRIBUTING.md)

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)

## Credits and references

1. Projects that inspired you
  - https://github.com/cfpb/hmda-pilot
2. Related projects
  - https://github.com/cfpb/hmda-platform
