import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons : any [] = [];
  name = this.pokeService.name;
  pokemonEncontrado : any;
  constructor(private pokeService: PokemonService) { }
  loading : boolean = true;
  pokemonSelecionado : any;
  paginaActual: number = 1;

  ngOnInit(): void {
    this.getPokemons();
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
}
