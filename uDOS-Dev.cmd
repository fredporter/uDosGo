@echo off
REM Double-click to start Host + ThinUI (Windows).
cd /d "%~dp0"
node scripts\launch-dev.mjs --open %*
