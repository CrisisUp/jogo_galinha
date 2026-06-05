/**
 * Gerencia a persistência de dados do jogo utilizando o localStorage.
 */
export class StorageManager {
    #STORAGE_KEY = 'chicken_road_leaderboard';

    /**
     * Recupera a lista de recordes ordenada do armazenamento local.
     * @returns {Array<{name: string, score: number}>}
     */
    getLeaderboard() {
        const rawData = localStorage.getItem(this.#STORAGE_KEY);
        if (!rawData) return [];

        try {
            return JSON.parse(rawData).sort((a, b) => b.score - a.score);
        } catch (e) {
            console.error("Erro ao ler ranking do armazenamento local", e);
            return [];
        }
    }

    /**
     * Salva uma nova pontuação e mantém apenas os Top 5 melhores.
     * @param {string} name - Nome do jogador.
     * @param {number} score - Pontuação obtida.
     */
    saveScore(name, score) {
        let leaderboard = this.getLeaderboard();
        
        // Adiciona nova entrada
        leaderboard.push({ name: name || 'Anônimo', score });
        
        // Ordena por maior pontuação
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Mantém apenas o Top 5
        leaderboard = leaderboard.slice(0, 5);
        
        // Salva de volta
        localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(leaderboard));
    }
}
