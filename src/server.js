const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

const { setupWebsocket } = require('./websocket');

dotenv.config();

const API_PORT = process.env.API_PORT || 3333;

const server = http.createServer(app);

setupWebsocket(server);

server.listen(API_PORT, () => {
  console.log(`Server running on the http://127.0.0.1:${API_PORT}/api/v1/`);
});
