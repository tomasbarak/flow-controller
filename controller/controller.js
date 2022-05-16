module.exports.promptForChannel = () => {
    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({
        fullscreen: false,
        width: 400,
        height: 200,
        transparent:true, backgroundColor: '#00FFFFFF',
        frame: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    win.setMenu(null);
    win.loadFile(`${__dirname}/controller.html`);
    //win.openDevTools();
    return win;
}