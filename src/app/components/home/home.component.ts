import { Component, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { ProdutoService } from '../../services/appservices.service';
import { Observable, of } from 'rxjs';
import { Produto } from '../../models/produto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarExclusaoComponent } from '../confirmar-exclusao/confirmar-exclusao.component';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-home',
  imports: [AddComponent, EditComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatTableModule, MatPaginatorModule, CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  array = [{opcao:'Nome', valor:'nome'}, {opcao: 'Preço', valor: 'preco'}];
  displayedColumns = ['id', 'nome', 'descricao', 'preco', 'categoria', 'tamanho', 'acoes']
  produtos: Produto[] = [];
  produtos$: Observable<Produto[]> = of([]);
  nPage: number = 0;
  pagSize: number = 3;
  total: number = 0;
  Form: FormGroup;

  constructor(private fb: FormBuilder, private produtosService: ProdutoService, private router: Router,  private activatedRoute: ActivatedRoute, private dialog: MatDialog)  {
    this.Form = fb.group({
      ordem: [null],
      tamanho: [null]
     });
      
    this.carregarProdutos();
 
  }


  Adicionar(){
    this.router.navigate(["add"], {relativeTo: this.activatedRoute});


  }

  Remover(id: string): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
      width: '300px',
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza de que deseja excluir este produto?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.produtosService.deleteProduto(id).subscribe({
          next: () => {
            alert('Produto excluído com sucesso!');
            this.carregarProdutos(); 
          },
          error: (err) => {
            console.error('Erro ao excluir produto:', err);
            alert('Falha ao excluir o produto.');
          }
        });
      }
    });
  }

  Alterar(p: Produto){
    this.router.navigate([`edit/${p.id}`], {relativeTo: this.activatedRoute});
  }

  carregarProdutos(): void {
    console.log(this.Form.value);
    this.produtosService.listPaginated(this.Form.value.ordem, this.Form.value.tamanho, this.nPage+1, this.pagSize).subscribe({
      next: (data) => {
        this.produtos = data.data;
        this.total = data.items;
      },
      error: (err) => console.error('Erro ao carregar produtos:', err),
    });
  }

  changePage(event: PageEvent){
    this.nPage= event.pageIndex;
    this.pagSize= event.pageSize;
    this.carregarProdutos();

  }

  Filtrar(){
    this.carregarProdutos();
  }


}





