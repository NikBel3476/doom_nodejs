window.onload = function () {

    const { HOST, PORT, MESSAGES } = SETTINGS;

    const ui = new UI();
    const server = new Server();
    const socket = io(`${HOST}:${PORT}`);

    let login;

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

    // чат
    // отправка сообщений
    document.getElementById('sendText').addEventListener(
        'click', () => {
            const message = document.getElementById('textLine').value;
            socket.emit(MESSAGES.SEND_MESSAGE, { message, login });
            return true;
        }
    );

    document.getElementById('reg_button').addEventListener(
        'click', () => {
            const name = document.getElementById('reg_input').value;
            socket.emit(MESSAGES.SEND_LOGIN, { name });
            return true;
        }
    );

    socket.on(MESSAGES.SEND_MESSAGE, data => {
        const chat = document.getElementById('chat');
        chat.value += data.login + ': ' + data.message + '\n';
    });

    socket.on(MESSAGES.SEND_LOGIN, data => {
        if (data.result) {
            login = data.result;
            ui.hideElem('reg_container');
            ui.showElem('chat_container');
        }
    });

    async function getResult(method) {
        let data = takeValues();
        let req = await server.sendPost(data, method);
        let result = await JSON.parse(req.data);
        ui.printResult(result);
    }

    function takeValues() {
        let values = ui.takeValues();
        let type = ui.type;
        switch (type) {
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
        for (let i = 0; i < size ** 2 * 2; i += size) {
            arr.push(values.splice(0, size));
        }
        return [
            arr.slice(0, size),
            arr.slice(size, size * 2)
        ];
    }
}