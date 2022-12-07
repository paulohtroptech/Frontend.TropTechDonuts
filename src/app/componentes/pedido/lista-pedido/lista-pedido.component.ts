import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { PedidoService } from 'src/app/servicos/pedido/pedido.service';
import { IPedido } from '../IPedido';
import { StatusPedido } from '../StatusPedido';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.css']
})
export class ListaPedidoComponent implements OnInit {

  listaDePedidos: IPedido[] = [];
  pedidoBuscado?: IPedido;

  public statusPedido = StatusPedido;


  constructor(
    private _pedidoService: PedidoService,
    private _mensagemService: MensagemService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._buscarTodosPedidos();
  }


   async _buscarTodosPedidos() {
    await this._pedidoService.BuscarTodosPedidos()
      .subscribe({
        next: (pedidos) => {
          this.listaDePedidos = pedidos
        },
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
      });
      
  }

  async rotaEditaStatusPedido(id: number) {
    await this._router
      .navigate(['editar/status/', id],
        {
          relativeTo: this._route
        });
  }

  async rotaDetalhesPedido(id: number) {
    await this._router
      .navigate(['detalhe', id],
        {
          relativeTo: this._route
        });
  }

  async removerPedido(id: number) {

    this.pedidoBuscado = this.listaDePedidos.find((pedido) => pedido.id == id)

    let resposta = confirm(`Você deseja realmente remover o pedido número ${this.pedidoBuscado?.id}?`);
    if (resposta == true) {
      await this._pedidoService.RemoverPedido(id).subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Pedido foi removido com sucesso!")
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        },
      });
    }
  }



}
