$(document).ready(onReady);

function onReady() {
  console.log('ready');

  $('.js-btn-sumt').on('click', clickHandlerSubmit);
  $('.math').on('click', selectMath);
}

function clickHandlerSubmit() {
  const problems = [
    {
      num1: $('.js-inpt-num1').val(),
      math: $('.mathSelected').val(),
      num2: $('.js-inpt-num2').val(),
    },
  ];
}

function selectMath() {
  $(this).toggleClass('mathSelected');
}

// API / server calls

function postProblems(problems) {
  $.ajax({
    type: 'POST',
    url: '/problems',
    data: problems,
  })
    .then(function (response) {
      console.log('POST of problems:', response);
    })
    .catch(function (err) {
      console.log(err);
      alert('it broke');
    });
}
