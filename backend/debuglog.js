function debuglog(type, func, message){
    console.log(`[${type}] :: ${func} :: ${message} :: ` + new Date());
}

module.exports = debuglog;