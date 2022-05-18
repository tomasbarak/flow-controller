const { dirname } =             require('path');
const appDir =                  dirname(require.main.filename);
const { app, BrowserWindow } =  require('electron')
const { saveHostIp, getHostIp } = require(`${appDir}/Controller/Server/host.js`);
app.disableHardwareAcceleration();

app.once('ready', () => {
    var ip = require("ip").address();
    saveHostIp(ip);
    const menuWindow =  require(`${appDir}/Menu/menu.js`).createMenuWindow();
    const server =      require(`${appDir}/Controller/Server/server.js`).createServer(menuWindow);
    const page =        require(`${appDir}/Controller/Server/server.js`).createPage();
});