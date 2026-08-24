/**
 * AURELIA — Custom Spring Magnetic Cursor Engine
 */

class LuxuryCursor {
  constructor() {
    this.dot = document.getElementById('cursorDot');
    this.ring = document.getElementById('cursorRing');
    this.text = document.getElementById('cursorText');

    if (!this.dot || !this.ring) return;

    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.speed = 0.15; // Smooth spring lag factor
    this.isHovered = false;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Direct placement for small dot
      this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    });

    this.render();
    this.setupInteractions();
  }

  render() {
    // Smooth interpolation for outer ring
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

    requestAnimationFrame(() => this.render());
  }

  setupInteractions() {
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor]');
      const clickable = e.target.closest('a, button, .btn, .card, .menu-item-card, input, select');

      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        this.ring.classList.add('expanded');
        
        if (cursorType && cursorType !== 'pointer') {
          this.text.textContent = cursorType.toUpperCase();
          this.ring.classList.add('has-text');
        } else {
          this.text.textContent = '';
          this.ring.classList.remove('has-text');
        }
      } else if (clickable) {
        this.ring.classList.add('expanded');
        this.text.textContent = '';
        this.ring.classList.remove('has-text');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .btn, .card, .menu-item-card, input, select');
      if (target) {
        this.ring.classList.remove('expanded', 'has-text');
        this.text.textContent = '';
      }
    });

    // Magnetic effect on magnetic buttons
    const magBtns = document.querySelectorAll('.magnetic-btn');
    magBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0, 0, 0)`;
      });
    });
  }
}

window.LuxuryCursor = LuxuryCursor;
