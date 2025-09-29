import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = "http://localhost:8080/usuarios"

  constructor() {}

  save(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.API+"/save", usuario);
  }

  findById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+"/findById/"+id);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.API+"/delete/"+id);
  }

  update(id:number, usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.API+"/update/"+id, usuario);
  }

  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+"/findAll");
  }

}
