import { Component, OnInit, OnDestroy } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Categoria } from 'src/app/models/Categoria';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit, OnDestroy {

  producto: Producto;
  categorias: Categoria[];
  tieneDescuento: boolean = false;
  private subscription: Subscription;
  constructor(private productoService:ProductoService, private categoriaService:CategoriaService, private router:Router) { 
    this.producto = { categoria: {} } as Producto;
    this.categorias = [];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.categoriaService.obtener().subscribe({
        next: (resCategorias:Categoria[]) => {
          this.categorias = resCategorias;
        }
      })
    )
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkValue(event: any): void{
    event === 'A' ? this.tieneDescuento = true : this.tieneDescuento = false;
  }

  enviar(): void {
    if(!this.producto.nombre || !this.producto.idCategoria || !this.producto.precio || !this.producto.cantidad || !this.producto.fecha){
      return alert('Todos los campos son obligatorios');
    }

    if(!this.producto.descuento) {
      this.producto.descuento = 0;
    }

    this.subscription.add(
      this.productoService.crear(this.producto).subscribe({
        next: (resProducto:Producto) => {
          alert('Producto creado correctamente');
          this.router.navigate(['']);
        },
        error: (error) => {
          alert('Error al crear producto')
        }
      })
    )
  }

}
