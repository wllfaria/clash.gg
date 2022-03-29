import { AuthDto } from '../../domain/dtos/authDto'
import { HttpBaseResponse } from '../entities/httpBaseResponse'

export interface Router {
	route(request: any): Promise<HttpBaseResponse<AuthDto>>
}
