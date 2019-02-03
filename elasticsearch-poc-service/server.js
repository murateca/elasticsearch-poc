const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = 3002;

app.use(cors());

app.get('/getFromElasticSearch/:query', (req, res) => {
  const headers = { 'Content-Type': 'application/json' };
  const queryString = `{
    "query": {
      "query_string" : {
        "query" : "${req.params.query}"
      }
    }
  }`;
  const options = {
    url: 'http://localhost:9200/client/_search',
    method: 'POST',
    headers: headers,
    body: queryString
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
