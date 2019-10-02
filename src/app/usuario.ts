// data model que usaremos como usuário
export interface User {
	id?: number;
	name: string;
	email: string;
	pwd?: string;
	type: string;
}

// interface que será enviada ao submeter um login
export interface LoginCreds {
	email: string;
	pwd: string;
}

// interface retornada do login no caso de sucesso
export interface TokenCreds {
	id: number;
	name: string;
	type: string;
}
