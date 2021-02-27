#!/bin/bash
# To get git new files

echo start
git switch master
git pull origin master
git switch MACdev
git merge master
