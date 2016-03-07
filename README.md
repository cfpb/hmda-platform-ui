[![Build Status](https://travis-ci.org/cfpb/hmda-platform-ui.svg?branch=master)](https://travis-ci.org/cfpb/hmda-platform-ui)

# HMDA Platform UI

### This project is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress, and not the final implementation for the HMDA Platform UI, unless otherwise indicated.

## Introduction to HMDA

The Home Mortgage Disclosure Act (HMDA) requires many financial institutions to maintain, report, and publicly disclose information about mortgages. HMDA was originally enacted by Congress in 1975 and is implemented by Regulation C. The Dodd-Frank Act transferred HMDA rulemaking authority from the Federal Reserve Board to the Consumer Financial Protection Bureau (CFPB) on July 21, 2011.

This regulation provides the public loan data that can be used to assist:

- in determining whether financial institutions are serving the housing needs of their communities;
- public officials in distributing public-sector investments so as to attract private investment to areas where it is needed;
- and in identifying possible discriminatory lending patterns.

This regulation applies to certain financial institutions, including banks, savings associations, credit unions, and other mortgage lending institutions.

## The Platform UI

This repo contains the code for the entirety of the HMDA platform front-end, working directly with the [HMDA platform back-end](https://github.com/cfpb/hmda-platform). The various parts of the platform UI are:

- filing interface
  - from authentication -> data submission -> validation -> signed submission
- publication interface(s)
  - reports
  - charts/graphs

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

This script will build the application, make the site available to preview at `http://localhost:3000/`, and enable browser-sync for live reloading.

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
