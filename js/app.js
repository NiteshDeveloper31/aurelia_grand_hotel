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

// Dismiss preloader curtain with fail-safe timer
function dismissPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    preloader.style.display = 'none';
    if (window.animationEngine) window.animationEngine.refreshObserver();
  }, 400);
}

window.addEventListener('load', dismissPreloader);
setTimeout(dismissPreloader, 1000);

// Render Rooms & Suites Cards
function renderSuitesPage() {
  const containers = [document.getElementById('suitesGrid'), document.getElementById('suitesGridHome')];
  if (!window.AURELIA_DATA) return;

  const suites = window.AURELIA_DATA.suites;
  const cardsHtml = suites.map(suite => `
    <div class="suite-card tilt-card reveal-up in-view" data-category="${suite.category}" onclick="openSuiteDetail('${suite.id}')" style="cursor: pointer;">
      <div class="suite-card-img">
        <img src="${suite.image}" onerror="this.src='${suite.fallback}'" alt="${suite.title}" loading="lazy">
        <span class="suite-badge">${suite.badge}</span>
        <button class="suite-quick-view-btn" onclick="openSuiteDetail('${suite.id}'); event.stopPropagation();" data-cursor="VIEW">View Details</button>
      </div>
      <div class="suite-card-body">
        <div class="suite-meta">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M21 3L3 21M3 21h5M3 21v-5M8 16l3 3M11 13l3 3M14 10l3 3M17 7l3 3"/></svg>${suite.size}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>${suite.capacity}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v3M10 8v3"/></svg>${suite.bedType}</span>
        </div>
        <h3 class="suite-title">${suite.title}</h3>
        <p class="suite-subtitle" style="margin-bottom: 1.2rem;">${suite.subtitle}</p>

        <div class="suite-card-footer">
          <div class="suite-price">
            <span class="price-val">₹${suite.price.toLocaleString('en-IN')}</span>
            <span class="price-unit">/ night</span>
          </div>
          <button class="btn btn-gold btn-sm" onclick="openSuiteDetail('${suite.id}'); event.stopPropagation();">View Details</button>
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

// Render Menu Items (Home gets 6 featured dishes, Dedicated Menu page gets all 40 dishes)
function renderDiningMenuPage() {
  const homeContainer = document.getElementById('menuGridHome');
  const fullContainer = document.getElementById('menuGrid');
  if (!window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.menuItems;

  const createCardHtml = (item) => `
    <div class="menu-item-card reveal-up in-view" data-menu-category="${item.category}" onclick="openDishDetail('${item.id}')" style="cursor: pointer; position: relative; background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.2rem; box-shadow: 0 10px 30px rgba(26,29,36,0.05);">
      <div style="height: 180px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; position: relative;">
        <img src="${item.image}" onerror="this.src=generatePlaceholderSvg('${item.title}', 'INDIAN GASTRONOMY', 600, 400, 'dining')" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
        ${item.offer ? `<span style="position: absolute; top: 10px; right: 10px; background: var(--color-gold-primary); color: #FFFFFF; font-size: 0.68rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px; text-transform: uppercase;">${item.offer}</span>` : ''}
      </div>
      <div class="menu-item-header">
        <h4 class="menu-item-title" style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-text-main);">${item.title}</h4>
        <span class="menu-item-price" style="color: var(--color-gold-primary); font-weight: 700;">${item.price}</span>
      </div>
      <p class="menu-item-desc" style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 0.8rem;">${item.desc.substring(0, 95)}...</p>
      ${item.ingredients ? `<div style="font-size:0.78rem; color:var(--color-gold-primary); margin-bottom:0.8rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12a10 10 0 0 1 10-10z"/></svg><strong>Key Ingredients:</strong> ${item.ingredients}</div>` : ''}
      <div class="menu-item-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-top: 0.6rem;">
        <div>
          ${item.tags.map(t => `<span class="menu-tag" style="background: #FAF8F5; color: var(--color-gold-primary); padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.72rem; border: 1px solid var(--color-border-subtle);">${t}</span>`).join('')}
        </div>
        <button class="btn btn-gold btn-sm" style="padding: 0.35rem 0.7rem; font-size: 0.72rem;">View Details</button>
      </div>
    </div>
  `;

  // Home Page gets STRICTLY 6 Dishes
  if (homeContainer) {
    homeContainer.innerHTML = items.slice(0, 6).map(createCardHtml).join('');
  }

  // Dedicated MENU Page gets ALL 40 Dishes
  if (fullContainer) {
    fullContainer.innerHTML = items.map(createCardHtml).join('');
  }
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

// Render Offers (Home & Dedicated Offers Grid)
function renderOffers() {
  const containers = [document.getElementById('offersGridHome'), document.getElementById('offersGrid')].filter(Boolean);
  if (containers.length === 0 || !window.AURELIA_DATA) return;

  const offers = window.AURELIA_DATA.offers || [
    {
      id: "leela-discovery",
      title: "Double Rewards & Member Privileges",
      discount: "DISCOVERY Special",
      validity: "Valid Year-Round",
      desc: "Book directly as a DISCOVERY member to earn 2X D$ rewards, free breakfast, and 2:00 PM late check-out.",
      priceFrom: "From ₹8,999 / night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "weekend-staycation",
      title: "Weekend Palace Staycation & Spa Credit",
      discount: "20% OFF Staycation",
      validity: "Valid Fri - Sun",
      desc: "Includes ₹2,000 Jivana Spa voucher, 20% off room tariffs, and complimentary high tea over Lake Pichola.",
      priceFrom: "From ₹6,499 / night",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "honeymoon-escape",
      title: "Palace Romance & Candlelight Dinner",
      discount: "Romantic Package",
      validity: "Valid for Couples",
      desc: "Private poolside candlelight dinner with vintage wine, rose petal turndown, and floating plunge pool breakfast.",
      priceFrom: "From ₹14,500 / night",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const cardsHtml = offers.slice(0, 3).map(offer => `
    <div class="offer-card reveal-up in-view" style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(26,29,36,0.05); display: flex; flex-direction: column; justify-content: space-between;">
      <div style="height: 190px; overflow: hidden; position: relative;">
        <img src="${offer.image}" alt="${offer.title}" style="width: 100%; height: 100%; object-fit: cover;">
        <span style="position: absolute; top: 12px; right: 12px; background: var(--color-gold-primary); color: #FFFFFF; font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: 4px; text-transform: uppercase;">${offer.discount}</span>
      </div>
      <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.75rem; color: var(--color-gold-primary); font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 0.4rem;">${offer.validity}</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-text-main); margin-bottom: 0.6rem; line-height: 1.25;">${offer.title}</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.55; margin-bottom: 1.2rem;">${offer.desc}</p>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--color-border-subtle); margin-top: auto;">
          <span style="font-size: 1.05rem; font-weight: 700; color: var(--color-gold-primary);">${offer.priceFrom}</span>
          <button class="btn btn-gold btn-sm" data-open-booking data-booking-type="suite">Claim Offer</button>
        </div>
      </div>
    </div>
  `).join('');

  containers.forEach(c => {
    c.innerHTML = cardsHtml;
  });
}

// Render Banquets & Events
function renderEvents() {
  const eventsGrid = document.getElementById('eventsGrid');
  if (!eventsGrid || !window.AURELIA_DATA) return;

  const events = window.AURELIA_DATA.events;
  eventsGrid.innerHTML = events.map(evt => `
    <div class="exp-card tilt-card reveal-up in-view" onclick="openEventDetail('${evt.id}')" style="cursor: pointer;">
      <div class="exp-img">
        <img src="${evt.image}" onerror="this.src='${evt.fallback}'" alt="${evt.title}">
        <span class="exp-duration">🏰 ${evt.capacity}</span>
      </div>
      <div class="exp-body">
        <span class="exp-subtitle">BANQUETS & EVENTS</span>
        <h3 class="exp-title">${evt.title}</h3>
        <p class="exp-desc">${evt.desc.substring(0, 100)}...</p>
        <div style="display: flex; gap: 0.8rem; margin-top: 1rem;">
          <button class="btn btn-gold btn-sm" onclick="openEventDetail('${evt.id}'); event.stopPropagation();">Enquire & View Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render 10 Premium Hotel Amenities Cards (Minimal Outside Cards)
function renderAmenities() {
  const container = document.getElementById('amenitiesGrid');
  if (!container || !window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.amenities;
  container.innerHTML = items.map(item => `
    <div class="menu-item-card reveal-up in-view" onclick="openAmenityDetail('${item.id}')" style="cursor: pointer; background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.5rem; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; box-shadow: 0 8px 25px rgba(26,29,36,0.04); display: flex; flex-direction: column; justify-content: space-between;" onmouseover="this.style.transform='translateY(-6px)'; this.style.borderColor='var(--color-gold-primary)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--color-border-subtle)';">
      <div>
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #FAF8F5; border: 1px solid var(--color-border-subtle); color: var(--color-gold-primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          ${item.svg}
        </div>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-text-main); margin-bottom: 0.3rem;">${item.name}</h4>
        <p style="font-size: 0.82rem; color: var(--color-gold-primary); margin-bottom: 1.2rem; font-weight: 600;">${item.sub}</p>
      </div>
      <button class="btn btn-outline btn-sm" style="width: 100%; padding: 0.35rem 0.65rem; font-size: 0.75rem;">View Details</button>
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
    <div class="testimonial-card reveal-fade in-view">
      <div class="stars" style="color: var(--color-gold-primary); margin-bottom: 0.8rem;">${'★'.repeat(t.rating)}</div>
      <blockquote class="quote-text">"${t.quote}"</blockquote>
      <div class="author-row" style="display: flex; align-items: center; gap: 1rem; margin-top: 1.2rem;">
        <img src="${t.avatar}" onerror="this.src='${t.avatarFallback}'" alt="${t.author}" class="author-avatar" style="width: 54px; height: 54px; border-radius: 50%; border: 2px solid var(--color-gold-primary); object-fit: cover; flex-shrink: 0;">
        <div>
          <h5 class="author-name" style="margin: 0 0 0.2rem 0; font-family: var(--font-sans); font-size: 1rem; color: var(--color-gold-light); font-weight: 600;">${t.author}</h5>
          <span class="author-role" style="font-size: 0.82rem; color: var(--color-text-muted);">${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Global Suite Detail View Modal Popup Function
window.openSuiteDetail = function(suiteId) {
  const modal = document.getElementById('suiteDetailModal');
  if (!modal) return;

  const fallbackSuites = {
    'deluxe-room': {
      id: 'deluxe-room',
      badge: 'Popular Choice',
      title: 'Deluxe Room',
      subtitle: 'Modern Comfort & Style',
      price: 4999,
      size: '35 m² / 375 sq.ft',
      capacity: '2 Adults',
      bedType: 'King Bed / Twin Beds',
      description: 'Comfortable room designed for business travelers and couples, featuring wooden flooring, comfortable study desk, Smart TV, and marble bathroom with rain shower.',
      amenities: ['Free High-Speed Wi-Fi', '55-inch LED Smart TV', 'Mini Bar & Tea/Coffee Maker', '24/7 Room Service', 'Air Conditioning'],
      image: 'assets/images/deluxe-room.jpg'
    },
    'premium-room': {
      id: 'premium-room',
      badge: 'Best Seller',
      title: 'Premium Room with Balcony',
      subtitle: 'Spacious Room with Private View',
      price: 7499,
      size: '48 m² / 515 sq.ft',
      capacity: '2 Adults + 1 Child',
      bedType: 'Royal King Size Bed',
      description: 'Spacious room with a private sit-out balcony overlooking the pool. Features soft sofa seating, coffee maker, walk-in wardrobe, and free daily breakfast.',
      amenities: ['Private Sit-Out Balcony', 'Free Daily Breakfast', 'Coffee Machine', 'Walk-In Wardrobe', '24/7 Front Desk Help'],
      image: 'assets/images/premium-room.jpg'
    },
    'executive-room': {
      id: 'executive-room',
      badge: 'Business Luxury',
      title: 'Executive Business Room',
      subtitle: 'Includes Lounge Access & Airport Transfer',
      price: 10999,
      size: '62 m² / 665 sq.ft',
      capacity: '2 Adults',
      bedType: 'Soft King Size Bed',
      description: 'Designed for business executives, featuring free airport pickup and drop, Executive Lounge access, evening drinks & snacks, and free ironing service.',
      amenities: ['Executive Lounge Access', 'Free Airport Pick & Drop', 'Deep Soaking Bath Tub', 'Evening Drinks & Snacks', 'Free Ironing Service'],
      image: 'assets/images/executive-room.jpg'
    },
    'luxury-suite': {
      id: 'luxury-suite',
      badge: 'Flagship Suite',
      title: 'Grand Luxury Suite',
      subtitle: 'Separate Living Room & Jacuzzi',
      price: 18500,
      size: '110 m² / 1,180 sq.ft',
      capacity: '3 Guests',
      bedType: 'Emperor King Size Bed',
      description: 'Top luxury suite featuring a separate living room, master bedroom, marble bath with Jacuzzi tub, 24-hour private butler, and free fruit & drinks basket.',
      amenities: ['In-Room Jacuzzi Tub', 'Separate Living & Dining Room', '24/7 Private Butler', 'Welcome Fruit Basket', 'Premium Bath Items'],
      image: 'assets/images/luxury-suite.jpg'
    },
    'family-suite': {
      id: 'family-suite',
      badge: 'Family Favorite',
      title: 'Royal Family Suite',
      subtitle: 'Connected Rooms for Families',
      price: 24999,
      capacity: '2 Guests (Couples / Business)',
      bedType: 'King Size Heritage Bed',
      description: 'Elegantly styled heritage room featuring traditional Rajasthani Jharokha seating, carved teakwood furniture, modern high-speed Wi-Fi, and a spa-inspired marble bathroom.',
      amenities: ['Free High-Speed Wi-Fi', 'Marble Bathroom with Rain Shower', 'Traditional Jharokha Window', 'Minibar & Tea/Coffee Station'],
      image: 'assets/images/deluxe-room.jpg'
    }
  };

  let suite = (window.AURELIA_DATA && window.AURELIA_DATA.suites)
    ? window.AURELIA_DATA.suites.find(s => s.id === suiteId) 
    : null;

  if (!suite) {
    suite = fallbackSuites[suiteId] || fallbackSuites['deluxe-room'];
  }

  const container = document.getElementById('roomDetailContainer');
  if (container) {
    container.innerHTML = `
      <!-- Top Action Bar -->
      <div style="display: flex; align-items: center; justify-content: flex-end; margin-bottom: 1.5rem;">
        <button class="btn btn-gold btn-sm" onclick="window.router.navigateTo('suites')" style="display: inline-flex; align-items: center; gap: 0.4rem;">
          ← Back to All Rooms
        </button>
      </div>

      <!-- Suite Hero Showcase Card -->
      <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border-glass); margin-bottom: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.6);">
        <img src="${suite.image}" alt="${suite.title}" style="width: 100%; height: 440px; object-fit: cover; filter: brightness(0.88);">
        
        <!-- Hero Overlay Badges -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2.2rem; background: linear-gradient(180deg, rgba(8, 9, 13, 0) 0%, rgba(8, 9, 13, 0.95) 100%); display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <span style="background: var(--color-gold-primary); color: #000; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 0.6rem;">${suite.badge || '5-STAR LUXURY PALACE SUITE'}</span>
            <h1 style="font-family: var(--font-serif); font-size: 2.4rem; color: #fff; margin-bottom: 0.4rem; line-height: 1.1;">${suite.title}</h1>
            <p style="font-size: 1.05rem; color: var(--color-gold-light); margin: 0;">${suite.subtitle}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px;">Starting From</div>
            <div style="font-size: 2.2rem; font-family: var(--font-serif); color: var(--color-gold-primary); font-weight: 700;">₹${suite.price.toLocaleString('en-IN')} <span style="font-size: 0.85rem; font-weight: 400; color: var(--color-text-muted);">/ night</span></div>
          </div>
        </div>
      </div>

      <!-- Main Room Details 2-Column Grid (Equal Height Alignment) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.2rem; align-items: stretch;">
        
        <!-- Left Column: Full Specifications, Description & Signature Amenities -->
        <div style="display: flex; flex-direction: column; gap: 1.8rem;">
          <!-- Architecture & Overview Narrative -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.8rem; box-shadow: 0 8px 30px rgba(26,29,36,0.04);">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-text-main); margin-bottom: 0.8rem;">Suite Overview & Architecture</h3>
            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--color-text-muted); margin: 0;">${suite.description}</p>
          </div>

          <!-- Room Specifications 6-Card Grid -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.8rem; box-shadow: 0 8px 30px rgba(26,29,36,0.04);">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-text-main); margin-bottom: 1.2rem;">Room Specifications & Specs</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Room Size</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">${suite.size}</strong>
              </div>
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Max Occupancy</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">${suite.capacity}</strong>
              </div>
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Bed Setup</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">${suite.bedType}</strong>
              </div>
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Scenic View</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">Lake Pichola Waterfront</strong>
              </div>
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Bathroom Spec</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">Marble & Rain Shower</strong>
              </div>
              <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem;">
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); text-transform: uppercase; display: block; margin-bottom: 0.3rem; font-weight: 600;">Butler Service</span>
                <strong style="font-size: 1.05rem; color: var(--color-text-main);">24/7 Dedicated Butler</strong>
              </div>
            </div>
          </div>

          <!-- Included Signature Amenities -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.8rem; flex-grow: 1; box-shadow: 0 8px 30px rgba(26,29,36,0.04);">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-text-main); margin-bottom: 1.2rem;">Inclusive Suite Privileges</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem;">
              ${(suite.amenities || ['Lake View Balcony', 'Free Breakfast', 'Jacuzzi', '24/7 Butler']).map(a => `
                <div style="display: flex; align-items: center; gap: 0.6rem; background: #FAF8F5; padding: 0.8rem 1rem; border-radius: 6px; border: 1px solid #E8E2D9;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style="font-size: 0.88rem; color: var(--color-text-main); font-weight: 500;">${a}</span>
                </div>
              `).join('')}
              <div style="display: flex; align-items: center; gap: 0.6rem; background: #FAF8F5; padding: 0.8rem 1rem; border-radius: 6px; border: 1px solid #E8E2D9;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size: 0.88rem; color: var(--color-text-main); font-weight: 500;">24/7 In-Room Fine Dining</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem; background: #FAF8F5; padding: 0.8rem 1rem; border-radius: 6px; border: 1px solid #E8E2D9;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size: 0.88rem; color: var(--color-text-main); font-weight: 500;">High-Speed Fiber Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Instant Reservation, Stay Guidelines & Heritage Privileges (Equal Height Stack) -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem; justify-content: space-between;">
          
          <!-- Box 1: Instant Suite Reservation & Pricing -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-gold-primary); border-radius: 12px; padding: 1.8rem; box-shadow: 0 12px 35px rgba(26,29,36,0.08);">
            
            <div style="margin-bottom: 1.2rem; border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 1rem;">
              <span style="font-size: 0.78rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Instant Suite Reservation</span>
              <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: 0.4rem;">
                <h3 style="font-family: var(--font-serif); font-size: 2.1rem; color: var(--color-text-main); margin: 0;">₹${suite.price.toLocaleString('en-IN')}</h3>
                <span style="font-size: 0.85rem; color: var(--color-text-muted);">per night + taxes</span>
              </div>
            </div>

            <!-- Privilege Highlights List -->
            <ul style="list-style: none; padding: 0; margin: 0 0 1.4rem 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
              <li style="display: flex; align-items: center; gap: 0.6rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 100% Free Date Changes up to 48h</li>
              <li style="display: flex; align-items: center; gap: 0.6rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Complimentary Welcome Drinks & Basket</li>
              <li style="display: flex; align-items: center; gap: 0.6rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Free Chauffeur Airport Transfer</li>
              <li style="display: flex; align-items: center; gap: 0.6rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 20% Spa Discount Coupon Included</li>
            </ul>

            <!-- Book Now CTA Button -->
            <button class="btn btn-gold" data-open-booking data-booking-type="suite" data-item-id="${suite.id}" style="width: 100%; padding: 1rem; font-size: 0.95rem; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.8rem;">
              Reserve This Suite Now
            </button>
            
            <p style="font-size: 0.78rem; text-align: center; color: var(--color-text-muted); margin: 0;">Instant Confirmation • No Pre-payment Required</p>
          </div>

          <!-- Box 2: Palace Check-In & Stay Policy Box -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.4rem; box-shadow: 0 8px 30px rgba(26,29,36,0.04);">
            <h4 style="font-size: 0.85rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.8rem; display: flex; align-items: center; font-weight: 600;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Check-In & Guarantee Policy
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.84rem; color: var(--color-text-muted);">
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-text-main);">Standard Check-In:</strong> <span>2:00 PM</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-text-main);">Standard Check-Out:</strong> <span>12:00 Noon</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-text-main);">Cancellation:</strong> <span style="color: var(--color-gold-primary); font-weight: 600;">Free 48-Hour Refund</span></li>
            </ul>
          </div>

          <!-- Box 3: 5-Star Heritage Privileges Box (Matched Length to Left Box) -->
          <div style="background: #F3EFEA; border: 1px solid var(--color-border-subtle); border-radius: 10px; padding: 1.8rem;">
            <span style="font-size: 0.72rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 0.3rem; font-weight: 600;">5-STAR HERITAGE HOSPITALITY</span>
            <h4 style="font-size: 1.15rem; font-family: var(--font-serif); color: var(--color-text-main); margin-bottom: 1rem;">Inclusive VIP Suite Privileges</h4>
            
            <ul style="list-style: none; padding: 0; margin: 0 0 1.2rem 0; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.85rem; color: var(--color-text-muted);">
              <li style="display: flex; align-items: center; gap: 0.65rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong style="color: var(--color-text-main);">24/7 Personal Butler:</strong> Private unpacking & royal care</span>
              </li>
              <li style="display: flex; align-items: center; gap: 0.65rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong style="color: var(--color-text-main);">Priority Fine Dining:</strong> Table & buffet breakfast at Le Celestia</span>
              </li>
              <li style="display: flex; align-items: center; gap: 0.65rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong style="color: var(--color-text-main);">Jivana Spa Hydrotherapy:</strong> Free steam, sauna & Jacuzzi access</span>
              </li>
              <li style="display: flex; align-items: center; gap: 0.65rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong style="color: var(--color-text-main);">Private Chauffeur:</strong> Free airport pickup & drop in luxury sedan</span>
              </li>
            </ul>

            <!-- 24/7 Helpline Badge -->
            <div style="padding-top: 0.8rem; border-top: 1px dashed #D4C9BA; display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--color-gold-primary);">
              <span style="font-weight: 600;">24/7 Butler Desk: Ext. 101</span>
              <span style="font-weight: 600;">WhatsApp Direct</span>
            </div>
          </div>

        </div>

      </div>
    `;

    // Also populate modal for fallback compatibility
    const modalBody = document.getElementById('suiteDetailBody');
    if (modalBody) {
      modalBody.innerHTML = container.innerHTML;
    }
  }

  // Navigate to dedicated full-page room-detail view!
  if (window.router) {
    window.router.navigateTo('room-detail');
  } else {
    window.location.hash = '#room-detail';
  }
};

window.closeSuiteDetailModal = function() {
  const modal = document.getElementById('suiteDetailModal');
  if (modal) {
    modal.style.cssText = "display: none !important; opacity: 0 !important; pointer-events: none !important;";
    modal.classList.remove('open');
  }
};

function setupSuiteDetailModal() {
  const modal = document.getElementById('suiteDetailModal');
  if (!modal) return;

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-suite-detail]') || e.target === modal) {
      closeSuiteDetailModal();
    }
  });
}

const PLUS_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const MINUS_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

// Interactive FAQ Accordion Function
window.toggleFaq = function(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;

  const isOpen = item.classList.contains('active');
  const body = item.querySelector('.faq-body');
  const icon = item.querySelector('.faq-icon');

  // Close all open FAQ items for clean accordion mode
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('active');
    i.style.borderColor = 'var(--color-border-glass)';
    const b = i.querySelector('.faq-body');
    const ic = i.querySelector('.faq-icon');
    if (b) b.style.maxHeight = '0px';
    if (ic) {
      ic.innerHTML = PLUS_SVG;
      ic.style.background = 'transparent';
      ic.style.transform = 'rotate(0deg)';
    }
  });

  if (!isOpen) {
    item.classList.add('active');
    item.style.borderColor = 'var(--color-gold-primary)';
    if (body) body.style.maxHeight = (body.scrollHeight + 30) + 'px';
    if (icon) {
      icon.innerHTML = MINUS_SVG;
      icon.style.background = 'rgba(201, 160, 99, 0.2)';
      icon.style.transform = 'rotate(180deg)';
    }
  }
};

// Global Dish Detail View Modal Popup Function
window.openDishDetail = function(dishId) {
  const modal = document.getElementById('dishDetailModal');
  if (!modal) return;

  const items = (window.AURELIA_DATA && window.AURELIA_DATA.menuItems) ? window.AURELIA_DATA.menuItems : [];
  const dish = items.find(d => d.id === dishId) || items[0];
  if (!dish) return;

  const body = document.getElementById('dishDetailBody');
  if (body) {
    body.innerHTML = `
      <div class="dish-detail-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: start;">
        
        <!-- Left Column: HD Dish Photo & Offer Badge Box -->
        <div class="dish-detail-media">
          <img src="${dish.image}" onerror="this.src=generatePlaceholderSvg('${dish.title}', 'FINE DINING DISH', 600, 400, 'dining')" alt="${dish.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-subtle); margin-bottom: 1.2rem;">
          
          <!-- Dish Offer & Special Inclusions Box -->
          <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1.2rem; margin-bottom: 1rem;">
            <span style="background: var(--color-gold-primary); color: #FFFFFF; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase; display: inline-block; margin-bottom: 0.5rem;">Special Dining Offer</span>
            <h4 style="font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">${dish.offer || '15% Discount on Dinner Booking'}</h4>
            <p style="font-size: 0.84rem; color: var(--color-text-muted); margin: 0;">Included automatically when reserving a table at Le Celestia Fine Dining.</p>
          </div>
        </div>

        <!-- Right Column: Dish Specs, Detailed Description & Ingredients -->
        <div class="dish-detail-info">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.6rem;">
            ${dish.tags.map(t => `<span style="background: #FAF8F5; color: var(--color-gold-primary); padding: 0.25rem 0.7rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; border: 1px solid var(--color-border-subtle);">${t}</span>`).join('')}
          </div>

          <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-text-main); margin-bottom: 0.4rem;">${dish.title}</h2>
          <p style="font-size: 1.4rem; color: var(--color-gold-primary); font-weight: 700; margin-bottom: 1.2rem;">${dish.price} <span style="font-size: 0.85rem; font-weight: 400; color: var(--color-text-muted);">(Taxes & Service Included)</span></p>

          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--color-text-muted); margin-bottom: 1.4rem;">${dish.desc}</p>

          <!-- Master Ingredients & Culinary Notes Box -->
          <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1.1rem; margin-bottom: 1.4rem;">
            <h4 style="font-size: 0.88rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; font-weight: 600;">Master Ingredients & Culinary Notes</h4>
            <p style="font-size: 0.88rem; color: var(--color-text-main); line-height: 1.5; margin: 0;">${dish.ingredients}</p>
          </div>

          <!-- Reserve Table Button -->
          <button class="btn btn-gold" data-open-booking data-booking-type="table" onclick="closeDishDetailModal()" style="width: 100%; text-align: center; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 700;">Reserve a Table & Order (${dish.price})</button>
        </div>
      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(26, 29, 36, 0.7) !important; backdrop-filter: blur(12px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
    modal.classList.add('open');
    modal.classList.add('open');
  }
};

