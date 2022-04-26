import { getConfig } from "../utils/localStorageUtils";
import axios, { AxiosResponse } from "axios";
import { AddBookDto, Book } from "../../types/book";

const client = axios.create({ baseURL: "http://localhost:8080/book" });

export function getBookById(id: number){
	return client.get<any, AxiosResponse<Book>>(`/${id}`, getConfig());
}

export function addBook(book: AddBookDto){
	return client.post("/add", book, getConfig());
}
