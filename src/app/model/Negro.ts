import { Heuristicas } from './Heuristicas';
import { Agente } from './Agente';
import { Mundo } from './Mundo';
import { ElementoMundo } from './ElementoMundo';
import { Sensor } from './Sensor';
import { NodoMiniMax } from './NodoMiniMax';
import { Percepcion } from './Percepcion';
import { ɵConsole } from '@angular/core';

export class Negro extends Agente{
    constructor(mundo: Mundo, posicionActual: ElementoMundo, sensor?: Sensor, enemigo?: Agente, heuristicas?: Heuristicas){
        super(mundo, posicionActual, sensor, enemigo, heuristicas);
    }

    calcularSiguientePosicion(profundidad: number, tiro: number): ElementoMundo{
        this.diagonalActivado = false;
        let nodoMiniMax = this.minimax(new NodoMiniMax(this.enemigo.posicionActual, this.posicionActual, null), profundidad, true, tiro);

        return nodoMiniMax.posicionNegro;
    }    
}