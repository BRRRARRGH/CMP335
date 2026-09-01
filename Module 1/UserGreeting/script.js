document.addEventListener('DOMContentLoaded', function () {
  var submitBtn = document.getElementById('submitBtn');
  var firstInput = document.getElementById('firstName');
  var lastInput = document.getElementById('lastName');
  var welcomeEl = document.getElementById('welcome');

  function showWelcome() {
    var first = firstInput.value.trim();
    var last = lastInput.value.trim();
    if (first === '' && last === '') {
      alert('Please enter at least one name.');
      return;
    }
    var full = (first + ' ' + last).trim();
    welcomeEl.textContent = 'Welcome, ' + full + '!';
    welcomeEl.classList.remove('hidden');
  }

  submitBtn.addEventListener('click', showWelcome);

  // Allow pressing Enter in either input to submit
  [firstInput, lastInput].forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        showWelcome();
      }
    });
  });
});