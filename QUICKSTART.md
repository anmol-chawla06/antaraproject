# Quickstart Guide ✦ त्वरित आरम्भ

Follow these simple instructions to download and run the Antara Library repository on your local machine.

---

## ◈ Prerequisites

- **Zero Database Setup Required**: The entire scripture corpus is pre-compiled into an embedded, high-performance global JavaScript structure (`texts_data.js`).
- **Offline Capable**: The app does not require any active internet connection or third-party API keys to run out of the box.

---

## ◈ Launch Instructions

### 1. Clone the Repository
Open your terminal and run the following commands:
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/antara-library.git

# Enter the project directory
cd antara-library
```

### 2. Launch the Application

#### ❖ Option A: Automated Startup Script (Recommended)
The repository includes smart setup scripts that check your system capabilities and start a local HTTP server automatically to bypass browser CORS file security limitations.

- **On macOS / Linux**:
  ```bash
  bash setup.sh
  ```
- **On Windows**:
  Double-click `setup.bat` or run:
  ```cmd
  setup.bat
  ```

#### ❖ Option B: Zero-Install direct Launch
If you do not have Python or Node.js installed, the application is designed to bypass local files CORS policy limitations by loading the dataset using synchronous script bindings.
- **Simply double-click `index.html`** or drag-and-drop it into any modern web browser.

---

## ◈ Application Shortcuts

- **Ctrl + K** or **Cmd + K**: Open/Close the global search modal.
- **Escape**: Close search and layers settings modals.
- **Spacebar**: Toggle play/pause on the audio recitation bar (when not actively typing inside input fields).
