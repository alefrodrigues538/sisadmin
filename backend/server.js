const app = require('./app');
const port = normalizaPort(process.env.PORT || '443');
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

// const httpServer = http.createServer(app).listen(port, function(){
//     console.log(`SERVER IS RUNNING ON HTTP_PORT:${port}`);
// });
// const httpsServer = https.createServer(credentials, app).listen(443,function(req, res){
//     console.log(`SERVER IS RUNNING ON HTTPS_PORT:${443}`);
// });

app.listen(port, function () {
    console.log(`SERVER IS RUNNING ON PORT ${port}`)
})