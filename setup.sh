#!/bin/bash
# Antara Library - Mac/Linux Setup Script

echo "✦ Antara Library Setup ✦"
echo "--------------------------"

# Detect if Python is installed
if command -v python3 &>/dev/null; then
    echo "[FOUND] Python 3 is installed."
    echo "Starting local development server on http://localhost:8000..."
    # Attempt to open browser (Mac open, Linux xdg-open)
    if [ "$(uname)" == "Darwin" ]; then
        open "http://localhost:8000"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        xdg-open "http://localhost:8000" &>/dev/null &
    fi
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    echo "[FOUND] Python is installed."
    echo "Starting local development server on http://localhost:8000..."
    # Attempt to open browser
    if [ "$(uname)" == "Darwin" ]; then
        open "http://localhost:8000"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        xdg-open "http://localhost:8000" &>/dev/null &
    fi
    python -m http.server 8000
elif command -v node &>/dev/null; then
    echo "[FOUND] Node.js is installed."
    echo "Starting local development server using npx http-server..."
    if [ "$(uname)" == "Darwin" ]; then
        open "http://localhost:8080"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        xdg-open "http://localhost:8080" &>/dev/null &
    fi
    npx -y http-server .
else
    echo "[WARNING] Neither Python nor Node.js was found in your system path."
    echo "You can still run the app by double-clicking index.html directly!"
    echo "Opening index.html in default browser..."
    if [ "$(uname)" == "Darwin" ]; then
        open "index.html"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        xdg-open "index.html" &>/dev/null &
    fi
fi
