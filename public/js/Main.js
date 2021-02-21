window.onload = function() {
    const ui = new UI();
    const server = new Server();
    let matrixSize = ui.getMatrixSize();
    let vectorSize = ui.getVectorSize();

    
    let showNumber = document.getElementById('show_number');
    let showVector = document.getElementById('show_vector');
    let showMatrix = document.getElementById('show_matrix');
    let incMatrix = document.getElementById('increase_matrix');
    let decMatrix = document.getElementById('decrease_matrix');
    let incVector = document.getElementById('increase_vector');
    let decVector = document.getElementById('decrease_vector');
    let sum = document.getElementById('sum');
    let sub = document.getElementById('sub');
    let mult = document.getElementById('mult');
    let divis = document.getElementById('divis');
    let scalMult = document.getElementById('scal_mult');
    let vectMult = document.getElementById('vect_mult');

    // переключение
    showNumber.addEventListener('click', () => ui.changeView('number'));
    showVector.addEventListener('click', () => ui.changeView('vector'));
    showMatrix.addEventListener('click', () => ui.changeView('matrix'));
    // увеличение/уменьшение размеров
    incMatrix.addEventListener('click', () => ui.incMatrix());
    decMatrix.addEventListener('click', () => ui.decMatrix());
    incVector.addEventListener('click', () => ui.incVector());
    decVector.addEventListener('click', () => ui.decVector());
    // запросы
    sum.addEventListener('click', () => getResult('sum'));
    sub.addEventListener('click', () => getResult('sub'));
    mult.addEventListener('click', () => getResult('mult'));
    divis.addEventListener('click', () => getResult('divis'));
    scalMult.addEventListener('click', () => getResult('scalMult'));
    vectMult.addEventListener('click', () => getResult('vectMult'));

    async function getResult(operation) {
        let data = takeValues();
        data.operation = operation;
        let result = await server.sendPost(data);
    }



    function takeValues() {
        let data = ui.takeValues();
        switch(data.type) {
            case 'number': 
                return {
                    values: data.values,
                    type: data.type
                };
            case 'vector':
                return {
                    values: vectorsFromArray(data.values),
                    type: data.type
                };
            case 'matrix':
                return {
                    values: matrixFromArray(data.values),
                    type: data.type
                };
        }
    }

    function vectorsFromArray(values) {
        let size = ui.getVectorSize();
        let result = [
            values.slice(0, size), 
            values.slice(size, size * 2)
        ];
        return result;
    }

    function matrixFromArray(values) {
        let size = ui.getMatrixSize();
        let arr = [];
        for (let i = 0; i < size**2 * 2; i += 3) {
            arr.push(values.splice(0, size));
        }
        let result = [
            arr.slice(0, size),
            arr.slice(size, size * 2)
        ];
        return result;
    }

    ui.addVector('vector_1');
    ui.addVector('vector_2');
    ui.addMatrix('matrix_1');
    ui.addMatrix('matrix_2');
}