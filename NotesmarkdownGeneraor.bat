@echo off && setlocal enabledelayedexpansion

set /p "filename=filename: "

mkdir "%filename%"
cd "%filename%"

echo %filename% Ŀ¼>>%filename%.md
echo ^[TOC^]>>%filename%.md
echo ^*^*^*>>%filename%.md
echo.
echo ^# ǰ��>>%filename%.md
echo.