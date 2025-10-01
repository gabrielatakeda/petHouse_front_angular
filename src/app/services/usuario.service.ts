import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = "http://localhost:8080/usuarios"

  constructor() {}

  save(usuario: Usuarios): Observable<Usuarios>{
    return this.http.post<Usuarios>(this.API+"/save", usuario);
  }

  findById(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(this.API+"/findById/"+id);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.API+"/delete/"+id);
  }

  update(id:number, usuario:Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(this.API+"/update/"+id, usuario);
  }

  findAll(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.API+"/findAll");
  }

}