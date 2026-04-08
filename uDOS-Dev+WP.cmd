@echo off
REM Windows: Docker WordPress stack + Host + ThinUI
cd /d "%~dp0"
node scripts\launch-with-wp.mjs --open %*
