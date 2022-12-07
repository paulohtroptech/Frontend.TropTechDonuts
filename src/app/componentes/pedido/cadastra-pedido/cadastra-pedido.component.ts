import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { PedidoService } from 'src/app/servicos/pedido/pedido.service';
import { ProdutoService } from 'src/app/servicos/produto/produto.service';
import { IProduto } from '../../produto/IProduto';
import { IPedido } from '../IPedido';

@Component({
  selector: 'app-cadastra-pedido',
  templateUrl: './cadastra-pedido.component.html',
  styleUrls: ['./cadastra-pedido.component.css']
})
export class CadastraPedidoComponent implements OnInit {

  formAdicionarPedido!: FormGroup;
  listaDeProdutos: IProduto[] = [];
  listaDePedidos: IPedido[] = [];

  constructor(
    private _pedidoService: PedidoService,
    private _produtoService: ProdutoService,
    private _mensagemService: MensagemService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this._buscarTodosProdutosAtivos();
    this._buscarTodosPedidos()


    this.formAdicionarPedido = new FormGroup({
      cpf: new FormControl(null),
      produto: new FormControl(null, [Validators.required]),
      quantidade: new FormControl(null, [Validators.required]),
    })

  }

  _buscarTodosProdutosAtivos() {
    this._produtoService
      .BuscarTodosProdutosAtivos()
      .subscribe((produtos) => this.listaDeProdutos = produtos);
  }

  _buscarTodosPedidos() {
    this._pedidoService
      .BuscarTodosPedidos()
      .subscribe((pedidos) => this.listaDePedidos = pedidos);
  }

  get Cpf() {
    return this.formAdicionarPedido.get('cpf')!;
  }

  get Produto() {
    return this.formAdicionarPedido.get('produto')!;
  }
  get Quantidade() {
    return this.formAdicionarPedido.get('quantidade')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formAdicionarPedido.invalid)
      return;

    let produtoBuscado = this.listaDeProdutos.find((produto) => produto.id == this.Produto.value);

    const novoPedido: IPedido = {
      id: 0,
      cliente: {
        cpf: (this.formAdicionarPedido.value.cpf) ? this.formAdicionarPedido.value.cpf : "",
        nome: "",
        dataNascimento: new Date(),
        pontosFidelidade: 0
      },
      produto: {
        id: Number(this.Produto.value),
        descricao: produtoBuscado!.descricao,
        preco: produtoBuscado!.preco,
        quantidadeEstoque: 0,
        dataValidade: new Date,
        ativo: true
      },
      dataPedido: new Date,
      quantidade: this.formAdicionarPedido.value.quantidade,
      valorTotal: 0,
      status: 1
    }

    console.log(novoPedido)

    await this._pedidoService
      .AdicionarPedido(novoPedido)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Pedido foi cadastrado com sucesso.")

          this.formAdicionarPedido.reset();
          formDirective.resetForm();

        }
      })
  }

  async removerPedido(id: number) {

    let pedidoBuscado = this.listaDePedidos.find((pedido) => pedido.id == id)

    let resposta = confirm(`Você deseja realmente remover o pedido número: ${pedidoBuscado?.id}?`);
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
