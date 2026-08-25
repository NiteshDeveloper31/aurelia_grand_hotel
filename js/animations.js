/**
 * AURELIA — Animation & Micro-Interactions Engine
 */

class AnimationEngine {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.setupScrollObserver();
    this.setupHeaderScroll();
    this.setupTiltCards();
    this.setupParallax();
    this.setupHeroSlider();
    this.setupCounters();
  }

  setupScrollObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '120px 0px 120px 0px', // Pre-trigger 120px before entering viewport
      threshold: 0.01 // Trigger immediately on 1% visibility
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view', 'aos-animate');
          
          // If element has counter data, trigger counter animation
          if (entry.target.classList.contains('stat-number') && !entry.target.dataset.counted) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    this.refreshObserver();
  }

  refreshObserver() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right, .stat-number, [data-aos], .suite-card, .menu-item-card, .gallery-item, .offer-card, .exp-card, .amenity-card');
    revealElements.forEach(el => {
      if (this.observer) this.observer.observe(el);
      
      // Instant fail-safe: reveal if element is already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight + 150) && rect.bottom > -100) {
        el.classList.add('in-view', 'aos-animate');
      }
    });
  }

  setupHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  setupTiltCards() {
    document.addEventListener('mousemove', (e) => {
      const tiltCards = document.querySelectorAll('.tilt-card');
      tiltCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        // Calculate distance from cursor to card center
        const distX = e.clientX - cardX;
        const distY = e.clientY - cardY;

        // Check if cursor is near/over card
        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          const rotateX = (distY / (rect.height / 2)) * -8;
          const rotateY = (distX / (rect.width / 2)) * 8;
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
        } else {
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        }
      });
    });
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const parallaxElements = document.querySelectorAll('.parallax-img');
      const scrolled = window.scrollY;

      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.25;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (rect.top - window.innerHeight / 2) * speed;
          el.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
        }
      });
    }, { passive: true });
  }

  setupHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval = null;

    const goToSlide = (index) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    const startTimer = () => {
      stopTimer();
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 7000);
    };

    const stopTimer = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    startTimer();
  }

  setupCounters() {
    // Handled via IntersectionObserver on `.stat-number`
  }

  animateCounter(el) {
    el.dataset.counted = "true";
    const targetVal = parseFloat(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const isDecimal = targetVal % 1 !== 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = targetVal * easedProgress;

      if (isDecimal) {
        el.textContent = currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(currentVal) + suffix;
      }

      if (currentStep >= steps) {
        el.textContent = (isDecimal ? targetVal.toFixed(1) : targetVal) + suffix;
        clearInterval(timer);
      }
    }, stepTime);
  }
}

window.AnimationEngine = AnimationEngine;
