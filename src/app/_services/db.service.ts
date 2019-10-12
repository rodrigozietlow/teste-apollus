import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { filter, map, find } from 'rxjs/operators';
import { User, LoginCreds, TokenCreds } from '@app/usuario';

@Injectable({
	providedIn: 'root'
})
export class DbService {

	private currentMaxId: number;

	constructor(
	) {
		if (JSON.parse(localStorage.getItem('dbUser')) == null) {
			localStorage.setItem('dbUser', JSON.stringify([])); // previne que um .length ou um .map de erro
		}
	}

	public getUsers(): Observable<User[]> {
		return of(
			<User[]> JSON.parse(localStorage.getItem('dbUser'))
		).pipe(
			map(
				users => users.map(
					user => {
						user.pwd = undefined; // no mundo real a senha não vem nessa consulta
						return user;
					}
				)
			),

		);
	}

	public pesquisarUsers(texto: string): Observable<User[]> {
		return this.getUsers().pipe(
			map(
				users => users.filter(
					u => u.email.includes(texto) || u.name.includes(texto)
				)
			)
		);
	}

	public getUser(id: number): Observable<User> {
		return from (
			<User[]> JSON.parse(localStorage.getItem('dbUser'))
		)
		.pipe(
			find(
				u => u.id === id
			)
		)
	}

	public addUser(u: User): Observable<number> {
		let users = <User[]> JSON.parse(localStorage.getItem('dbUser'));

		// descobrir o maior id primeiro
		let maiorId: number;
		if (this.currentMaxId == undefined) {
			if (users.map(user => user.id).length > 0) {
				maiorId = 1 + Math.max(...users.map(user => user.id));
			} else {
				maiorId = 1;
			}
			this.currentMaxId = maiorId;
		} else {
			maiorId = ++this.currentMaxId;
		}

		u.id = maiorId;
		users.push(u);
		localStorage.setItem('dbUser', JSON.stringify(users));

		return of(maiorId);
	}

	public editUser(u: User): Observable<boolean> {
		let users = <User[]> JSON.parse(localStorage.getItem('dbUser'));

		let indexOld = users.findIndex(
			user => user.id == u.id
		);

		if (indexOld == -1) {
			return throwError('não existe');
		}

		users[indexOld] = u;

		localStorage.setItem('dbUser', JSON.stringify(users));
		return of(true);
	}

	public removeUser(id: number): Observable<boolean> {
		let users = <User[]> JSON.parse(localStorage.getItem('dbUser'));

		let index = users.findIndex(
			user => user.id == id
		);

		if (index == -1) { // não podemos ficar sem
			return throwError('não existe');
		}

		if (users[index].type == 'admin' && users.filter(u => u.type == 'admin').length == 1) {
			return throwError('último admin');
		}

 		users.splice(index, 1);


		localStorage.setItem('dbUser', JSON.stringify(users));
		return of(true);
	}

	public login(info: LoginCreds): Observable<TokenCreds> {
		return from (
			<User[]> JSON.parse(localStorage.getItem('dbUser'))
		)
		.pipe(
			find(
				u => u.email == info.email && u.pwd == info.pwd
			),
			map(
				u => {
					return {
						"id": u.id,
						"name": u.name,
						"type": u.type
					};
				}
			)
		);
	}

	public alterarSenha(id: number, atual: string, senha: string): Observable<boolean> {
		let users = <User[]> JSON.parse(localStorage.getItem('dbUser'));

		for (let user of users) {
			if (user.id == id && user.pwd != atual) {
				return throwError('senhas diferentes');
			}
		};

		users = users.filter(
			user => {
				if (user.id == id) {
					user.pwd = senha;
				}
				return user;
			}
		)

		localStorage.setItem('dbUser', JSON.stringify(users));
		return of(true);
	}
}
