const fs = require('fs');
const crypto = require('crypto');
const path = require('path')

const password="amm#laa&$%&@*#&^#%#*&^#%$#";
const encryptpassword=crypto.hash('SHA-256',password);



try {
    

    if (!fs.existsSync('./hello.txt')) {
        fs.writeFileSync('./hello.txt', "Amlaaaaaaaaaaaaa");
    } else {
        fs.appendFileSync('./hello.txt', `${encryptpassword}`);
        console.log(path.join(__dirname,'./hello.txt'));
        
        
    }
} catch (error) {
    return error;

}