import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IPedido } from 'src/app/componentes/pedido/IPedido';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _metodoHttp: HttpClient) { }

  BuscarTodosPedidos(): Observable<IPedido[]> {
    return this._metodoHttp.get<IPedido[]>(`${API_URL}/pedido`);
  }

  BuscarPedidoPorId(id: number): Observable<IPedido> {
    return this._metodoHttp.get<IPedido>(`${API_URL}/pedido/${id}`).pipe(take(1));
  }

  AdicionarPedido(pedidoParaAdicionar: IPedido): Observable<IPedido> {
    return this._metodoHttp.post<IPedido>(`${API_URL}/pedido`, pedidoParaAdicionar);
  }

  RemoverPedido(id: number) {
    let url = `${API_URL}/pedido/${id}`;
    return this._metodoHttp.delete(url);
  }

  AtualizarPedido(pedidoParaAtualizar: IPedido): Observable<IPedido> {
    return this._metodoHttp.put<IPedido>(`${API_URL}/pedido`, pedidoParaAtualizar);
  }

  AtualizarStatusPedido(pedidoParaAtualizar: IPedido): Observable<IPedido> {
    return this._metodoHttp.patch<IPedido>(`${API_URL}/pedido/status`, pedidoParaAtualizar);
  }
}
