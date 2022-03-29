import { Authenticator } from '@/domain/contracts/authenticator'
import { ChainHandler } from '@/domain/contracts/chainHandler'
import { HttpClient } from 'data/contracts/httpClient'
import { LoginDto } from '@/domain/dtos/loginDto'
import { RegisterDto } from '@/domain/dtos/registerDto'

export class MongoAuthenticator implements Authenticator {
	constructor(private validatorChain: ChainHandler, private httpClient: HttpClient) {}

	public async login({ username, password }: LoginDto): Promise<unknown> {
		await this.validatorChain.handle({ username, password })
		return await this.httpClient.post('/', { username, password })
	}

	public async register({ username, password, email }: RegisterDto): Promise<unknown> {
		await this.validatorChain.handle({ username, password, email })
		return await this.httpClient.post('/', { username, password, email })
	}
}
