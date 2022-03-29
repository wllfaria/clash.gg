export class HttpBaseResponse<T> {
	public status: number
	public data?: T
	public error?: Error
	public message?: string

	constructor({ status, data, error, message }: HttpBaseResponse<T>) {
		this.status = status
		this.data = data
		this.error = error
		this.message = message
	}
}
