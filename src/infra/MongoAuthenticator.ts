import { Authenticator } from '@/domain/contracts/authenticator'
import { ChainHandler } from '@/domain/contracts/chainHandler'
import { HttpClient } from '@/domain/contracts/httpClient'
import { LoginDto } from '@/domain/dtos/loginDto'

export class MongoAuthenticator implements Authenticator {
	constructor(private validatorChain: ChainHandler, private httpClient: HttpClient) {}

	public async login({ username, password }: LoginDto): Promise<unknown> {
		await this.validatorChain.handle({ username, password })
		return await this.httpClient.post('/', { username, password })
	}
}
