import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ProdutoService } from 'src/app/servicos/produto/produto.service';
import { IProduto } from '../IProduto';

@Component({
  selector: 'app-cadastra-produto',
  templateUrl: './cadastra-produto.component.html',
  styleUrls: ['./cadastra-produto.component.css']
})
export class CadastraProdutoComponent implements OnInit {

  formAdicionarProduto!: FormGroup;
  listaDeClientes: IProduto[] = [];

  constructor(
    private _produtoService: ProdutoService,
    private _mensagemService: MensagemService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.formAdicionarProduto = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      dataValidade: new FormControl(null, [Validators.required])
    })

  }

  get Descricao() {
    return this.formAdicionarProduto.get('descricao')!;
  }
  get Preco() {
    return this.formAdicionarProduto.get('preco')!;
  }
  get DataValidade() {
    return this.formAdicionarProduto.get('dataValidade')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formAdicionarProduto.invalid)
      return;

    const novoProduto: IProduto = {
      id: 0,
      descricao: this.formAdicionarProduto.value.descricao,
      preco: this.formAdicionarProduto.value.preco,
      quantidadeEstoque: 0,
      dataValidade: this.formAdicionarProduto.value.dataValidade,
      ativo: true,
    }

    await this._produtoService
      .AdicionarProduto(novoProduto)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O Produto foi cadastrado com sucesso.")

          this.formAdicionarProduto.reset();
          formDirective.resetForm();

        }
      })
  }
}
