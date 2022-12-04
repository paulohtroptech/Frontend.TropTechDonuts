import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { IProduto } from 'src/app/componentes/produto/IProduto';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private _metodoHttp: HttpClient) { }

  BuscarTodosProdutos(): Observable<IProduto[]> {
    return this._metodoHttp.get<IProduto[]>(`${API_URL}/produto`);
  }

  BuscarProdutoPorId(id: number): Observable<IProduto> {
    return this._metodoHttp.get<IProduto>(`${API_URL}/produto/${id}`).pipe(take(1));
  }

  AdicionarProduto(produtoParaAdicionar: IProduto): Observable<IProduto> {
    return this._metodoHttp.post<IProduto>(`${API_URL}/produto`, produtoParaAdicionar);
  }

  RemoverProduto(id: number) {
    let url = `${API_URL}/produto/${id}`;
    return this._metodoHttp.delete(url);
  }

  AtualizarProduto(produtoParaAtualizar: IProduto): Observable<IProduto> {
    return this._metodoHttp.put<IProduto>(`${API_URL}/produto`, produtoParaAtualizar);
  }

  AtualizarQuantidadeProduto(produtoParaAtualizar: IProduto): Observable<IProduto> {
    return this._metodoHttp.patch<IProduto>(`${API_URL}/produto/quantidade`, produtoParaAtualizar);
  }
}
