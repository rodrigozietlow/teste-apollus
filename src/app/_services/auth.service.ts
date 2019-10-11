import { Injectable } from '@angular/core';
import { DbService } from '@app/_services/db.service';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TokenCreds } from '@app/usuario';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user$: BehaviorSubject<TokenCreds>;
	private _user: TokenCreds;

	public get user(): TokenCreds { return this._user; }
	public set user(user: TokenCreds) {
		this._user = user;
		this.user$.next(user);
	}

	constructor(
		private db: DbService
	) {
		 // criar uma stream subject com padrão do ultimo usuário logado
		this.user$ = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
		// subscrever nela e a cada alteração (set user), salvamos o novo valor em localStorage
		this.user$.subscribe(
			(user: TokenCreds) => localStorage.setItem('user', JSON.stringify(user))
		);

		this._user = JSON.parse(localStorage.getItem('user'));

		/*
		 * Não é um problema criarmos e recuperarmos a sessão via localStorage,
		 * tendo em vista que numa aplicação real tbm precisamos de autenticação
		 * no backend, e, como trabalharemos com tokens, mesmo que o usuário tenha acesso
		 * indevido ao front, ele não vai ter acesso a nenhum dado que venha da API
		 */
	}

	public login(email:string, senha:string): Observable<TokenCreds> {
		let loginCreds = {
			"email": email,
			"pwd": senha
		};
		return this.db.login(loginCreds).pipe(
			tap(
				(u: TokenCreds) => this.user = u // salva no localStorage tbm
			)
		);
	}

	public logout() {
		this.user = null; // isso remove do localStorage tbm

		window.location.href = ''; // recarregar a janela faz tudo recaregar tbm (pra não ter dados sobrando)
	}
}
