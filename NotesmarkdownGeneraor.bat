@echo off && setlocal enabledelayedexpansion

set /p "filename=filename: "

mkdir "%filename%"
cd "%filename%"

echo %filename% д©б╪>>%filename%.md
echo ^[TOC^]>>%filename%.md
echo ^*^*^*>>%filename%.md
echo.
echo ^# г╟ят>>%filename%.md
echo.