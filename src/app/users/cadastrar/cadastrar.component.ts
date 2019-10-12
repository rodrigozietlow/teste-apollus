import { Component, OnInit } from '@angular/core';

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

	constructor() { }

	ngOnInit() {
	}

	receberSubmit(user: User) {
		console.log(user);
	}

}
