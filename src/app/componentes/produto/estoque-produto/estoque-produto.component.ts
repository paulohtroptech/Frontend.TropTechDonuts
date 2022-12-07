import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ProdutoService } from 'src/app/servicos/produto/produto.service';
import { IProduto } from '../IProduto';

@Component({
  selector: 'app-estoque-produto',
  templateUrl: './estoque-produto.component.html',
  styleUrls: ['./estoque-produto.component.css']
})
export class EstoqueProdutoComponent implements OnInit {

  formEstoqueProduto!: FormGroup;

  id!: number;
  quantidadeAtual!: number;
  descricao!: string;
  preco!: number;
  dataValidade!: Date;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _produtoService: ProdutoService,
    private _mensagemService: MensagemService
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const produto$ = this._produtoService.BuscarProdutoPorId(id);
        produto$.subscribe(produto => {
          this._atualizarValoresForm(produto);
        });
      });

    this.formEstoqueProduto = new FormGroup({
      id: new FormControl(null),
      novaQuantidade: new FormControl(null, [Validators.required, Validators.minLength(1)])
    })


  }

  private _atualizarValoresForm(produto: IProduto) {
    this.id = produto.id;
    this.quantidadeAtual = produto.quantidadeEstoque;
    this.descricao = produto.descricao,
    this.preco = produto.preco,
    this.dataValidade = produto.dataValidade
    this.formEstoqueProduto.patchValue({
      id: produto.id,
    });
  }

  get Id() {
    return this.formEstoqueProduto.get('id')!;
  }
  get NovaQuantidade() {
    return this.formEstoqueProduto.get('novaQuantidade')!;
  }


  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formEstoqueProduto.invalid)
      return;

    const produtoAtualizado: IProduto = {
      id: this.formEstoqueProduto.value.id,
      descricao: this.descricao,
      preco: this.preco,
      quantidadeEstoque: this.formEstoqueProduto.value.novaQuantidade,
      dataValidade: this.dataValidade,
      ativo: true,
    }
    
    await this._produtoService
      .AtualizarQuantidadeProduto(produtoAtualizado)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("A quantidade foi atualizada com sucesso.")
          this._router.navigate(['/produto'])

          this.formEstoqueProduto.reset();
          formDirective.resetForm();

        }
      })
  }

}
