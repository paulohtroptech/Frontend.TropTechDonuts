import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente/cliente.service';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ICliente } from '../ICliente';

@Component({
  selector: 'app-cadastra-cliente',
  templateUrl: './cadastra-cliente.component.html',
  styleUrls: ['./cadastra-cliente.component.css']
})
export class CadastraClienteComponent implements OnInit {

  formAdicionarCliente!: FormGroup;
  listaDeClientes: ICliente[] = [];

  constructor(
    private _clienteService: ClienteService,
    private _mensagemService: MensagemService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.formAdicionarCliente = new FormGroup({
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]+$")]),
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      dataNascimento: new FormControl(null, [Validators.required])
    })

  }

  get Cpf() {
    return this.formAdicionarCliente.get('cpf')!;
  }
  get Nome() {
    return this.formAdicionarCliente.get('nome')!;
  }
  get DataNascimento() {
    return this.formAdicionarCliente.get('dataNascimento')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formAdicionarCliente.invalid)
      return;

    const novoCliente: ICliente = {
      cpf: this.formAdicionarCliente.value.cpf,
      nome: this.formAdicionarCliente.value.nome,
      dataNascimento: this.formAdicionarCliente.value.dataNascimento
    }

    await this._clienteService
      .AdicionarCliente(novoCliente)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O cliente foi cadastrado com sucesso.")
          //this._router.navigate(['/cliente'])

          this.formAdicionarCliente.reset();
          formDirective.resetForm();

        }
      })
  }
}
