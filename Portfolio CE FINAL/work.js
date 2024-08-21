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
