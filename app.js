const express = require('express');
const bodyParser = require('body-parser');
const app = express();
////////////////// websockets ////////////////////////

const WebSocketServer = new require('ws');
const clients = {};
const webSocketServer = new WebSocketServer.Server({port: 3003});

//////////////////////////////////////////////////////
const SETTINGS = require('./settings');
const { PORT } = SETTINGS;
// application logic
const Calculator = require('./application/modules/calculator/Calculator');
const Chat = require('./application/modules/chat/Chat');
const calculator = new Calculator;
const chat = new Chat;
////////////////// websockets ////////////////////////

webSocketServer.on('connection', (ws) => {

    let id = Math.random();
    clients[id] = ws;
    console.log("новое соединение: " + id);
  
    ws.on('message', (message) => {
      console.log('получено сообщение: ' + message);
  
      for(let key in clients) {
        clients[key].send(message);
      }
    });
  
    ws.on('close', () => {
      console.log('соединение закрыто: ' + id);
      delete clients[id];
    });
  
  });
///////////////////////////////////////////////////////
// application routing
const Router = require('./application/routers/Router');
const router = new Router({ calculator });

app.use(
    bodyParser.urlencoded({ extended: false }),
    express.static(__dirname + '/public')
);
app.use('/', router);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));