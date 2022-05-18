

module.exports.createMenuWindow = () => {
    const { dirname } = require('path');
    const appDir = dirname(require.main.filename);

    const { BrowserWindow } = require('electron')
    const menuWindow = new BrowserWindow({
        fullscreen: false,
        show: false,
        backgroundColor: '#1a1a1a',
        title: 'Flow TV - Home',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    menuWindow.setMenu(null);
    menuWindow.maximize();
    menuWindow.openDevTools();
    menuWindow.loadFile(`${appDir}/Menu/public/menu.html`);
    menuWindow.show();
    menuWindow.closable = false;

    return menuWindow;
}

module.exports.setMenuClickEvents = () => {
    let btnVerTv = document.getElementById('option-1');
    let btnDispositivos = document.getElementById('option-2');

    btnVerTv.addEventListener('click', () => {
        const currentWindow = require('electron').remote.getCurrentWindow();
        const randomChannel = Math.floor(Math.random() * 600);
        currentWindow.webContents.session.clearStorageData({
            storages: ['serviceworkers', 'appcache', 'cachestorage']
        }).then(() => {
            currentWindow.loadURL(`https://web.flow.com.ar/vivo?channel=${randomChannel}`);
            currentWindow.customData.channel = randomChannel;
        });
    });

    btnDispositivos.addEventListener('click', () => {
        const currentWindow = require('electron').remote.getCurrentWindow();
        currentWindow.loadFile(`public/connection.html`);
    });

}