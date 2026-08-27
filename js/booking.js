/**
 * AURELIA — Multi-Step Interactive Reservation Engine
 */

class BookingEngine {
  constructor() {
    this.modal = document.getElementById('bookingModal');
    this.currentStep = 1;
    this.totalSteps = 5;

    this.bookingState = {
      type: 'suite', // 'suite' or 'table'
      checkIn: '',
      checkOut: '',
      guests: 2,
      timeSlot: '20:00',
      selectedItem: null,
      addOns: [],
      guestInfo: {
        name: '',
        email: '',
        phone: '',
        requests: ''
      },
      bookingRef: ''
    };

    this.init();
  }

  init() {
    // Global reservation triggers
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-open-booking]');
      if (openBtn) {
        e.preventDefault();
        const type = openBtn.getAttribute('data-booking-type') || 'suite';
        const preselectedId = openBtn.getAttribute('data-item-id');
        this.openModal(type, preselectedId);
      }

      const closeBtn = e.target.closest('[data-close-booking]');
      if (closeBtn) {
        this.closeModal();
      }
    });

    // Handle modal backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    this.setupFormEvents();
  }

  openModal(type = 'suite', preselectedId = null) {
    if (!this.modal) return;

    this.bookingState.type = type;
    this.currentStep = 1;
    
    // Default dates (Tomorrow & 3 days later)
    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 1);
    const checkOutDate = new Date(today);
    checkOutDate.setDate(today.getDate() + 4);

    this.bookingState.checkIn = checkInDate.toISOString().split('T')[0];
    this.bookingState.checkOut = checkOutDate.toISOString().split('T')[0];

    // Auto-select item if passed
    if (preselectedId && window.AURELIA_DATA) {
      if (type === 'suite') {
        const found = window.AURELIA_DATA.suites.find(s => s.id === preselectedId);
        if (found) this.bookingState.selectedItem = found;
      }
    }

    this.renderStep(1);
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  setupFormEvents() {
    if (!this.modal) return;

    // Step type tabs inside modal
    const typeBtns = this.modal.querySelectorAll('[data-set-type]');
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bookingState.type = btn.getAttribute('data-set-type');
        this.renderStep(this.currentStep);
      });
    });

    // Next / Prev Step buttons
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('#btnNextStep')) {
        this.nextStep();
      }
      if (e.target.closest('#btnPrevStep')) {
        this.prevStep();
      }
      if (e.target.closest('#btnConfirmBooking')) {
        this.completeBooking();
      }
    });
  }

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      this.currentStep++;
      if (this.currentStep > this.totalSteps) this.currentStep = this.totalSteps;
      this.renderStep(this.currentStep);
    }
  }

  prevStep() {
    this.currentStep--;
    if (this.currentStep < 1) this.currentStep = 1;
    this.renderStep(this.currentStep);
  }

  validateStep(step) {
    if (step === 1) {
      const checkInInput = document.getElementById('bookingCheckIn');
      const checkOutInput = document.getElementById('bookingCheckOut');
      const guestsInput = document.getElementById('bookingGuests');

      if (checkInInput) this.bookingState.checkIn = checkInInput.value;
      if (checkOutInput) this.bookingState.checkOut = checkOutInput.value;
      if (guestsInput) this.bookingState.guests = parseInt(guestsInput.value, 10);

      return true;
    }

    if (step === 2) {
      if (!this.bookingState.selectedItem) {
        alert("Please select a Suite or Dining Table experience to proceed.");
        return false;
      }
      return true;
    }

    if (step === 4) {
      const name = document.getElementById('guestName');
      const email = document.getElementById('guestEmail');
      const phone = document.getElementById('guestPhone');

      if (!name || !name.value.trim() || !email || !email.value.trim() || !phone || !phone.value.trim()) {
        alert("Please complete all required contact details.");
        return false;
      }

      this.bookingState.guestInfo.name = name.value.trim();
      this.bookingState.guestInfo.email = email.value.trim();
      this.bookingState.guestInfo.phone = phone.value.trim();
      this.bookingState.guestInfo.requests = document.getElementById('guestRequests')?.value || '';
      return true;
    }

    return true;
  }

  renderStep(step) {
    // Update step indicator
    const stepIndicators = this.modal.querySelectorAll('.step-dot');
    stepIndicators.forEach((dot, idx) => {
      if (idx + 1 === step) {
        dot.classList.add('active');
        dot.classList.remove('completed');
      } else if (idx + 1 < step) {
        dot.classList.remove('active');
        dot.classList.add('completed');
      } else {
        dot.classList.remove('active', 'completed');
      }
    });

    const bodyContent = document.getElementById('bookingModalBody');
    if (!bodyContent) return;

    if (step === 1) {
      bodyContent.innerHTML = `
        <div class="booking-step-content reveal-fade in-view">
          <h3 class="modal-step-title">Select Travel Dates & Guests</h3>
          <p class="modal-step-subtitle">Begin your stay at The Haveli Royale</p>

          <div class="booking-type-toggle">
            <button class="type-btn ${this.bookingState.type === 'suite' ? 'active' : ''}" data-set-type="suite">
              <i class="icon-suite"></i> Suite Reservation
            </button>
            <button class="type-btn ${this.bookingState.type === 'table' ? 'active' : ''}" data-set-type="table">
              <i class="icon-utensils"></i> Dining Table at Le Celestia
            </button>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="bookingCheckIn">${this.bookingState.type === 'suite' ? 'Check-In Date' : 'Reservation Date'}</label>
              <input type="date" id="bookingCheckIn" value="${this.bookingState.checkIn}" class="form-input">
            </div>

            ${this.bookingState.type === 'suite' ? `
              <div class="form-group">
                <label for="bookingCheckOut">Check-Out Date</label>
                <input type="date" id="bookingCheckOut" value="${this.bookingState.checkOut}" class="form-input">
              </div>
            ` : `
              <div class="form-group">
                <label for="bookingTime">Preferred Dining Time</label>
                <select id="bookingTime" class="form-input">
                  <option value="19:00">19:00 — Early Seating</option>
                  <option value="20:00" selected>20:00 — Prime Evening</option>
                  <option value="21:15">21:15 — Sommelier Seating</option>
                </select>
              </div>
            `}

            <div class="form-group">
              <label for="bookingGuests">Number of Guests</label>
              <select id="bookingGuests" class="form-input">
                <option value="1" ${this.bookingState.guests === 1 ? 'selected' : ''}>1 Guest (Solo Traveler)</option>
                <option value="2" ${this.bookingState.guests === 2 ? 'selected' : ''}>2 Guests (Couples)</option>
                <option value="4" ${this.bookingState.guests === 4 ? 'selected' : ''}>4 Guests (Family / VIP)</option>
                <option value="6" ${this.bookingState.guests === 6 ? 'selected' : ''}>6 Guests (Royal Party)</option>
              </select>
            </div>
          </div>
        </div>
      `;

      // Re-attach type toggle listener
      const typeBtns = bodyContent.querySelectorAll('[data-set-type]');
      typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.bookingState.type = btn.getAttribute('data-set-type');
          this.renderStep(1);
        });
      });
    }

    else if (step === 2) {
      if (this.bookingState.type === 'suite') {
        const suites = window.AURELIA_DATA.suites;
        bodyContent.innerHTML = `
          <div class="booking-step-content reveal-fade in-view">
            <h3 class="modal-step-title">Select Your Preferred Suite</h3>
            <p class="modal-step-subtitle">Choose from our curated collection of luxury sanctuaries</p>

            <div class="suite-select-grid">
              ${suites.map(suite => `
                <div class="select-card ${this.bookingState.selectedItem?.id === suite.id ? 'selected' : ''}" data-select-suite="${suite.id}">
                  <div class="card-img-wrap">
                    <img src="${suite.image}" onerror="this.src='${suite.fallback}'" alt="${suite.title}">
                    <span class="card-badge">${suite.badge}</span>
                  </div>
                  <div class="card-info">
                    <h4>${suite.title}</h4>
                    <p class="card-specs">${suite.size} • ${suite.view}</p>
                    <div class="card-price-row">
                      <span class="price-val">₹${suite.price.toLocaleString()}</span>
                      <span class="price-unit">/ night</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        const suiteCards = bodyContent.querySelectorAll('[data-select-suite]');
        suiteCards.forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-select-suite');
            this.bookingState.selectedItem = suites.find(s => s.id === id);
            suiteCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
          });
        });
      } else {
        // Table selection
        bodyContent.innerHTML = `
          <div class="booking-step-content reveal-fade in-view">
            <h3 class="modal-step-title">Select Dining Seating Area</h3>
            <p class="modal-step-subtitle">Le Celestia 3-Michelin-Star Gastronomic Dining Room</p>

            <div class="table-select-grid">
              <div class="select-card ${this.bookingState.selectedItem?.id === 'table-sea-terrace' ? 'selected' : ''}" data-select-table="table-sea-terrace">
                <div class="card-info">
                  <h4>Ocean Glass Terrace Seating</h4>
                  <p class="card-specs">Suspended panoramic sea view table with private glass rail.</p>
                  <span class="price-val">Chef's 8-Course Tasting Included</span>
                </div>
              </div>
              <div class="select-card ${this.bookingState.selectedItem?.id === 'table-chef-counter' ? 'selected' : ''}" data-select-table="table-chef-counter">
                <div class="card-info">
                  <h4>Chef's Private Counter Atelier</h4>
                  <p class="card-specs">Front row view of Chef Laurent de St. Tropez plating line.</p>
                  <span class="price-val">Interactive Chef Service</span>
                </div>
              </div>
              <div class="select-card ${this.bookingState.selectedItem?.id === 'table-vault-room' ? 'selected' : ''}" data-select-table="table-vault-room">
                <div class="card-info">
                  <h4>Private Wine Vault Dining Room</h4>
                  <p class="card-specs">Intimate candlelit brick vault surrounded by 25,000 rare vintages.</p>
                  <span class="price-val">Sommelier Reserve Pairing</span>
                </div>
              </div>
            </div>
          </div>
        `;

        const tableCards = bodyContent.querySelectorAll('[data-select-table]');
        tableCards.forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-select-table');
            const titleMap = {
              'table-sea-terrace': 'Ocean Glass Terrace Seating',
              'table-chef-counter': "Chef's Private Counter Atelier",
              'table-vault-room': 'Private Wine Vault Dining Room'
            };
            this.bookingState.selectedItem = {
              id: id,
              title: titleMap[id],
              price: 280,
              period: 'per guest'
            };
            tableCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
          });
        });
      }
    }

    else if (step === 3) {
      bodyContent.innerHTML = `
        <div class="booking-step-content reveal-fade in-view">
          <h3 class="modal-step-title">Enhance Your Experience</h3>
          <p class="modal-step-subtitle">Curated VIP additions for an unforgettable stay</p>

          <div class="addons-list">
            <label class="addon-item">
              <input type="checkbox" data-addon-id="champagne" ${this.bookingState.addOns.includes('champagne') ? 'checked' : ''}>
              <div class="addon-info">
                <div class="addon-title">Dom Pérignon P2 Vintage Champagne in Suite</div>
                <div class="addon-desc">Chilled bottle waiting upon arrival with fresh Kesar strawberries & caviar.</div>
              </div>
              <div class="addon-price">+ ₹45,000</div>
            </label>

            <label class="addon-item">
              <input type="checkbox" data-addon-id="spa" ${this.bookingState.addOns.includes('spa') ? 'checked' : ''}>
              <div class="addon-info">
                <div class="addon-title">Guerlain Royal Ayurvedic Couples 120-min Ritual</div>
                <div class="addon-desc">Private spa suite hydrotherapy session and custom royal facial.</div>
              </div>
              <div class="addon-price">+ ₹35,000</div>
            </label>

            <label class="addon-item">
              <input type="checkbox" data-addon-id="heli" ${this.bookingState.addOns.includes('heli') ? 'checked' : ''}>
              <div class="addon-info">
                <div class="addon-title">VIP Helicopter Transfer (Airport to Helipad)</div>
                <div class="addon-desc">10-minute luxury scenic flight direct to AURELIA rooftop landing pad.</div>
              </div>
              <div class="addon-price">+ ₹85,000</div>
            </label>

            <label class="addon-item">
              <input type="checkbox" data-addon-id="yacht" ${this.bookingState.addOns.includes('yacht') ? 'checked' : ''}>
              <div class="addon-info">
                <div class="addon-title">Private Sunset Lake Pichola Boat Charter (2 Hours)</div>
                <div class="addon-desc">Champagne cruise with private royal skipper around Lake Pichola.</div>
              </div>
              <div class="addon-price">+ ₹65,000</div>
            </label>
          </div>
        </div>
      `;

      const checkBoxes = bodyContent.querySelectorAll('input[data-addon-id]');
      checkBoxes.forEach(cb => {
        cb.addEventListener('change', () => {
          const addonId = cb.getAttribute('data-addon-id');
          if (cb.checked) {
            if (!this.bookingState.addOns.includes(addonId)) this.bookingState.addOns.push(addonId);
          } else {
            this.bookingState.addOns = this.bookingState.addOns.filter(a => a !== addonId);
          }
        });
      });
    }

    else if (step === 4) {
      bodyContent.innerHTML = `
        <div class="booking-step-content reveal-fade in-view">
          <h3 class="modal-step-title">Guest Identification</h3>
          <p class="modal-step-subtitle">Please provide contact details for confirmation & concierge concierge onboarding</p>

          <div class="form-grid">
            <div class="form-group span-2">
              <label for="guestName">Full Guest Name (As on Passport)</label>
              <input type="text" id="guestName" value="${this.bookingState.guestInfo.name}" placeholder="e.g. Lord Alexander Vance" class="form-input">
            </div>

            <div class="form-group">
              <label for="guestEmail">Email Address</label>
              <input type="email" id="guestEmail" value="${this.bookingState.guestInfo.email}" placeholder="vance@residence.com" class="form-input">
            </div>

            <div class="form-group">
              <label for="guestPhone">Telephone / WhatsApp</label>
              <input type="tel" id="guestPhone" value="${this.bookingState.guestInfo.phone}" placeholder="+44 20 7946 0912" class="form-input">
            </div>

            <div class="form-group span-2">
              <label for="guestRequests">Special Requests & Dietary Preferences</label>
              <textarea id="guestRequests" placeholder="e.g. High floor preference, champagne chilled to 6°C, gluten-free dining..." class="form-input rows-3">${this.bookingState.guestInfo.requests}</textarea>
            </div>
          </div>
        </div>
      `;
    }

    else if (step === 5) {
      // Confirmation Step
      if (!this.bookingState.bookingRef) {
        this.bookingState.bookingRef = 'HVR-' + Math.floor(100000 + Math.random() * 900000);
      }

      bodyContent.innerHTML = `
        <div class="booking-step-content reveal-fade in-view text-center">
          <div class="confirmation-crest">
            <div class="crest-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8C6D38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
          </div>
          <h3 class="modal-step-title">Reservation Confirmed</h3>
          <p class="modal-step-subtitle">Your luxury stay at The Haveli Royale is secured.</p>

          <div class="confirmation-card">
            <div class="ref-badge">REFERENCE NO: <strong>${this.bookingState.bookingRef}</strong></div>
            <div class="summary-details">
              <div class="sum-row">
                <span>Guest Name:</span>
                <strong>${this.bookingState.guestInfo.name}</strong>
              </div>
              <div class="sum-row">
                <span>Selection:</span>
                <strong>${this.bookingState.selectedItem?.title || 'Luxury Suite'}</strong>
              </div>
              <div class="sum-row">
                <span>Dates:</span>
                <strong>${this.bookingState.checkIn} to ${this.bookingState.checkOut}</strong>
              </div>
              <div class="sum-row">
                <span>Guests:</span>
                <strong>${this.bookingState.guests} Guests</strong>
              </div>
            </div>
            <div class="confirmation-note">
              A detailed itinerary & personal concierge welcome letter has been dispatched to <strong>${this.bookingState.guestInfo.email}</strong>.
            </div>
          </div>

          <div class="action-row">
            <button class="btn btn-gold" onclick="window.bookingEngine.closeModal()">Return to Website</button>
            <button class="btn btn-outline" onclick="window.print()">Print Itinerary</button>
          </div>
        </div>
      `;
    }

    // Render Modal Footer Controls
    const footerControls = document.getElementById('bookingModalFooter');
    if (footerControls) {
      if (step === 5) {
        footerControls.style.display = 'none';
      } else {
        footerControls.style.display = 'flex';
        footerControls.innerHTML = `
          <button class="btn btn-outline" id="btnPrevStep" ${step === 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>Back</button>
          <button class="btn btn-gold" id="${step === 4 ? 'btnConfirmBooking' : 'btnNextStep'}">
            ${step === 4 ? 'Confirm & Reserve' : 'Continue'}
          </button>
        `;
      }
    }
  }

  completeBooking() {
    if (this.validateStep(4)) {
      if (window.audioEngine) {
        window.audioEngine.playChimeSound();
      }
      this.currentStep = 5;
      this.renderStep(5);
    }
  }
}

window.BookingEngine = BookingEngine;
