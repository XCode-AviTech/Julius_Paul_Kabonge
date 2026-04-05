
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu
      if (window.closeNav) {
        window.closeNav();
      }
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Set current year in footer
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Preloader
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  
  if (preloader) {
    const isReload = performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (!isReload) {
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 2000);
    } else {
      preloader.style.display = "none";
    }
  }
});

// Navigation toggle - Global functions for onclick handlers
const navOpen = document.getElementById("show");
const navClose = document.getElementById("close");
const navBar = document.getElementById("nav");
const navLinks_all = document.querySelectorAll("#nav a");

window.toggleNav = function() {
  if (!navBar) return;
  navBar.classList.toggle("active");
  if (navOpen && navClose) {
    navClose.style.display = navBar.classList.contains("active") ? "block" : "none";
    navOpen.style.display = navBar.classList.contains("active") ? "none" : "block";
  }
};

window.closeNav = function() {
  if (!navBar) return;
  navBar.classList.remove("active");
  if (navClose && navOpen) {
    navClose.style.display = "none";
    navOpen.style.display = "block";
  }
};

if (navOpen && navClose && navBar) {
  function initNav() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      navOpen.style.display = "block";
      navClose.style.display = "none";
      navBar.classList.remove("active");
    } else {
      navOpen.style.display = "none";
      navClose.style.display = "none";
      navBar.classList.add("active");
    }
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', initNav);
  initNav();

  // Handle window resize
  window.addEventListener('resize', initNav);

  // Close menu when clicking nav links
  navLinks_all.forEach(link => {
    link.addEventListener("click", window.closeNav);
  });
}