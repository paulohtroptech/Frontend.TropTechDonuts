import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente/cliente.service';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';
import { ICliente } from '../ICliente';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  @Input() acaoFormulario!: string;

  formCliente!: FormGroup;
  formEnviado = false;


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

    this.formCliente = new FormGroup({
      cpf: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      nome: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      dataNascimento: new FormControl(null, [Validators.required])
    });

  }

  private _atualizarValoresForm(cliente: ICliente) {
    this.formCliente.patchValue({
      cpf: cliente.cpf,
      nome: cliente.nome,
      dataNascimento: cliente.dataNascimento.toString().split('T')[0]
    });
  }


  get Cpf() {
    return this.formCliente.get('cpf')!;
  }

  get Nome() {
    return this.formCliente.get('nome')!;
  }

  get DataNascimento() {
    return this.formCliente.get('dataNascimento')!;
  }


  onSubmit(formDirective: FormGroupDirective) {

    this.formEnviado = true;

    console.log(this.formCliente.value);
    if (this.formCliente.invalid)
      return;

    switch (this.acaoFormulario) {
      case "atualizar":
        this._atualizarCliente();
        this.formCliente.reset();
        formDirective.resetForm();
        break;

      default:
        break;
    }
    console.log();
  }

  onCancel() {

    this.formEnviado = false;
    this.formCliente.reset();

  }


  private async _atualizarCliente() {
    if (this.formCliente.invalid)
      return;

    const clienteAtualizado: ICliente = {
      cpf: this.formCliente.value.cpf,
      nome: this.formCliente.value.nome,
      dataNascimento: this.formCliente.value.dataNascimento
    }

    await this._clienteService
      .AtualizarCliente(clienteAtualizado)
      .subscribe({
        error: (e) => this._mensagemService.AdicionarMensagem(JSON.stringify(e.error.mensagem).replace('"', '')),
        complete: () => {
          this._mensagemService.AdicionarMensagem("O cliente foi atualizado com sucesso.")
          this._router.navigate(['/cliente'])
        }
      })
  }
}

