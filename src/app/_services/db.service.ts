import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
		return of(this.mockUsers).pipe(delay(2000));
	}

	public getUser(id: number): Observable<User> {
		return of (this.mockUsers.find(
			u => u.id === id
		)).pipe(delay(2000));
	}

	public addUser(u: User): Observable<number> {
		return of(15).pipe(delay(2000));
	}

	public editUser(u: User): Observable<boolean> {
		return of(true).pipe(delay(2000));
	}

	public removeUser(id: number): Observable<boolean> {
		return of(true).pipe(delay(2000));
	}

	public login(info: LoginCreds): Observable<TokenCreds> {
		return of(
			{"id": 1, "name": "Rodrigo Zietlow", "type": "admin"}
		).pipe(delay(2000));
	}
}
