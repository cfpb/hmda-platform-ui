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
$ cd hmda-platform-ui
$ npm install
```

## Building and viewing

### Using the mocked version of the API

#### npm

There are several npm scripts available to run, see [package.json](https://github.com/cfpb/hmda-platform-ui/blob/master/package.json) `scripts` section. For local development the most useful is:

``` shell
npm run watch
```

This script will build the application and make the site available to preview at `http://localhost:3000/`. This script also uses a mocked version of the API.

#### docker-compose

 _This is an alternative to the npm build mentioned above. This build may only exist temporarily until a better integration with the HMDA platform back-end takes place._

We use docker, docker-machine, and docker-compose to run a local dev setup. We use homebrew to install the necessary packages:

``` shell
$ brew install docker docker-compose docker-machine
```

After starting your local docker-machine, `docker-machine create`, you'll need to:

- Build the image: `docker build -t mock-api -f api-dockerfile .`
  - the `-t` flag is necessary because the docker-compose setup depends on that image name;
  - the `-f` flag is necessary because the api-dockerfile is what is used for developing using the mocked version of the api.

Once the image is built, you can simply run:

`docker-compose up -d`

To view the site, again using the mocked version of the API, you'll need to run:

`docker-machine ip`

Using that IP you can view the application in your browser.

### Using the back-end API

To view the full application with the backe-end API please follow the instructions found under the "Building and Running" heading of the [HMDA platform README](https://github.com/cfpb/hmda-platform).


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
