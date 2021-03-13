class Server {
 /*  constructor() {
    this.socket = new WebSocket('wss://localhost:3001/');
    this.socket.onopen = () => {
      console.log('socket is open');
    }
  } */

  async sendGet(data, method) {
    const json = JSON.stringify(data);
    let request = await fetch(`http://localhost:3001/${method}/${json}`, {
      method: 'get'
    })
    let answer = await request.json();
    return answer;
  }

  async sendPost(data, method) {
    const json = JSON.stringify(data);
    let request = await fetch('http://localhost:3001/' + method, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    let answer = await request.json();
    return answer;
  }
}
