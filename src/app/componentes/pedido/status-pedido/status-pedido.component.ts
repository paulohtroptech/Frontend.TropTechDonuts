import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { PedidoService } from 'src/app/servicos/pedido/pedido.service';
import { IPedido } from '../IPedido';
import { StatusPedido } from '../StatusPedido';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css']
})
export class StatusPedidoComponent implements OnInit {

  formStatusPedido!: FormGroup;

  id!: number;
  public statusPedido = StatusPedido;
  statusAtual!: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _pedidoService: PedidoService,
    private _mensagemService: MensagemService
  ) { }


  ngOnInit(): void {
    this._route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const pedido$ = this._pedidoService.BuscarPedidoPorId(id);
        pedido$.subscribe(pedido => {
          this._atualizarValores(pedido);
        });
      });

    this.formStatusPedido = new FormGroup({
      status: new FormControl(null, [Validators.required])
    })
  }

  private _atualizarValores(pedido: IPedido) {
    this.id = pedido.id;
    this.statusAtual = pedido.status;    
  }

  get Status() {
    return this.formStatusPedido.get('status')!;
  }


  async onSubmit(formDirective: FormGroupDirective) {

    if (this.formStatusPedido.invalid)
      return;

      const pedidoAtualizado: IPedido = {
        id: this.id,
        cliente: {
          cpf: "",
          nome: "",
          dataNascimento: new Date(),
          pontosFidelidade: 0
        },
        produto: {
          id: 0,
          descricao: "",
          preco: 0,
          quantidadeEstoque: 0,
          dataValidade: new Date,
          ativo: true
        },
        dataPedido: new Date,
        quantidade: 0,
        valorTotal: 0,
        status: Number(this.formStatusPedido.value.status)
      }

    await this._pedidoService
      .AtualizarStatusPedido(pedidoAtualizado)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Pedido foi atualizado com sucesso.")
          this._router.navigate(['/pedido'])

          this.formStatusPedido.reset();
          formDirective.resetForm();

        }
      })
  }

}
