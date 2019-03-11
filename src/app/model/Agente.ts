import { Heuristicas } from './Heuristicas';
import { TipoElemento } from './TipoElemento';
import { Percepcion } from './Percepcion';
import { Sensor } from './Sensor';
import { ElementoMundo } from './ElementoMundo';
import { Mundo } from './Mundo';
import { BehaviorSubject } from 'rxjs';
import { NodoMiniMax } from './NodoMiniMax';

export abstract class Agente{
    public sensor: Sensor;
    public mundo: Mundo;
    public posicionActual: ElementoMundo;
    public historialPosiciones: ElementoMundo[];
    public observablePosiciones: BehaviorSubject<ElementoMundo[]>;
    public enemigo: Agente;
    public heuristicas: Heuristicas;

    constructor(mundo: Mundo, posicionActual: ElementoMundo, sensor?: Sensor, enemigo?: Agente, heuristicas?: Heuristicas){
        this.mundo = mundo;
        this.posicionActual = posicionActual;
        this.sensor = sensor ? sensor : new Sensor();
        this.enemigo = enemigo;
        this.historialPosiciones = [];
        this.observablePosiciones = new BehaviorSubject<ElementoMundo[]>(this.historialPosiciones);
        this.heuristicas = heuristicas;
    }

    public setEnemigo(enemigo: Agente){
        this.enemigo = enemigo;
    }

    public setSensor(sensor: Sensor){
        this.sensor = sensor;
    }

    public sensar(): Percepcion{
        return this.sensor.sensar(this.mundo, this.posicionActual);
    }

    public cambiarPosicion(elementoMundo: ElementoMundo){
        this.posicionActual = elementoMundo;
        this.historialPosiciones.push(elementoMundo);
        this.observablePosiciones.next(this.historialPosiciones);
    }
    
    calcularSiguientePosicion(profundidad: number, tiro: number): ElementoMundo{
        throw new Error("Not implemented");
    }

    minimax(nodo: NodoMiniMax, profundidad: number, esMaximizador: boolean, tiro: number): NodoMiniMax{        
        let mejorNodo: NodoMiniMax,
            percepcionActual: Percepcion,
            nodosHijo: NodoMiniMax[] = [],
            nodoDevuelto: NodoMiniMax;        

        if(profundidad == 0 || nodo.posicionBlanco.id == nodo.posicionNegro.id){
            nodo.utilidad = this.evaluarUtilidadNodo(nodo);
            return nodo;
        }
        
        if(esMaximizador){ // Es el negro (el que se aleja, busca maximizar)
            mejorNodo = new NodoMiniMax(null, null, Number.NEGATIVE_INFINITY);

            // Generamos nodos hijo (son las jugadas que puede hacer el negro)
            percepcionActual = this.sensor.sensar(this.mundo, nodo.posicionNegro);
            this.calcularPosicionesPosibles(nodo.posicionNegro, percepcionActual).forEach(posicionNegro => {
                nodosHijo.push(new NodoMiniMax(nodo.posicionBlanco, posicionNegro, null));
            });

            nodosHijo = this.filtrarPosicionesHeuristica(false, nodo.posicionNegro, percepcionActual, nodosHijo, tiro);

            // Hacemos minimax en cada nodo hijo
            for(let i = 0; i < nodosHijo.length; i++){
                nodoDevuelto = this.minimax(nodosHijo[i], profundidad-1, false, tiro);
                if(nodoDevuelto.utilidad > mejorNodo.utilidad){
                    mejorNodo = nodosHijo[i];
                    mejorNodo.utilidad = nodoDevuelto.utilidad;
                }
            }

            return mejorNodo;

        }else{ // Es el blanco (el que se acerca, busca minimizar)
            mejorNodo = new NodoMiniMax(null, null, Number.MAX_VALUE);

            // Generamos nodos hijo (son las jugadas que puede hacer el blanco)
            percepcionActual = this.sensor.sensar(this.mundo, nodo.posicionBlanco);
            this.calcularPosicionesPosibles(nodo.posicionBlanco, percepcionActual).forEach(posicionBlanco => {
                nodosHijo.push(new NodoMiniMax(posicionBlanco, nodo.posicionNegro, null));
            });

            nodosHijo = this.filtrarPosicionesHeuristica(true, nodo.posicionBlanco, percepcionActual, nodosHijo, tiro);

            // Hacemos minimax en cada nodo hijo
            for(let i = 0; i < nodosHijo.length; i++){
                nodoDevuelto = this.minimax(nodosHijo[i], profundidad-1, true, tiro);
                if(nodoDevuelto.utilidad < mejorNodo.utilidad){
                    mejorNodo = nodosHijo[i];
                    mejorNodo.utilidad = nodoDevuelto.utilidad;
                }
            }

            return mejorNodo;
        }       
    }

