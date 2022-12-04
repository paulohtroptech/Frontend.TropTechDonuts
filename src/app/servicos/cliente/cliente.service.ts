import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, take} from 'rxjs';
import { ICliente } from 'src/app/componentes/cliente/ICliente';

import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  

  constructor(private _metodoHttp: HttpClient) { }

  BuscarTodosClientes(): Observable<ICliente[]> {
    return this._metodoHttp.get<ICliente[]>(`${API_URL}/cliente`);
  }

  BuscarClientePorCpf(cpf: string): Observable<ICliente> {
    return this._metodoHttp.get<ICliente>(`${API_URL}/cliente/${cpf}`).pipe(take(1));
  }

  AdicionarCliente(clienteParaAdicionar: ICliente): Observable<ICliente> {
    return this._metodoHttp.post<ICliente>(`${API_URL}/cliente`, clienteParaAdicionar);
  }

  RemoverCliente(cpf: string){
    let url = `${API_URL}/cliente/${cpf}`;
    return this._metodoHttp.delete(url);
  }

  AtualizarCliente(clienteParaAtualizar: ICliente):Observable<ICliente>{
    return this._metodoHttp.put<ICliente>(`${API_URL}/cliente`, clienteParaAtualizar);
  }
}
