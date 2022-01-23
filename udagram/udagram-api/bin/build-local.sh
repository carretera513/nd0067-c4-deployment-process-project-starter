#!/bin/bash

# "clean": "rm -rf www/ || true",
# "build": "npm run clean && tsc && cp -rf src/config www/config && cp .env_prod www/.env && cp .npmrc www/.npmrc && cp -rf node_modules www/node_modules && cp package.json www/package.json && cd www && zip -r Archive.zip . && cd ..",

# Remove existing www directory
echo "Removing files..."
rm -rf www || true

# Build production
echo "Building files..."
tsc

# Copy over needed files and folders
echo "Copying files..."
cp -rf ./src/config ./www/config
cp ./.env_prod ./www/.env
cp ./.npmrc ./www/.npmrc
cp -rf ./.elasticbeanstalk ./www/.elasticbeanstalk
cp ./package.json ./www/package.json

# Just get the required node_modules
echo "Installing modules..."
npm install --production --prefix ./www
