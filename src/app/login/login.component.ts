import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/_services/auth.service';
import { TokenCreds } from '@app/usuario';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public submitted = false;
	public erro = "";

	loginForm = new FormGroup({
		'email': new FormControl('', [Validators.required, Validators.email]),
		'senha': new FormControl('', Validators.required)
	});

	get email() { return this.loginForm.get('email'); }
	get senha() { return this.loginForm.get('senha'); }

	constructor(
		private auth: AuthService,
		private router: Router,
	) { }

	ngOnInit() {

	}

	onSubmit() {
		if (this.loginForm.status != 'VALID') {
			this.submitted = true;
			return;
		}
		this.login();
	}

	login() {
		this.auth.login(
			this.loginForm.get('email').value,
			this.loginForm.get('senha').value,
		).subscribe(
			() => this.router.navigate(['/dashboard']),
			() => this.erro = 'Não foi possível fazer login. Você digitou as informações corretas?'
		);
	}
}