    // Agrega o remueve posiciones dependiendo de la heuristica
    filtrarPosicionesHeuristica(blanco: boolean, posicionActual: ElementoMundo, percepcion: Percepcion, posicionesPosibles: NodoMiniMax[], tiro: number): NodoMiniMax[]{
        let posicionesFiltradas: NodoMiniMax[] = posicionesPosibles;

        if(this.heuristicas){
            if(blanco){
                if(this.heuristicas.diagonalEveryFive){
                    if(tiro % 3 == 0){
                        this.calcularPosicionesDiagonalesPosibles(posicionActual, percepcion).forEach(posicionBlanco => {
                            posicionesFiltradas.push(new NodoMiniMax(posicionBlanco, posicionesPosibles[0].posicionNegro, null));
                        });
                    }                
                } 
            }else{
                if(this.heuristicas.randomEveryThree){
                    if(tiro % 3 == 0){
                        posicionesFiltradas = [posicionesPosibles[Math.floor(Math.random() * (posicionesPosibles.length - 1))]];
                    }
                } 
            }                  
        }        

        return posicionesFiltradas;
    }

    calcularPosicionesDiagonalesPosibles(posicionActual: ElementoMundo, percepcion: Percepcion): ElementoMundo[]{
        let posicionesPosibles: ElementoMundo[] = [];

        if(!percepcion.s1){
            posicionesPosibles.push(this.mundo.obtenerElementoNoroeste(posicionActual));
        }

        if(!percepcion.s3){
            posicionesPosibles.push(this.mundo.obtenerElementoNoreste(posicionActual));
        }

        if(!percepcion.s5){
            posicionesPosibles.push(this.mundo.obtenerElementoSureste(posicionActual));
        }

        if(!percepcion.s7){
            posicionesPosibles.push(this.mundo.obtenerElementoSuroeste(posicionActual));
        }

        return posicionesPosibles;
    }

    protected calcularPosicionesPosibles(posicionActual: ElementoMundo, percepcion: Percepcion): ElementoMundo[]{
        let posicionesPosibles: ElementoMundo[] = [];

        if(!percepcion.s2){
            posicionesPosibles.push(this.mundo.obtenerElementoNorte(posicionActual));
        }

        if(!percepcion.s4){
            posicionesPosibles.push(this.mundo.obtenerElementoEste(posicionActual));
        }

        if(!percepcion.s6){
            posicionesPosibles.push(this.mundo.obtenerElementoSur(posicionActual));
        }

        if(!percepcion.s8){
            posicionesPosibles.push(this.mundo.obtenerElementoOeste(posicionActual));
        }

        return posicionesPosibles;
    }

    evaluarUtilidadNodo(nodo: NodoMiniMax): number{
        return Math.abs(nodo.posicionBlanco.posicion.fila - nodo.posicionNegro.posicion.fila) + Math.abs(nodo.posicionBlanco.posicion.columna - nodo.posicionNegro.posicion.columna);
    }
}