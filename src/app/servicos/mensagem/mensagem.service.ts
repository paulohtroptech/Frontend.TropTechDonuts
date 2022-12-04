import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  mensagem: string = '';

  constructor() { }
  
  AdicionarMensagem(mensagem: string) {
    this.mensagem = mensagem;

    setTimeout(() => {
      this.LimparMensagem();
    }, 4000);
  }

  LimparMensagem() {
    this.mensagem = '';
  }
}
