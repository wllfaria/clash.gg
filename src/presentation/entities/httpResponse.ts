import { HttpBaseResponse } from './httpBaseResponse'

export class HttpResponse {
	public static ok<T>(data: T): HttpBaseResponse<T> {
		return new HttpBaseResponse({ status: 200, data })
	}

	public static created<T>(data: any): HttpBaseResponse<T> {
		return new HttpBaseResponse({ status: 201, data })
	}

	public static badRequest<T>(error: Error): HttpBaseResponse<T> {
		return new HttpBaseResponse({ status: 400, message: error.message, error })
	}

	public static serverError<T>(): HttpBaseResponse<T> {
		return new HttpBaseResponse({ status: 500, message: 'Unexpected error' })
	}
}
