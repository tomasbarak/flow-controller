module.exports.createFlowWindow = (optionalChannel) => {
    const { BrowserWindow } = require('electron')

    if (optionalChannel && optionalChannel > 0 && optionalChannel < 600) {
        win = new BrowserWindow({
            fullscreen: true,
        });
        win.loadURL(`https://web.flow.com.ar/vivo?channel=${optionalChannel}`);
        return win;
    }else{
        win = new BrowserWindow({
            fullscreen: true,
        });
        win.loadURL(`https://web.flow.com.ar/`);
        return win;
    }
}