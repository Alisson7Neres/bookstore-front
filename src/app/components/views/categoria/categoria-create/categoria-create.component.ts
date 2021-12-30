import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria-read/categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private Service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.Service.create(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.Service.mensagem('Categoria criada com sucesso!')
    }, err => {
        for(let i = 0; i < err.error.errors.length; i++) {
          this.Service.mensagem(err.error.errors[i].message)
        }
    })

    
  }

}
