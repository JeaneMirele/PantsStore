import { Component } from '@angular/core';
import { ProdutoService } from '../../services/appservices.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { Produto } from '../../models/produto';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-edit',
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {
  produtoForm: FormGroup;
  produtoId: string;
  produto!: Produto;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.produtoId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadProdutoData();
    this.produtoForm = fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      tamanho: ['', Validators.required]
    });
  }


 loadProdutoData() {

  this.produtoService.getProdutoById(this.produtoId).subscribe({
    next: (p) => {
      this.produto = p;
      this.produtoForm = this.fb.group({
        nome: [this.produto.nome, Validators.required],
        descricao: [this.produto.descricao, Validators.required],
        preco: [this.produto.preco, [Validators.required, Validators.min(0)]],
        categoria: [this.produto.categoria, Validators.required],
        tamanho: [this.produto.tamanho, Validators.required]
      });
      console.log(p);
      console.log(this.produto);
    },
     error: (err) => console.error('Erro ao carregar o produto:', err)
  });
 }

  edit(){
    if (this.produtoForm.valid) {
      const produto: Produto = this.produtoForm.value;
      this.produtoService.updateProduto(this.produtoId, produto).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          alert('Falha ao atualizar o produto.');
        }
      });
   }
  }

}