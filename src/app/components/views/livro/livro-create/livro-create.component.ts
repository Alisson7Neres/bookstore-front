import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livros } from '../livro-read/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livros: Livros = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: '',
  }

  id_cat: String = '';

  titulo = new FormControl('', [Validators.minLength(3)]); 
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(private service: LivroService, private http: HttpClient, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  getMessage(field: String) {

    let anyInvalid = this.titulo.invalid || this.texto.invalid ||  this.nome_autor.invalid;

    if(this.titulo.invalid && field == "titulo") {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres';
    }
    if(this.nome_autor.invalid && field == "nome_autor") {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres';
    }
    if(this.texto.invalid && field == "texto") {
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres';
    }
    if(anyInvalid && field == "button") {
      return true;
    }
     return false;
  }

  create(): void {
    this.service.create(this.livros, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso!')
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
        }
    })
  }

  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

}
