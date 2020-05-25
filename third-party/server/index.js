const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

io.on("connection", () => {
    console.log("Connected!");
});
app.get('/', (req, res) => {
    res.send('Hello World!');
    io.emit("chat", {"email":"stevenlam123@yahoo.com.hk","first_name":"Steven Lam"});
})
server.listen(3000);