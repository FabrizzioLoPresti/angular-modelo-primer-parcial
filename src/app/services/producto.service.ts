import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private API_URL: string = 'https://633345b1573c03ab0b5b5964.mockapi.io/producto';
  constructor(private http:HttpClient) { }

  obtener(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  obtenerById(id:string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${id}`);
  }

  crear(producto:Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto);
  }

  editar(producto:Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${producto.id}`, producto);
  }

  eliminar(id:string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
