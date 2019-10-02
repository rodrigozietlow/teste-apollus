import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { tap, finalize } from 'rxjs/operators';
import { User, LoginCreds, TokenCreds } from '@app/usuario';

@Injectable({
	providedIn: 'root'
})
export class DbService {

	private mockUsers = [
		{"id": 1, "name": "Rodrigo", 	"email": "rodrigo.zietlow@gmail.com", 	"type": "admin", 	"pwd": "123456"},
		{"id": 2, "name": "Teste", 		"email": "teste@teste.com", 			"type": "user", 	"pwd": "654321"}
	];

	constructor(
	) { }

	public getUsers(): Observable<User[]> {
		return of(this.mockUsers);
	}

	public getUser(id: number): Observable<User> {
		return of (this.mockUsers.find(
			u => u.id === id
		))
	}

	public addUser(u: User): Observable<number> {
		return of(15);
	}

	public editUser(u: User): Observable<boolean> {
		return of(true);
	}

	public removeUser(id: number): Observable<boolean> {
		return of(true);
	}

	public login(info: LoginCreds): Observable<TokenCreds> {
		return of(
			{"id": 1, "name": "Rodrigo Zietlow", "type": "admin"}
		);
	}
}
