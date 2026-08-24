/**
 * AURELIA — Ambient Soundscape & Web Audio Synthesizer
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];

    this.initUI();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Low background volume
      this.masterGain.connect(this.ctx.destination);
    }
  }

  initUI() {
    const toggleBtn = document.getElementById('soundToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleSound();
    });
  }

  toggleSound() {
    this.initContext();

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  startAmbient() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const toggleBtn = document.getElementById('soundToggle');
    if (toggleBtn) toggleBtn.classList.add('playing');

    // Ambient Luxury Chord: Fmaj7 (F3, A3, C4, E4)
    const frequencies = [174.61, 220.00, 261.63, 329.63];

    frequencies.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle LFO modulation for warm analog drift
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.1, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(2.0, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain, lfo });
    });
  }

  stopAmbient() {
    this.isPlaying = false;
    const toggleBtn = document.getElementById('soundToggle');
    if (toggleBtn) toggleBtn.classList.remove('playing');

    this.oscillators.forEach(item => {
      item.gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        item.osc.stop();
        item.lfo.stop();
      }, 1000);
    });

    this.oscillators = [];
  }

  playTransitionSound() {
    if (!this.isPlaying || !this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {
      // Audio context might be blocked
    }
  }

  playChimeSound() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chime

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.05, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.2);
      });
    } catch (e) {
      // Ignore
    }
  }
}

window.AudioEngine = AudioEngine;
