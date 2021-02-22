@echo off && setlocal enabledelayedexpansion
REM set /p "dirpath=path:"
set /p "filename=filename: "

mkdir "%filename%"
cd "%filename%"
mkdir src img

echo %filename% Ä¿Â¼>>"%filename%.md"
echo ^[TOC^]>>"%filename%.md"
echo ^*^*^*>>"%filename%.md"
echo.>>"%filename%.md"
echo ^# Ç°ÑÔ>>"%filename%.md"
echo.>>"%filename%.md"
echo ^# ÍÆ¼öÔÄ¶Á>>"%filename%.md"
echo.>>"%filename%.md"
echo ^- >>"%filename%.md"
set "strpath=%cd%"
start "" /max "%strpath%\%filename%.md"