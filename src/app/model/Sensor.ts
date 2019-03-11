import { Coordenada } from './Coordenada';
import { Percepcion } from './Percepcion';
import { ElementoMundo } from './ElementoMundo';
import { Mundo } from './Mundo';
import { Agente } from './Agente';

export class Sensor{
    public historialPercepciones: Percepcion[];

    constructor(){
        this.historialPercepciones = [];
    }

    public sensar(mundo: Mundo, posicionActual: ElementoMundo): Percepcion{
        let s1: ElementoMundo, 
            s2: ElementoMundo, 
            s3: ElementoMundo, 
            s4: ElementoMundo, 
            s5: ElementoMundo, 
            s6: ElementoMundo, 
            s7: ElementoMundo, 
            s8: ElementoMundo;

        s1 = mundo.obtenerElementoNoroeste(posicionActual);
        s2 = mundo.obtenerElementoNorte(posicionActual);
        s3 = mundo.obtenerElementoNoreste(posicionActual);
        s4 = mundo.obtenerElementoEste(posicionActual);
        s5 = mundo.obtenerElementoSureste(posicionActual);
        s6 = mundo.obtenerElementoSur(posicionActual);
        s7 = mundo.obtenerElementoSuroeste(posicionActual);
        s8 = mundo.obtenerElementoOeste(posicionActual);
    
        return new Percepcion(s1.ocupado, s2.ocupado, s3.ocupado, s4.ocupado, s5.ocupado, s6.ocupado, s7.ocupado, s8.ocupado);
    }
}