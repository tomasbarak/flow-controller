module.exports.createFlowPlayer = (optionalChannel) => {
    const { BrowserWindow } = require('electron').remote

    if (optionalChannel && optionalChannel > 0 && optionalChannel < 600) {
        optionalChannel = Math.floor(optionalChannel);
    } else {
        optionalChannel = Math.floor(Math.random() * 600);
    }

    const flowPlayer = new BrowserWindow({
        fullscreen: true,
        show: false,
    });

    flowPlayer.openDevTools();

    flowPlayer.on('closed', () => {
        let currentWindow = require('electron').remote.getCurrentWindow();
        currentWindow.webContents.session.clearStorageData({
            storages: ['serviceworkers', 'appcache', 'cachestorage']
        }).then(() => {
            flowPlayer = null;
        }).catch(err => {
            console.log(err);
        });
    })

    flowPlayer.loadURL(`https://web.flow.com.ar/vivo?channel=${optionalChannel}`);
    return flowPlayer;
}