import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-baja-producto',
  templateUrl: './baja-producto.component.html',
  styleUrls: ['./baja-producto.component.css']
})
export class BajaProductoComponent implements OnInit {

  @Input() id:string;
  @Output() onEliminar = new EventEmitter();
  constructor(private productoService:ProductoService) { 
    this.id = '';
  }

  ngOnInit(): void {
  }

  eliminar(): void {
    const resultado = confirm('Seguro desea eliminar el producto?');
    if(resultado) {
      this.productoService.eliminar(this.id).subscribe({
        next: () => {
          alert('Producto eliminado correctamente')
          this.onEliminar.emit();
        },
        error: (error) => {
          alert('Error al eliminar producto')
        }
      })
    }
  }

}
