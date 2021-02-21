const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const SETTINGS = require('./settings');
const { PORT } = SETTINGS;
// application logic
const Calculator = require('./application/modules/calculator/Calculator');
const Chat = require('./application/modules/chat/Chat');
const calculator = new Calculator;
const chat = new Chat;

// application routing
const Router = require('./application/routers/Router');
const router = new Router({ calculator });

app.use(
    bodyParser.urlencoded({ extended: false }),
    express.static(__dirname + '/public')
);
app.use('/', router);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));