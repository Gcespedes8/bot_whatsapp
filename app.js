//El codigo QR si se generates
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const SESSION_FILE_PATH = '/session.json';
let client;
let sessionData;

const withSession = () => {

};


// This function generates the QRCode
const withOutSession = () => {
    console.log('No session started');
    client = new Client();
    client.on('qr', qr =>{
        qrcode.generate(qr, {small: true});
    });

    client.on('authenticated', (session) => {
        // Safe the credentials for further use
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
            if (err) {
                console.log(err);
            }
        })
    })

    client.initialize();
};

//Condición tenaria: condición en una sola línea
(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();

