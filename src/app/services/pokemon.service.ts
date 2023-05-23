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

  getPokemons(page: number, limit: number = 12){
    const offset = (page - 1) * limit;
    var uri: string = `${this.url}?limit=${limit}&offset=${offset}`
    console.log(uri)
    return this.http.get(uri);
  }

  getPokemonByName(name:string){
    return this.http.get(`${this.url}/${name}`);
  }

}
