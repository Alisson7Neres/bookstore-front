
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Livros } from '../livro-read/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  displayedColumns = ['titulo', 'nome_autor', 'texto']

  livros: Livros[] = []

  livro: Livros = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  id_cat: String = ''

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findById()
  }

  findById() {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    }) 
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe((resposta) => {
      this.service.mensagem('Deletado com sucesso!')
      setTimeout( () =>
      this.router.navigate([`categorias/${this.id_cat}/livros`]),3000);
    },err => {
      this.service.mensagem('Não foi possível deletar o livro ' + this.livro.titulo)
    })
  }

  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
