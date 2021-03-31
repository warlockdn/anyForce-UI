import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsEditingCandeactivateGuard } from './@core/guard/is-editing-candeactivate.guard';
import { NotFoundComponent } from './@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./@modules/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'login',
    loadChildren: () => import('./@modules/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'administration',
    loadChildren: () => import('./@modules/administration/administration.module').then(m => m.AdministrationModule),
    canDeactivate: [IsEditingCandeactivateGuard]
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
