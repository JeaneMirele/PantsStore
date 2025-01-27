import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/appservices.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
@Component({

  selector: 'app-add',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
    produtoForm: FormGroup;

    constructor(private fb: FormBuilder, private produtoService: ProdutoService, private router: Router, private snackbar: MatSnackBar) {
      this.produtoForm = this.fb.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        preco: ['', [Validators.required, Validators.min(0)]],
        categoria: ['', Validators.required],
        tamanho: ['', Validators.required]
      });
    }
  
    save(): void {
      if (this.produtoForm.valid) {
      
        const produto = this.produtoForm.value; 
        this.produtoService.addProduto(produto).subscribe({
        next: () => {
          alert('Produto adicionado com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Ocorreu um erro ao adicionar o produto.');
        }
      });
    }else{
      this.snackbar.open("Preencha todos os campos", "Ok", {duration: 3000});
    }
  }

 
  
}
