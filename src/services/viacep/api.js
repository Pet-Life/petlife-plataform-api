const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

module.exports = api;
