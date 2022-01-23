#!/bin/bash

# "clean": "rm -rf www/ || true",
# "build": "npm run clean && tsc && cp -rf src/config www/config && cp .env_prod www/.env && cp .npmrc www/.npmrc && cp -rf node_modules www/node_modules && cp package.json www/package.json && cd www && zip -r Archive.zip . && cd ..",

# Create for the deploy process
echo "Creating AWS Profile..."
mkdir /home/circleci/.aws
touch /home/circleci/.aws/config
chmod 600 /home/circleci/.aws/config
echo "[profile eb-cli]" > /home/circleci/.aws/config
echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> /home/circleci/.aws/config
echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> /home/circleci/.aws/config

# Remove existing www directory
echo "Removing files..."
rm -rf www || true

# Build production
echo "Building files..."
tsc

# Copy over needed files and folders
echo "Copying files..."
cp -rf ./src/config ./www/config
# cp ./.env_prod ./www/.env
touch ./www/.env
chmod 600 ./www/.env
echo "POSTGRES_USERNAME=$POSTGRES_USERNAME" > ./www/.env
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> ./www/.env
echo "POSTGRES_DB=$POSTGRES_DB" >> ./www/.env
echo "POSTGRES_HOST=$POSTGRES_HOST" >> ./www/.env
echo "POSTGRERS_PORT=$POSTGRERS_PORT" >> ./www/.env
echo "URL=$URL" >> ./www/.env
echo "JWT_SECRET=$JWT_SECRET" >> ./www/.env
echo "AWS_REGION=$AWS_REGION" >> ./www/.env
echo "AWS_BUCKET=$AWS_BUCKET" >> ./www/.env

cp ./.npmrc ./www/.npmrc
# cp -rf ./.elasticbeanstalk ./www/.elasticbeanstalk
mkdir ./www/.elasticbeanstalk
cp ./resources/eb/config.yml ./www/.elasticbeanstalk/config.yml

cp ./package.json ./www/package.json

# Just get the required node_modules
echo "Installing modules..."
npm install --production --prefix ./www
