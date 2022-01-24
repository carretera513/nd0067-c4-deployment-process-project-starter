# Pipeline with dependencies

## CI/CD

CircleCI has been setup to execute the pipeline with every push to the configured GitHub repository. The pipeline consists of a workflow with two jobs - one job for building and deploying the API, and another job for building and deploying the Frontend.

Each job starts with setting up a default docker instance and installing Node.js (version 14.15.1).

### API

As part of the initial setup the AWS CLI and Elastic Beanstalk CLI are installed. The necessary environment variales configured in the project are set within the docker instance.

After the dependencies are installed the build process starts. As the .env is not included in the source control files it is created from a script using the environment variables contained in CircleCI. The AWS config file creation is also scripted. The build copies over only the necessary node modules.

After the build the deploy uses the EB CLI to send the files to the AWS cloud.

### Frontend

Only the AWS CLI is installed in this job. Prior to the dependencies being installed, the Angular CLI is installed in the docker environment. The Angular CLI is used to lint, and build the codebase. The production build is called making the files that will be deployed as small as possible. The AWS CLI is used to first remove all the existing files from the S3 bucket and then uploads the ones from the new build.

### Udagram

The package.json in the Udagram directory contains the scripts used in CircleCI. These scripts call the scripts in the solution-specific package.json files. This makes the CircleCI configuration script easier to read.


### Latest Pipeline Status

[![CircleCI](https://circleci.com/gh/carretera513/nd0067-c4-deployment-process-project-starter/tree/master.svg?style=svg)](https://circleci.com/gh/carretera513/nd0067-c4-deployment-process-project-starter/tree/master)