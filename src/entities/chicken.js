import { GRID_CELL_SIZE, PLAYER_START_X_GRID, PLAYER_START_Y_GRID } from '../core/constants.js';

/**
 * Representa o jogador no jogo (a galinha).
 * Responsável por gerenciar sua posição, movimento e renderização.
 */
export class Chicken {
    /** @type {number} */ #x;
    /** @type {number} */ #y;
    /** @type {number} */ #width;
    /** @type {number} */ #height;
    /** @type {HTMLImageElement} */ #sprite;

    /**
     * Inicializa o jogador com dimensões padrão e reseta sua posição.
     * @param {HTMLImageElement} sprite - A imagem da galinha.
     */
    constructor(sprite) {
        this.#width = GRID_CELL_SIZE - 4;
        this.#height = GRID_CELL_SIZE - 4;
        this.#sprite = sprite;
        
        this.reset();
    }

    /** @returns {number} Posição X atual */
    get x() { return this.#x; }
    /** @returns {number} Posição Y atual */
    get y() { return this.#y; }
    /** @returns {number} Largura */
    get width() { return this.#width; }
    /** @returns {number} Altura */
    get height() { return this.#height; }

    /**
     * Reseta a posição do jogador para o ponto de partida original.
     */
    reset() {
        this.#x = PLAYER_START_X_GRID * GRID_CELL_SIZE;
        this.#y = PLAYER_START_Y_GRID * GRID_CELL_SIZE;
    }

    /**
     * Move o jogador com base em um deslocamento relativo, respeitando os limites do canvas.
     * @param {number} dx - Deslocamento horizontal em pixels.
     * @param {number} dy - Deslocamento vertical em pixels.
     * @param {number} canvasWidth - Largura total da área de jogo.
     * @param {number} canvasHeight - Altura total da área de jogo.
     */
    move(dx, dy, canvasWidth, canvasHeight) {
        const nextX = this.#x + dx;
        const nextY = this.#y + dy;

        if (nextX >= 0 && nextX <= canvasWidth - GRID_CELL_SIZE) {
            this.#x = nextX;
        }
        if (nextY >= 0 && nextY <= canvasHeight - GRID_CELL_SIZE) {
            this.#y = nextY;
        }
    }

    /**
     * Renderiza o jogador no contexto gráfico fornecido.
     * @param {CanvasRenderingContext2D} ctx - O contexto de renderização 2D do canvas.
     */
    render(ctx) {
        if (this.#sprite) {
            ctx.drawImage(this.#sprite, this.#x, this.#y, this.#width, this.#height);
        } else {
            // Fallback: Retângulo Amarelo
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
            ctx.fillStyle = "black";
            ctx.fillRect(this.#x + 10, this.#y + 10, 5, 5);
        }
    }
}
