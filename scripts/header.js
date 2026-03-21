document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const menuButton = document.querySelector(".site-header__menu-button");
  const dropdownItems = document.querySelectorAll(".site-nav__item--dropdown");
  const navLinks = document.querySelectorAll(".site-nav a, .dropdown-menu__link");

  let lastScrollY = window.scrollY;

  if (menuButton && siteHeader) {
    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = siteHeader.classList.toggle("is-menu-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      if (isOpen) {
        siteHeader.classList.remove("site-header--hidden");
      }
    });
  }

  dropdownItems.forEach((item) => {
    const toggle = item.querySelector(".site-nav__toggle");

    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

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

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980 && siteHeader && menuButton) {
        siteHeader.classList.remove("is-menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      }

      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");

        const toggle = item.querySelector(".site-nav__toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  window.addEventListener("scroll", () => {
    if (!siteHeader) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 10) {
      siteHeader.classList.remove("site-header--hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (siteHeader.classList.contains("is-menu-open")) {
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY) {
      siteHeader.classList.add("site-header--hidden");
    } else {
      siteHeader.classList.remove("site-header--hidden");
    }

    lastScrollY = currentScrollY;
  });
});