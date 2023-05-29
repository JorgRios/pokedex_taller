import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokeServer } from 'src/app/services/pokeserver.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons : any [] = [];
  usuariosLista: any [] = [];
  peleasLista: any [] = [];
  name = this.pokeService.name;
  pokemonEncontrado : any;
  constructor(private pokeService: PokemonService,private PokeServer: PokeServer) { }
  loading : boolean = true;
  pokemonSelecionado : any;
  pokemonUsado: any = {};
  usando: boolean = false;
  paginaActual: number = 1;
  nombre:  string = '';
  logueado: boolean = false;
  pelea : boolean = true;
  arena: any = {};
  pokeadversario: any = {};
  pokeretador: any = {};
  nombre_adversario: string = '';
  vidaretador: number ;
  vidaadversario: number ;
  nuevoGanador: string = '';
  finalizado:boolean = false;
  danioR: boolean = false;
  danioA: boolean = false;
  letreroAdversario: string ='';
  letreroRetador: string ='';

  ngOnInit(): void {
    this.getPokemons();
    this.PokeServer.obtenUsuarios().subscribe((usuarios: any[]) => {
      this.usuariosLista = usuarios
    })

    this.PokeServer.obtenPeleas().subscribe((peleas: any[]) => {
      this.peleasLista = peleas
    })

    this.PokeServer.arena().subscribe((arena: any) => {
      console.log('Arena!!!!')
      console.log(arena[0])
      if(arena[0].retador == this.nombre){
        console.log('retador')
        this.pelea = false;
        this.pokeService.getPokemonById(arena[0].pk1).subscribe(
          (res:any) => {
            this.pokeretador = res;
          }
        );
        this.pokeService.getPokemonById(arena[0].pk2).subscribe(
          (res:any) => {
            this.pokeadversario = res;
          }
        );
        this.nombre_adversario = arena[0].adversario;
        
        if(this.vidaretador != arena[0].saludpk1 ){
          let danio: number = this.vidaretador-arena[0].saludpk1;
          this.vidaretador = arena[0].saludpk1;  
          this.letreroRetador = this.cuantoGenere(danio)
          console.log(this.letreroRetador)
          this.mostrarDanioRetador()
          //calcular daño
          console.log('Tu adversario te ha dañado')
        }
        if(this.vidaadversario != arena[0].saludpk2){
          let danio: number = this.vidaadversario-arena[0].saludpk2;
          this.vidaadversario = arena[0].saludpk2;
          this.letreroAdversario = this.cuantoGenere(danio)
          console.log(this.letreroAdversario )
          this.mostrarDanioAdversario()
          //calcular daño
          console.log('Has dañado a tu adversario')
        }
        if(arena[0].estado =='progreso'){
          console.log('pelea en progreso')
        }
      }

      if(arena[0].adversario == this.nombre){
        console.log('adversario')
        this.pelea = false;
        this.pokeService.getPokemonById(arena[0].pk2).subscribe(
          (res:any) => {
            this.pokeretador = res;
          }
        );
        this.pokeService.getPokemonById(arena[0].pk1).subscribe(
          (res:any) => {
            this.pokeadversario = res;
          }
        );
        this.nombre_adversario = arena[0].retador;
        this.vidaretador = arena[0].saludpk2;
        this.vidaadversario = arena[0].saludpk1;
      }
    })
    this.PokeServer.finalizar().subscribe((ganador: string) => {
      /**mostramos el letrero del ganador */
      this.nuevoGanador = ganador
    })
    

    // this.PokeServer.arena().suscribe((datos:any[]) => {
      
    // })
  }

  mostrarDanioRetador(){
    this.danioR = true;
    setTimeout(() => {
      this.danioR = false;
    }, 2000); 
  }

  mostrarDanioAdversario(){
    this.danioA = true;
    setTimeout(() => {
      this.danioA = false;
    }, 2000); 
  }
  getPokemons () {
    this.pokemons = [];
    this.pokeService.getPokemons(this.paginaActual).subscribe(
      (response:any) => {
        response.results.forEach(result => {
          if(result.name != null){
            this.pokeService.getPokemonByName(result.name).subscribe(
              (uniqueResponse:any) => {
                this.pokemons.push(uniqueResponse);
              }
            );
          }
        });
      }
    );
  }
  buscarPokemons(name:string) {
    name = name.toLowerCase()
    this.pokeService.getPokemonByName(name).subscribe(
      (res:any) => {
        this.pokemonEncontrado = res;
      }
    );
    if(this.pokemonEncontrado.name == name){
      this.pokemons = [];
      this.pokemons.push(this.pokemonEncontrado);
    } else {
      this.getPokemons();
    }
  }
  selecionarPokemon(name){
    name = name.toLowerCase()
    this.pokeService.getPokemonByName(name).subscribe(
      (res:any) => {
        console.log(res)
        this.pokemonSelecionado = res;
      }
    );
  }

  paginaMas(){
    this.paginaActual += 1
    this.pokeService.getPokemons(this.paginaActual).subscribe(
      (response:any) => {
        this.pokemons = []
        response.results.forEach(result => {
          if(result.name != null){
            this.pokeService.getPokemonByName(result.name).subscribe(
              (uniqueResponse:any) => {
                this.pokemons.push(uniqueResponse);
              }
            );
          }
        });
      }
    );
  }

  paginaMenos(){
    if(this.paginaActual == 1){
      this.paginaActual = 1
    }else{
      this.paginaActual -= 1
    }

    this.pokeService.getPokemons(this.paginaActual).subscribe(
      (response:any) => {
        this.pokemons = []
        response.results.forEach(result => {
          if(result.name != null){
            this.pokeService.getPokemonByName(result.name).subscribe(
              (uniqueResponse:any) => {
                this.pokemons.push(uniqueResponse);
              }
            );
          }
        });
      }
    );
    console.log(this.paginaActual)
  }

  loguear(evento: { logeado: boolean, nombreU: string }){
    this.logueado = evento.logeado;
    this.nombre = evento.nombreU;
  }

  usarPokemon(id:number){
    this.pokeService.getPokemonById(id).subscribe(
      (res:any) => {
        this.pokemonUsado = res;
        this.usando = true;
        this.PokeServer.buscarPelea(id);
      }
    );
  }

  pelear(pokemon_id:number){
    console.log(pokemon_id)
    if(pokemon_id==undefined)
      alert('no puedes pelear sin selecionar un pokemon')
    else
      this.PokeServer.pelear(pokemon_id)
    /**
     * Emitimos evento de pelea
     */
  }
  unirse(usuario){
    this.PokeServer.peleando(usuario)
  }
  
  atacar(){
    const ataque = this.generarAtaque()
    console.log(ataque)
    const danio: any = ataque[0];
    this.PokeServer.atacar(danio)
  }

 
  generarAtaque(){
    const numero : number = Math.floor(Math.random() * 20) + 1;
    let mensaje = "";
  
    if (numero < 5) {
      mensaje = "El ataque no funcionó.";
    } else if (numero > 15) {
      mensaje = "¡Ataque crítico!";
    } else {
      mensaje = "Ataque normal.";
    }
    return [numero, mensaje];
  }


  cuantoGenere(numero:number){
    let mensaje = "";
    if (numero < 5) {
      mensaje = "El ataque no funcionó.";
    } else if (numero > 15) {
      mensaje = "¡Ataque crítico!";
    } else {
      mensaje = "Ataque normal.";
    }
    return mensaje;
  }
}

