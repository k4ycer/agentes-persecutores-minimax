import { ElementoMundo } from './ElementoMundo';

export class NodoMiniMax{
    public posicionBlanco: ElementoMundo;
    public posicionNegro: ElementoMundo;
    public utilidad: number;

    constructor(posicionBlanco: ElementoMundo, posicionNegro: ElementoMundo, utilidad: number){
        this.posicionBlanco = posicionBlanco;
        this.posicionNegro = posicionNegro;
        this.utilidad = utilidad;
    }
}