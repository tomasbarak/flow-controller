const saveHostIp = (hostIp) => {
    const appDir =      require('path').dirname(require.main.filename);
    const fs =          require('fs');
    const filePath =    `${appDir}/AppData/host.json`;
    const data =        { host: hostIp };
    const dataStr =     JSON.stringify(data, null, 2);

    fs.writeFileSync(filePath, dataStr);
}

const getHostIp = () => {
    const appDir =      require('path').dirname(require.main.filename);
    const fs =          require('fs');
    const filePath =    `${appDir}/AppData/host.json`;
    let hostIp;
    
    try {
        hostIp = fs.readFileSync(filePath, 'utf8') || '{ "host": "" }';
    } catch (err) {
        hostIp = '{ "host": "" }';
    }
    const host =        JSON.parse(hostIp);
    return host.host;
}

module.exports = {
    saveHostIp,
    getHostIp,
}