import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  name :string;

  private url: string = `${environment.HOST}pokemon`

  constructor(private http: HttpClient) { }

  getPokemons(page:number, size:number= 52){
    const offset = size * (page - 1);
    return this.http.get(`${this.url}?limit=${size}&offset=${offset}`);
  }

  getPokemonByName(name:string){
    return this.http.get(`${this.url}/${name}`);
  }

}
