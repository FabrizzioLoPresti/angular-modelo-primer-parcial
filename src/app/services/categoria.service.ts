import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private API_URL:string = 'https://633345b1573c03ab0b5b5964.mockapi.io/categoria';
  constructor(private http:HttpClient) { }

  obtener(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  obtenerById(id:string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`);
  }

}
