import { Heuristicas } from './model/Heuristicas';
import { Coordenada } from './model/Coordenada';
import { Mundo } from './model/Mundo';
import { Blanco } from './model/Blanco';
import { Component } from '@angular/core';
import { Agente } from './model/Agente';
import { Negro } from './model/Negro';
import { ElementoMundo } from './model/ElementoMundo';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'AgentesPersecutores';
	public mundo: Mundo;
	public blanco: Blanco;
	public negro: Negro;
	public limite: number = 10;
	public tamanioX: number = 20;
	public tamanioY: number = 20;
	public coordenadaBlanco: Coordenada = new Coordenada(4,8);
	public coordenadaNegro: Coordenada = new Coordenada(9,2);
	public heuristicasBlanco: Heuristicas = new Heuristicas(false, false);
	public heuristicasNegro: Heuristicas = new Heuristicas(false, false);
	public profundidad: number = 10;
	public tiro: number = 0;

	ngOnInit(){
	}	

	crearJuego(){
		let mapa = Mundo.GenerarMapa(this.tamanioX, this.tamanioY);
		this.mundo = new Mundo(mapa.length, mapa[0].length, mapa);

		this.negro = new Negro(this.mundo, this.mundo.mapa[this.coordenadaBlanco.fila][this.coordenadaBlanco.columna], null, null, this.heuristicasNegro);
		this.blanco = new Blanco(this.mundo, this.mundo.mapa[this.coordenadaNegro.fila][this.coordenadaNegro.columna], null, null, this.heuristicasBlanco);

		this.blanco.enemigo = this.negro;
		this.negro.enemigo = this.blanco;

		setTimeout(() => {
			this.dibujarAgente("blanco", this.blanco.posicionActual);
			this.dibujarAgente("negro", this.negro.posicionActual);
		}, 100);	
	}

	jugarHastaLimite(){
		this.tiro = 0;

		while(this.blanco.posicionActual.id != this.negro.posicionActual.id && this.tiro < this.limite){
			let sigPosBlanco = this.blanco.calcularSiguientePosicion(this.profundidad, this.tiro);
			this.blanco.cambiarPosicion(sigPosBlanco);
			console.log("B"+(this.tiro+1), this.blanco.posicionActual.posicion);		

			if(this.blanco.posicionActual.id == this.negro.posicionActual.id){
				alert("El blanco alcanzo al negro en su " + (this.tiro + 1) + " tiro");
				break;
			}

			let sigPosNegro = this.negro.calcularSiguientePosicion(this.profundidad, this.tiro);
			this.negro.cambiarPosicion(sigPosNegro);			
			console.log("N"+(this.tiro+1), this.negro.posicionActual.posicion);

			this.tiro++
		}

		this.dibujarAgente("blanco", this.blanco.posicionActual);
		this.dibujarAgente("negro", this.negro.posicionActual);
	}

	siguienteJugada(){
		if(this.blanco.posicionActual.id != this.negro.posicionActual.id){
			let sigPosBlanco = this.blanco.calcularSiguientePosicion(this.profundidad, this.tiro);
			this.blanco.cambiarPosicion(sigPosBlanco);	

			if(this.blanco.posicionActual.id == this.negro.posicionActual.id){
				alert("Lo alcanzo")
			}

			let sigPosNegro = this.negro.calcularSiguientePosicion(this.profundidad, this.tiro);
			this.negro.cambiarPosicion(sigPosNegro);			

			this.tiro++;
		}

		this.dibujarAgente("blanco", this.blanco.posicionActual);
		this.dibujarAgente("negro", this.negro.posicionActual);
	}

	dibujarAgente(agente: string, posicion: ElementoMundo){
		let idElementoPosicionActual: string = "elemento_" + posicion.id;
		let elementoActualUI = document.getElementById(idElementoPosicionActual);
		let agenteUI = document.getElementById(agente);
		agenteUI.style.left = (elementoActualUI.offsetLeft + 10) + "px";
		agenteUI.style.top = (elementoActualUI.offsetTop + 10) + "px";
	}

}
