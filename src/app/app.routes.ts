import { ReadFormComponent } from './components/read-form/read-form.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'new',
        component: ReadFormComponent
    },
    {
        path: 'edit/:id',
        component: ReadFormComponent
    }
]