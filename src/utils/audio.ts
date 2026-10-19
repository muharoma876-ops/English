// Web Audio API ambient and UI sound generator with zero external network dependencies

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft slide transition cue
  playTransition() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 0.12); // D5

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Audio playback allowed to fail gracefully if user hasn't interacted
    }
  }

  // Completion chime for timer or milestone
  playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.06, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.65);
      });
    } catch {
      // silent fallback
    }
  }

  // Gentle lo-fi ambient meditation pad for presentation
  toggleAmbient(force?: boolean): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      const shouldPlay = force !== undefined ? force : !this.isAmbientPlaying;

      if (!shouldPlay) {
        if (this.ambientGain && this.ctx) {
          this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
          setTimeout(() => {
            this.ambientOsc1?.stop();
            this.ambientOsc2?.stop();
            this.ambientOsc1?.disconnect();
            this.ambientOsc2?.disconnect();
            this.ambientGain?.disconnect();
            this.ambientOsc1 = null;
            this.ambientOsc2 = null;
            this.ambientGain = null;
          }, 850);
        }
        this.isAmbientPlaying = false;
        return false;
      }

      // Start ambient pad
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 2.0);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  getAmbientState(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new SoundEngine();
