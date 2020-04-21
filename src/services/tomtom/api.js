const axios = require('axios').default;

const api = axios.create({
  baseURL: 'https://api.tomtom.com/search/2/geocode/',
});

module.exports = api;
