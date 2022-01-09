import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';

import { Livros } from './livro.model';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  livros: Livros[] = []

  displayedColumns: string[]  = ['id', 'titulo', 'livros', 'acoes'];

  id_cat: String = '';

  constructor(private service: LivroService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll()
  }

  findAll(): void{
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta
    })
  }

  navegarParaLivroCreate(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }

}
