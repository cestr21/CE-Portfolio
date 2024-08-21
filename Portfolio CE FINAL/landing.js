document.querySelector('.hero-logo').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default link behavior

  // Add the fade-out class to trigger the animation
  document.body.classList.add('fade-out');
  
  // Redirect to the next page after animation ends
  setTimeout(function() {
    window.location.href = 'main.html';
  }, 600); // Duration of the fade-out animation (in milliseconds)
});
