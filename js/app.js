/**
 * AURELIA — Main Application Entry & Component Controller (Indian Hotel & Restaurant Demo)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Engines
  window.router = new Router();
  window.animationEngine = new AnimationEngine();
  window.cursor = new LuxuryCursor();
  window.bookingEngine = new BookingEngine();
  window.audioEngine = new AudioEngine();

  // Render Dynamic Components from AURELIA_DATA
  renderSuitesPage();
  renderDiningMenuPage();
  renderOffers();
  renderEvents();
  renderAmenities();
  renderGalleryPage();
  renderTestimonials();

  // Setup Interaction Handlers
  setupSuiteFilters();
  setupMenuFilters();
  setupGalleryFilters();
  setupLightbox();
  setupSuiteDetailModal();
  setupMobileMenu();
  setupConciergeWidget();
  dismissPreloader();
});

// Dismiss preloader curtain
function dismissPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      if (window.animationEngine) window.animationEngine.refreshObserver();
    }, 800);
  }, 800);
}

// Render Rooms & Suites Cards
function renderSuitesPage() {
  const containers = [document.getElementById('suitesGrid'), document.getElementById('suitesGridHome')];
  if (!window.AURELIA_DATA) return;

  const suites = window.AURELIA_DATA.suites;
  const cardsHtml = suites.map(suite => `
    <div class="suite-card tilt-card reveal-up in-view" data-category="${suite.category}">
      <div class="suite-card-img">
        <img src="${suite.image}" onerror="this.src='${suite.fallback}'" alt="${suite.title}" loading="lazy">
        <span class="suite-badge">${suite.badge}</span>
        <button class="suite-quick-view-btn" data-view-suite="${suite.id}" data-cursor="VIEW">View Details</button>
      </div>
      <div class="suite-card-body">
        <div class="suite-meta">
          <span>📏 ${suite.size}</span>
          <span>👥 ${suite.capacity}</span>
          <span>🛏️ ${suite.bedType}</span>
        </div>
        <h3 class="suite-title">${suite.title}</h3>
        <p class="suite-subtitle">${suite.subtitle}</p>
        <p class="suite-desc">${suite.description.substring(0, 110)}...</p>

        <div style="margin: 1rem 0; font-size: 0.82rem; color: var(--color-text-muted);">
          ${suite.amenities.slice(0, 3).map(a => `<span style="display:inline-block; margin-right:8px;">✓ ${a}</span>`).join('')}
        </div>

        <div class="suite-card-footer">
          <div class="suite-price">
            <span class="price-val">₹${suite.price.toLocaleString('en-IN')}</span>
            <span class="price-unit">/ night</span>
          </div>
          <button class="btn btn-gold btn-sm" data-open-booking data-booking-type="suite" data-item-id="${suite.id}">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');

  containers.forEach(container => {
    if (container) container.innerHTML = cardsHtml;
  });
}

// Suite Category Filter Handler
function setupSuiteFilters() {
  const filterBtns = document.querySelectorAll('[data-filter-suite]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter-suite');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const suitesContainers = document.querySelectorAll('.suites-grid');
      suitesContainers.forEach(container => {
        if (!container) return;
        const cards = container.querySelectorAll('.suite-card');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'block';
            card.classList.add('in-view');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
}

// Render Menu Items
function renderDiningMenuPage() {
  const menuContainers = [document.getElementById('menuGrid'), document.getElementById('menuGridHome')];
  if (!window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.menuItems;
  const cardsHtml = items.map(item => `
    <div class="menu-item-card reveal-up in-view" data-menu-category="${item.category}">
      <div style="height: 180px; border-radius: 4px; overflow: hidden; margin-bottom: 1rem; position: relative;">
        <img src="${item.image}" onerror="this.src=generatePlaceholderSvg('${item.title}', 'INDIAN GASTRONOMY', 600, 400, 'dining')" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div class="menu-item-header">
        <h4 class="menu-item-title">${item.title}</h4>
        <span class="menu-item-price">${item.price}</span>
      </div>
      <p class="menu-item-desc">${item.desc}</p>
      ${item.ingredients ? `<div style="font-size:0.78rem; color:var(--color-gold-primary); margin-bottom:0.8rem;">🌿 <strong>Ingredients:</strong> ${item.ingredients}</div>` : ''}
      <div class="menu-item-tags">
        ${item.tags.map(t => `<span class="menu-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  menuContainers.forEach(container => {
    if (container) container.innerHTML = cardsHtml;
  });
}

// Menu Category Filter Handler
function setupMenuFilters() {
  const filterBtns = document.querySelectorAll('[data-filter-menu]');
  const menuContainer = document.getElementById('menuGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter-menu');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (!menuContainer) return;
      const items = menuContainer.querySelectorAll('.menu-item-card');
      items.forEach(item => {
        const cat = item.getAttribute('data-menu-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Render Offers
function renderOffers() {
  const offersGrid = document.getElementById('offersGrid');
  if (!offersGrid || !window.AURELIA_DATA) return;

  const offers = window.AURELIA_DATA.offers;
  offersGrid.innerHTML = offers.map(offer => `
    <div class="offer-card reveal-up in-view">
      <div class="offer-img">
        <img src="${offer.image}" onerror="this.src='${offer.fallback}'" alt="${offer.title}">
        <span class="offer-tag">${offer.discount}</span>
      </div>
      <div class="offer-body">
        <span class="offer-validity">📅 ${offer.validity}</span>
        <h3 class="offer-title">${offer.title}</h3>
        <p class="exp-desc">${offer.desc}</p>
        <ul class="offer-list">
          ${offer.includes.map(inc => `<li>✓ ${inc}</li>`).join('')}
        </ul>
        <div class="offer-footer">
          <span class="offer-price">${offer.priceFrom}</span>
          <button class="btn btn-gold btn-sm" data-open-booking data-booking-type="suite">Book Offer</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Banquets & Events
function renderEvents() {
  const eventsGrid = document.getElementById('eventsGrid');
  if (!eventsGrid || !window.AURELIA_DATA) return;

  const events = window.AURELIA_DATA.events;
  eventsGrid.innerHTML = events.map(evt => `
    <div class="exp-card tilt-card reveal-up in-view">
      <div class="exp-img">
        <img src="${evt.image}" onerror="this.src='${evt.fallback}'" alt="${evt.title}">
        <span class="exp-duration">🏰 ${evt.capacity}</span>
      </div>
      <div class="exp-body">
        <span class="exp-subtitle">BANQUETS & EVENTS</span>
        <h3 class="exp-title">${evt.title}</h3>
        <p class="exp-desc">${evt.desc}</p>
        <button class="btn btn-gold btn-sm" onclick="alert('Thank you for your interest. Our Banquets Manager will contact you shortly.')">Enquire Now</button>
      </div>
    </div>
  `).join('');
}

// Render Hotel Amenities Grid
function renderAmenities() {
  const grid = document.getElementById('amenitiesGrid');
  if (!grid || !window.AURELIA_DATA) return;

  const amenities = window.AURELIA_DATA.amenities;
  grid.innerHTML = amenities.map(a => `
    <div class="menu-item-card reveal-up in-view" style="padding: 1.5rem; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">${a.icon}</div>
      <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-gold-light); margin-bottom: 0.4rem;">${a.name}</h4>
      <p style="font-size: 0.85rem; color: var(--color-text-muted);">${a.desc}</p>
    </div>
  `).join('');
}

// Render Gallery Grid
function renderGalleryPage() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid || !window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.gallery;
  galleryGrid.innerHTML = items.map(item => `
    <div class="gallery-item ${item.aspect} reveal-up in-view" data-gallery-cat="${item.category}" data-lightbox-src="${item.image}" data-lightbox-fallback="${item.fallback}" data-title="${item.title}" data-cursor="ZOOM">
      <img src="${item.image}" onerror="this.src='${item.fallback}'" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-cat-badge">${item.category.toUpperCase()}</span>
        <h4 class="gallery-title">${item.title}</h4>
      </div>
    </div>
  `).join('');
}

// Gallery Filter Handler
function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('[data-filter-gallery]');
  const galleryGrid = document.getElementById('galleryGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter-gallery');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (!galleryGrid) return;
      const items = galleryGrid.querySelectorAll('.gallery-item');
      items.forEach(item => {
        const cat = item.getAttribute('data-gallery-cat');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox Modal Handler
function setupLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');

  if (!lightbox || !lightboxImg) return;

  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-lightbox-src]');
    if (item) {
      const src = item.getAttribute('data-lightbox-src');
      const fallback = item.getAttribute('data-lightbox-fallback');
      const title = item.getAttribute('data-title');

      lightboxImg.src = src;
      lightboxImg.onerror = () => { lightboxImg.src = fallback; };
      if (lightboxTitle) lightboxTitle.textContent = title;

      lightbox.classList.add('open');
    }

    if (e.target.closest('[data-close-lightbox]') || e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });
}

// Render Testimonials
function renderTestimonials() {
  const slider = document.getElementById('testimonialsSlider');
  if (!slider || !window.AURELIA_DATA) return;

  const tests = window.AURELIA_DATA.testimonials;
  slider.innerHTML = tests.map(t => `
    <div class="testimonial-card reveal-fade">
      <div class="stars">${'★'.repeat(t.rating)}</div>
      <blockquote class="quote-text">"${t.quote}"</blockquote>
      <div class="author-row">
        <img src="${t.avatar}" onerror="this.src='${t.avatarFallback}'" alt="${t.author}" class="author-avatar">
        <div>
          <h5 class="author-name">${t.author}</h5>
          <span class="author-role">${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Suite Detail View Modal Popup
function setupSuiteDetailModal() {
  const modal = document.getElementById('suiteDetailModal');
  if (!modal) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view-suite]');
    if (btn) {
      const suiteId = btn.getAttribute('data-view-suite');
      const suite = window.AURELIA_DATA.suites.find(s => s.id === suiteId);
      if (!suite) return;

      const body = document.getElementById('suiteDetailBody');
      if (body) {
        body.innerHTML = `
          <div class="suite-detail-layout">
            <div class="suite-detail-media">
              <img src="${suite.image}" onerror="this.src='${suite.fallback}'" alt="${suite.title}">
            </div>
            <div class="suite-detail-info">
              <span class="detail-badge">${suite.badge}</span>
              <h2 class="detail-title">${suite.title}</h2>
              <p class="detail-subtitle">${suite.subtitle}</p>
              
              <div class="detail-specs-grid">
                <div><strong>Size:</strong> ${suite.size}</div>
                <div><strong>Occupancy:</strong> ${suite.capacity}</div>
                <div><strong>Bedding:</strong> ${suite.bedType}</div>
                <div><strong>Tariff:</strong> ₹${suite.price.toLocaleString('en-IN')} / night</div>
              </div>

              <p class="detail-description">${suite.description}</p>

              <div class="detail-amenities">
                <h4>Inclusive Signature Amenities:</h4>
                <ul>
                  ${suite.amenities.map(a => `<li>✨ ${a}</li>`).join('')}
                </ul>
              </div>

              <div class="detail-cta-row" style="margin-top: 2rem;">
                <button class="btn btn-gold" data-open-booking data-booking-type="suite" data-item-id="${suite.id}" onclick="document.getElementById('suiteDetailModal').classList.remove('open')">Proceed to Booking</button>
              </div>
            </div>
          </div>
        `;
      }

      modal.classList.add('open');
    }

    if (e.target.closest('[data-close-suite-detail]') || e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }
}

// Concierge AI Widget Simulation
function setupConciergeWidget() {
  const widgetBtn = document.getElementById('conciergeWidgetBtn');
  const widgetBox = document.getElementById('conciergeWidgetBox');
  const closeBtn = document.getElementById('closeConcierge');
  const sendBtn = document.getElementById('conciergeSend');
  const input = document.getElementById('conciergeInput');
  const messagesContainer = document.getElementById('conciergeMessages');

  if (!widgetBtn || !widgetBox) return;

  widgetBtn.addEventListener('click', () => {
    widgetBox.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      widgetBox.classList.remove('open');
    });
  }

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;

    appendMsg(text, 'user');
    input.value = '';

    setTimeout(() => {
      let reply = "Namaste & welcome. Our Concierge Desk is at your service. How may we assist your stay or reservation today?";
      const lower = text.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('tariff')) {
        reply = "Our rooms range from ₹4,999/night for the Deluxe Room to ₹24,999/night for the Royal Family Suite. Would you like to check availability for your dates?";
      } else if (lower.includes('food') || lower.includes('dinner') || lower.includes('menu') || lower.includes('restaurant')) {
        reply = "Le Celestia offers North Indian Butter Chicken, Dal Makhani, Dum Biryani, South Indian Dosa & Pan Asian dishes. Table reservations are recommended!";
      } else if (lower.includes('wedding') || lower.includes('event') || lower.includes('banquet')) {
        reply = "Our grand pillarless banquet hall accommodates up to 1,200 guests for weddings & receptions. May we schedule a site visit for you?";
      }

      appendMsg(reply, 'bot');
    }, 700);
  };

  if (sendBtn && input) {
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  function appendMsg(msg, type) {
    if (!messagesContainer) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${type}`;
    msgDiv.textContent = msg;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
