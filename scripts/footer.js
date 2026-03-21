//footer
const footer = document.querySelector('.site-footer');

const observer4 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.2
});

observer4.observe(footer);