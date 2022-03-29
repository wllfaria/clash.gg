export interface HttpClient {
	post<T>(url: string, body: unknown): Promise<T>
}
