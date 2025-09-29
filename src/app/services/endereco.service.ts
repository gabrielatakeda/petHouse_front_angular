import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  http = inject(HttpClient);
  
    API = "http://localhost:8080/enderecos"
  
    constructor() {}
  
    save(endereco: Endereco): Observable<Endereco>{
      return this.http.post<Endereco>(this.API+"/save", endereco);
    }
  
    findById(id: number): Observable<Endereco>{
      return this.http.get<Endereco>(this.API+"/findById/"+id);
    }
  
    delete(id: number): Observable<void>{
      return this.http.delete<void>(this.API+"/delete/"+id);
    }
  
    update(id:number, endereco:Endereco): Observable<Endereco>{
      return this.http.put<Endereco>(this.API+"/update/"+id, endereco);
    }
  
    findAll(): Observable<Endereco[]>{
      return this.http.get<Endereco[]>(this.API+"/findAll");
    }
  

}
