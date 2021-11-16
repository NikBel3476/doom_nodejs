const express = require('express');
const cookie = require('cookie');
const { Server } = require('socket.io');

const Router = require('./application/routers/Router');
const DB = require('./application/modules/db/DB');

const Mediator = require('./application/modules/Mediator');
const ChatManager = require('./application/modules/chat/ChatManager');
const GameManager = require('./application/modules/game/GameManager');
const UserManager = require('./application/modules/users/UserManager');
const RoomsManager = require('./application/modules/RoomsManager');

const SETTINGS = require('./settings');
const { HOST, PORT, MESSAGES, MEDIATOR, DATABASE } = SETTINGS;

const app = express(); // create server

const io = new Server(app.httpServer, {
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

// application logic
const db = new DB();
const mediator = new Mediator(MEDIATOR);
new UserManager({ io, MESSAGES, db, mediator });
new ChatManager({ io, MESSAGES, db, mediator });
new GameManager({ io, MESSAGES, db, mediator });
new RoomsManager({ io, MESSAGES, mediator });

// application routing
const router = new Router({ });

app.use(
    express.static(__dirname + '/public'),
);

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server starting at ${HOST}:${PORT}`);
});
