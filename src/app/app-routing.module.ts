import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { LoginComponent } from '@app/login/login.component';
import { CadastrarComponent } from '@app/users/cadastrar/cadastrar.component';
import { EditarComponent } from '@app/users/editar/editar.component';

import { AuthGuard } from '@app/_guards/auth.guard';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]  },
	{ path: 'users/cadastrar', component: CadastrarComponent, canActivate: [AuthGuard] },
	{ path: 'users/editar/:id', component: EditarComponent, canActivate: [AuthGuard]	 },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
