class sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
        this.messages = [];
    }

    socketsEvents() {
        this.io.on("connection", (socket) => {
            socket.emit("messagesChat", {
                messages: this.messages,
            });

            socket.on("messagesChat", (data) => {
                this.messages.push(data);
                this.io.emit("messagesChat", {
                    messages: this.messages,
                });
            });
        });
    }
}

module.exports = sockets;
