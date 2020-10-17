const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const history = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// POST for receiving problems

// calculate problem

// GET results/history
app.get('/results', (req, res) => {
  res.send(history);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
