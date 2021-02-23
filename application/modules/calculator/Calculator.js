class Calculator {
    calc(data) {
        switch (data.operation) {
            case 'sum':
                return this.sum(data.values);
            case 'sub':
                return this.sub(data);
            case 'mult':
                return this.mult(data);
            case 'divis':
                return this.divis(data);
            case 'scalMult':
                return this.scalMult(data);
            case 'vectMult':
                return this.vectMult(data);
        }
    }
    
    sum(array) {
        console.log(array);
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                if (Array.isArray(array[0][0])) {
                    console.log('is matrix');
                    const result = [];
                    for (let i = 0; i < array[0].length; i++) {
                        result.push([]);
                        for (let j = 0; j < array[0][0].length; j++) {
                            result[i].push(Number(array[0][i][j]) + Number(array[1][i][j]));
                        }
                    }
                    return result;
                } else {
                    console.log('is vector');
                    const result = [];
                    for (let i = 0; i < array[0].length; i++) {
                        result.push(Number(array[0][i]) + Number(array[1][i]));
                    }
                    return result;
                }
            } else {
                return Number(array[0]) + Number(array[1]);
            } 
        }
        return null;
    }
    
    sub(data) {
        switch (data.type) {
            case 'number': {
                const result = data.values.map((elem) => Number(elem));
                return result[0] - result[1];
            }
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
    
    mult(data) {
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
    
    divis(data) {
        return Number(data.values[0]) / Number(data.values[1]);
    }
    
    scalMult(data) {
        let [vect1, vect2] = data.values;
        let result = 0;
        for (let i = 0; i < vect1.length; i++) {
            result += vect1[i] * vect2[i];
        }
        return result;
    }
    
    vectMult(data) {
        let [vect1, vect2] = data.values;
        return [
            vect1[1] * vect2[2] - vect1[2] * vect2[1], 
            vect1[0] * vect2[2] - vect1[2] * vect2[0], 
            vect1[0] * vect2[1] - vect1[1] * vect2[0]
        ];
    }
}

module.exports = Calculator;