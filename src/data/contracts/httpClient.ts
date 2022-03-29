export interface HttpClient {
	post(url: string, body: unknown): Promise<unknown>
}
