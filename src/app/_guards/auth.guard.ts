import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@app/_services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
	   private router: Router,
	   private auth: AuthService
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	   const currentUser = this.auth.user;
	   if (currentUser) {
		   // autorizado
		   return true;
	   }

	   // não está logado, então vamos pra tela de login
	   this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
	   return false;
   }

}
