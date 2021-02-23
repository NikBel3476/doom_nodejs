class Calculator {
    
    sum(array) {
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                const result = [];
                if (Array.isArray(array[0][0])) {
                    for (let i = 0; i < array[0].length; i++) {
                        result.push([]);
                        for (let j = 0; j < array[0][0].length; j++) {
                            result[i].push(Number(array[0][i][j]) + Number(array[1][i][j]));
                        }
                    }
                } else {
                    for (let i = 0; i < array[0].length; i++) {
                        result.push(Number(array[0][i]) + Number(array[1][i]));
                    }
                }
                return result;
            } else {
                return Number(array[0]) + Number(array[1]);
            }
        }
        return null;
    }
    
    sub(array) {
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                const result = [];
                if (Array.isArray(array[0][0])) {
                    for (let i = 0; i < array[0].length; i++) {
                        result.push([]);
                        for (let j = 0; j < array[0][0].length; j++) {
                            result[i].push(Number(array[0][i][j]) - Number(array[1][i][j]));
                        }
                    }
                } else {
                    for (let i = 0; i < array[0].length; i++) {
                        result.push(Number(array[0][i]) - Number(array[1][i]));
                    }
                }
                return result;
            } else {
                return Number(array[0]) - Number(array[1]);
            }
        }
        return null;
    }
    
    mult(array) {
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                const result = [];
                let sum = 0;
                for (let i = 0; i < array[0].length; i++) {
                    result.push([]);
                    for (let j = 0; j < array[0].length; j++) {
                        for (let k = 0; k < array[0][0].length; k++) {
                            sum += Number(array[0][i][k]) * Number(array[1][k][j]);
                        }
                        result[i].push(sum);
                        sum = 0;
                    }
                }
                return result;
            } else {
                return Number(array[0]) * Number(array[1]);
            }
        }
        return null;
    }
    
    divis(array) {
        if (Array.isArray(array)) {
            return Number(array[0]) / Number(array[1]);    
        }
        return null;
    }
    
    scalMult(array) {
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                let result = 0;
                for (let i = 0; i < array[0].length; i++) {
                    result += array[0][i] * array[1][i];
                }
                return result;
            }
        }
    }
    
    vectMult(array) {
        if (Array.isArray(array)) {
            if (Array.isArray(array[0])) {
                const vect1 = array[0];
                const vect2 = array[1];
                return [
                    vect1[1] * vect2[2] - vect1[2] * vect2[1], 
                    vect1[0] * vect2[2] - vect1[2] * vect2[0], 
                    vect1[0] * vect2[1] - vect1[1] * vect2[0]
                ];
            }
        }
    }
}

module.exports = Calculator;