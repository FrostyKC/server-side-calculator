$(document).ready(onReady);

function onReady() {
  console.log('ready');

  $('.js-btn-sumt').on('click', clickHandlerSubmit);
  $('.math').on('click', selectMath);
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
  $(this).toggleClass('mathSelected');
}

// API / server calls

function postProblems(problems) {
  console.log('sending', problems);
  $.ajax({
    type: 'POST',
    url: '/problems',
    data: { problems: problems },
  })
    .then(function (response) {
      console.log('POST of problems:', response);
    })
    .catch(function (err) {
      console.log(err);
      alert('it broke');
    });
}
