import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Categoria } from 'src/app/models/Categoria';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto;
  id:string = '';
  categorias: Categoria[];
  tieneDescuento: boolean = true;
  private subscription: Subscription;
  constructor(private productoService:ProductoService, private categoriaService:CategoriaService, private router:Router, private activatedRoute:ActivatedRoute) { 
    this.producto = { categoria: {} } as Producto;
    this.categorias = [];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.categoriaService.obtener().subscribe({
        next: (resCategorias:Categoria[]) => {
          this.categorias = resCategorias;
          this.cargarDatos();
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

  cargarDatos(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        this.productoService.obtenerById(this.id).subscribe({
          next: (resProducto:Producto) => {
            this.producto = resProducto;
          }
        })
      }
    })
  }

  enviar(): void {
    if(!this.producto.nombre || !this.producto.idCategoria || !this.producto.precio || !this.producto.cantidad || !this.producto.fecha){
      return alert('Todos los campos son obligatorios');
    }

    if(!this.producto.descuento) {
      this.producto.descuento = 0;
    }

    this.producto.id = this.id;
    this.subscription.add(
      this.productoService.editar(this.producto).subscribe({
        next: (resProducto:Producto) => {
          alert('Producto editado correctamente');
          this.router.navigate(['']);
        },
        error: (error) => {
          alert('Error al editar producto')
        }
      })
    )
  }

  cancelar(): void {
    const resultado = confirm('Seguro desea cancelar actualizacion?');
    if(resultado) {
      this.router.navigate(['']);
    }
  }

}
