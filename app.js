const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express(); // create server
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

const SETTINGS = require('./settings');
const { PORT, MESSAGES, MEDIATOR } = SETTINGS;

// application logic
const Mediator = require('./application/modules/Mediator');
const DB = require('./application/modules/db/DB');
const Chat = require('./application/modules/chat/Chat');
const Users = require('./application/modules/users/Users');
const mediator = new Mediator(MEDIATOR);
const db = new DB;
new Users({ io, MESSAGES, db, mediator });
new Chat({ io, MESSAGES, db, mediator });

// application routing
const Router = require('./application/routers/Router');
const router = new Router({ });

app.use(
    bodyParser.urlencoded({ extended: false }),
    express.static(__dirname + '/public'),
);

app.use('/', router);

server.listen(PORT, () => console.log(`Server running at port ${PORT}. http://localhost:3001`));