import { HttpClient } from '@/domain/contracts/httpClient'

export class AxiosHttpClient implements HttpClient {
	public async post(_url: string, _body: unknown): Promise<unknown> {
		return ''
	}
}
