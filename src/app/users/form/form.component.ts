import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

import { User } from '@app/usuario';

@Component({
	selector: 'app-user-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

	public submitted = false;

	@Input() buttonName: string;
	@Input() user: User;
	@Output() submeter = new EventEmitter<User>();

	userForm: FormGroup;

	get nome() { return this.userForm.get('nome'); }
	get email() { return this.userForm.get('email'); }
	get senha() { return this.userForm.get('senha'); }
	get tipo() { return this.userForm.get('tipo'); }

	opcoesTipo = [
		{
			"value": "admin",
			"nome": "Administrador",
		},
		{
			"value": "user",
			"nome": "Comum",
		},
	];

	constructor() { }

	ngOnInit() {
		// colocamos isto no onInit pois é nesse ciclo que os @Inputs são passados
		if (this.user.id == undefined) {
			this.userForm = new FormGroup({
				'nome': new FormControl(this.user.name, [Validators.required]),
				'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
				'senha': new FormControl(this.user.pwd, Validators.required),
				'tipo': new FormControl(this.user.type, Validators.required),
			});
		} else { // em update não tem senha
			this.userForm = new FormGroup({
				'nome': new FormControl(this.user.name, [Validators.required]),
				'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
				'tipo': new FormControl(this.user.type, Validators.required),
			});
		}
	}

	onSubmit() {
		if (this.userForm.status != 'VALID') {
			this.submitted = true;
			return;
		}
		let newUser: User = {
			"id": this.user.id,
			"name": this.nome.value,
			"email": this.email.value,
			"type": this.tipo.value,
		};

		if (this.user.id == undefined) {
			newUser.pwd = this.senha.value;
		}
		this.submeter.emit(newUser);
	}
}
