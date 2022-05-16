let win = null;
let channel = 1;
function switchChannel(e) {
    if (e.keyCode === 13) {
        channel = document.querySelector('input').value;

        const BrowserWindow = require('electron').remote.BrowserWindow;

        if (!win) {
            win = new BrowserWindow({
                fullscreen: true,
            });
            win.loadURL(`https://web.flow.com.ar/vivo?channel=${channel}`);
        } else {
            win.loadURL(`https://web.flow.com.ar/vivo?channel=${channel}`);
        }
    }
    win.on('closed', (e) => {
        alert('closed');
        win = null;
    })

    win.webContents.once('dom-ready', () => {
        win.webContents.executeJavaScript("document.querySelectorAll('[data-testid=fullScreenButton]')[0].click(); console.log('idk')");
        waitForElm('[data-testid=fullScreenButton]').then((element) => {
            eventFire(element, 'click');
        });
    })
}

function changeChannel(chnl) {
    if (win) {
        win.loadURL(`https://web.flow.com.ar/vivo?channel=${chnl}`);
        document.querySelector('input').value = chnl;
    }
}

function addChannel() {
    channel++;
    changeChannel(channel);
}

function substractChannel() {
    channel--;
    changeChannel(channel);
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}