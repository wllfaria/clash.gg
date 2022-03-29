import { HttpClient } from '../data/contracts/httpClient'
import axios, { AxiosInstance } from 'axios'

export class AxiosHttpClient implements HttpClient {
	private axios: AxiosInstance

	constructor() {
		this.config()
	}

	private config() {
		this.axios = axios.create({
			baseURL: '/api'
		})
	}

	public async post<T>(url: string, body: unknown): Promise<T> {
		return this.axios.post(url, body)
	}
}
