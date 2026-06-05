import { GRID_CELL_SIZE } from './constants.js';

/**
 * Gerencia o carregamento e geração de assets visuais (sprites).
 * Atualmente gera imagens baseadas em Emojis para facilitar o uso sem arquivos externos.
 */
export class AssetLoader {
    constructor() {
        /** @type {Object.<string, HTMLImageElement>} Dicionário de imagens carregadas */
        this.images = {};
        
        /** @type {Object} Mapeamento de emojis para nomes de sprites */
        this.emojiMap = {
            chicken: '🐔',
            corn: '🌽',
            coin: '🪙',
            car1: '🚗',
            car2: '🏎️',
            car3: '🚓',
            truck1: '🚌',
            truck2: '🚛',
            motorcycle1: '🏍️'
        };

        /** @type {Object.<string, string>} Mapa de categorias de cada sprite */
        this.categoryMap = {
            car1: 'CAR',
            car2: 'CAR',
            car3: 'CAR',
            truck1: 'TRUCK',
            truck2: 'TRUCK',
            motorcycle1: 'MOTORCYCLE'
        };
    }

    /**
     * Inicia o processo de carregamento/geração de todos os assets.
     * @returns {Promise<Object.<string, HTMLImageElement>>}
     */
    async loadAll() {
        const loadPromises = Object.keys(this.emojiMap).map(key => {
            return this.generateSpriteFromEmoji(key, this.emojiMap[key]);
        });

        await Promise.all(loadPromises);
        return this.images;
    }

    /**
     * Desenha um emoji em um canvas off-screen e o transforma em um objeto Image.
     * @param {string} name - Nome identificador do sprite.
     * @param {string} emoji - O emoji a ser renderizado.
     * @private
     */
    generateSpriteFromEmoji(name, emoji) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const size = GRID_CELL_SIZE * 2; // Maior para melhor qualidade
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Configurações do texto
            ctx.font = `${size * 0.8}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Desenha o emoji centralizado
            ctx.fillText(emoji, size / 2, size / 2);

            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                resolve(img);
            };
            img.src = canvas.toDataURL();
        });
    }

    /**
     * Retorna um asset de veículo aleatório (sprite e categoria).
     * @returns {Object} { sprite: HTMLImageElement, category: string }
     */
    getRandomVehicleAsset() {
        const vehicleKeys = Object.keys(this.categoryMap);
        const randomKey = vehicleKeys[Math.floor(Math.random() * vehicleKeys.length)];
        return {
            sprite: this.images[randomKey],
            category: this.categoryMap[randomKey]
        };
    }
}
