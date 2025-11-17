// ================= MENU =================
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// ================= DARK / LIGHT MODE =================
const darkModeButton = document.getElementById('darkModeButton');
let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkModeEnabled', 'true');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkModeEnabled', 'false');
};

document.addEventListener('DOMContentLoaded', () => {
    if (darkModeButton) darkModeButton.checked = darkModeEnabled;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
});

if (darkModeButton) {
    darkModeButton.addEventListener('change', () => {
        darkModeButton.checked ? enableDarkMode() : disableDarkMode();
    });
}

// ================= HOME PAGE =================
// ================= MULTIPLE TEXT =================
new Typed('.multiple', {
    strings: ['Front-End Developer', 'Web Designer', 'Software Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ================= ABOUT PAGE =================

const readMoreBtn = document.getElementById("readMoreBtn");
const paragraph = document.querySelector(".about-info p");

readMoreBtn.addEventListener("click", () => {
  paragraph.classList.toggle("expanded");
  readMoreBtn.textContent = paragraph.classList.contains("expanded") ? "Read Less" : "Read More";
});


// ================= SKILL ANIMATION =================
const progressBars = document.querySelectorAll(".progress");
const circles = document.querySelectorAll(".circle");
const skillsSection = document.querySelector("#skills");
let skillsAnimated = false;

function animateSkills() {
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {

        progressBars.forEach(bar => {
            const percent = bar.getAttribute("data-percent");
            bar.style.width = percent + "%";
        });

        circles.forEach(circle => {
            const percent = parseFloat(circle.getAttribute("data-percent"));
            const svg = circle.querySelector("circle");
            const radius = 70;
            const circumference = 2 * Math.PI * radius;

            svg.style.strokeDasharray = circumference;
            svg.style.strokeDashoffset = circumference;

            const offset = circumference - (percent / 100) * circumference;
            svg.style.transition = "stroke-dashoffset 2s cubic-bezier(.34,1.56,.64,1)";
            svg.style.strokeDashoffset = offset;
        });

        skillsAnimated = true;
    }
}

// ================= ACTIVE NAV LINK + HEADER SHADOW =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav ul li a");
const header = document.querySelector("header");

function updateScrollEffects() {
    let top = window.scrollY;

    // Header shadow
    header.style.boxShadow =
        top > 0 ? "0 2px 4px rgba(255, 255, 255, 0.51)" : "none";

    // Active link highlight
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });

    // Skills animation
    animateSkills();
}

// Debounce scroll for performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollEffects, 10);
});

// Close menu on nav click
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
    });
});

