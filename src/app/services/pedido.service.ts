import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);

  private apiUrl = "http://localhost:8080/pedidos/"

  findByCliente(id?: number): Observable<Pedido>{
    return this.http.get<Pedido>(this.apiUrl + "/findByCliente/" + id)
  }
  
save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl + "/save ", pedido);
  }

}
