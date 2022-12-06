import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CadastraClienteComponent } from './componentes/cliente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './componentes/cliente/lista-cliente/lista-cliente.component';
import { EditaClienteComponent } from './componentes/cliente/edita-cliente/edita-cliente.component';
import { CadastraPedidoComponent } from './componentes/pedido/cadastra-pedido/cadastra-pedido.component';
import { ListaPedidoComponent } from './componentes/pedido/lista-pedido/lista-pedido.component';
import { ListaProdutoComponent } from './componentes/produto/lista-produto/lista-produto.component';
import { CadastraProdutoComponent } from './componentes/produto/cadastra-produto/cadastra-produto.component';
import { EditaProdutoComponent } from './componentes/produto/edita-produto/edita-produto.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './componentes/index/index.component';
import { EstoqueProdutoComponent } from './componentes/produto/estoque-produto/estoque-produto.component';
import { StatusPedidoComponent } from './componentes/pedido/status-pedido/status-pedido.component';
import { DetalhePedidoComponent } from './componentes/pedido/detalhe-pedido/detalhe-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastraClienteComponent,
    ListaClienteComponent,
    EditaClienteComponent,
    CadastraPedidoComponent,
    ListaPedidoComponent,
    ListaProdutoComponent,
    CadastraProdutoComponent,
    EditaProdutoComponent,
    MensagemComponent,
    IndexComponent,
    EstoqueProdutoComponent,
    StatusPedidoComponent,
    DetalhePedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
