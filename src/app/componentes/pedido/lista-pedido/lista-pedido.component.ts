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
  public status = this.statusPedido.Andamento;


  constructor(
    private _pedidoService: PedidoService,
    private _mensagemService: MensagemService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._buscarTodosPedidos();
  }


  private async _buscarTodosPedidos() {
    await this._pedidoService.BuscarTodosPedidos()
      .subscribe({
        next: (pedidos) => this.listaDePedidos = pedidos,
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
      });
  }

  async editaPedido(id: number) {
    await this._router
      .navigate(['editar', id],
        {
          relativeTo: this._route
        });
  }

  async editaEstoquePedido(id: number) {
    await this._router
      .navigate(['editar/estoque/', id],
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

  async trocarStatusPedido(id: number) {

    this.pedidoBuscado = this.listaDePedidos.find((pedido) => pedido.id == id)

    let resposta: boolean;

    // if (pedidoBuscado?.ativo) {
    //   resposta = confirm(`Você deseja realmente Desativar o produto ${pedidoBuscado.descricao}?`);

    //   if (resposta) {

    //     const produtoAtualizado: IPedido = {
    //       id: pedidoBuscado!.id,
    //       descricao: pedidoBuscado!.descricao,
    //       preco: pedidoBuscado!.preco,
    //       quantidadeEstoque: pedidoBuscado!.quantidadeEstoque,
    //       dataValidade: pedidoBuscado!.dataValidade,
    //       ativo: false,
    //     }

    //     await this._pedidoService.AtualizarStatusPedido(produtoAtualizado).subscribe({
    //       error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
    //       complete: () => {
    //         this._mensagemService.AdicionarMensagem("O Pedido foi Desativado com sucesso!")
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 4000);
    //       },
    //     });
    //   }

    // } else {

    //   resposta = confirm(`Você deseja realmente Ativar o produto ${pedidoBuscado!.descricao}?`);
    //   if (resposta) {

    //     const produtoAtualizado: IPedido = {
    //       id: pedidoBuscado!.id,
    //       descricao: pedidoBuscado!.descricao,
    //       preco: pedidoBuscado!.preco,
    //       quantidadeEstoque: pedidoBuscado!.quantidadeEstoque,
    //       dataValidade: produtoBuscado!.dataValidade,
    //       ativo: true,
    //     }

    //     await this._pedidoService.AtualizarStatusPedido(produtoAtualizado!).subscribe({
    //       error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
    //       complete: () => {
    //         this._mensagemService.AdicionarMensagem("O Pedido foi Ativado com sucesso!")
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 4000);
    //       },
    //     });
    //   }
    // }
  }

}
