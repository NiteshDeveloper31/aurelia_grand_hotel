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
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M21 3L3 21M3 21h5M3 21v-5M8 16l3 3M11 13l3 3M14 10l3 3M17 7l3 3"/></svg>${suite.size}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>${suite.capacity}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v3M10 8v3"/></svg>${suite.bedType}</span>
        </div>
        <h3 class="suite-title">${suite.title}</h3>
        <p class="suite-subtitle">${suite.subtitle}</p>
        <p class="suite-desc">${suite.description.substring(0, 110)}...</p>

        <div style="margin: 1rem 0; font-size: 0.82rem; color: var(--color-text-muted);">
          ${suite.amenities.slice(0, 3).map(a => `<span style="display:inline-block; margin-right:8px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>${a}</span>`).join('')}
        </div>

        <div class="suite-card-footer">
          <div class="suite-price">
            <span class="price-val">₹${suite.price.toLocaleString('en-IN')}</span>
            <span class="price-unit">/ night</span>
          </div>
          <button class="btn btn-gold btn-sm" data-open-booking data-booking-type="suite" data-item-id="${suite.id}" onclick="event.stopPropagation();">Book Now</button>
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

// Render Menu Items (40 Dishes with Details & Offers)
function renderDiningMenuPage() {
  const menuContainers = [document.getElementById('menuGrid'), document.getElementById('menuGridHome')];
  if (!window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.menuItems;
  const cardsHtml = items.map(item => `
    <div class="menu-item-card reveal-up in-view" data-menu-category="${item.category}" onclick="openDishDetail('${item.id}')" style="cursor: pointer; position: relative;">
      <div style="height: 180px; border-radius: 6px; overflow: hidden; margin-bottom: 1rem; position: relative;">
        <img src="${item.image}" onerror="this.src=generatePlaceholderSvg('${item.title}', 'INDIAN GASTRONOMY', 600, 400, 'dining')" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
        ${item.offer ? `<span style="position: absolute; top: 10px; right: 10px; background: var(--color-gold-primary); color: #000; font-size: 0.68rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px; text-transform: uppercase;">${item.offer}</span>` : ''}
      </div>
      <div class="menu-item-header">
        <h4 class="menu-item-title" style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-gold-light);">${item.title}</h4>
        <span class="menu-item-price" style="color: var(--color-gold-light); font-weight: 700;">${item.price}</span>
      </div>
      <p class="menu-item-desc" style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 0.8rem;">${item.desc.substring(0, 95)}...</p>
      ${item.ingredients ? `<div style="font-size:0.78rem; color:var(--color-gold-primary); margin-bottom:0.8rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12a10 10 0 0 1 10-10z"/></svg><strong>Key Ingredients:</strong> ${item.ingredients}</div>` : ''}
      <div class="menu-item-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-top: 0.6rem;">
        <div>
          ${item.tags.map(t => `<span class="menu-tag" style="background: rgba(255,255,255,0.05); color: var(--color-gold-primary); padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.72rem;">${t}</span>`).join('')}
        </div>
        <button style="background: rgba(201, 160, 99, 0.1); border: 1px solid var(--color-gold-primary); color: var(--color-gold-light); padding: 0.35rem 0.75rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">View Details</button>
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
        <span class="offer-validity"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${offer.validity}</span>
        <h3 class="offer-title">${offer.title}</h3>
        <p class="exp-desc">${offer.desc}</p>
        <ul class="offer-list">
          ${offer.includes.map(inc => `<li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>${inc}</li>`).join('')}
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

// Render 10 Premium Hotel Amenities Cards
function renderAmenities() {
  const container = document.getElementById('amenitiesGrid');
  if (!container || !window.AURELIA_DATA) return;

  const items = window.AURELIA_DATA.amenities;
  container.innerHTML = items.map(item => `
    <div class="menu-item-card reveal-up in-view" onclick="openAmenityDetail('${item.id}')" style="cursor: pointer; background: var(--color-bg-card); border: 1px solid var(--color-border-glass); border-radius: 10px; padding: 1.6rem; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;" onmouseover="this.style.transform='translateY(-6px)'; this.style.borderColor='var(--color-gold-primary)'; this.style.boxShadow='0 12px 30px rgba(201,160,99,0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--color-border-glass)'; this.style.boxShadow='none';">
      <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(201, 160, 99, 0.12); border: 1px solid rgba(201, 160, 99, 0.3); color: var(--color-gold-light); display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; transition: transform 0.3s ease;">
        ${item.svg}
      </div>
      <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-gold-light); margin-bottom: 0.4rem;">${item.name}</h4>
      <p style="font-size: 0.85rem; color: var(--color-gold-primary); margin-bottom: 0.6rem; font-weight: 500;">${item.sub}</p>
      <p style="font-size: 0.86rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">${item.desc.substring(0, 85)}...</p>
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
      size: '145 m² / 1,560 sq.ft',
      capacity: '4 Adults + 2 Children',
      bedType: '2 Master King Beds',
      description: 'Ideal for family holidays, featuring 2 connected master bedrooms, 2 full marble bathrooms, a dining table for 6, kids play area, and free dinner for kids.',
      amenities: ['2 Connected Bedrooms', '2 Full Marble Bathrooms', 'Dining Table for 6 Guests', 'Kids Games & Play Area', 'Free Dinner for Kids'],
      image: 'assets/images/family-suite.jpg'
    }
  };

  let suite = (window.AURELIA_DATA && window.AURELIA_DATA.suites)
    ? window.AURELIA_DATA.suites.find(s => s.id === suiteId) 
    : null;

  if (!suite) {
    suite = fallbackSuites[suiteId] || fallbackSuites['deluxe-room'];
  }

  const body = document.getElementById('suiteDetailBody');
  if (body) {
    body.innerHTML = `
      <div class="suite-detail-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; align-items: start;">
        
        <!-- Left Column: HD Image & Room Highlights Box (No Empty Space) -->
        <div class="suite-detail-media">
          <img src="${suite.image}" alt="${suite.title}" style="width: 100%; height: 310px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-glass); margin-bottom: 1.2rem;">
          
          <!-- Key Highlights & Room Features Box -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border-glass); border-radius: 8px; padding: 1.2rem; margin-bottom: 1.2rem;">
            <h4 style="font-size: 0.85rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.8rem; display: flex; align-items: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Room Features & View
            </h4>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.84rem; color: var(--color-text-muted);">
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Scenic View:</strong> <span>Lake Pichola / City View</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Floor Levels:</strong> <span>Floors 2 to 6</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Bathroom:</strong> <span>Italian Marble & Rain Shower</span></li>
              <li style="display: flex; justify-content: space-between;"><strong style="color: var(--color-gold-light);">Inclusions:</strong> <span>Complimentary Breakfast</span></li>
            </ul>
          </div>

          <!-- Guest Services & Check-In Box -->
          <div style="background: rgba(201, 160, 99, 0.05); border: 1px solid rgba(201, 160, 99, 0.2); border-radius: 8px; padding: 1rem; font-size: 0.82rem; color: var(--color-text-muted);">
            <div style="color: var(--color-gold-light); font-weight: 600; margin-bottom: 0.3rem; display: flex; align-items: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Standard Check-In Terms
            </div>
            <div>Check-In: 2:00 PM | Check-Out: 12:00 PM. Free Cancellation up to 48 Hours prior.</div>
          </div>
        </div>

        <!-- Right Column: Room Title, Specs, Description & Full Amenities -->
        <div class="suite-detail-info">
          <span class="detail-badge" style="background: rgba(201, 160, 99, 0.15); color: var(--color-gold-light); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 0.8rem;">${suite.badge}</span>
          <h2 class="detail-title" style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-gold-light); margin-bottom: 0.4rem; line-height: 1.2;">${suite.title}</h2>
          <p class="detail-subtitle" style="font-size: 0.95rem; color: var(--color-gold-primary); margin-bottom: 1.2rem;">${suite.subtitle}</p>
          
          <div class="detail-specs-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; background: rgba(255,255,255,0.03); padding: 1.1rem; border-radius: 8px; margin-bottom: 1.2rem; border: 1px solid var(--color-border-glass); font-size: 0.88rem;">
            <div><strong style="color: var(--color-gold-light);">Room Size:</strong> ${suite.size}</div>
            <div><strong style="color: var(--color-gold-light);">Max Occupancy:</strong> ${suite.capacity}</div>
            <div><strong style="color: var(--color-gold-light);">Bed Setup:</strong> ${suite.bedType}</div>
            <div><strong style="color: var(--color-gold-light);">Nightly Rate:</strong> <span style="color: var(--color-gold-light); font-weight:700;">₹${suite.price.toLocaleString('en-IN')}</span> / night</div>
          </div>

          <p class="detail-description" style="font-size: 0.92rem; line-height: 1.65; color: var(--color-text-muted); margin-bottom: 1.5rem;">${suite.description}</p>

          <div class="detail-amenities">
            <h4 style="font-size: 0.9rem; color: var(--color-gold-light); margin-bottom: 0.8rem; letter-spacing: 1px; text-transform: uppercase;">Inclusive Signature Amenities:</h4>
            <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;">
              ${suite.amenities.map(a => `<li style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; align-items: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="flex-shrink:0; margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg>${a}</li>`).join('')}
              <li style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; align-items: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="flex-shrink:0; margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg>24/7 Dedicated Butler Service</li>
              <li style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; align-items: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="flex-shrink:0; margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg>Complimentary Bottled Water & Tea</li>
            </ul>
          </div>

          <div class="detail-cta-row" style="margin-top: 2rem;">
            <button class="btn btn-gold" data-open-booking data-booking-type="suite" data-item-id="${suite.id}" onclick="closeSuiteDetailModal()" style="width: 100%; text-align: center; padding: 1.1rem 1.5rem; font-size: 1rem; font-weight: 700;">Proceed to Booking (₹${suite.price.toLocaleString('en-IN')})</button>
          </div>
        </div>
      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(8, 9, 13, 0.95) !important; backdrop-filter: blur(16px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
    modal.classList.add('open');
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
          <img src="${dish.image}" onerror="this.src=generatePlaceholderSvg('${dish.title}', 'FINE DINING DISH', 600, 400, 'dining')" alt="${dish.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-glass); margin-bottom: 1.2rem;">
          
          <!-- Dish Offer & Special Inclusions Box -->
          <div style="background: rgba(201, 160, 99, 0.08); border: 1px solid var(--color-gold-primary); border-radius: 8px; padding: 1.2rem; margin-bottom: 1rem;">
            <span style="background: var(--color-gold-primary); color: #000; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase; display: inline-block; margin-bottom: 0.5rem;">Special Dining Offer</span>
            <h4 style="font-size: 1.1rem; color: var(--color-gold-light); margin-bottom: 0.4rem;">${dish.offer || '15% Discount on Dinner Booking'}</h4>
            <p style="font-size: 0.84rem; color: var(--color-text-muted); margin: 0;">Included automatically when reserving a table at Le Celestia Fine Dining.</p>
          </div>
        </div>

        <!-- Right Column: Dish Specs, Detailed Description & Ingredients -->
        <div class="dish-detail-info">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.6rem;">
            ${dish.tags.map(t => `<span style="background: rgba(201, 160, 99, 0.15); color: var(--color-gold-light); padding: 0.25rem 0.7rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase;">${t}</span>`).join('')}
          </div>

          <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-gold-light); margin-bottom: 0.4rem;">${dish.title}</h2>
          <p style="font-size: 1.4rem; color: var(--color-gold-primary); font-weight: 700; margin-bottom: 1.2rem;">${dish.price} <span style="font-size: 0.85rem; font-weight: 400; color: var(--color-text-muted);">(Taxes & Service Included)</span></p>

          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--color-text-muted); margin-bottom: 1.4rem;">${dish.desc}</p>

          <!-- Master Ingredients & Culinary Notes Box -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border-glass); border-radius: 8px; padding: 1.1rem; margin-bottom: 1.4rem;">
            <h4 style="font-size: 0.88rem; color: var(--color-gold-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem;">Master Ingredients & Culinary Notes</h4>
            <p style="font-size: 0.88rem; color: var(--color-text-main); line-height: 1.5; margin: 0;">${dish.ingredients}</p>
          </div>

          <!-- Reserve Table Button -->
          <button class="btn btn-gold" data-open-booking data-booking-type="table" onclick="closeDishDetailModal()" style="width: 100%; text-align: center; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 700;">Reserve a Table & Order (${dish.price})</button>
        </div>
      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(8, 9, 13, 0.95) !important; backdrop-filter: blur(16px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
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
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border-glass);">
          </div>
          
          <!-- Detailed Specs & Location Box (Fluid Mobile Responsive) -->
          <div style="background: rgba(201, 160, 99, 0.06); border: 1px solid rgba(201, 160, 99, 0.25); border-radius: 8px; padding: 1.1rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-size: 0.85rem; color: var(--color-gold-light); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.8rem; display: flex; align-items: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2" style="margin-right: 6px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Operational Specs & Guidelines
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.84rem; color: var(--color-text-muted);">
              <li style="display: flex; flex-direction: column; gap: 0.2rem;"><strong style="color: var(--color-gold-light);">Hours / Timings:</strong> <span style="color: #fff; font-weight: 500;">${item.sub.split('|')[1] || item.sub}</span></li>
              <li style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.3rem;"><strong style="color: var(--color-gold-light);">Location:</strong> <span>Palace Main Wing</span></li>
              <li style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.3rem;"><strong style="color: var(--color-gold-light);">Guest Privilege:</strong> <span>Complimentary Access</span></li>
              <li style="display: flex; flex-direction: column; gap: 0.2rem;"><strong style="color: var(--color-gold-light);">Technical Specs:</strong> <span style="word-break: break-word;">${item.specs}</span></li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Icon, Title, Description, Perks & Reserve CTA -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(201, 160, 99, 0.15); border: 1px solid var(--color-gold-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${item.svg}
              </div>
              <div>
                <h2 style="font-family: var(--font-serif); font-size: 1.7rem; color: var(--color-gold-light); margin: 0; line-height: 1.1;">${item.name}</h2>
                <span style="font-size: 0.8rem; color: var(--color-gold-primary); font-weight: 500;">${item.sub.split('|')[0]}</span>
              </div>
            </div>
            
            <p style="font-size: 0.88rem; line-height: 1.55; color: var(--color-text-muted); margin-bottom: 1rem;">${item.desc}</p>

            <!-- Perks Box -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border-glass); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
              <h4 style="font-size: 0.8rem; color: var(--color-gold-light); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem;">Inclusive Facility Perks</h4>
              <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem; font-size: 0.82rem; color: var(--color-text-muted);">
                ${item.inclusions.map(inc => `<li style="display: flex; align-items: center;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A063" stroke-width="2.5" style="margin-right: 6px; flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>${inc}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="btn btn-gold" data-open-booking data-booking-type="suite" onclick="closeAmenityDetailModal()" style="width: 100%; text-align: center; padding: 0.95rem 1.5rem; font-size: 0.92rem; font-weight: 700;">Enquire / Reserve Service</button>
        </div>

      </div>
    `;
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(8, 9, 13, 0.95) !important; backdrop-filter: blur(16px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
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
    modal.style.cssText = "display: flex !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; inset: 0 !important; z-index: 9999999 !important; background: rgba(8, 9, 13, 0.95) !important; backdrop-filter: blur(16px) !important; padding: 1.5rem !important; align-items: center !important; justify-content: center !important;";
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
