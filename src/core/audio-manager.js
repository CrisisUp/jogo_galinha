/**
 * Gerencia a síntese de efeitos sonoros essenciais utilizando a Web Audio API.
 */
export class AudioManager {
    constructor() {
        /** @type {AudioContext|null} */
        this.ctx = null;
    }

    /**
     * Inicializa o contexto de áudio.
     */
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
     * Toca um som sintetizado genérico.
     * @private
     */
    playSound(freq, type, duration, volume) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    /** Som curto para o movimento da galinha */
    playMove() {
        this.playSound(400, 'sine', 0.1, 0.1);
    }

    /** Som alegre para pontuação */
    playScore() {
        [523.25, 659.25, 783.99].forEach((f, i) => {
            setTimeout(() => this.playSound(f, 'sine', 0.3, 0.1), i * 100);
        });
    }

    /** Som de transição de fase (vários bipes ascendentes) */
    playLevelUp() {
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((f, i) => {
            setTimeout(() => this.playSound(f, 'sine', 0.4, 0.1), i * 150);
        });
    }

    /** Som de coleta de item (agudo e rápido) */
    playCollect() {
        this.playSound(880, 'sine', 0.15, 0.1);
        setTimeout(() => this.playSound(1320, 'sine', 0.15, 0.1), 50);
    }

    /** Som de coleta de crédito de sinal (moeda) */
    playCollectCredit() {
        this.playSound(660, 'sine', 0.1, 0.1);
        setTimeout(() => this.playSound(880, 'sine', 0.2, 0.1), 100);
    }

    /** Som de ativação de semáforo (sirene ou alerta) */
    playSignalActivate() {
        const now = this.ctx.currentTime;
        [880, 440, 880, 440].forEach((f, i) => {
            setTimeout(() => this.playSound(f, 'square', 0.2, 0.05), i * 150);
        });
    }

    /** Som de impacto para colisão */
    playHit() {
        this.playSound(150, 'square', 0.2, 0.1);
    }

    /** Som dramático para o fim de jogo */
    playGameOver() {
        [440, 349, 261].forEach((f, i) => {
            setTimeout(() => this.playSound(f, 'sawtooth', 0.5, 0.1), i * 200);
        });
    }
}
