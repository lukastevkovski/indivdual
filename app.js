// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Testimonials carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testimonial-dots .dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Автоматска ротација на 6 секунди
setInterval(nextSlide, 6000);

// Клик на точки
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentSlide = parseInt(e.target.dataset.index);
        showSlide(currentSlide);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const success = form.querySelector(".form-success");
  const error = form.querySelector(".form-error");
  const button = form.querySelector(".cta-button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    success.style.display = "none";
    error.style.display = "none";

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        success.style.display = "block";
      } else {
        error.style.display = "block";
      }
    } catch (err) {
      error.style.display = "block";
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
