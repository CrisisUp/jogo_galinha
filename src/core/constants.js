/**
 * @file constants.js
 * @description Definições de constantes globais e configurações do jogo.
 */

/** @type {number} Tamanho em pixels de cada célula da grade do jogo */
export const GRID_CELL_SIZE = 40;

/** @type {number} Quantidade inicial de vidas do jogador */
export const INITIAL_LIVES = 5;

/** @type {number} Pontos concedidos ao atravessar a rua com sucesso */
export const POINTS_PER_LEVEL = 10;

/** @type {number} Multiplicador de velocidade dos veículos a cada nível concluído */
export const DIFFICULTY_MULTIPLIER = 1.1;

/** @type {number} Frames por segundo para o loop do jogo */
export const FPS = 60;

/** @type {number} Coluna inicial da grade para o jogador */
export const PLAYER_START_X_GRID = 5;

/** @type {number} Linha inicial da grade para o jogador */
export const PLAYER_START_Y_GRID = 14;

/** @type {string} Cor de fundo das áreas de rua */
export const COLOR_ROAD = "#555";

/** @type {string} Cor de fundo das áreas de segurança/grama */
export const COLOR_GRASS = "#228B22";

/** @type {string} Cor das linhas de faixa da rua */
export const COLOR_LANE_MARKING = "rgba(255, 255, 255, 0.5)";

/** @type {number} Duração do semáforo ativo em milissegundos */
export const SIGNAL_DURATION_MS = 3000;

/** @type {number} Quantidade inicial de créditos de semáforo */
export const INITIAL_SIGNAL_CREDITS = 1;

/**
 * Estados Possíveis do Jogo
 * @enum {string}
 */
export const GAME_STATE = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};
