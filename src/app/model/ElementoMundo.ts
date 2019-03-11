import { Coordenada } from './Coordenada';
import { TipoElemento } from './TipoElemento';

export class ElementoMundo{
    public id: number;
    public posicion: Coordenada;
    public ocupado: boolean;
    public tipoElemento: TipoElemento;   
    
    constructor(id: number, posicion: Coordenada, ocupado: boolean, tipoElemento: TipoElemento){
        this.id = id;
        this.posicion = posicion;
        this.ocupado = ocupado;
        this.tipoElemento = tipoElemento;
    }
}