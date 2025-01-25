import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListaProdutosComponent } from '../lista-produtos/lista-produtos.component';

const COMPONENTS = [ListaProdutosComponent];
const MODULES = [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatTableModule, MatFormFieldModule]


@Component({
  selector: 'app-home',
  imports: [MODULES, COMPONENTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  }


