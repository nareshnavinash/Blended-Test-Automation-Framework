# Blended Test automation Framework

This repo is to have both the frontend and backend automation suite integrated with Circle CI and Travis CI 

Backend REST API automation is built using Ruby Rspec, and can be found under `.api-tests/` folder. Rubocop linter validation is done via Travis CI for the API automation framework.

Frontend UI automation is built using WebdriverIO and can be found under `ui-tests/` folder. Eslint validation is done via Circle CI for UI automation framework

## Travis-CI Build Status

Backend API tests are built with Ruby and hence the files are linted using rubocop which is integrated with Travis-CI, current status - [![Build Status](https://travis-ci.com/nareshnavinash/Hopin.svg?branch=main)](https://travis-ci.com/nareshnavinash/Hopin)

## Circle-CI Build Status
Frontend UI tests are built with javascript and hence the files are linted using ESlint which is intergrated with Circle-CI, current status - 
[**CircleCI**](https://app.circleci.com/pipelines/github/nareshnavinash/Hopin/)

## Overview

|     Parameters     |             API Tests             |             UI Tests             |
|:------------------:|:---------------------------------:|:--------------------------------:|
|      Language      |                Ruby               |            Javascript            |
|   Test Framework   |               Rspec               |               Mocha              |
|   Core Framework   |             client-api            |            WebdriverIO           |
|         CI         |               Travis              |             CircleCI             |
|       Linters      |              Rubocop              |              ESLint              |
|      Assertion     |         Rspec Expectations        |               Chai               |
|   Version Manager  |                RVM                |                NVM               |
|   Package Handler  |              bundler              |                npm               |
|      Reporting     | Allure, junit, logs, rspec_status | Allure, json, junit, screenshots |
| Simple run command |               rspec               |           npm run test           |

# api-tests

Detailed description on the project structure is given in the `README.md` file under `api-tests` folder. Briefly to run the tests,

## Prerequsite
* Install RVM 2.7.0 in the machine
* Clone the project to a directory.
* Navigate to `api-tests` folder.
* Do `gem install bundler` in the folder path "../selenium-ruby-basic" in commandline
* Give `bundle install`
* Required package will be installed from Gemfile.

## To run the tests
* Now run the test by `rspec`
* Allure report can be get by giving `allure serve reports/allure`
* Logs will be available under `reports/logs`

### Tagged run
* To run the tests based on the tags `rspec --tag sanity` or `rspec --tag regression`
* Its better to have two modes of run within the same tests suite in order to have quicker turn over once the build is deployed

### Parallel run
* To speed up the execution, run the tests in parallel way by trying `parallel_rspec spec/`
* This will split the number of spec files which we have according to the number of cpu cores available in the machine

# ui-tests

Detailed description on the project structure is given in the `README.md` file under `ui-tests` folder. Briefly to run the tests,

## Setup
* Clone this repository
* Navigate to the cloned folder and cd `ui-tests`
* Install node and npm using `brew install node`
* Install the dependencies with respect to this project by `npm install`


## To Run the tests

To run all the tests, one can try
```
npm run test
```
This will run all the tests that matches `/test/*.spec.js`

### Parallel run
If you have multiple specs to run at a time, one can specify the number of threads that can be open in a single run through,
```
threads=2 npm run test
```
In ideal case, one can open upto two browsers in headless mode with 1GB RAM. By default the thread value is set to 1, based on machine capacity one can decide to increase the threads.

### Headless run
To run the tests in headless mode,
```
headless=true npm run test
```
By default headless mode is forced if we run the tests in OS other than MAC and Windows. In Mac and Windows if you need to run the tests in headless mode then you can specify from the commandline as above.

### Multi-Browser run
To run the tests in a specific browser,
```
browser=chrome npm run test
browser=firefox npm run test
```
if no browser option is specified, chrome is forced by default. We can combine all the above modes of run by setting up the environment variable either from command line or while building a docker image.

### Running specific tests
In order to run specific tests,
```
npm run test -- --mochaOpts.grep "regression"
```
This is achieved by leveraging mocha's CLI option, one can specify any string (in the place of 'sanity') to run that specific tests.

