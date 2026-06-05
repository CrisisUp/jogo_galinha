import { 
    INITIAL_LIVES, 
    POINTS_PER_LEVEL, 
    DIFFICULTY_MULTIPLIER, 
    FPS, 
    GAME_STATE,
    GRID_CELL_SIZE,
    INITIAL_SIGNAL_CREDITS,
    SIGNAL_DURATION_MS
} from './constants.js';
import { EventEmitter } from './event-emitter.js';
import { Chicken } from '../entities/chicken.js';
import { VehicleFactory } from '../factories/vehicle-factory.js';
import { Collectible } from '../entities/collectible.js';
import { Renderer } from './renderer.js';

/**
 * Motor Principal do Jogo (Game Engine).
 * Orquestra a lógica, física, colisões e renderização, emitindo eventos para a UI.
 * @extends EventEmitter
 */
export class GameEngine extends EventEmitter {
    /** @type {HTMLCanvasElement} */ #canvas;
    /** @type {import('./asset-loader.js').AssetLoader} */ #assetLoader;
    /** @type {import('./input-manager.js').InputManager} */ #inputManager;
    /** @type {Object[]} */ #laneConfigurations;
    /** @type {Renderer} */ #renderer;
    
    /** @type {number} */ #remainingLives;
    /** @type {number} */ #playerScore;
    /** @type {number} */ #signalCredits;
    /** @type {boolean} */ #isSignalActive;
    /** @type {number|null} */ #signalTimeoutId;
    /** @type {string} */ #currentState;
    /** @type {number|null} */ #animationFrameId;

    /** @type {Chicken} */ #player;
    /** @type {import('../entities/vehicle.js').Vehicle[]} */ #vehicles;
    /** @type {Collectible[]} */ #collectibles;

    /**
     * Configura o motor do jogo.
     * @param {Object} config - Configurações iniciais.
     * @param {HTMLCanvasElement} config.canvas - O elemento canvas onde o jogo será desenhado.
     * @param {import('./asset-loader.js').AssetLoader} config.assetLoader - O carregador de assets.
     * @param {import('./input-manager.js').InputManager} config.inputManager - O gerenciador de entradas.
     * @param {Object[]} config.level - Configuração das faixas do nível atual.
     */
    constructor(config) {
        super();
        this.#canvas = config.canvas;
        this.#assetLoader = config.assetLoader;
        this.#inputManager = config.inputManager;
        this.#laneConfigurations = config.level;
        
        this.#renderer = new Renderer(this.#canvas);

        this.#remainingLives = INITIAL_LIVES;
        this.#playerScore = 0;
        this.#signalCredits = INITIAL_SIGNAL_CREDITS;
        this.#isSignalActive = false;
        this.#signalTimeoutId = null;
        this.#currentState = GAME_STATE.MENU;
        this.#animationFrameId = null;

        this.#player = new Chicken(this.#assetLoader.images.chicken);
        this.#vehicles = [];
        this.#collectibles = [];

        this.#init();
    }

    // Getters para permitir acesso controlado em modo leitura se necessário (ex: Renderer)
    get player() { return this.#player; }
    get vehicles() { return this.#vehicles; }
    get collectibles() { return this.#collectibles; }
    get isSignalActive() { return this.#isSignalActive; }

    /**
     * Inicializa os componentes do jogo e inicia o loop principal.
     * @private
     */
    #init() {
        this.#spawnVehicles();
        this.#spawnInitialCollectibles();
        this.#inputManager.on('command', (command) => this.#processCommand(command));
        this.#gameLoop();
    }

    /**
     * Inicia oficialmente a partida, mudando o estado para PLAYING.
     */
    start() {
        this.#remainingLives = INITIAL_LIVES;
        this.#playerScore = 0;
        this.#signalCredits = INITIAL_SIGNAL_CREDITS;
        this.#isSignalActive = false;
        if (this.#signalTimeoutId) clearTimeout(this.#signalTimeoutId);
        
        this.#collectibles = [];
        this.#spawnInitialCollectibles();
        this.#currentState = GAME_STATE.PLAYING;

        // Avisa a UI sobre os créditos iniciais
        this.emit('signalUpdate', this.#signalCredits);
    }

    /**
     * Popula o jogo com veículos usando a VehicleFactory.
     * @private
     */
    #spawnVehicles() {
        this.#vehicles = [];
        this.#laneConfigurations.forEach(lane => {
            const vehiclesPerLane = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < vehiclesPerLane; i++) {
                const asset = this.#assetLoader.getRandomVehicleAsset();
                const vehicle = VehicleFactory.createVehicle(lane, i, asset.sprite, asset.category);
                this.#vehicles.push(vehicle);
            }
        });
    }

    /**
     * Adiciona alguns itens coletáveis iniciais em zonas seguras.
     * @private
     */
    #spawnInitialCollectibles() {
        // Zonas seguras (linhas de grama): 4, 8, 12
        const safeRows = [4, 8, 12];
        safeRows.forEach(row => {
            // Chance de spawnar um milho em cada zona segura no início
            if (Math.random() > 0.3) {
                this.#spawnCollectibleAtRow(row, 'SCORE');
            }
            // Chance menor de spawnar uma moeda de sinal
            if (Math.random() > 0.7) {
                this.#spawnCollectibleAtRow(row, 'CREDIT');
            }
        });
    }

