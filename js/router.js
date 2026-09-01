/**
 * AURELIA — SPA Router & Page Transition Engine
 */

class Router {
  constructor() {
    this.pages = document.querySelectorAll('.page-view');
    this.navLinks = document.querySelectorAll('[data-page-link]');
    this.curtain = document.getElementById('pageCurtain');
    this.currentPageId = 'home';
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // Listen for custom link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-page-link]');
      if (link) {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page-link');
        if (targetPage && targetPage !== this.currentPageId) {
          this.navigateTo(targetPage);
        }
      }
    });

    // Initial page load based on hash or default to home
    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.showPageImmediate(initialHash);
  }

  handleHashChange() {
    const pageId = window.location.hash.replace('#', '') || 'home';
    if (pageId !== this.currentPageId && !this.isTransitioning) {
      this.navigateTo(pageId);
    }
  }

  navigateTo(pageId) {
    const targetPage = document.getElementById(`page-${pageId}`);
    if (!targetPage || this.isTransitioning) return;

    this.isTransitioning = true;

    // Trigger curtain transition sound if available
    if (window.audioEngine) {
      window.audioEngine.playTransitionSound();
    }

    // Step 1: Curtain sweeps IN
    if (this.curtain) {
      this.curtain.classList.add('active');
    }

    setTimeout(() => {
      // Step 2: Switch active page
      this.pages.forEach(p => p.classList.remove('active'));
      targetPage.classList.add('active');
      targetPage.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .suite-card, .menu-item-card, .gallery-item, .offer-card, .exp-card').forEach(el => el.classList.add('in-view'));
      this.currentPageId = pageId;

      // Update browser URL hash safely (only on HTTP/HTTPS to prevent file:// security origin warnings)
      if (window.location.protocol !== 'file:' && window.location.hash !== `#${pageId}`) {
        try {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, `#${pageId}`);
          }
        } catch (err) {
          // Silently ignore
        }
      }

      // Update Nav active states
      this.updateActiveNavLinks(pageId);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Refresh scroll animations
      if (window.animationEngine) {
        window.animationEngine.refreshObserver();
      }

      // Step 3: Curtain sweeps OUT
      setTimeout(() => {
        if (this.curtain) {
          this.curtain.classList.remove('active');
        }
        this.isTransitioning = false;
      }, 400);

    }, 500);
  }

  showPageImmediate(pageId) {
    const targetPage = document.getElementById(`page-${pageId}`) || document.getElementById('page-home');
    const validId = targetPage ? targetPage.id.replace('page-', '') : 'home';

    this.pages.forEach(p => p.classList.remove('active'));
    if (targetPage) {
      targetPage.classList.add('active');
      targetPage.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .suite-card, .menu-item-card, .gallery-item, .offer-card, .exp-card').forEach(el => el.classList.add('in-view'));
    }
    this.currentPageId = validId;
    this.updateActiveNavLinks(validId);
  }

  updateActiveNavLinks(pageId) {
    this.navLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-page-link');
      if (linkTarget === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      if (menuToggle) menuToggle.classList.remove('active');
    }
  }
}

window.Router = Router;
