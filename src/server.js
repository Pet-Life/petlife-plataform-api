const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const API_PORT = process.env.API_PORT || 3333;

const server = http.createServer(app);

server.listen(API_PORT, () => {
  console.log(`Server running on the http://localhost:${API_PORT}/api/`);
});
