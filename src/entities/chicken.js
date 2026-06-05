import { GRID_CELL_SIZE, PLAYER_START_X_GRID, PLAYER_START_Y_GRID } from '../core/constants.js';

/**
 * Representa o jogador no jogo (a galinha).
 * Responsável por gerenciar sua posição, movimento, física e renderização.
 */
export class Chicken {
    /** @type {number} */ #x;
    /** @type {number} */ #y;
    /** @type {number} */ #width;
    /** @type {number} */ #height;
    /** @type {HTMLImageElement} */ #sprite;
    
    // Propriedades de Física
    /** @type {number} */ #vx = 0;
    /** @type {number} */ #vy = 0;
    /** @type {number} */ #rotation = 0;
    /** @type {boolean} */ #isKnockedBack = false;

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
        this.#vx = 0;
        this.#vy = 0;
        this.#rotation = 0;
        this.#isKnockedBack = false;
    }

    /**
     * Aplica uma força de impacto (knockback) na galinha.
     * @param {number} vx - Velocidade X inicial do impacto.
     * @param {number} vy - Velocidade Y inicial do impacto.
     */
    applyKnockback(vx, vy) {
        this.#vx = vx;
        this.#vy = vy;
        this.#isKnockedBack = true;
    }

    /**
     * Move o jogador com base em um deslocamento relativo.
     * Ignora se estiver em estado de knockback.
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     */
    move(dx, dy, canvasWidth, canvasHeight) {
        if (this.#isKnockedBack) return;

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
     * Atualiza a física da galinha (movimento e fricção).
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     */
    update(canvasWidth, canvasHeight) {
        if (!this.#isKnockedBack) return;

        // Aplica velocidade à posição
        this.#x += this.#vx;
        this.#y += this.#vy;

        // Efeito de rotação (capotagem)
        this.#rotation += this.#vx * 0.1;

        // Fricção (desaceleração gradual)
        this.#vx *= 0.92;
        this.#vy *= 0.92;

        // Limites da tela durante o voo
        if (this.#x < 0) { this.#x = 0; this.#vx *= -0.5; }
        if (this.#x > canvasWidth - this.#width) { this.#x = canvasWidth - this.#width; this.#vx *= -0.5; }
        if (this.#y < 0) { this.#y = 0; this.#vy *= -0.5; }
        if (this.#y > canvasHeight - this.#height) { this.#y = canvasHeight - this.#height; this.#vy *= -0.5; }
    }

    /**
     * Renderiza o jogador com suporte a rotação.
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        ctx.save();
        
        // Translada e rotaciona se houver impacto
        ctx.translate(this.#x + this.#width / 2, this.#y + this.#height / 2);
        if (this.#isKnockedBack) {
            ctx.rotate(this.#rotation);
        }

        if (this.#sprite) {
            ctx.drawImage(this.#sprite, -this.#width / 2, -this.#height / 2, this.#width, this.#height);
        } else {
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(-this.#width / 2, -this.#height / 2, this.#width, this.#height);
        }

        ctx.restore();
    }
}
