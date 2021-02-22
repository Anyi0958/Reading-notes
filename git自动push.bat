@echo off && setlocal enabledelayedexpansion

git status
set /p "info=commit info:"
git add .
git commit -am "%info%"
pause
git status
pause
git switch master
git merge dev
pause
git push origin master
pause
git switch dev
git status
pause