import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ProdutoService } from 'src/app/servicos/produto/produto.service';
import { IProduto } from '../IProduto';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {

  listaDeProdutos: IProduto[] = [];
  produtoBuscado?: IProduto;

  constructor(
    private _produtoService: ProdutoService,
    private _mensagemService: MensagemService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._buscarTodosProdutos();
  }


  private async _buscarTodosProdutos() {
    await this._produtoService.BuscarTodosProdutos()
      .subscribe({
        next: (produtos) => this.listaDeProdutos = produtos,
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
      });
  }

  async editaProduto(id: number) {
    await this._router
      .navigate(['editar', id],
        {
          relativeTo: this._route
        });
  }

  async editaEstoqueProduto(id: number) {
    await this._router
      .navigate(['editar/estoque/', id],
        {
          relativeTo: this._route
        });
  }

  async removerProduto(id: number) {

    let resposta = confirm("Você deseja realmente remover o produto?");
    if (resposta == true) {
      await this._produtoService.RemoverProduto(id).subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Produto foi removido com sucesso!")
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        },
      });
    }
  }

  async trocarStatusProduto(id: number) {

    let produtoBuscado = this.listaDeProdutos.find((produto) => produto.id == id)

    let resposta: boolean;

    if (produtoBuscado?.ativo) {
      resposta = confirm("Você deseja realmente Desativar o produto?");

      if (resposta) {
        
        const produtoAtualizado: IProduto = {
          id: produtoBuscado!.id,
          descricao: produtoBuscado!.descricao,
          preco: produtoBuscado!.preco,
          quantidadeEstoque: produtoBuscado!.quantidadeEstoque,
          dataValidade: produtoBuscado!.dataValidade,
          ativo: false,
        }
        
        await this._produtoService.AtualizarStatusProduto(produtoAtualizado).subscribe({
          error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
          complete: () => {
            this._mensagemService.AdicionarMensagem("O Produto foi Desativado com sucesso!")
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          },
        });
      }

    } else {

      resposta = confirm("Você deseja realmente Ativar o produto?");
      if (resposta) {

        const produtoAtualizado: IProduto = {
          id: produtoBuscado!.id,
          descricao: produtoBuscado!.descricao,
          preco: produtoBuscado!.preco,
          quantidadeEstoque: produtoBuscado!.quantidadeEstoque,
          dataValidade: produtoBuscado!.dataValidade,
          ativo: true,
        }

        await this._produtoService.AtualizarStatusProduto(produtoAtualizado!).subscribe({
          error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
          complete: () => {
            this._mensagemService.AdicionarMensagem("O Produto foi Ativado com sucesso!")
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          },
        });
      }
    }
  }

}
