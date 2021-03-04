window.onload = function() {
    const ui = new UI();
    const server = new Server();
////////////////////////////////////////////////////////////

    const socket = new WebSocket("ws://localhost:3003");

////////////////////////////////////////////////////////////

    // переключение
    document.getElementById('show_number').addEventListener(
        'click', () => ui.showDiv('number')
    );
    document.getElementById('show_vector').addEventListener(
        'click', () => ui.showDiv('vector')
    );
    document.getElementById('show_matrix').addEventListener(
        'click', () => ui.showDiv('matrix')
    );
    // увеличение/уменьшение размеров
    document.getElementById('increase_matrix').addEventListener(
        'click', () => ui.incMatrix()
    );
    document.getElementById('decrease_matrix').addEventListener(
        'click', () => ui.decMatrix()
    );
    document.getElementById('increase_vector').addEventListener(
        'click', () => ui.incVector()
    );
    document.getElementById('decrease_vector').addEventListener(
        'click', () => ui.decVector()
    );
    // запросы
    document.getElementById('sum').addEventListener(
        'click', () => getResult('sum')
    );
    document.getElementById('sub').addEventListener(
        'click', () => getResult('sub')
    );
    document.getElementById('mult').addEventListener(
        'click', () => getResult('mult')
    );
    document.getElementById('divis').addEventListener(
        'click', () => getResult('divis')
    );
    document.getElementById('scal_mult').addEventListener(
        'click', () => getResult('scalMult')
    );
    document.getElementById('vect_mult').addEventListener(
        'click', () => getResult('vectMult')
    );

////////////////////// чатик //////////////////

// отправка сообщений
    document.getElementById('sendText').addEventListener(
        'click', () => {
            let valueTextLine =  document.getElementById('textLine').value;
            socket.send(valueTextLine);
            return true;
        }
    );

// обработка входящих
    socket.onmessage = (event) => {
        let message = event.data;
        showMessage(message);
    };

    function showMessage(elem) {
        console.log(elem);
    };

///////////////////////////////////////////////

    async function getResult(method) {
        let data = takeValues();
        let result = await server.sendPost(data, method);
        console.log(result);
    }

    function takeValues() {
        let values = ui.takeValues();
        let type = ui.type;
        switch(type) {
            case 'number': 
                return values
            case 'vector': 
                return vectorsFromArray(values)
            case 'matrix': 
                return matrixFromArray(values)
        }
    }

    function vectorsFromArray(values) {
        let size = ui.getVectorSize();
        return [
            values.slice(0, size), 
            values.slice(size, size * 2)
        ];
    }

    function matrixFromArray(values) {
        let size = ui.getMatrixSize();
        let arr = [];
        for (let i = 0; i < size**2 * 2; i += 3) {
            arr.push(values.splice(0, size));
        }
        return [
            arr.slice(0, size),
            arr.slice(size, size * 2)
        ];
    }
}