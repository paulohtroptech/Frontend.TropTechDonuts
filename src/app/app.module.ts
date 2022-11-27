import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastraClienteComponent } from './componentes/cliente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './componentes/cliente/lista-cliente/lista-cliente.component';
import { EditaClienteComponent } from './componentes/cliente/edita-cliente/edita-cliente.component';
import { EditaPedidoComponent } from './componentes/pedido/edita-pedido/edita-pedido.component';
import { CadastraPedidoComponent } from './componentes/pedido/cadastra-pedido/cadastra-pedido.component';
import { ListaPedidoComponent } from './componentes/pedido/lista-pedido/lista-pedido.component';
import { ListaProdutoComponent } from './componentes/produto/lista-produto/lista-produto.component';
import { CadastraProdutoComponent } from './componentes/produto/cadastra-produto/cadastra-produto.component';
import { EditaProdutoComponent } from './componentes/produto/edita-produto/edita-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastraClienteComponent,
    ListaClienteComponent,
    EditaClienteComponent,
    EditaPedidoComponent,
    CadastraPedidoComponent,
    ListaPedidoComponent,
    ListaProdutoComponent,
    CadastraProdutoComponent,
    EditaProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
