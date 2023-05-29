import { Component, EventEmitter, OnInit, Output , Input} from '@angular/core';

import { PokeServer } from 'src/app/services/pokeserver.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreU: string = '';
  miPokemon: number = 0;
  listaMensajes: string[] = [];
  logeado: boolean = false;
  
  @Input() usuario? : any [];

  @Output() public pokeBusqueda : EventEmitter<string> = new EventEmitter();
  @Output() logueo = new EventEmitter<{ logeado: boolean, nombreU: string }>();


  constructor(private PokeServer: PokeServer) {}

  ngOnInit(): void {
    
    // aqui tengo q buscar mi nombre si esta conectado
  }

  buscarPokemons(pokemon:string){
    pokemon = pokemon.toLowerCase()
    this.pokeBusqueda.emit(pokemon);
  }

  login(nombre:string){
    if(nombre.length != 0){
      console.log('mi nombre es: '+nombre+ '| Emitiendo')
      this.PokeServer.login(nombre)
      this.logeado = true
      this.nombreU = nombre
      const logeado = this.logeado; // Valor de logeado
      const nombreU = this.nombreU; // Valor de nombreU
      this.logueo.emit({ logeado, nombreU });
    }

    /**
     * oculatamos el login y mostramos selecionar pokemon
     */
  }
  emitirLogueadoTrue(){
    console.log('logueado')
  }

}
