window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  hero.classList.add('hero--visible');
});

window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('hero--visible');
});

//mission statement section animation
const wrappers = document.querySelectorAll('.section-wrapper');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-wrapper--visible');
    }
  });
}, {
  threshold: 0.15
});

wrappers.forEach((wrapper) => {
  observer.observe(wrapper);
});

//pillar 
const pillarsSection = document.querySelector('.pillars-section');

const pillarsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('pillars-section--visible');
    }
  });
}, {
  threshold: 0.2
});

if (pillarsSection) {
  pillarsObserver.observe(pillarsSection);
}

//highligh 
const feature = document.querySelector('.feature-highlight');

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('feature-highlight--visible');
    }
  });
}, {
  threshold: 0.3
});

if (feature) {
  observer1.observe(feature);
}

//event
const eventsSection = document.querySelector('.events-section');

const eventsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('events-section--visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

if (eventsSection) {
  eventsObserver.observe(eventsSection);
}

//second highligh 
const featureSecond = document.querySelector('.feature-highlight__second');

const observer3 = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('feature-highlight__second--visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

if (featureSecond) {
  observer3.observe(featureSecond);
}