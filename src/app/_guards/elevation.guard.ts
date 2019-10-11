import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@app/_services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ElevationGuard implements CanActivate {

	constructor(
	   private auth: AuthService
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	   const currentUser = this.auth.user;
	   if (currentUser && currentUser.type == 'admin') {
		   // autorizado
		   return true;
	   }
	   return false;
   }

}
