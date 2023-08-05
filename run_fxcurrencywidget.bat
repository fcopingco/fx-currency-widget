@echo off
setlocal

rem Change this path to the root directory of your Angular project
set "project_path=C:\Projects\FX Rates Widget\fx-currency-widget"

rem Run Angular Project
cd /d "%project_path%" & call ng serve --open
endlocal
