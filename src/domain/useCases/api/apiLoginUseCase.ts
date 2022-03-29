import { ChainHandler } from '../../contracts/chainHandler'
import { Crypto } from '../../contracts/crypto'
import { Token } from '../../contracts/token'
import { LoginDto } from '../../dtos/loginDto'
import { LoginUseCase } from '../../contracts/loginUseCase'
import { UserRepository } from '../../contracts/userRepository'
import { AuthDto } from '../../dtos/authDto'

export class ApiLoginUseCase implements LoginUseCase {
	constructor(
		private readonly validatorChain: ChainHandler,
		private readonly userRepository: UserRepository,
		private readonly cryptoHelper: Crypto,
		private readonly tokenHelper: Token
	) {}

	public async login({ username, password }: LoginDto): Promise<AuthDto | null> {
		this.validatorChain.handle({ username, password })
		const user = await this.userRepository.findOneByUsername(username)

		if (!user) return null
		await this.cryptoHelper.compare(password, user.password as string)
		delete user.password

		const accessToken = this.tokenHelper.sign({ user })
		return { token: accessToken, data: user }
	}
}
