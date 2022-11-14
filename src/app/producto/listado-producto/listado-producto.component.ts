import { Component, OnInit, OnDestroy } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Categoria } from 'src/app/models/Categoria';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit, OnDestroy {

  listado: Producto[];
  private subscription:Subscription;
  constructor(private productoService:ProductoService, private categoriaService:CategoriaService, private router:Router) { 
    this.listado = [];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado(): void {
    this.subscription.add(
      this.productoService.obtener().subscribe({
        next: (resProductos:Producto[]) => {
          this.listado = resProductos;
          this.listado.forEach(producto => {
            this.categoriaService.obtenerById(producto.idCategoria).subscribe({
              next: (resCategoria:Categoria) => {
                producto.categoria = resCategoria;
              }
            })
          })
        }
      })
    )
  }

  editar(id:string): void {
    this.router.navigate([`editar/${id}`])
  }

}
