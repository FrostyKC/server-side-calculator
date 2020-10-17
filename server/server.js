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
  //   problems: [
  //     {
  //       num1: '',
  //       math: '',
  //       num2: '',
  //     }
  //   ]
  // }
  const problemData = req.body.problems;
  console.log('problem data', problemData);
  const results = []; // math problem with answers

  // calculate problem
  for (let i = 0; i < problemData.length; i++) {
    const problem = problemData[i];
    problem.num1 = parseInt(problem.num1);
    problem.num2 = parseInt(problem.num2);
    if (problem.math === '+') {
      problem.result = problem.num1 + problem.num2;
    } else if (problem.math === '-') {
      problem.result = problem.num1 - problem.num2;
    } else if (problem.math === '*') {
      problem.result = problem.num1 * problem.num2;
    } else if (problem.math === '/') {
      problem.result = problem.num1 / problem.num2;
    }
    //pushing each problem into results array
    results.push(problem);
  }
  //pushing all results into history array
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
