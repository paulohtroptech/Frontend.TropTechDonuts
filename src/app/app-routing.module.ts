import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastraClienteComponent } from './componentes/cliente/cadastra-cliente/cadastra-cliente.component';
import { EditaClienteComponent } from './componentes/cliente/edita-cliente/edita-cliente.component';
import { ListaClienteComponent } from './componentes/cliente/lista-cliente/lista-cliente.component';
import { IndexComponent } from './componentes/index/index/index.component';
import { CadastraProdutoComponent } from './componentes/produto/cadastra-produto/cadastra-produto.component';
import { EditaProdutoComponent } from './componentes/produto/edita-produto/edita-produto.component';
import { EstoqueProdutoComponent } from './componentes/produto/estoque-produto/estoque-produto.component';
import { ListaProdutoComponent } from './componentes/produto/lista-produto/lista-produto.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'cliente',
    component: ListaClienteComponent,
  },
  {
    path: 'cliente/cadastrar',
    component: CadastraClienteComponent,
  },
  {
    path: 'cliente/editar/:cpf',
    component: EditaClienteComponent,
  },
  {
    path: 'produto',
    component: ListaProdutoComponent,
  },
  {
    path: 'produto/cadastrar',
    component: CadastraProdutoComponent,
  },
  {
    path: 'produto/editar/:id',
    component: EditaProdutoComponent,
  },
  {
    path: 'produto/editar/estoque',
    component: EstoqueProdutoComponent,
  },
  {
    path: 'produto/editar/estoque/:id',
    component: EstoqueProdutoComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
