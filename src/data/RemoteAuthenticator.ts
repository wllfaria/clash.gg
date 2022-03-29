import { Authenticator } from '../domain/contracts/authenticator'
import { ChainHandler } from '../domain/contracts/chainHandler'
import { HttpClient } from './contracts/httpClient'
import { LoginDto } from '../domain/dtos/loginDto'
import { RegisterDto } from '../domain/dtos/registerDto'
import { AuthDto } from '../domain/dtos/authDto'

export class RemoteAuthenticator implements Authenticator {
	constructor(private validatorChain: ChainHandler, private httpClient: HttpClient) {}

	public async login({ username, password }: LoginDto): Promise<AuthDto> {
		await this.validatorChain.handle({ username, password })
		return await this.httpClient.post<AuthDto>('/login', { username, password })
	}

	public async register({ username, password, email }: RegisterDto): Promise<AuthDto> {
		await this.validatorChain.handle({ username, password, email })
		return await this.httpClient.post<AuthDto>('/register', { username, password, email })
	}
}
