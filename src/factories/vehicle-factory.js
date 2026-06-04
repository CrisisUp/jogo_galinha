import { GRID_CELL_SIZE } from '../core/constants.js';
import { Car, Truck, Motorcycle } from '../entities/vehicle.js';

/**
 * Padrão Factory para centralizar a criação de veículos.
 * Responsável por instanciar a classe polimórfica correta.
 */
export class VehicleFactory {
    /**
     * Cria uma nova instância de veículo polimórfico.
     * @param {Object} laneConfig - Configuração da faixa.
     * @param {number} spawnIndex - Índice para posicionamento inicial.
     * @param {HTMLImageElement} sprite - Imagem do veículo.
     * @param {string} category - Categoria ('CAR', 'TRUCK', 'MOTORCYCLE').
     * @returns {import('../entities/vehicle.js').Vehicle} Instância de Car, Truck ou Motorcycle.
     */
    static createVehicle(laneConfig, spawnIndex, sprite, category) {
        let vehicle;

        switch (category) {
            case 'TRUCK':
                vehicle = new Truck(laneConfig, sprite);
                break;
            case 'MOTORCYCLE':
                vehicle = new Motorcycle(laneConfig, sprite);
                break;
            case 'CAR':
            default:
                vehicle = new Car(laneConfig, sprite);
                break;
        }

        // Calcula o posicionamento horizontal inicial comum
        vehicle.x = spawnIndex * (GRID_CELL_SIZE * 5) + (Math.random() * 100);
        return vehicle;
    }
}