window.closeDishDetailModal = function() {
  const modal = document.getElementById('dishDetailModal');
  if (modal) {
    modal.style.cssText = "display: none !important; opacity: 0 !important; pointer-events: none !important;";
    modal.classList.remove('open');
  }
};

// Global Amenity Detail View Modal Popup Function
window.openAmenityDetail = function(amenityId) {
  const modal = document.getElementById('amenityDetailModal');
  if (!modal) return;

  const items = (window.AURELIA_DATA && window.AURELIA_DATA.amenities) ? window.AURELIA_DATA.amenities : [];
  const item = items.find(a => a.id === amenityId) || items[0];
  if (!item) return;

  const body = document.getElementById('amenityDetailBody');
  if (body) {
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; align-items: stretch;">
        
        <!-- Left Column: Amenity Photo & Technical Specifications Box -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-subtle);">
          </div>
          
          <!-- Detailed Specs & Location Box -->
          <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1.1rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-size: 0.82rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.8rem; display: flex; align-items: center; font-weight: 600;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2" style="margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Operational Specs & Guidelines
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.84rem; color: var(--color-text-muted);">
              <li style="display: flex; flex-direction: column; gap: 0.2rem;"><strong style="color: var(--color-gold-primary);">Hours / Timings:</strong> <span style="color: var(--color-text-main); font-weight: 600;">${item.sub.split('|')[1] || item.sub}</span></li>
              <li style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.3rem;"><strong style="color: var(--color-gold-primary);">Location:</strong> <span style="color: var(--color-text-main); font-weight: 600;">Palace Main Wing</span></li>
              <li style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.3rem;"><strong style="color: var(--color-gold-primary);">Guest Privilege:</strong> <span style="color: var(--color-gold-primary); font-weight: 700;">Complimentary Access</span></li>
              <li style="display: flex; flex-direction: column; gap: 0.2rem;"><strong style="color: var(--color-gold-primary);">Technical Specs:</strong> <span style="color: var(--color-text-main); word-break: break-word;">${item.specs}</span></li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Icon, Title, Description, Perks & Reserve CTA -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #FAF8F5; border: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--color-gold-primary);">
                ${item.svg}
              </div>
              <div>
                <h2 style="font-family: var(--font-serif); font-size: 1.7rem; color: var(--color-text-main); margin: 0; line-height: 1.1;">${item.name}</h2>
                <span style="font-size: 0.8rem; color: var(--color-gold-primary); font-weight: 600;">${item.sub.split('|')[0]}</span>
              </div>
            </div>
            
            <p style="font-size: 0.88rem; line-height: 1.55; color: var(--color-text-muted); margin-bottom: 1rem;">${item.desc}</p>

            <!-- Perks Box -->
            <div style="background: #FAF8F5; border: 1px solid var(--color-border-subtle); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
              <h4 style="font-size: 0.8rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; font-weight: 600;">Inclusive Facility Perks</h4>
              <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem; font-size: 0.82rem; color: var(--color-text-muted);">
                ${item.inclusions.map(inc => `<li style="display: flex; align-items: center;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5" style="margin-right: 6px; flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>${inc}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="btn btn-gold" data-open-booking data-booking-type="suite" onclick="closeAmenityDetailModal()" style="width: 100%; text-align: center; padding: 0.95rem 1.5rem; font-size: 0.92rem; font-weight: 700;">Enquire / Reserve Service</button>
        </div>

      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(26, 29, 36, 0.45) !important; backdrop-filter: blur(10px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
    modal.classList.add('open');
  }
};

window.closeAmenityDetailModal = function() {
  const modal = document.getElementById('amenityDetailModal');
  if (modal) {
    modal.style.cssText = "display: none !important; opacity: 0 !important; pointer-events: none !important;";
    modal.classList.remove('open');
  }
};

// Open All Amenities Drawer Modal
window.openAllAmenitiesModal = function() {
  const modal = document.getElementById('allAmenitiesModal');
  if (!modal) return;

  const items = (window.AURELIA_DATA && window.AURELIA_DATA.amenities) ? window.AURELIA_DATA.amenities : [];
  const body = document.getElementById('allAmenitiesBody');
  if (body) {
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        ${items.map(item => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border-glass); border-radius: 8px; padding: 1.4rem; cursor: pointer;" onclick="closeAllAmenitiesModal(); openAmenityDetail('${item.id}');">
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(201, 160, 99, 0.12); display: flex; align-items: center; justify-content: center; color: var(--color-gold-light); flex-shrink: 0;">
                ${item.svg}
              </div>
              <div>
                <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-gold-light); margin: 0;">${item.name}</h4>
                <span style="font-size: 0.75rem; color: var(--color-gold-primary); font-weight: 500;">${item.sub}</span>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; margin: 0 0 0.8rem 0;">${item.desc}</p>
            <button style="background: none; border: none; color: var(--color-gold-light); font-size: 0.8rem; font-weight: 600; cursor: pointer; padding: 0;">View Full Details & Specs →</button>
          </div>
        `).join('')}
      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(8, 9, 13, 0.95) !important; backdrop-filter: blur(16px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
    modal.classList.add('open');
  }
};

