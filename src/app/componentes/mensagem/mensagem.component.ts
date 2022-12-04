import { Component, OnInit } from '@angular/core';
import { MensagemService } from 'src/app/servicos/mensagem/mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  constructor(public mensagemService: MensagemService) { }

  ngOnInit(): void {
  }

}
