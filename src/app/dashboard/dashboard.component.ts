import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	get elevacao() { return this.auth.user.type == 'admin'; }

	constructor(
		private auth: AuthService,
	) { }

	ngOnInit() {
	}

}
