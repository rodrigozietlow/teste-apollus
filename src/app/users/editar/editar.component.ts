import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DbService } from '@app/_services/db.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-editar',
	templateUrl: './editar.component.html',
	styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	public buttonName = 'Editar usuário';
	public user: User;

	constructor(
		private db: DbService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit() {
		let id = +this.route.snapshot.paramMap.get('id');
		this.db.getUser(id).subscribe(
			user => this.user = user
		);
	}


	receberSubmit(user: User) {
		this.db.editUser(user).subscribe(
			() => this.router.navigate(['dashboard'])
		);
	}
}
