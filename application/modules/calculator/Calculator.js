class Calculator {
    calc(data) {
        switch (data.operation) {
            case 'sum':
                return this.calcSum(data);
            case 'sub':
                return this.calcSub(data);
            case 'mult':
                return this.calcMult(data);
            case 'divis':
                return this.calcDivis(data);
            case 'scalMult':
                return this.calcScalMult(data);
            case 'vectMult':
                return this.calcVectMult(data);
        }
    }
    
    calcSum(data) {
        switch (data.type) {
            case 'number':{
                const result = data.values.map((elem) => Number(elem));
                return result.reduce((acc, elem) => acc += elem, 0);
            }
            case 'vector': {
                const value = data.values;
                const result = [];
                for (let i = 0; i < value[0].length; i++) {
                    result.push(Number(value[0][i]) + Number(value[1][i]));
                }
                return result;
            }
            case 'matrix': {
                const value = data.values;
                const result = [];
                for (let i = 0; i < value[0].length; i++) {
                    result.push([]);
                    for (let j = 0; j < value[0][0].length; j++) {
                        result[i].push(Number(value[0][i][j]) + Number(value[1][i][j]));
                    }
                }
                return result;
            }
        }
    }
    
    calcSub(data) {
        let value;
        switch (data.type) {
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
    
    calcMult(data) {
        let value;
        let result;
        switch (data.type) {
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
    
    calcDivis(data) {
        return Number(data.values[0]) / Number(data.values[1]);
    }
    
    calcScalMult(data) {
        let [vect1, vect2] = data.values;
        let result = 0;
        for (let i = 0; i < vect1.length; i++) {
            result += vect1[i] * vect2[i];
        }
        return result;
    }
    
    calcVectMult(data) {
        let [vect1, vect2] = data.values;
        return [
            vect1[1] * vect2[2] - vect1[2] * vect2[1], 
            vect1[0] * vect2[2] - vect1[2] * vect2[0], 
            vect1[0] * vect2[1] - vect1[1] * vect2[0]
        ];
    }
}

module.exports = Calculator;