/* eslint-disable no-restricted-syntax */
const express = require('express');
const axios = require('axios');

const app = express();

const IPTABLE = ['http://localhost:5001', 'http://localhost:5001', 'http://localhost:5001', 'http://localhost:5001'];


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/get', (req, res) => {
  const promises = IPTABLE.map((ip) => axios.get(`${ip}/get`));

  Promise.all(promises)
    .then((responses) => {
      res.send(responses.map((response) => response.data));
    });
});


app.listen(5000, () => console.log('Express server is running on localhost:5000'));
