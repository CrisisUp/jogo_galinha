import { 
    GRID_CELL_SIZE, 
    COLOR_ROAD, 
    COLOR_GRASS, 
    COLOR_LANE_MARKING 
} from './constants.js';

/**
 * Classe responsável por toda a renderização visual no Canvas.
 * Isola a API do Canvas da lógica do motor do jogo.
 */
export class Renderer {
    /**
     * @param {HTMLCanvasElement} canvas - O elemento canvas onde o jogo será desenhado.
     */
    constructor(canvas) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * Limpa o canvas para o próximo quadro.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Desenha o cenário estático (rua, grama e faixas).
     */
    drawBackground() {
        // Rua
        this.ctx.fillStyle = COLOR_ROAD;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Áreas de Grama
        const grassRows = [0, 4, 8, 12, 14];
        this.ctx.fillStyle = COLOR_GRASS;
        grassRows.forEach(row => {
            this.ctx.fillRect(0, row * GRID_CELL_SIZE, this.canvas.width, GRID_CELL_SIZE);
        });

        // Marcações das Faixas
        this.ctx.strokeStyle = COLOR_LANE_MARKING;
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([10, 20]);
        const roadRows = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13];
        roadRows.forEach(row => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, row * GRID_CELL_SIZE);
            this.ctx.lineTo(this.canvas.width, row * GRID_CELL_SIZE);
            this.ctx.stroke();
        });
        this.ctx.setLineDash([]);
    }

    /**
     * Fornece feedback visual piscando a borda do canvas em vermelho.
     */
    flashHitEffect() {
        this.canvas.style.borderColor = "red";
        setTimeout(() => this.canvas.style.borderColor = "var(--canvas-border-color, #fff)", 100);
    }

    /**
     * Orquestra a renderização completa de um quadro do jogo.
     * @param {import('../entities/chicken.js').Chicken} player - A instância do jogador.
     * @param {import('../entities/vehicle.js').Vehicle[]} vehicles - A lista de veículos.
     * @param {import('../entities/collectible.js').Collectible[]} collectibles - A lista de itens coletáveis.
     */
    renderFrame(player, vehicles, collectibles) {
        this.clear();
        this.drawBackground();
        
        // Renderiza os itens coletáveis
        collectibles.forEach(item => item.render(this.ctx));
        
        // Renderiza os veículos
        vehicles.forEach(vehicle => vehicle.render(this.ctx));
        
        // Renderiza o jogador
        player.render(this.ctx);
    }
}
