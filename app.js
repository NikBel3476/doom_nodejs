const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(
    cors(),
    bodyParser.urlencoded({extended: false}),
    express.static('public')
);

app.post('/calculate', bodyParser.json(), (req, res) => {
    let result = JSON.stringify(calc(req.body));
    res.send(result);
});

app.get('/add/:a/:b', (req, res) => {
    const { a, b } = req.params;
    res.send(`${Number(a) + Number(b)}`);
});

app.get('/multVect/:a/:b/:c/:d', (req, res) => {
    const {a, b, c, d} = req.params;
    const vect = [1, 2, 3];
    const vect2 = [a, b, c];
    
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
    res.send(`${sum}`);
});

app.get('/', (req, res) => {
    res.send({key: 'Message'});
});

app.all('/*', (req, res) => res.send('wrong way'));

function calc(data) {
    switch(data.operation) {
        case 'sum':
            return calcSum(data);
        case 'sub':
            return calcSub(data);
        case 'mult':
            return calcMult(data);
        case 'divis':
            return calcDivis(data);
        case 'scalMult':
            return calcScalMult(data);
        case 'vectMult':
            return calcVectMult(data);
    }
}

function calcSum(data) {
    switch(data.type){
        case 'number':
            result = data.values.map((elem) => Number(elem));
            return result.reduce((acc, elem) => acc += elem, 0);
        case 'vector':
            value = data.values;
            result = [];
            for (let i = 0; i < value[0].length; i++) {
                result.push(Number(value[0][i]) + Number(value[1][i]));
            }
            return result;
        case 'matrix':
            value = data.values;
            result = [];
            for (let i = 0; i < value[0].length; i++) {
                result.push([]);
                for (let j = 0; j < value[0][0].length; j++) {
                    result[i].push(Number(value[0][i][j]) + Number(value[1][i][j]));
                }
            }
            return result;
    }
}

function calcSub(data) {
    let value;
    switch(data.type){
        case 'number':
            result = data.values.map((elem) => Number(elem));
            return result[0] - result[1];
        case 'vector':
            value = data.values;
            result = [];
            for (let i = 0; i < value[0].length; i++) {
                result.push(Number(value[0][i]) - Number(value[1][i]));
            }
            return result;
        case 'matrix':
            value = data.values;
            result = [];
            for (let i = 0; i < value[0].length; i++) {
                result.push([]);
                for (let j = 0; j < value[0][0].length; j++) {
                    result[i].push(Number(value[0][i][j]) - Number(value[1][i][j]));
                }
            }
            return result;
    }
}

function calcMult(data) {
    let value;
    let result;
    switch(data.type){
        case 'number':
            result = data.values.map((elem) => Number(elem));
            return result[0] * result[1];
        case 'matrix':
            value = data.values;
            let [matr1, matr2] = value;
            result = [];
            let sum = 0;
            for (let i = 0; i < value[0].length; i++) {
                result.push([]);
                for (let j = 0; j < value[0][0].length; j++) {
                    for (let k = 0; k < value[0][0].length; k++) {
                        sum += Number(matr1[i][k]) * Number(matr2[k][j]);
                    }
                    result[i].push(sum);
                    sum = 0;
                }
            }
            return result;
    }
}

function calcDivis(data) {
    return Number(data.values[0]) / Number(data.values[1]);
}

function calcScalMult(data) {
    let [vect1, vect2] = data.values;
    let result = 0;
    for (let i = 0; i < vect1.length; i++) {
        result += vect1[i] * vect2[i];
    }
    return result;
}

function calcVectMult(data) {
    let [vect1, vect2] = data.values;
    return [vect1[1] * vect2[2] - vect1[2] * vect2[1], vect1[0] * vect2[2] - vect1[2] * vect2[0], vect1[0] * vect2[1] - vect1[1] * vect2[0]];
}

app.listen(3001, () => console.log('Server is running'));