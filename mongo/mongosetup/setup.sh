#!/bin/bash

echo "*********************************************"
echo "Starting the replica set"
echo "*********************************************"

mongo mongodb://mongo1:27017 replicaSet.js