#/bin/bash
git add .
git commit
npm version patch
git add .
git commit --message=npm update
git push
npm publish
#
