#!/bin/bash

# Deploy to Elastic Beanstalk
echo "Deploying to Elastic Beanstalk"
(cd www && eb deploy)