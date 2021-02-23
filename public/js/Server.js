class Server {
  async sendPost(data, method) {
    let request = await fetch('http://localhost:3001/' + method, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let answer = await request.json();
    return answer;
  }
}
