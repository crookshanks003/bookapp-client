import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from "../../types/user";

const client = axios.create({ baseURL: "http://localhost:8080/user" });

function getConfig(): AxiosRequestConfig {
	const token = localStorage.getItem("token") as string;
	const config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return config;
}

export function loginUser(loginInfo: {email: string, password: string}) {
	return client.post<any, AxiosResponse<{token: string}>>("/login", loginInfo);
}

export function getUserProfile() {
	return client.get<any,AxiosResponse<User, any>>("/get", getConfig());
}
