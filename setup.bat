@echo off
:: Antara Library - Windows Setup Script
title Antara Library Setup

echo ✦ Antara Library Setup ✦
echo --------------------------

:: Check Python
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [FOUND] Python is installed.
    echo Starting local development server on http://localhost:8000...
    start http://localhost:8000
    python -m http.server 8000
    goto end
)

:: Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [FOUND] Node.js is installed.
    echo Starting local development server using npx http-server...
    start http://localhost:8080
    call npx -y http-server .
    goto end
)

:: Fallback: Open index.html directly
echo [WARNING] Neither Python nor Node.js was found in your system path.
echo You can still run the app by double-clicking index.html directly!
echo Opening index.html in default browser...
start index.html

:end
pause
