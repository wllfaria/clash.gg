import { ChainHandler } from '../../contracts/chainHandler'
import { LoginDto } from '../../dtos/loginDto'
import { LoginUseCase } from '../../contracts/loginUseCase'
import { Authenticator } from '../../contracts/authenticator'

export class AppLoginUseCase implements LoginUseCase {
	constructor(private readonly validatorChain: ChainHandler, private readonly authenticator: Authenticator) {}

	public async login({ username, password }: LoginDto) {
		this.validatorChain.handle({ username, password })
		const user = await this.authenticator.login({ username, password })
		return user
	}
}
