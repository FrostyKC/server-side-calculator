const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('console');
const app = express();
const PORT = 5000;
const history = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// POST for receiving problems
app.post('/problems', (req, res) => {
  // problem data
  // [
  //   {
  //     num1: '',
  //     math: '',
  //     num2: '',
  //   }
  // ]
  const problemData = req.body;
  console.log(problemData);
  const results = []; // math problem

  // calculate problem
  for (let i = 0; i < problemData.length; i++) {
    const problem = problemData[i];
    if (problem.math === '+') {
      problem.result = problem.num1 + problem.num2;
    }
    results.push(problem);
  }

  history.push(results);
  console.log(history);

  res.sendStatus(200);
});

// GET results/history
app.get('/results', (req, res) => {
  res.send(history);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
