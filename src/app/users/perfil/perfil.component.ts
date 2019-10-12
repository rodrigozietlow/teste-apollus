import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

import { DbService } from '@app/_services/db.service';
import { AuthService } from '@app/_services/auth.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	public submitted = false;
	public user: User;
	public atualErrada = false;

	perfilForm: FormGroup = new FormGroup({
		'atual': new FormControl('', Validators.required),
		'senha': new FormControl('', Validators.required),
	});;

	get atual() { return this.perfilForm.get('atual'); }
	get senha() { return this.perfilForm.get('senha'); }

	constructor(
		private db: DbService,
		private auth: AuthService,
		private router: Router,
	) { }

	ngOnInit() {

		this.db.getUser(this.auth.user.id).subscribe(
			user => this.user = user
		);
	}

	onSubmit() {
		this.submitted = true;
		if (this.perfilForm.status != 'VALID') {
			return;
		}

		this.db.alterarSenha(this.user.id, this.atual.value, this.senha.value).subscribe(
			() => this.router.navigate(['dashboard']),
			() => {
				this.atualErrada = true;
				console.log('esta errado!!');
			}
		);
	}

}
