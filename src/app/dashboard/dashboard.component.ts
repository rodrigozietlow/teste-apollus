import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { AuthService } from '@app/_services/auth.service';
import { DbService } from '@app/_services/db.service';
import { User } from '@app/usuario';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

	public users: User[];
	public carregando = false;
	public pesquisa: string = "";

	private internalSearchMechanism$ = new Subject<string>();
	private searchSubscription: Subscription;

	get elevacao() { return this.auth.user.type == 'admin'; }

	constructor(
		private auth: AuthService,
		private db: DbService,
	) { }

	ngOnInit() {
		this.carregarUsers();

		this.searchSubscription = this.internalSearchMechanism$
		.pipe(
			debounceTime(500),
			distinctUntilChanged(),
		)
		.subscribe(
			() => this.carregarUsers()
		);
	}

	ngOnDestroy() {
		this.searchSubscription.unsubscribe();
	}

	private carregarUsers() {
		this.carregando = true;
		this.db.pesquisarUsers(this.pesquisa).subscribe(
			(users: User[]) => {
				this.users = users;
				this.carregando = false;
			}
		);
	}

	excluir(u: User) {
		this.db.removeUser(u.id).subscribe(
			result => this.carregarUsers(),
			error => alert('Não foi possível excluir este usuário')
		);
	}

	pesquisar(pesquisa: string) {
		this.internalSearchMechanism$.next(pesquisa);
	}

}
