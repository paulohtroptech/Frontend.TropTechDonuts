import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClienteService } from 'src/app/servicos/cliente/cliente.service';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ICliente } from '../ICliente';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  listaDeClientes: ICliente[] = [];

  constructor(
    private _clienteService: ClienteService,
    private _mensagemService: MensagemService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._buscarTodosClientes();
  }


  private async _buscarTodosClientes() {
    await this._clienteService.BuscarTodosClientes()
      .subscribe({
        next: (clientes) => this.listaDeClientes = clientes,
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
      });
  }

  async editaCliente(cpf: string) {
    await this._router
      .navigate(['editar', cpf],
        {
          relativeTo: this._route
        });
  }

  async removerCliente(cpf: string) {

    let resposta = confirm("Você deseja realmente remover o cliente?");
    if (resposta == true) {
      await this._clienteService.RemoverCliente(cpf).subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Cliente foi removido com sucesso!")
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        },
      });
    }
  }

}
