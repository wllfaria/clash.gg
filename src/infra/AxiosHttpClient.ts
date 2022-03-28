import { HttpClient } from '@/domain/contracts/httpClient'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
	public async post(url: string, body: unknown): Promise<unknown> {
		return axios.post(url, body)
	}
}
