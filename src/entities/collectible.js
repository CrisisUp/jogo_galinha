import { GRID_CELL_SIZE } from '../core/constants.js';

/**
 * Representa um item coletável (bônus) no jogo.
 */
export class Collectible {
    /** @type {number} */ #x;
    /** @type {number} */ #y;
    /** @type {number} */ #width;
    /** @type {number} */ #height;
    /** @type {HTMLImageElement} */ #sprite;
    /** @type {number} */ #value;

    /**
     * @param {number} x - Posição X.
     * @param {number} y - Posição Y.
     * @param {HTMLImageElement} sprite - Imagem do item.
     * @param {number} value - Valor em pontos ao coletar.
     */
    constructor(x, y, sprite, value = 50) {
        this.#x = x;
        this.#y = y;
        this.#width = GRID_CELL_SIZE - 10;
        this.#height = GRID_CELL_SIZE - 10;
        this.#sprite = sprite;
        this.#value = value;
    }

    /** @returns {number} Posição X atual */
    get x() { return this.#x; }
    /** @returns {number} Posição Y atual */
    get y() { return this.#y; }
    /** @returns {number} Largura */
    get width() { return this.#width; }
    /** @returns {number} Altura */
    get height() { return this.#height; }
    /** @returns {number} Valor do item */
    get value() { return this.#value; }

    /**
     * Renderiza o item coletável.
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        if (this.#sprite) {
            // Desenha com um pequeno efeito de oscilação para chamar atenção
            const pulse = Math.sin(Date.now() / 200) * 3;
            ctx.drawImage(
                this.#sprite, 
                this.#x - pulse / 2, 
                this.#y - pulse / 2, 
                this.#width + pulse, 
                this.#height + pulse
            );
        }
    }
}
