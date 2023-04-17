// const socket = io("http://localhost:8081");
const socket = io("https://bschat.onrender.com");

document.querySelector("#formChat").addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.messageUser.value;

    if (!message) return alert("No puedes enviar un mensaje vaciop");

    socket.emit("messagesChat", {
        message,
    });

    e.target.reset();
});

socket.on("messagesChat", (data) => {
    let html = "";

    for (const { message } of data.messages) {
        html += `<li>${message}</li>`;
    }

    document.querySelector("#messages").innerHTML = html;
});
