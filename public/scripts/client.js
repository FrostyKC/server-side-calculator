$(document).ready(onReady);

function onReady() {
  console.log('ready');

  $('.js-btn-sumt').on('click', clickHandlerSubmit);
  $('.math').on('click', selectMath);
  $('.js-btn-clear').on('click', clearInput);
  getHistory();
}

//clears inputs and math operator
function clearInput() {
  $('.js-inpt-num1').val('');
  $('.js-inpt-num2').val('');
  $('.math').removeClass('mathSelected');
}

function clickHandlerSubmit() {
  console.log('in submit');
  const problems = [
    {
      num1: $('.js-inpt-num1').val(),
      math: $('.mathSelected').val(),
      num2: $('.js-inpt-num2').val(),
    },
  ];
  postProblems(problems);
}

function selectMath() {
  $('.math').removeClass('mathSelected');
  $(this).addClass('mathSelected');
}

function render(resultHistory) {
  console.log(resultHistory);
  const $results = $('.js-results');

  $results.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    const round = resultHistory[i];

    for (let problemResults of round) {
      $('.js-result').empty();
      $('.js-result').append(`${problemResults.result}`);
      $results.append(
        `<li>${problemResults.num1} ${problemResults.math} ${problemResults.num2} = ${problemResults.result}</li>`
      );
    }
  }
}

// API / server calls

function postProblems(problems) {
  // console.log('sending', problems);
  $.ajax({
    type: 'POST',
    url: '/problems',
    data: { problems: problems },
  })
    .then(function (response) {
      // console.log('POST of problems:', response);
      getHistory();
    })
    .catch(function (err) {
      console.log(err);
      alert('it broke');
    });
}

function getHistory() {
  $.ajax({
    type: 'GET',
    url: '/results',
  })
    .then(function (response) {
      render(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('it broke');
    });
}
