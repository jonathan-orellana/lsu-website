//drop menu
const aboutDropdown = document.querySelector('.site-nav__item--dropdown');
const aboutToggle = document.querySelector('.site-nav__toggle');

aboutToggle.addEventListener('click', () => {
  const isOpen = aboutDropdown.classList.toggle('is-open');
  aboutToggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  if (!aboutDropdown.contains(event.target)) {
    aboutDropdown.classList.remove('is-open');
    aboutToggle.setAttribute('aria-expanded', 'false');
  }
});

//scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add('site-header--hidden');
  } else {
    header.classList.remove('site-header--hidden');
  }

  lastScrollY = currentScrollY;
});