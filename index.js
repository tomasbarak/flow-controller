const { dirname } =   require('path');
const appDir =        dirname(require.main.filename);

const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration();

app.once('ready', () => {
    const menuWindow = require(`${appDir}/Menu/menu.js`).createMenuWindow();
    const server = require(`${appDir}/Controller/Server/server.js`).createServer(menuWindow);
    const page = require(`${appDir}/Controller/Server/server.js`).createPage();
})