import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { LoginComponent } from '@app/login/login.component';
import { CadastrarComponent } from '@app/users/cadastrar/cadastrar.component';
import { EditarComponent } from '@app/users/editar/editar.component';
import { PerfilComponent } from '@app/users/perfil/perfil.component';

import { AuthGuard } from '@app/_guards/auth.guard';
import { ElevationGuard } from '@app/_guards/elevation.guard';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]  },
	{ path: 'users/cadastrar', component: CadastrarComponent, canActivate: [AuthGuard, ElevationGuard] },
	{ path: 'users/editar/:id', component: EditarComponent, canActivate: [AuthGuard, ElevationGuard] },
	{ path: 'users/profile', component: PerfilComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
