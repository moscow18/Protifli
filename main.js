// ===== NAVIGATION =====
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
const header = document.getElementById('main-header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navList = document.getElementById('nav-list');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

// Mobile menu toggle
let menuOpen = false;
if (mobileMenuBtn) {
  // Start hidden on mobile
  header.classList.add('nav-hidden');

  mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenuBtn.classList.toggle('active');
    if (menuOpen) {
      header.classList.remove('nav-hidden');
      header.classList.add('nav-visible');
    } else {
      header.classList.remove('nav-visible');
      header.classList.add('nav-hidden');
    }
  });
}

// Navigation click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');

    // Close mobile menu on click
    if (menuOpen) {
      menuOpen = false;
      mobileMenuBtn.classList.remove('active');
      header.classList.remove('nav-visible');
      header.classList.add('nav-hidden');
    }
  });
});

// ===== SCROLL SPY =====
const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

// Back to top button
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);
backToTop.style.cssText = `
  position: fixed; bottom: 40px; right: 40px; background: #6366f1; color: white;
  width: 50px; height: 50px; border-radius: 14px; display: none; align-items: center;
  justify-content: center; cursor: pointer; z-index: 1000; transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99,102,241,0.3); font-size: 18px;
`;
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backToTop.addEventListener('mouseover', () => { backToTop.style.transform = 'scale(1.1)'; backToTop.style.background = '#4f46e5'; });
backToTop.addEventListener('mouseout', () => { backToTop.style.transform = 'scale(1)'; backToTop.style.background = '#6366f1'; });

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  backToTop.style.display = window.scrollY > 500 ? "flex" : "none";

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active-reveal');
    }
  });
});

// Check responsive: show/hide header based on screen width
function checkResponsive() {
  if (window.innerWidth > 900) {
    header.classList.remove('nav-hidden', 'nav-visible');
    mobileMenuBtn.classList.remove('active');
    menuOpen = false;
  } else if (!menuOpen) {
    header.classList.add('nav-hidden');
  }
}
window.addEventListener('resize', checkResponsive);

// ===== CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.project-card, .c1');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// ===== TYPING EFFECT =====
const typingElement = document.querySelector('.info-home h3');
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);
  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
  }
}

// ===== LOADING SCREEN =====
document.addEventListener("DOMContentLoaded", () => {
  type();
  checkResponsive();

  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => showElement(icon, 1600 + idx * 400));
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 4000);
});