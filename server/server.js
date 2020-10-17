const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const history = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// POST for sending results to array
app.post('/problems', (req, res) => {
  // problem data
  // {
  //   num1: '',
  //   math: '',
  //   num2: '',
  // }
  const problemData = req.body;
  // console.log('problem data', problemData)

  // calculate problem
  problemData.num1 = parseFloat(problemData.num1);
  problemData.num2 = parseFloat(problemData.num2);
  if (problemData.math === '+') {
    problemData.result = problemData.num1 + problemData.num2;
  } else if (problemData.math === '-') {
    problemData.result = problemData.num1 - problemData.num2;
  } else if (problemData.math === '*') {
    problemData.result = problemData.num1 * problemData.num2;
  } else if (problemData.math === '/') {
    problemData.result = problemData.num1 / problemData.num2;
  }
  //pushing all problem data into history array
  history.push(problemData);
  // console.log(history);

  res.sendStatus(200);
});

// GET results/history
app.get('/results', (req, res) => {
  res.send(history);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
