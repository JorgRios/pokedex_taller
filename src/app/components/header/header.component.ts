import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public pokeBusqueda : EventEmitter<string> = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  buscarPokemons(pokemon:string){
    pokemon = pokemon.toLowerCase()
    this.pokeBusqueda.emit(pokemon);
  }
}
