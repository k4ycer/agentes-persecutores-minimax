import { Heuristicas } from './Heuristicas';
import { Agente } from './Agente';
import { Mundo } from './Mundo';
import { ElementoMundo } from './ElementoMundo';
import { Sensor } from './Sensor';
import { NodoMiniMax } from './NodoMiniMax';
import { Percepcion } from './Percepcion';

export class Blanco extends Agente{
    constructor(mundo: Mundo, posicionActual: ElementoMundo, sensor?: Sensor, enemigo?: Agente, heuristicas?: Heuristicas){
        super(mundo, posicionActual, sensor, enemigo, heuristicas);
    }    

    calcularSiguientePosicion(profundidad: number, tiro: number): ElementoMundo{
        
        let nodoMiniMax = this.minimax(new NodoMiniMax(this.posicionActual, this.enemigo.posicionActual, null), profundidad, false, tiro);

        return nodoMiniMax.posicionBlanco;
    }        
}