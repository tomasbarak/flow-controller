const { Server } = require("socket.io");

module.exports.createServer = (mainWindow) => {

    const io = new Server(2009, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.handshake.address);
        const whiteList = ["::ffff:192.168.0.11", "::ffff:192.168.0.139"]

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

    const app = express()
    const port = 2005

    app.get('/', (req, res) => {
        res.sendFile(`${appDir}/Controller/public/controller.html`);
    })

    app.listen(port, () => {
        console.log(`Controller app listening on port ${port}`)
    })
}