    /**
     * Cria um item coletável em uma linha específica.
     * @param {number} row - O índice da linha na grade.
     * @param {string} type - Tipo do item ('SCORE' ou 'CREDIT').
     * @private
     */
    #spawnCollectibleAtRow(row, type) {
        const col = Math.floor(Math.random() * 8) + 1; 
        const x = col * GRID_CELL_SIZE + 5;
        const y = row * GRID_CELL_SIZE + 5;
        
        const sprite = type === 'CREDIT' ? this.#assetLoader.images.coin : this.#assetLoader.images.corn;
        const value = type === 'CREDIT' ? 0 : 50;
        
        this.#collectibles.push(new Collectible(x, y, sprite, type, value));
    }

    /**
     * Processa um comando de entrada semântico.
     * @param {string} command - O comando a ser executado.
     * @private
     */
    #processCommand(command) {
        // Ignora comandos se não estiver jogando
        if (this.#currentState !== GAME_STATE.PLAYING) return;

        if (command === 'SIGNAL') {
            this.#activateSignal();
            return;
        }

        let dx = 0;
        let dy = 0;

        switch (command) {
            case 'UP': dy = -GRID_CELL_SIZE; break;
            case 'DOWN': dy = GRID_CELL_SIZE; break;
            case 'LEFT': dx = -GRID_CELL_SIZE; break;
            case 'RIGHT': dx = GRID_CELL_SIZE; break;
        }

        if (dx !== 0 || dy !== 0) {
            this.#player.move(dx, dy, this.#canvas.width, this.#canvas.height);
            this.emit('move');
            this.#checkWinCondition();
        }
    }

    /**
     * Ativa o semáforo se houver créditos disponíveis.
     * @private
     */
    #activateSignal() {
        if (this.#signalCredits > 0 && !this.#isSignalActive) {
            this.#signalCredits--;
            this.#isSignalActive = true;
            this.emit('signalUpdate', this.#signalCredits);
            this.emit('signalActivated');

            // Agenda a desativação
            this.#signalTimeoutId = setTimeout(() => {
                this.#isSignalActive = false;
                this.emit('signalDeactivated');
            }, SIGNAL_DURATION_MS);
        }
    }

    /**
     * Verifica se o jogador chegou ao final da travessia.
     * @private
     */
    #checkWinCondition() {
        if (this.#player.y === 0) {
            this.#playerScore += POINTS_PER_LEVEL;
            this.emit('scoreUpdate', this.#playerScore);
            this.#increaseDifficulty();
            this.#player.reset();
            
            // Spawn de novo item ao completar nível (pequena chance)
            if (Math.random() > 0.5) {
                const safeRows = [4, 8, 12];
                const randomRow = safeRows[Math.floor(Math.random() * safeRows.length)];
                const type = Math.random() > 0.8 ? 'CREDIT' : 'SCORE';
                this.#spawnCollectibleAtRow(randomRow, type);
            }
        }
    }

    /**
     * Aumenta a velocidade de todos os veículos.
     * @private
     */
    #increaseDifficulty() {
        this.#vehicles.forEach(v => v.speed *= DIFFICULTY_MULTIPLIER);
    }

    /**
     * Ciclo principal do jogo executado a cada frame.
     * @private
     */
    #gameLoop() {
        this.#render();
        this.#update();
        
        this.#animationFrameId = requestAnimationFrame(() => this.#gameLoop());
    }

    /**
     * Atualiza a física e estados de todos os objetos.
     * @private
     */
    #update() {
        // Atualiza a física da galinha sempre (importante para knockback)
        this.#player.update(this.#canvas.width, this.#canvas.height);

        if (this.#currentState === GAME_STATE.PLAYING) {
            // Apenas move veículos se o sinal não estiver ativo
            if (!this.#isSignalActive) {
                this.#vehicles.forEach(v => {
                    v.update(this.#canvas.width);
                });
            }
            this.#checkCollisions();
        }
    }

    /**
     * Verifica colisões entre o jogador e veículos ou itens coletáveis.
     * @private
     */
    #checkCollisions() {
        // Colisão com Veículos
        for (const vehicle of this.#vehicles) {
            if (this.#isColliding(this.#player, vehicle)) {
                this.#handlePlayerHit(vehicle);
                break;
            }
        }

        // Colisão com Itens Coletáveis
        for (let i = this.#collectibles.length - 1; i >= 0; i--) {
            const item = this.#collectibles[i];
            if (this.#isColliding(this.#player, item)) {
                this.#handleItemCollection(i);
            }
        }
    }

    /**
     * Gerencia a coleta de um item.
     * @param {number} index - Índice do item no array.
     * @private
     */
    #handleItemCollection(index) {
        const item = this.#collectibles[index];
        
        if (item.type === 'CREDIT') {
            this.#signalCredits++;
            this.emit('signalUpdate', this.#signalCredits);
        } else {
            this.#playerScore += item.value;
            this.emit('scoreUpdate', this.#playerScore);
        }
        
        this.#collectibles.splice(index, 1);
        this.emit('collect', item.type);
    }

    /**
     * Algoritmo de colisão AABB (Axis-Aligned Bounding Box).
     * @param {Object} rectA - Primeiro retângulo.
     * @param {Object} rectB - Segundo retângulo.
     * @returns {boolean} True se houver colisão.
     * @private
     */
    #isColliding(rectA, rectB) {
        return rectA.x < rectB.x + rectB.width &&
               rectA.x + rectA.width > rectB.x &&
               rectA.y < rectB.y + rectB.height &&
               rectA.y + rectA.height > rectB.y;
    }

    /**
     * Gerencia o impacto da colisão, aplicando knockback e aguardando para resetar.
     * @param {import('../entities/vehicle.js').Vehicle} vehicle - O veículo que atingiu a galinha.
     * @private
     */
    #handlePlayerHit(vehicle) {
        // Muda estado para ignorar inputs
        this.#currentState = GAME_STATE.PLAYER_HIT;
        
        this.emit('hit');

        // Calcula força do impacto baseada no veículo
        const forceX = vehicle.speed * vehicle.direction * 5;
        const forceY = 15; // Joga um pouco para baixo
        this.#player.applyKnockback(forceX, forceY);

        // Feedback visual do renderer
        this.#renderer.flashHitEffect();

        // Aguarda a "animação" de impacto terminar para processar a perda de vida
        setTimeout(() => {
            this.#processLifeLoss();
        }, 700);
    }

    /**
     * Subtrai uma vida e decide se acaba o jogo ou reseta a posição.
     * @private
     */
    #processLifeLoss() {
        this.#remainingLives--;
        this.emit('livesUpdate', this.#remainingLives);

        if (this.#remainingLives <= 0) {
            this.#endGame();
        } else {
            this.#player.reset();
            this.#currentState = GAME_STATE.PLAYING;
        }
    }

    /**
     * Encerra o jogo e emite o evento de fim de jogo.
     * @private
     */
    #endGame() {
        this.#currentState = GAME_STATE.GAME_OVER;
        if (this.#animationFrameId) {
            cancelAnimationFrame(this.#animationFrameId);
        }
        if (this.#signalTimeoutId) clearTimeout(this.#signalTimeoutId);
        this.emit('gameOver', this.#playerScore);
    }

    /**
     * Orquestra a renderização de todos os elementos visuais delegando ao Renderer.
     * @private
     */
    #render() {
        this.#renderer.renderFrame(this.#player, this.#vehicles, this.#collectibles, this.#isSignalActive);
    }
}
