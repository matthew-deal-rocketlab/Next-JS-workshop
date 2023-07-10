# Description

This document describes how to use this repository

## Important branches

There are 5 main branches in this mono repository:

`develop` - This branch is where all features and fixes are merged.
    Once you are ready to push a build for testing, then merge this branch into one of the staging branches

`api-staging` - pushing to this branch will build and deploy a staging version of the backend API for testing.
    Only update this branch by merging from `develop` branch

`api-main` - pushing to this branch will build and deploy a production version of the backend API.
    Only do so if the build has passed testing from the `api-staging` branch
    Only update this branch by merging from `api-staging` branch

`web-staging` - pushing to this branch will build and deploy a staging version of the frontend website.
    Only update this branch by merging from `develop` branch

`web-main` - pushing to this branch will build and deploy a production version of the frontend website.
    Only do so if the build has passed testing from the `web-staging` branch
    Only update this branch by merging from `web-staging` branch


The direction of merges must be in this order

develop -> api-staging -> api-main

develop -> web-staging -> web-main

anything can be merged into the develop branch after review


## Creating new branches

Create a branch for any task you are given

When adding new features or changing something create a new branch with prefix `feat/`.  For example:
`feat/CODE-01-example-description`
where `CODE-01` is some kind of ticket number from Jira or other ticketing system

when fixing bug create a new branch withthe prefix `fix/`.  For example:
`fix/BUG-01-correct-page2-text`
