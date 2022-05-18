const createEmptyWhiteList = () => {
    const fs = require('fs');
    const appDir = require('path').dirname(require.main.filename);
    const emptyWhiteList = { hosts: [] }
    fs.writeFileSync(`${appDir}/AppData/whitelist.json`, JSON.stringify(emptyWhiteList, null, 2));
    return emptyWhiteList;
}

const updateWhiteList = (whitelist) => {
    const fs = require('fs');
    const appDir = require('path').dirname(require.main.filename);
    fs.writeFileSync(`${appDir}/AppData/whitelist.json`, JSON.stringify(whitelist, null, 2));
}

const getWhiteList = () => {
    const fs = require('fs');
    const appDir = require('path').dirname(require.main.filename);
    let whitelistStr;
    try {
        whitelistStr = fs.readFileSync(`${appDir}/AppData/whitelist.json`, 'utf8') || '{ "hosts": [] }';
    } catch (err) {
        whitelistStr = JSON.stringify(createEmptyWhiteList(), null, 2);
    }
    const whitelist = JSON.parse(whitelistStr);
    return whitelist;
}
const isInWhiteList = (host) => {
    const whitelist = getWhiteList();
    return whitelist.hosts.includes(host);
}

const addHostToWhiteList = (host) => {
    const whitelist = getWhiteList();
    if(isInWhiteList(host)){
        return;
    }else{
        whitelist.hosts.push(host);
        updateWhiteList(whitelist);
    }
}


module.exports = {
    createEmptyWhiteList,
    updateWhiteList,
    getWhiteList,
    addHostToWhiteList,
    isInWhiteList,
}