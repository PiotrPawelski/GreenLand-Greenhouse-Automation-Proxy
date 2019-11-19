/* eslint-disable no-restricted-syntax */
const express = require('express');
const request = require('request');

const app = express();

const IPTABLE = ['http://localhost:5001', 'http://localhost:5001', 'http://localhost:5001', 'http://localhost:5001'];


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get', (req, res) => {
  const retJSON = [];
  let count = 0;

  for (const ip of IPTABLE) {
    const clientServerOptions = {
      uri: ip + '/get',
      method: 'GET',
    };

    request(clientServerOptions, (error, response, body) => {
      retJSON.push(body);
      count++;

      if (count === IPTABLE.length) {
        res.send(retJSON);
      }
    });
  }
});

app.post('/post', (req, res) => {
  console.log(JSON.parse(req.body));
  for (const ip of IPTABLE) {
    const clientServerOptions = {
      uri: ip + '/get',
      method: 'GET',
    };
    
    request(clientServerOptions, (error, response, body) => {
      console.log(id);
        if (body.id === req.body.id) {
          const clientServerOptions = {
            uri: ip + '/post',
            method: 'POST',
            json: true,
            body: req.body,
          };
        
          request(clientServerOptions, (error, response, body) => {
            console.log(body);
          });
      }
    });
  }
  
});

app.listen(5000, () => console.log('Express server is running on localhost:5000'));
