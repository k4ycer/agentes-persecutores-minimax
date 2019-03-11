import { ElementoMundo } from './ElementoMundo';
import { Agente } from './Agente';
import { TipoElemento } from './TipoElemento';
import { Coordenada } from './Coordenada';

export class Mundo{
    public mapa: ElementoMundo[][];
    public tamanioMapaX: number;
    public tamanioMapaY: number;
    public agentes: Agente[];

    constructor(tamanioMapaX: number, tamanioMapaY: number, mapa?: ElementoMundo[][]){
        if(mapa){
            this.mapa = mapa;            
        }else{
            this.mapa = new ElementoMundo[tamanioMapaX][tamanioMapaY];            
        }

        this.tamanioMapaX = tamanioMapaX;
        this.tamanioMapaY = tamanioMapaY;
    }

    public static GenerarMapa(tamanioX: number, tamanioY: number): ElementoMundo[][]{
        let mapa: ElementoMundo[][] = [];        
        let id = 0;
        for(let i = 0; i < tamanioX; i++){
            mapa[i] = [];
            for(let j = 0; j < tamanioY; j++){
                if(i == 0 || i == tamanioX - 1 || j == 0 || j == tamanioY - 1){
                    mapa[i][j] = new ElementoMundo(id, new Coordenada(i,j), true, TipoElemento.Objeto);
                }else{
                    mapa[i][j] = new ElementoMundo(id, new Coordenada(i,j), false, TipoElemento.Libre);
                }                
                id++;
            }
        }

        return mapa;
    }

    public cambiarTipoElemento(posicion: number[], tipoElemento: TipoElemento){
        this.mapa[posicion[0]][posicion[1]].tipoElemento = tipoElemento;
    }

    public agregarAgente(agente: Agente){
        this.agentes.push(agente);
    }

    public obtenerElementoNorte(elementoMundo: ElementoMundo): ElementoMundo{
        let filaArriba = elementoMundo.posicion.fila - 1;
        return this.mapa[filaArriba][elementoMundo.posicion.columna];
    }

    public obtenerElementoNoroeste(elementoMundo: ElementoMundo): ElementoMundo{
        let filaArriba = elementoMundo.posicion.fila - 1;
        let columnaIzquierda = elementoMundo.posicion.columna - 1;
        return this.mapa[filaArriba][columnaIzquierda];
    }
    
    public obtenerElementoOeste(elementoMundo: ElementoMundo): ElementoMundo{
        let columnaIzquierda = elementoMundo.posicion.columna - 1;
        return this.mapa[elementoMundo.posicion.fila][columnaIzquierda];
    }
    
    public obtenerElementoSuroeste(elementoMundo: ElementoMundo): ElementoMundo{
        let filaAbajo = elementoMundo.posicion.fila + 1;
        let columnaIzquierda = elementoMundo.posicion.columna - 1;
        return this.mapa[filaAbajo][columnaIzquierda];
    }
    
    public obtenerElementoSur(elementoMundo: ElementoMundo): ElementoMundo{
        let filaAbajo = elementoMundo.posicion.fila + 1;
        return this.mapa[filaAbajo][elementoMundo.posicion.columna];
    }
    
    public obtenerElementoSureste(elementoMundo: ElementoMundo): ElementoMundo{
        let filaAbajo = elementoMundo.posicion.fila + 1;
        let columnaDerecha = elementoMundo.posicion.columna + 1;
        return this.mapa[filaAbajo][columnaDerecha];
    }

    public obtenerElementoEste(elementoMundo: ElementoMundo): ElementoMundo{
        let columnaDerecha = elementoMundo.posicion.columna + 1;
        return this.mapa[elementoMundo.posicion.fila][columnaDerecha];
    }    

    public obtenerElementoNoreste(elementoMundo: ElementoMundo): ElementoMundo{
        let filaArriba = elementoMundo.posicion.fila - 1;
        let columnaDerecha = elementoMundo.posicion.columna + 1;
        return this.mapa[filaArriba][columnaDerecha];
    }        
}