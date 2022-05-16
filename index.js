const { app, BrowserWindow } = require('electron')
try {
    require('electron-reloader')(module)
  } catch (_) {}
let win;
app.commandLine.appendSwitch('widevine-cdm-path', '/opt/google/chrome/WidevineCdm/_platform_specific/linux_x64/libwidevinecdm.so')
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2449.0')
app.disableHardwareAcceleration();
app.once('ready', () => {
    const promtWin = require('./controller/controller.js').promptForChannel();
})