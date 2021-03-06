/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    backgroundColor: '#212121',
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    // frame: true,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.loadURL('http://localhost:8080');

  // win.webContents.openDevTools();

  const startUrl =
    process.env.NODE_ENV === 'development' ? 'index.html' : 'dist/index.html';

  win.loadFile(startUrl);
};

app.on('ready', createWindow);
