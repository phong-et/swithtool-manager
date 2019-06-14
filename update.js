var links = { c: 'https://blogspotscraping.herokuapp.com/switchtool/c', s: 'https://blogspotscraping.herokuapp.com/switchtool/s', sync: 'https://blogspotscraping.herokuapp.com/switchtool/sync', "@switch.exe": 'https://blogspotscraping.herokuapp.com/switchtool/@switch.exe' }
var request = require("request"),
    rp = require('request-promise'),
    fs = require("fs"),
    log = console.log,
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    };
function saveFile(fileName, fileContent) {
    var folder = "./";
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    fs.writeFile(folder + fileName, fileContent, function (err) {
        if (err) return log(err);
        log("updated " + fileName + " > successfully");
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
        case '@switch.exe':
            var fileStream = fs.createWriteStream(__dirname + '/' + toolName);
            fileStream.on('close', function() {
                console.log('updated %s successfully', toolName);
            });
            request(linkTool).pipe(fileStream); 
            break;
    }
    
}
(async function(){
    await update('c');
    await update('s');
    await update('sync');
    await update('@switch.exe');
})()