window.closeAllAmenitiesModal = function() {
  const modal = document.getElementById('allAmenitiesModal');
  if (modal) {
    modal.style.cssText = "display: none !important; opacity: 0 !important; pointer-events: none !important;";
    modal.classList.remove('open');
  }
};

// Global Banquet & Event Detail View Modal Popup Function
window.openEventDetail = function(eventId) {
  const modal = document.getElementById('eventDetailModal');
  if (!modal) return;

  const items = (window.AURELIA_DATA && window.AURELIA_DATA.events) ? window.AURELIA_DATA.events : [];
  const evt = items.find(e => e.id === eventId) || items[0];
  if (!evt) return;

  const body = document.getElementById('eventDetailBody');
  if (body) {
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.2rem; align-items: stretch;">
        
        <!-- Left Column: Venue Photo & Technical Specifications Box -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <img src="${evt.image}" onerror="this.src='${evt.fallback}'" alt="${evt.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-glass); margin-bottom: 1rem;">
          </div>
          
          <!-- Venue Specifications & Guidelines Box -->
          <div style="background: rgba(201, 160, 99, 0.06); border: 1px solid rgba(201, 160, 99, 0.25); border-radius: 8px; padding: 1.2rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-size: 0.85rem; color: var(--color-gold-light); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.8rem; display: flex; align-items: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Venue Specs & Facilities
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; font-size: 0.84rem; color: var(--color-text-muted);">
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Guest Capacity:</strong> <span style="color: #fff;">${evt.capacity}</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Hall Area:</strong> <span>${evt.area || 'Pillarless Grand Hall'}</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Sound & AV:</strong> <span>4K LED Walls & Pro Audio</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Technical Specs:</strong> <span>${evt.specs || '100% Soundproof & Climate Control'}</span></li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Title, Subtitle, Description & Event Perks -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="background: rgba(201, 160, 99, 0.15); color: var(--color-gold-light); padding: 0.25rem 0.7rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; display: inline-block; margin-bottom: 0.6rem;">GRAND BANQUET & EVENTS</span>
            
            <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-gold-light); margin-bottom: 0.3rem; line-height: 1.1;">${evt.title}</h2>
            <p style="font-size: 0.85rem; color: var(--color-gold-primary); margin-bottom: 1rem; font-weight: 500;">${evt.subtitle || 'Customized Royal Banquet Setup'}</p>
            
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-muted); margin-bottom: 1.2rem;">${evt.desc}</p>

            <!-- Inclusive Event Perks Box -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border-glass); border-radius: 8px; padding: 1.1rem; margin-bottom: 1.2rem;">
              <h4 style="font-size: 0.8rem; color: var(--color-gold-light); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.7rem;">Included Banquet Services</h4>
              <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.83rem; color: var(--color-text-muted);">
                ${(evt.inclusions || ["Custom Stage & Entrance Decor", "5-Star Royal Buffet Catering", "Professional Audio/Visual Setup", "Dedicated Banquet Manager"]).map(inc => `<li style="display: flex; align-items: center;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="margin-right: 6px; flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>${inc}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="btn btn-gold" data-open-booking data-booking-type="suite" onclick="closeEventDetailModal()" style="width: 100%; text-align: center; padding: 0.95rem 1.5rem; font-size: 0.95rem; font-weight: 700; margin-top: 0.5rem;">Enquire & Book Venue</button>
        </div>

      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(26, 29, 36, 0.45) !important; backdrop-filter: blur(10px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
    modal.classList.add('open');
  }
};

window.closeEventDetailModal = function() {
  const modal = document.getElementById('eventDetailModal');
  if (modal) {
    modal.style.cssText = "display: none !important; opacity: 0 !important; pointer-events: none !important;";
    modal.classList.remove('open');
  }
};

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
      let reply = "Namaste & welcome to The Haveli Royale. Our Concierge Desk is at your service. How may we assist your stay or reservation today?";
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

/* --- 5-Star Hotel Cookie Preference Manager --- */
window.initCookieConsent = function() {
  const banner = document.getElementById('cookieConsentBanner');
  if (!banner) return;

  const consent = localStorage.getItem('haveli_cookie_consent');
  if (!consent) {
    setTimeout(() => {
      banner.style.display = 'block';
    }, 800); // Auto pops up 0.8s after site opens
  }
};

window.openCookieConsent = function(force = false) {
  const banner = document.getElementById('cookieConsentBanner');
  if (!banner) return;
  
  if (force) {
    const mainView = document.getElementById('cookieMainView');
    const prefView = document.getElementById('cookiePreferencesView');
    if (mainView) mainView.style.display = 'block';
    if (prefView) prefView.style.display = 'none';
  }
  banner.style.display = 'block';
};

window.acceptAllCookies = function() {
  localStorage.setItem('haveli_cookie_consent', 'accepted_all');
  const banner = document.getElementById('cookieConsentBanner');
  if (banner) banner.style.display = 'none';
};

window.rejectOptionalCookies = function() {
  localStorage.setItem('haveli_cookie_consent', 'rejected_optional');
  const banner = document.getElementById('cookieConsentBanner');
  if (banner) banner.style.display = 'none';
};

window.toggleCookiePreferences = function() {
  const prefView = document.getElementById('cookiePreferencesView');
  if (prefView) {
    prefView.style.display = prefView.style.display === 'none' ? 'block' : 'none';
  }
};

window.saveCustomCookiePreferences = function() {
  const analytics = document.getElementById('cookieAnalyticsCheck')?.checked;
  const marketing = document.getElementById('cookieMarketingCheck')?.checked;
  localStorage.setItem('haveli_cookie_consent', JSON.stringify({ analytics, marketing }));
  const banner = document.getElementById('cookieConsentBanner');
  if (banner) banner.style.display = 'none';
};

// Auto initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.initCookieConsent();
});
