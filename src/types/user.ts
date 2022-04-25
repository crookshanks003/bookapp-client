export enum Role {
	ADMIN = "ADMIN",
	USER = "USER",
}

export interface User {
	id: number;
	name: string;
	email: string;
	rollNumber: string;
	role: Role;
	wallet: number;
}
