const { Server } = require("socket.io");

module.exports.createServer = (mainWindow) => {

    const io = new Server(2009, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.handshake.address);

        socket.on("changeChannel", (channel) => {
            console.log(channel, "channel");

            if (whiteList.includes(socket.handshake.address)) {
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
    const { dirname } = require('path');
    const appDir = dirname(require.main.filename);
    const fs = require('fs');
    const app = express()
    app.set('view engine', 'ejs');

    const port = 2005;

    const hostStr = fs.readFileSync(`${appDir}/AppData/host.json`, 'utf8');
    const host = JSON.parse(hostStr).host;

    app.get('/', (req, res) => {
        res.render(`${appDir}/Controller/public/controller.ejs`, {
            locals: {
                host: host,
            }
        });
    })

    app.listen(port, () => {
        console.log(`Controller app listening on port ${port}`)
    })
}
