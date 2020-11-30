const app = require('./app');
const port = normalizaPort(process.env.PORT || '21008');
const http = require('http');
const https = require('https');
const fs = require('fs');
const privateKey = fs.readFileSync('./sslcert/key.pem','utf8');
const certificate = fs.readFileSync('./sslcert/server.crt','utf8');

var credentials = {key:privateKey, cert:certificate, passphrase:''};


function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
        return port;
    }
return false;
}

const httpServer = http.createServer(app).listen(port);
const httpsServer = https.createServer({
    key: fs.readFileSync('sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('sslcert/server.crt', 'utf8')
}, app).listen(443);

console.log(`SERVER IS RUNNING ON HTTP_PORT:${port} / HTTPS_PORT:${443}`);
// app.listen(port, function () {
//     console.log(`SERVER IS RUNNING ON PORT ${port}`)
// })