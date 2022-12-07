import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { PedidoService } from 'src/app/servicos/pedido/pedido.service';
import { IPedido } from '../IPedido';
import { StatusPedido } from '../StatusPedido';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {


  public statusPedido = StatusPedido;
  id!: number;
  statusAtual!: number;
  porcentagem!: number;
  nomeCliente!: String;
  valorTotal!: number;

  constructor(
    private _route: ActivatedRoute,
    private _pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id)
        const pedido$ = this._pedidoService.BuscarDetalhePedidoPorId(id);
        pedido$.subscribe(pedido => {
          this._atualizarValores(pedido);
        });
      });

    }
    
    private _atualizarValores(pedido: IPedido) {
      console.log(pedido)
      this.id = pedido.id;
      this.statusAtual = pedido.status;
      this.nomeCliente = pedido.cliente!.nome;
      this.valorTotal = Number(pedido.valorTotal.toFixed(2));
      this.porcentagem = Math.round(this.statusAtual*33 + 1);
  }

}
