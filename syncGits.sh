#!/bin/bash

glue="\""
commitMessage=$glue$1$glue

echo $commitMessage

git add -A \
&& git commit -m  "master" \
&& git push origin master \
&& git push ionic master
