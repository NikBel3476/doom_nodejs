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
const { PORT, MESSAGES } = SETTINGS;

// application logic
const DB = require('./application/modules/db/DB');
const Chat = require('./application/modules/chat/Chat');
const Users = require('./application/modules/users/Users');
const db = new DB;
new Chat({ io, MESSAGES, db });
new Users({ io, MESSAGES, db });

// application routing
const Router = require('./application/routers/Router');
const router = new Router({ });

app.use(
    bodyParser.urlencoded({ extended: false }),
    express.static(__dirname + '/public'),
);

app.use('/', router);

server.listen(PORT, () => console.log(`Server running at port ${PORT}. http://localhost:3001`));