import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  mensagem: string = '';

  constructor() { }

  AdicionarAlerta(mensagem: string) {
    this.mensagem = mensagem;

    setTimeout(() => {
      this.LimparAlerta();
    }, 4000);
  }

  LimparAlerta() {
    this.mensagem = '';
  }
}
