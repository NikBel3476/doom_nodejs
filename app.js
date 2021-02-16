const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(
    cors(),
    bodyParser.urlencoded({extended: false}),
    express.static('public'),
);

app.post('/test', bodyParser.json(), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/add/:a/:b', (req, res) => {
    const { a, b } = req.params;
    console.log(a, b);
    res.send(`${Number(a) + Number(b)}`);
});

app.get('/multVect/:a/:b/:c/:d', (req, res) => {
    const {a, b, c, d} = req.params;
    const vect = [1, 2, 3];
    const vect2 = [a, b, c];
    console.log(a, b, c);
    
    const resVect = [vect[1] * vect2[2] - vect[2] * vect2[1], vect[0] * vect2[2] - vect[2] * vect2[0], vect[0] * vect2[1] - vect[1] * vect2[0]];
    if (Boolean(d) === true) {

    }

    res.send(resVect);
});

app.get('/multsum', (req, res) => {
    let sum = 0;
    for (let key in req.query) {
            sum += Number(req.query[key]);
    }
    console.log(req.query);
    res.send(`${sum}`);
});

app.get('/', (req, res) => {
    res.send({key: 'Message'});
});

app.all('/*', (req, res) => res.send('wrong way'));

app.listen(3001, () => console.log('Server is running'));