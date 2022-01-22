#!/bin/bash

# Remove everything first
echo "Removing files from bucket..."
aws s3 rm s3://final-project-prd513 --recursive

# Copy over files
echo "Copying new files to bucket..."
aws s3 cp --recursive ./www s3://final-project-prd513