import { GRID_CELL_SIZE } from './constants.js';

/**
 * Configurações de níveis do jogo.
 * Cada nível define a disposição e características das faixas de trânsito.
 */

/** 
 * Nível 1: Layout clássico equilibrado.
 */
export const LEVEL_1 = [
    { y: GRID_CELL_SIZE * 1, direction: 1, speed: 1, color: '#FF4500' },
    { y: GRID_CELL_SIZE * 2, direction: -1, speed: 2, color: '#00BFFF' },
    { y: GRID_CELL_SIZE * 3, direction: 1, speed: 3, color: '#32CD32' },
    { y: GRID_CELL_SIZE * 5, direction: -1, speed: 1, color: '#FF69B4' },
    { y: GRID_CELL_SIZE * 6, direction: 1, speed: 2, color: '#8A2BE2' },
    { y: GRID_CELL_SIZE * 7, direction: -1, speed: 3, color: '#FFD700' },
    { y: GRID_CELL_SIZE * 9, direction: 1, speed: 1, color: '#FFFFFF' },
    { y: GRID_CELL_SIZE * 10, direction: -1, speed: 2, color: '#00FFFF' },
    { y: GRID_CELL_SIZE * 11, direction: 1, speed: 2, color: '#FF8C00' },
    { y: GRID_CELL_SIZE * 13, direction: -1, speed: 1, color: '#ADFF2F' }
];

/**
 * Nível 2: Trânsito Pesado (mais caminhões e ônibus).
 */
export const LEVEL_2 = [
    { y: GRID_CELL_SIZE * 1, direction: 1, speed: 1.5 },
    { y: GRID_CELL_SIZE * 2, direction: -1, speed: 1.2 },
    { y: GRID_CELL_SIZE * 3, direction: 1, speed: 1.8 },
    { y: GRID_CELL_SIZE * 5, direction: -1, speed: 1.5 },
    { y: GRID_CELL_SIZE * 6, direction: 1, speed: 1.4 },
    { y: GRID_CELL_SIZE * 7, direction: -1, speed: 1.6 },
    { y: GRID_CELL_SIZE * 9, direction: 1, speed: 1.2 },
    { y: GRID_CELL_SIZE * 10, direction: -1, speed: 1.5 },
    { y: GRID_CELL_SIZE * 11, direction: 1, speed: 1.3 },
    { y: GRID_CELL_SIZE * 13, direction: -1, speed: 1.1 }
];

/**
 * Nível 3: Via Expressa (motos velozes e carros rápidos).
 */
export const LEVEL_3 = [
    { y: GRID_CELL_SIZE * 1, direction: 1, speed: 4 },
    { y: GRID_CELL_SIZE * 2, direction: -1, speed: 3.5 },
    { y: GRID_CELL_SIZE * 3, direction: 1, speed: 5 },
    { y: GRID_CELL_SIZE * 5, direction: -1, speed: 4.5 },
    { y: GRID_CELL_SIZE * 6, direction: 1, speed: 3 },
    { y: GRID_CELL_SIZE * 7, direction: -1, speed: 6 }, // Muito rápido!
    { y: GRID_CELL_SIZE * 9, direction: 1, speed: 4.2 },
    { y: GRID_CELL_SIZE * 10, direction: -1, speed: 3.8 },
    { y: GRID_CELL_SIZE * 11, direction: 1, speed: 4.5 },
    { y: GRID_CELL_SIZE * 13, direction: -1, speed: 5.5 }
];

/** Array com todas as fases para injeção */
export const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3];
