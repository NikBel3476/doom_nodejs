const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const cookie = require('cookie');

const Router = require('./application/routers/Router');
const DB = require('./application/modules/db/DB');

const Mediator = require('./application/modules/Mediator');
const ChatManager = require('./application/modules/chat/ChatManager');
const GameManager = require('./application/modules/game/GameManager');
const UserManager = require('./application/modules/users/UserManager');
const RoomsManager = require('./application/modules/RoomsManager');

const SETTINGS = require('./settings');
const { HOST, PORT, MESSAGES, MEDIATOR, DATABASE } = SETTINGS;

const app = express();
const server = http.createServer(app);

const router = new Router({ });

app.use(cors({
    credentials: true,
    origin: `http://localhost:4200`
}));
app.use(
    express.static(__dirname + '/public'),
);
app.use('/', router);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.use((socket, next) => {
    if (socket.handshake.headers?.cookie) {
        socket.cookie = cookie.parse(socket.handshake.headers.cookie);
    }
    return next();
});

const db = new DB();
const mediator = new Mediator(MEDIATOR);
new UserManager({ io, MESSAGES, db, mediator });
new ChatManager({ io, MESSAGES, db, mediator });
new GameManager({ io, MESSAGES, db, mediator });
new RoomsManager({ io, MESSAGES, mediator });

server.listen(PORT, () => {
    console.log(`Server starting at ${HOST}:${PORT}`);
});
