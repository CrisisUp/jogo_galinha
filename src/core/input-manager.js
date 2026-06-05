import { EventEmitter } from './event-emitter.js';

/**
 * Gerencia as entradas do usuário (teclado).
 * Traduz teclas físicas em comandos lógicos semânticos.
 * @extends EventEmitter
 */
export class InputManager extends EventEmitter {
    constructor() {
        super();
        /** @type {Object.<string, string>} Mapa de teclas para comandos */
        this.keyMap = {
            'ArrowUp': 'UP',
            'w': 'UP',
            'ArrowDown': 'DOWN',
            's': 'DOWN',
            'ArrowLeft': 'LEFT',
            'a': 'LEFT',
            'ArrowRight': 'RIGHT',
            'd': 'RIGHT',
            ' ': 'SIGNAL'
        };
    }

    /**
     * Inicia a escuta de eventos do teclado no documento.
     */
    startListening() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    /**
     * Processa a tecla pressionada e emite o comando correspondente se existir.
     * @param {KeyboardEvent} event - O evento de teclado.
     * @private
     */
    handleKeyDown(event) {
        const command = this.keyMap[event.key];
        if (command) {
            this.emit('command', command);
        }
    }
}
