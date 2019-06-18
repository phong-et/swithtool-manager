(function () {
   function showHelp(type){
       // console.log(type)
        switch (type) {
            case 's':
                console.log(`
    ////////////////////////// SWITCH WHITE LABEL /////////////////
    node s HANABET 
    =======> switch to HANABET (get latest Images from domain www.HANABET.com)
    node s WSDBOLA88 www.WSDBOLA88.net
    =======> switch to HANABET (get latest Images from domain www.HANABET.net)
    ------- Note important ------
    If you are doing new white label task, new design task 
    or you are changing some files related Images, odds.css, menu.css, portal.css
    Then you should BACKUP them 1st`)
                break;
            case 'c':
                console.log(`
    ////////////////////////// COPY FILES of NEW WL /////////////////
    switch.cfg.dpPath :'%USERPROFILE%\\Desktop\\Deployer\\
    node c wl DPBOLA
    =======> copy 3 css file and Images folder of DPBOLA to %dpPath%
    ////////////////////////// CHECK NEW WL BY NUMBER or NAME /////////////////
    node c number HDPBET
    node c num HDPBET
    node c n HDPBET  
    =======> Check default/header number of HDPBET
    node c number 129
    node c num 129
    node c n 129
    =======> Check name WL has default/header equal 129
                `)
                break;
        }
    }
    showHelp(process.argv[2])
})()