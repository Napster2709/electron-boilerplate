const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    backgroundColor: '#212121',
    showHamburgerMenu: '',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.webContents.openDevTools();

  win.loadFile('index.html');
};

app.on('ready', createWindow);
