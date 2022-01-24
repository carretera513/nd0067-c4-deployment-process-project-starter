# Infrastructure

## Dev/Local

The development or local instance consists of a local PostgreSQL 12 DB, with a local Node/Express API, and Angular frontend. The images are stored in an S3 bucket, `final-project-dev513`.

## Production

The production environment is hosted in the cloud (AWS).

### Database

The PostgreSQL DB is hosted in RDS and is named, `udagram-prd`. The DB endpoint is `udagram-prd.civkh8drtjqb.us-east-1.rds.amazonaws.com` and is set as private since the only access will be from the API.

### API

The API service is hosted on the Elastic Beanstalk (EB) service. The environment is named, `udaprod-prd`, with an application of, `udaprod`. The URL to the service is `udaprod-prd.us-east-1.elasticbeanstalk.com`. The AWS credentials are set as environment variables within hte EB setup so that it can access the S3 buckets.

### Frontend

The frontend UI is hosted as an S3 bucket and is named `final-project-prd513`. As a publically accessible, statically hosted website, it is accessed from a web browser at [http://final-project-prd513.s3-website-us-east-1.amazonaws.com] (http://final-project-prd513.s3-website-us-east-1.amazonaws.com). A bucket policy and CORS configuration allow the necessary access.


### Images

The images are stored in an S3 bucket named `final-project-images513`. It has a bucket policy and CORS configuration that allows the required access.

### Communication

The end user's browser communicates to the frontend UI. The frontend then communicates to the API to handle authentication and display the feed. The feed returns AWS URLs to the images S3. The frontend puts and gets images directly from the URLs to the S3 bucket. The API translates the authentication and feed requests into DB queries (selects and inserts). 