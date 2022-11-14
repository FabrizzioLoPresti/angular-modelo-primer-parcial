import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaProductoComponent } from './producto/alta-producto/alta-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { ListadoProductoComponent } from './producto/listado-producto/listado-producto.component';

const routes: Routes = [
  {path: 'listado', component: ListadoProductoComponent},
  {path: '', redirectTo: 'listado', pathMatch: 'full'},
  {path: 'alta', component: AltaProductoComponent},
  {path: 'editar/:id', component: EditarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
