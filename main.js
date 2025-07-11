const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200, // You can adjust initial width
        height: 800, // You can adjust initial height
        minWidth: 800, // Optional: Minimum width
        minHeight: 600, // Optional: Minimum height
        webPreferences: {
            // For security, it's good practice to use a preload script,
            // though for this simple app, it's not strictly necessary.
            // If you don't need Node.js APIs in your frontend, keep nodeIntegration: false and contextIsolation: true.
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Load the index.html of the app.
    // __dirname refers to the directory where the current script (main.js) is located.
    // So, it's loading index.html from the 'app' subfolder.
    mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

    // Open the DevTools. (Optional, uncomment for debugging)
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.