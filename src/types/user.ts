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

export interface RegisterUserDto {
	email: string;
	password: string;
	name: string;
	rollNumber: string;
}
