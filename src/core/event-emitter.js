/**
 * Classe utilitária para gerenciamento de eventos seguindo o padrão Observer.
 * Permite o desacoplamento entre a lógica de negócio e a interface do usuário.
 */
export class EventEmitter {
    constructor() {
        /** @type {Object.<string, Function[]>} Armazena os ouvintes para cada evento */
        this.events = {};
    }

    /**
     * Registra um ouvinte para um evento específico.
     * @param {string} event - Nome do evento.
     * @param {Function} listener - Função a ser executada quando o evento ocorrer.
     */
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    /**
     * Dispara um evento, executando todos os ouvintes registrados.
     * @param {string} event - Nome do evento.
     * @param {any} data - Dados a serem passados para os ouvintes.
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}
