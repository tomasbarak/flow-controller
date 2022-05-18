const { Server } = require("socket.io");

module.exports.createServer = (mainWindow) => {
    const appDir = require('path').dirname(require.main.filename);
    const io = new Server(2009, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.handshake.address);
        const ipAddr = String(socket.handshake.address).replace(/^::ffff:/, '');

        const { createEmptyWhiteList, updateWhiteList, getWhiteList, addHostToWhiteList, isInWhiteList } = require(`${appDir}/Controller/Whitelist/whitelist.js`);
        const whiteList = getWhiteList();
        addHostToWhiteList(String(socket.handshake.address).replace(/^::ffff:/, ''));

        socket.on("changeChannel", (channel) => {
            if (isInWhiteList(ipAddr)) {
                console.log(socket.handshake.address, "received");
                mainWindow.webContents.session.clearStorageData({
                    storages: ['serviceworkers', 'appcache', 'cachestorage']
                }).then(() => {
                    mainWindow.loadURL(`https://web.flow.com.ar/vivo?channel=${channel}`);
                }).catch(err => {
                    console.log(err);
                });
            }

        });
    });

    io.on("disconnect", (socket) => {
        console.log("Client disconnected", socket.handshake.address);
    });

    return io;
}

const express = require('express')

module.exports.createPage = () => {
    const appDir = require('path').dirname(require.main.filename);
    const { getHostIp } = require(`${appDir}/Controller/Server/host.js`);

    const app = express()
    app.set('view engine', 'ejs');

    const port = 2005;

    app.get('/', (req, res) => {
        res.render(`${appDir}/Controller/public/controller.ejs`, {
            locals: {
                host: getHostIp(),
            }
        });
    })

    app.listen(port, () => {
        console.log(`Controller app listening on port ${port}`)
    })
}
