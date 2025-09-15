document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = navToggle.querySelector("i"); // ambil icon <i> di button

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));

    mobileMenu.classList.toggle("hidden"); // toggle menu
    hamburgerIcon.classList.toggle("fa-bars"); // animasi icon
    hamburgerIcon.classList.toggle("fa-xmark");
    document.body.classList.toggle("overflow-hidden");
  });

  // tutup menu setelah klik link
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
      hamburgerIcon.classList.add("fa-bars"); // kembalikan icon ke bars
      hamburgerIcon.classList.remove("fa-xmark");
      document.body.classList.remove("overflow-hidden");
    });
  });

  // Typing animation
  const roles = ["Web Developer", "Graphic Designer", "UI/UX Enthusiast"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typed-text");

  function typeLoop() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = current.substring(0, charIndex);
    } else {
      charIndex--;
      typingEl.textContent = current.substring(0, charIndex);
    }

    let delay = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === current.length) {
      delay = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }
    setTimeout(typeLoop, delay);
  }

  if (typingEl) {
    typeLoop();
  }
});

// ===== Background Particles =====
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];

  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 0.5;
    const dy = (Math.random() - 0.5) * 0.5;
    particlesArray.push({ x, y, dx, dy, size });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(129, 140, 248, 0.7)"; // indigo-400 glow
  particlesArray.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // rebound
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

// responsive
window.addEventListener("resize", initParticles);

// start
initParticles();
animateParticles();

AOS.init({
  duration: 500, // durasi animasi
  once: false, // animasi bisa muncul berkali-kali saat scroll
  mirror: true, // animasi jalan juga saat scroll ke atas
});

// Inisialisasi EmailJS dengan Public Key-mu
emailjs.init("U9noyo27efiXAnJ3m"); // ganti dengan public key EmailJS-mu

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  status.textContent = "Sending...";
  status.classList.remove("text-red-500", "text-green-500");

  emailjs.sendForm("service_4hh0dvs", "template_pjynx4d", this).then(
    () => {
      status.textContent = "Message sent successfully!";
      status.classList.add("text-green-500");
      form.reset();
    },
    (err) => {
      console.error(err);
      status.textContent = "Failed to send message. Try again later.";
      status.classList.add("text-red-500");
    }
  );
});

