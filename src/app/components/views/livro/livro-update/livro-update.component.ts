import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livros } from '../livro-read/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = '';

  livro: Livros = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  };

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)])

  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao atualizar livro!!')
    })

  }

  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessage(field: String) {

    let anyInvalid = this.titulo.invalid || this.texto.invalid || this.nome_autor.invalid;

    if (this.titulo.invalid && field == "titulo") {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres';
    }
    if (this.nome_autor.invalid && field == "nome_autor") {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres';
    }
    if (this.texto.invalid && field == "texto") {
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres';
    }
    if (anyInvalid && field == "button") {
      return true;
    }
    return false;
  }

}
