document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const menuButton = document.querySelector(".site-header__menu-button");
  const dropdownItems = document.querySelectorAll(".site-nav__item--dropdown");
  const navLinks = document.querySelectorAll(".site-nav a, .dropdown-menu__link");

  if (!siteHeader || !menuButton) return;

  let lastScrollY = window.scrollY;

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const toggle = item.querySelector(".site-nav__toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function syncMenuState(isOpen) {
    siteHeader.classList.toggle("is-menu-open", isOpen);
    siteHeader.classList.remove("site-header--hidden");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    document.body.classList.toggle("menu-open", isOpen && window.innerWidth <= 980);

    if (!isOpen) {
      closeAllDropdowns();
    }
  }

  function toggleMenu(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const isOpen = !siteHeader.classList.contains("is-menu-open");
    syncMenuState(isOpen);
  }

  function closeMenu() {
    syncMenuState(false);
  }

  menuButton.addEventListener("click", toggleMenu);
  menuButton.addEventListener("touchend", toggleMenu, { passive: false });

  dropdownItems.forEach((item) => {
    const toggle = item.querySelector(".site-nav__toggle");
    if (!toggle) return;

    const toggleDropdown = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const willOpen = !item.classList.contains("is-open");

      dropdownItems.forEach((otherItem) => {
        const otherToggle = otherItem.querySelector(".site-nav__toggle");
        otherItem.classList.remove("is-open");
        if (otherToggle) {
          otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    };

    toggle.addEventListener("click", toggleDropdown);
    toggle.addEventListener("touchend", toggleDropdown, { passive: false });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!siteHeader.classList.contains("is-menu-open")) return;
    if (event.target.closest(".site-header")) return;
    closeMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980) {
        closeMenu();
      } else {
        closeAllDropdowns();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      document.body.classList.remove("menu-open");
      siteHeader.classList.remove("is-menu-open");
      closeAllDropdowns();
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      siteHeader.classList.remove("site-header--hidden");
    }
  });

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 10) {
      siteHeader.classList.remove("site-header--hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (siteHeader.classList.contains("is-menu-open")) {
      siteHeader.classList.remove("site-header--hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY) {
      siteHeader.classList.add("site-header--hidden");
    } else {
      siteHeader.classList.remove("site-header--hidden");
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
});