import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbService } from '@app/_services/db.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-cadastrar',
	templateUrl: './cadastrar.component.html',
	styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

	public buttonName = 'Cadastrar usuário';
	public user = {
		'id': undefined,
		'name': '',
		'email': '',
		'pwd': '',
		'type': 'user'
	};

	constructor(
		private db: DbService,
		private router: Router,
	) { }

	ngOnInit() {
	}

	receberSubmit(user: User) {
		this.db.addUser(user).subscribe(
			() => this.router.navigate(['dashboard'])
		);
	}

}
