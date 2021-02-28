#!/bin/bash
# auto push files to github

echo "Enter some infos about new add:"
read value
echo "value: $value"
git status
git add .
git commit -am "$value"
git switch master
git merge MACdev
read
git push origin master
