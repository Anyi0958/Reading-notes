@echo off && setlocal enabledelayedexpansion
REM set /p "dirpath=path:"
set /p "filename=filename: "

mkdir "%filename%"
cd "%filename%"
mkdir src img

echo %filename% Ŀ¼>>"%filename%.md"
echo ^[TOC^]>>"%filename%.md"
echo ^*^*^*>>"%filename%.md"
echo.>>"%filename%.md"
echo ^# ǰ��>>"%filename%.md"
echo.>>"%filename%.md"
echo ^# �Ƽ��Ķ�>>"%filename%.md"
echo.>>"%filename%.md"
echo ^- >>"%filename%.md"
set "strpath=%cd%"
start "" /max "%strpath%\%filename%.md"