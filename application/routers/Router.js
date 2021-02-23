const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const Answer = require('./Answer');

function Router({ calculator }) {

    const answer = new Answer;

    router.post('/sum', bodyParser.json(), (req, res) => {
        let value = req.body;
        let result = JSON.stringify(calculator.sum(value));
        res.send(answer.good(result));
    });

    router.post('/sub', bodyParser.json(), (req, res) => {
        let result = JSON.stringify(calculator.sub(req.body));
        res.send(answer.good(result));
    });

    router.post('/mult', bodyParser.json(), (req, res) => {
        let value = req.body;
        let result = JSON.stringify(calculator.mult(value));
        res.send(answer.good(result));
    });

    router.post('/divis', bodyParser.json(), (req, res) => {
        let result = JSON.stringify(calculator.divis(req.body));
        res.send(answer.good(result));
    });

    router.post('/scalMult', bodyParser.json(), (req, res) => {
        let result = JSON.stringify(calculator.scalMult(req.body));
        res.send(answer.good(result));
    });

    router.post('/vectMult', bodyParser.json(), (req, res) => {
        let result = JSON.stringify(calculator.vectMult(req.body));
        res.send(answer.good(result));
    });
    
    router.get('/add/:a/:b', (req, res) => {
        const { a, b } = req.params;
        res.send(`${Number(a) + Number(b)}`);
    });
    
    router.get('/multVect/:a/:b/:c/:d', (req, res) => {
        const { a, b, c, d } = req.params;
        const vect = [1, 2, 3];
        const vect2 = [a, b, c];
        const resVect = [vect[1] * vect2[2] - vect[2] * vect2[1], vect[0] * vect2[2] - vect[2] * vect2[0], vect[0] * vect2[1] - vect[1] * vect2[0]];
        res.send(resVect);
    });
    
    router.get('/multsum', (req, res) => {
        let sum = 0;
        for (let key in req.query) {
            sum += Number(req.query[key]);
        }
        res.send(`${sum}`);
    });
    
    router.all('/*', (req, res) => res.send(answer.bad(404)));

    return router;
}

module.exports = Router;