const { dirname } =             require('path');
const appDir =                  dirname(require.main.filename);
const { app, BrowserWindow } =  require('electron')

app.disableHardwareAcceleration();

app.once('ready', () => {
    var ip = require("ip").address();
    saveHostIp(ip);
    const menuWindow =  require(`${appDir}/Menu/menu.js`).createMenuWindow();
    const server =      require(`${appDir}/Controller/Server/server.js`).createServer(menuWindow);
    const page =        require(`${appDir}/Controller/Server/server.js`).createPage();
});

function saveHostIp(hostIp){
    const fs = require('fs');
    const filePath = `${appDir}/AppData/host.json`;
    const data = { host: hostIp };
    const dataStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, dataStr);
}