import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoProductoComponent } from './producto/listado-producto/listado-producto.component';
import { AltaProductoComponent } from './producto/alta-producto/alta-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { BajaProductoComponent } from './producto/baja-producto/baja-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoProductoComponent,
    AltaProductoComponent,
    EditarProductoComponent,
    BajaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
