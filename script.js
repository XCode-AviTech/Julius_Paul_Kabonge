
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
});

//preloader
document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");

    const isReload = performance.getEntriesByType("navigation")[0].type === "reload";

    if (!isReload) {
        preloader.style.display = "flex";

        setTimeout(() => {
            preloader.classList.add("hidden");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 4000);
    } else {
        preloader.style.display = "none";
    }
});

// Navigation toggle 
const navOpen = document.getElementById("show");
const navClose = document.getElementById("close");
const navBar = document.getElementById("nav");
const navLink = document.querySelectorAll("#nav a");

navClose.style.display = "none";
navOpen.style.display = "block";

function toggleNav(){
    navClose.style.display = "block";
    navOpen.style.display = "none";
    navBar.style.display = "grid";

    navOpen.addEventListener("click", toggleNav);
    navClose.addEventListener("click", closeNav);

    navLink.forEach(link => {
        link.addEventListener("click", closeNav);
    });
}

function closeNav(){
    navClose.style.display = "none";
    navOpen.style.display = "block";
    navBar.style.display = "none";
}