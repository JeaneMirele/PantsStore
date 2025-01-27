import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { ConfirmarExclusaoComponent } from './components/confirmar-exclusao/confirmar-exclusao.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
    {
        path: "", 
        component: HomeComponent
    },
     {
        path: "add",
        component: AddComponent
    },
    { path: 'edit/:id', 
        component: EditComponent 
    },
    { path: ':id/delete', 
        component: ConfirmarExclusaoComponent
    },


];
