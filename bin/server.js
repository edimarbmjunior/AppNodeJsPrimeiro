var app = require('../src/app');
var debug = require('debug')('AppNodeJsPrimeiro:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

function normalizePort(val){
    var port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe' + port : 'Port ' + port;

    switch (error.code){
        case 'EACCES':
            console.log(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pepi ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
