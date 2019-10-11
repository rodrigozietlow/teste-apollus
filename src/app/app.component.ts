import { Component } from '@angular/core';

import { AuthService } from '@app/_services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	get isLogged() { return this.auth.user; }

	constructor(
		private auth: AuthService
	) {}

	logout() {
		this.auth.logout();
	}
}
