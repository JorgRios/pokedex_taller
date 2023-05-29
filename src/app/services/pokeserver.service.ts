import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeServer {

  public usuarios$: BehaviorSubject<any> = new BehaviorSubject([]);
  public peleas$: BehaviorSubject<any> = new BehaviorSubject([]);
  public pelea$: BehaviorSubject<any> = new BehaviorSubject([]);
  public ganador$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor() {}

  private url: string = `${environment.SOCKET}`
  
  socket = io(this.url);

  public login(nombre: string){
    console.log('Escuchando en: '+environment.SOCKET)
    this.socket.emit('login', nombre);
  }

  public obtenUsuarios = () => {
    this.socket.on('lista_usuarios', (usuarios) =>{
      this.usuarios$.next(usuarios)
    });    
    return this.usuarios$.asObservable();
  };

  public pelear(pokemon_id:number){
    this.socket.emit('pelea', pokemon_id);
  }

  public obtenPeleas = () => {
    this.socket.on('lista_peleas', (peleas) =>{
      this.peleas$.next(peleas)
    });    
    return this.peleas$.asObservable();
  };

  public buscarPelea(pokemon_id){
    this.socket.emit('buscar_pelea',pokemon_id);
  }

  public peleando(usuario:string){
    this.socket.emit('aceptar', usuario);
  }

  public arena = () => {
    this.socket.on('arena', (pelea) =>{
      this.pelea$.next(pelea)
    });    
    return this.peleas$.asObservable();
  };

  public atacar = (danio:number) => {
    this.socket.emit('atacar', danio);
  };

  public finalizar = () => {
    this.socket.on('finalizada', (ganador) =>{
      this.ganador$.next(ganador)
    });    
    return this.ganador$.asObservable();
  };
  
  // public sendMessage(message: string) {
  //   this.socket.emit('message', message);
  // }

  // public getNewMessage = () => {
  //   this.socket.on('message', (message) =>{
  //     this.mensajes$.next(message);
  //   });
  //   return this.mensajes$.asObservable();
  // };


}
