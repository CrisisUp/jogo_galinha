import { GRID_CELL_SIZE } from '../core/constants.js';

/**
 * Representa um veículo obstáculo genérico.
 * @abstract
 */
export class Vehicle {
    /** @type {number} */ #x;
    /** @type {number} */ #y;
    /** @type {number} */ #width;
    /** @type {number} */ #height;
    /** @type {number} */ #speed;
    /** @type {number} */ #direction;
    /** @type {HTMLImageElement} */ #sprite;

    /**
     * @param {Object} laneConfig - Configuração da faixa.
     * @param {HTMLImageElement} sprite - Imagem do veículo.
     */
    constructor(laneConfig, sprite) {
        this.#x = 0; 
        this.#y = laneConfig.y + 2;
        this.#width = GRID_CELL_SIZE; // Valor base, alterado por subclasses
        this.#height = GRID_CELL_SIZE - 4;
        this.#speed = laneConfig.speed;
        this.#direction = laneConfig.direction;
        this.#sprite = sprite;
    }

    /** @returns {number} Posição X atual */
    get x() { return this.#x; }
    /** @set x(value) Define posição X (necessário para o spawn da factory) */
    set x(value) { this.#x = value; }
    
    /** @returns {number} Posição Y atual */
    get y() { return this.#y; }
    /** @returns {number} Largura */
    get width() { return this.#width; }
    /** @set width(value) Permite subclasses definirem largura */
    protected_setWidth(value) { this.#width = value; }
    
    /** @returns {number} Altura */
    get height() { return this.#height; }
    /** @returns {number} Velocidade */
    get speed() { return this.#speed; }
    /** @set speed(value) Permite alteração de velocidade (dificuldade) */
    set speed(value) { this.#speed = value; }
    
    /** @returns {number} Direção */
    get direction() { return this.#direction; }
    /** @returns {HTMLImageElement} Imagem */
    get sprite() { return this.#sprite; }

    /**
     * Atualiza a posição e gerencia o wrap lateral.
     * @param {number} canvasWidth 
     */
    update(canvasWidth) {
        this.#x += this.#speed * this.#direction;

        if (this.#direction === 1 && this.#x > canvasWidth) {
            this.#x = -this.#width;
        } else if (this.#direction === -1 && this.#x < -this.#width) {
            this.#x = canvasWidth;
        }
    }

    /**
     * Renderiza o veículo.
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        if (this.#sprite) {
            if (this.#direction === 1) {
                ctx.save();
                ctx.translate(this.#x + this.#width, this.#y);
                ctx.scale(-1, 1);
                ctx.drawImage(this.#sprite, 0, 0, this.#width, this.#height);
                ctx.restore();
            } else {
                ctx.drawImage(this.#sprite, this.#x, this.#y, this.#width, this.#height);
            }
        }
    }
}

/**
 * Representa um Carro comum.
 * @extends Vehicle
 */
export class Car extends Vehicle {
    constructor(laneConfig, sprite) {
        super(laneConfig, sprite);
        this.protected_setWidth(GRID_CELL_SIZE * 1.5);
    }
}

/**
 * Representa um Caminhão ou Ônibus (mais longo e lento).
 * @extends Vehicle
 */
export class Truck extends Vehicle {
    constructor(laneConfig, sprite) {
        super(laneConfig, sprite);
        this.protected_setWidth(GRID_CELL_SIZE * 2.5);
        this.speed *= 0.8; // Caminhões são mais lentos
    }
}

/**
 * Representa uma Moto (mais curta e rápida).
 * @extends Vehicle
 */
export class Motorcycle extends Vehicle {
    constructor(laneConfig, sprite) {
        super(laneConfig, sprite);
        this.protected_setWidth(GRID_CELL_SIZE * 0.8);
        this.speed *= 1.5; // Motos são mais velozes
    }
}
