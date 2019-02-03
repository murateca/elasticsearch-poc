const express = require('express');
const cors = require('cors');
const request = require('request');
var mysql = require('mysql');

const connection = {
  host: 'localhost',
  user: 'root',
  password: 'root'
};
const db = mysql.createConnection(connection);

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL server at', connection.host);
});

const app = express();
const PORT = 3002;

app.use(cors());

app.get('/getFromElasticSearch/:query', (req, res) => {
  var headers = { 'Content-Type': 'application/json' };
  var queryString = `{
    "query": {
      "query_string" : {
        "query" : "${req.params.query}"
      }
    }
  }`;
  var options = {
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

app.get('/getFromMySQL/:query', (req, res) => {
  var queryString = `
    SELECT * 
    FROM poc.client_details
    WHERE client_no = "${req.params.query}"
    OR tckn = "${req.params.query}"
    OR name = "${req.params.query}"
    OR second_name = "${req.params.query}"
    OR surname = "${req.params.query}"
    OR client_score = "${req.params.query}"
    OR birth_date = "${req.params.query}"
    OR birth_place = "${req.params.query}"
    OR father_name = "${req.params.query}"
    OR mother_name = "${req.params.query}"
    OR mother_maiden_surname = "${req.params.query}"
    OR volume_no = "${req.params.query}"
    OR family_serial_no = "${req.params.query}"
    OR serial_no = "${req.params.query}"
    OR registered_province = "${req.params.query}"
    OR registered_county = "${req.params.query}"
    OR registered_village = "${req.params.query}"
    OR date_of_issue = "${req.params.query}"
    OR place_of_issue = "${req.params.query}"
    OR nationality = "${req.params.query}"
    `;
  db.query(queryString, (error, result) => {
    if (error) throw error;
    console.log('result :', result);
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
