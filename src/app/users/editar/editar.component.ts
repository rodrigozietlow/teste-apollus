import { Component, OnInit } from '@angular/core';

import { DbService } from '@app/_services/db.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-editar',
	templateUrl: './editar.component.html',
	styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	public buttonName = 'Cadastrar usuário';
	public user: User;

	constructor(
		private db: DbService,
	) { }

	ngOnInit() {
		let id = 1;
		this.db.getUser(id).subscribe(
			user => this.user = user
		);
	}


	receberSubmit(user: User) {
		console.log(user);
	}
}
