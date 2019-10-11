import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/_services/auth.service';
import { DbService } from '@app/_services/db.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public users: User[];
	public carregando = false;

	get elevacao() { return this.auth.user.type == 'admin'; }

	constructor(
		private auth: AuthService,
		private db: DbService,
	) { }

	ngOnInit() {
		this.carregando = true;
		this.db.getUsers().subscribe(
			(users: User[]) => {
				this.users = users;
				this.carregando = false;
			}
		);
	}

}
