import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente/cliente.service';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ICliente } from '../ICliente';

@Component({
  selector: 'app-edita-cliente',
  templateUrl: './edita-cliente.component.html',
  styleUrls: ['./edita-cliente.component.css']
})
export class EditaClienteComponent implements OnInit {

  formEditarCliente!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _mensagemService: MensagemService
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe(
      (params: any) => {
        const cpf = params['cpf'];
        const cliente$ = this._clienteService.BuscarClientePorCpf(cpf);
        cliente$.subscribe(cliente => {
          this._atualizarValoresForm(cliente);
        });
      });

    this.formEditarCliente = new FormGroup({
      cpf: new FormControl(null),
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      dataNascimento: new FormControl(null, [Validators.required])
    });

  }

  private _atualizarValoresForm(cliente: ICliente) {
    this.formEditarCliente.patchValue({
      cpf: cliente.cpf,
      nome: cliente.nome,
      dataNascimento: cliente.dataNascimento.toString().split('T')[0]
    });
  }

  get Cpf() {
    return this.formEditarCliente.get('cpf')!;
  }

  get Nome() {
    return this.formEditarCliente.get('nome')!;
  }

  get DataNascimento() {
    return this.formEditarCliente.get('dataNascimento')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.formEditarCliente.invalid)
      return;

    const clienteAtualizado: ICliente = {
      cpf: this.formEditarCliente.value.cpf,
      nome: this.formEditarCliente.value.nome,
      dataNascimento: this.formEditarCliente.value.dataNascimento
    }

    console.log(clienteAtualizado);

    await this._clienteService
      .AtualizarCliente(clienteAtualizado)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error)),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O cliente foi atualizado com sucesso.")
          this._router.navigate(['/cliente'])

          this.formEditarCliente.reset();
          formDirective.resetForm();

        }
      })
  }


  

}
