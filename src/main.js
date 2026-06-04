import { GameEngine } from './core/game-engine.js';
import { AssetLoader } from './core/asset-loader.js';
import { AudioManager } from './core/audio-manager.js';
import { InputManager } from './core/input-manager.js';
import { LEVEL_1 } from './core/levels.js';

/**
 * Ponto de entrada da aplicação.
 * Responsável por buscar elementos do DOM, instanciar o motor do jogo 
 * e configurar a ponte entre os eventos do jogo e a interface do usuário.
 */
window.onload = async () => {
    // Referências aos elementos da UI
    const livesDisplay = document.getElementById("lives-display");
    const scoreDisplay = document.getElementById("score-display");
    const startScreen = document.getElementById("start-screen");
    const gameOverScreen = document.getElementById("game-over-screen");
    const finalScoreVal = document.getElementById("final-score-val");
    
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    // --- Inicialização de Sistemas de Apoio ---
    const audioManager = new AudioManager();
    const assetLoader = new AssetLoader();
    const inputManager = new InputManager();

    startButton.disabled = true;
    startButton.innerText = "CARREGANDO...";

    await assetLoader.loadAll();

    startButton.disabled = false;
    startButton.innerText = "INICIAR JOGO";

    // Inicia a captura de comandos do usuário
    inputManager.startListening();
    
    /** @type {Object} Configuração para inicialização do motor */
    const gameConfig = {
        canvas: document.getElementById("gameCanvas"),
        assetLoader: assetLoader,
        inputManager: inputManager,
        level: LEVEL_1
    };

    /** @type {GameEngine} Instância principal do motor do jogo */
    const game = new GameEngine(gameConfig);

    // --- Lógica de Controle de Interface ---

    const hideAllScreens = () => {
        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
    };

    startButton.addEventListener('click', () => {
        audioManager.init(); // Inicializa o áudio na primeira interação
        hideAllScreens();
        game.start();
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    // --- Inscrição nos eventos emitidos pelo motor (Observer Pattern) ---
    
    game.on('scoreUpdate', (newScore) => {
        scoreDisplay.innerText = newScore;
        audioManager.playScore();
    });

    game.on('livesUpdate', (remainingLives) => {
        livesDisplay.innerText = remainingLives;
    });

    game.on('move', () => {
        audioManager.playMove();
    });

    game.on('hit', () => {
        audioManager.playHit();
    });

    game.on('gameOver', (finalScore) => {
        finalScoreVal.innerText = finalScore;
        gameOverScreen.classList.remove('hidden');
        audioManager.playGameOver();
    });
};
