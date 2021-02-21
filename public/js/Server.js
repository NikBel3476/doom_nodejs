class Server {
  async sendPost(data, method) {
    // const request = await fetch("http://localhost:3001/test");
    let request = await fetch('http://localhost:3001/calculate', {
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
