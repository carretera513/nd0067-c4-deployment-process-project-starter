#!/bin/bash

# Remove existing www directory
echo "Removing files..."
rm -rf www || true

# Build production
echo "Building production..."
ng build --configuration production