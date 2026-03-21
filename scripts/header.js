const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".site-header__menu-button");
const dropdownItems = document.querySelectorAll(".site-nav__item--dropdown");

if (menuButton && siteHeader) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

dropdownItems.forEach((item) => {
  const toggle = item.querySelector(".site-nav__toggle");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));

    dropdownItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("is-open");
        const otherToggle = otherItem.querySelector(".site-nav__toggle");
        if (otherToggle) {
          otherToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideHeader = event.target.closest(".site-header");

  if (!clickedInsideHeader) {
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const toggle = item.querySelector(".site-nav__toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});

document.querySelectorAll(".site-nav a, .dropdown-menu__link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 980 && siteHeader && menuButton) {
      siteHeader.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
});