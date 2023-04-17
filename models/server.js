const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const sockets = require("./sockets");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //configuraciones server
        this.io = socketio(this.server, {
            /**Configuraciones */
        });
    }

    middlewares() {
        // desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, "../public")));

        // habilitar los cors
        this.app.use(cors());
    }

    configSockets() {
        new sockets(this.io);
    }

    execute() {
        // Inicializar Middlewares
        this.middlewares();

        // configurar sockets
        this.configSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log("http://localhost:" + this.port);
        });
    }
}

module.exports = Server;
