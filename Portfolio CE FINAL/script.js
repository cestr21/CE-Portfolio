// Existing code for side-navbar hover effects
document.querySelectorAll('.side-navbar a').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transition = 'all 0.3s ease';
    link.style.transform = 'translateX(10px)';
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateX(0)';
  });
});

// Add a delay for the animations to ensure the page has fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.main-content').style.opacity = 1;
    document.querySelector('.main-content').style.transform = 'scale(1)';

    document.querySelector('.cowboy-text').style.opacity = 1;
    document.querySelector('.cowboy-text').style.transform = 'scale(1)';

    document.querySelector('.side-navbar').style.opacity = 1;
    document.querySelector('.side-navbar').style.transform = 'translateX(0)';
  }, 100); // Adjust the delay as needed
});
