import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ProdutoService } from 'src/app/servicos/produto/produto.service';
import { IProduto } from '../IProduto';

@Component({
  selector: 'app-edita-produto',
  templateUrl: './edita-produto.component.html',
  styleUrls: ['./edita-produto.component.css']
})
export class EditaProdutoComponent implements OnInit {

  formEditaProduto!: FormGroup;

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

    this.formEditaProduto = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      dataValidade: new FormControl(null, [Validators.required])
    })

  }

  private _atualizarValoresForm(produto: IProduto) {
    this.formEditaProduto.patchValue({
      id: produto.id,
      descricao: produto.descricao,
      preco: produto.preco,
      dataValidade: produto.dataValidade.toString().split('T')[0]
    });
  }

  get Descricao() {
    return this.formEditaProduto.get('descricao')!;
  }
  get Preco() {
    return this.formEditaProduto.get('preco')!;
  }
  get DataValidade() {
    return this.formEditaProduto.get('dataValidade')!;
  }


  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formEditaProduto.invalid)
      return;

    const produtoAtualizado: IProduto = {
      id: this.formEditaProduto.value.id,
      descricao: this.formEditaProduto.value.descricao,
      preco: this.formEditaProduto.value.preco,
      quantidadeEstoque: 0,
      dataValidade: this.formEditaProduto.value.dataValidade,
      ativo: true,
    }

    console.log(produtoAtualizado);

    await this._produtoService
      .AtualizarProduto(produtoAtualizado)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Produto foi atualizado com sucesso.")
          this._router.navigate(['/produto'])

          this.formEditaProduto.reset();
          formDirective.resetForm();

        }
      })
  }

}
