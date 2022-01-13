import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Livros } from './livro-read/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String): Observable<Livros[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<Livros[]>(url)
  }

  findById(id: String): Observable<Livros> {
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<Livros>(url)
  }

  create(livros: Livros, id_cat: String): Observable<Livros> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<Livros>(url, livros)
  }

  update(livros: Livros): Observable<Livros> {
    const url = `${this.baseUrl}/livros/${livros.id}`
    return this.http.put<Livros>(url, livros)
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
