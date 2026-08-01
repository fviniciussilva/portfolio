document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Efeito de digitação
  // ==========================

  const textElement = document.getElementById("type-text");

  if (textElement) {
    const words = [
      "Vinícius",
      "Dev em Formação",
      "Estudante de ADS",
      "Técnico Mobile",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      textElement.innerText = currentWord.substring(
        0,
        isDeleting ? charIndex-- : charIndex++,
      );

      if (!isDeleting && charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1800);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
      } else {
        setTimeout(type, isDeleting ? 70 : 120);
      }
    }

    type();
  }

  // ==========================
  // Animação Reveal
  // ==========================

  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    reveals.forEach((element) => observer.observe(element));
  }

  // ==========================
  // Navbar dinâmica
  // ==========================

  const nav = document.querySelector("nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.style.background = "rgba(255,255,255,.92)";
        nav.style.backdropFilter = "blur(20px)";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
      } else {
        nav.style.background = "rgba(255,255,255,.70)";
        nav.style.backdropFilter = "blur(12px)";
        nav.style.boxShadow = "none";
      }
    });
  }

  // ==========================
  // Menu Mobile
  // ==========================

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
