import { LoginUseCase } from '../../domain/contracts/loginUseCase'
import { LoginDto } from '../../domain/dtos/loginDto'
import { MissingParamError, InvalidParamError } from '../../utils/errors'
import { ChainHandler } from '../../domain/contracts/chainHandler'
import { Router } from '../contracts/router'
import { HttpResponse } from '../entities/httpResponse'
import { HttpBaseResponse } from '../entities/httpBaseResponse'
import { AuthDto } from '../../domain/dtos/authDto'

export class LoginRouter implements Router {
	constructor(private readonly authUseCase: LoginUseCase, private readonly validatorChain: ChainHandler) {}

	public async route({ username, password }: LoginDto): Promise<HttpBaseResponse<AuthDto>> {
		try {
			this.validatorChain.handle({ username, password })
			const authDto = await this.authUseCase.login({ username, password })
			return HttpResponse.ok<AuthDto>({ token: authDto?.token, data: authDto?.data })
		} catch (err) {
			if (err instanceof MissingParamError) return HttpResponse.badRequest(err)
			if (err instanceof InvalidParamError) return HttpResponse.badRequest(err)
			return HttpResponse.serverError()
		}
	}
}
