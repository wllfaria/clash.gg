import { Authenticator } from '@/domain/contracts/authenticator'
import { ChainHandler } from '@/domain/contracts/chainHandler'
import { HttpClient } from '@/domain/contracts/httpClient'
import { InvalidParamError, MissingParamError } from '../../../utils/errors'
import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from '../../../validations'
import { LoginDto } from '../../dtos/loginDto'
import { AppLoginUseCase } from './appLoginUseCase'

class MongoAuthenticatorSpy implements Authenticator {
	public loginParams: unknown
	constructor(private readonly validatorChain: ChainHandler, private readonly httpClient: HttpClient) {}

	async login({ username, password }: LoginDto): Promise<unknown> {
		this.loginParams = { username, password }
		await this.validatorChain.handle({ username, password })
		return await this.httpClient.post('/', { username, password })
	}

	async register(): Promise<unknown> {
		return null
	}
}

class HttpClientSpy implements HttpClient {
	public loginParams: unknown
	async post(url: string, body: unknown): Promise<unknown> {
		this.loginParams = { url, body }
		return {}
	}
}

function makeLoginDto(): LoginDto {
	return {
		username: 'valid_username',
		password: 'valid_password'
	}
}

function makeValidatorChain() {
	const usernameValidator = new UsernameValidatorChainHandler()
	const passwordValidator = new PasswordValidatorChainHandler()
	usernameValidator.setNext(passwordValidator)
	return usernameValidator
}

function makeHttpClient() {
	const httpClient = new HttpClientSpy()
	return httpClient
}

function makeAuthenticator() {
	const validatorChain = makeValidatorChain()
	const httpClient = makeHttpClient()
	const authenticator = new MongoAuthenticatorSpy(validatorChain, httpClient)
	return { authenticator, httpClient }
}

function makeSut() {
	const validatorChain = makeValidatorChain()
	const { authenticator, httpClient } = makeAuthenticator()
	const sut = new AppLoginUseCase(validatorChain, authenticator)
	return { sut, authenticator, validatorChain, httpClient }
}

describe('AuthUseCase', () => {
	it('Should throw if invalid username is provided', async () => {
		const { sut } = makeSut()
		const loginDto: LoginDto = {
			password: 'any_password',
			username: ''
		}

		expect(sut.login(loginDto)).rejects.toEqual(new MissingParamError('username'))
		expect(sut.login(loginDto)).rejects.toThrow()
	})

	it('Should throw if invalid password is provided', async () => {
		const { sut } = makeSut()
		const loginDto: LoginDto = {
			password: '',
			username: 'any_username'
		}

		expect(sut.login(loginDto)).rejects.toEqual(new MissingParamError('password'))
		expect(sut.login(loginDto)).rejects.toThrow()
	})

	it('Should throw if short username is provided', async () => {
		const { sut } = makeSut()
		const loginDto: LoginDto = {
			password: 'any_password',
			username: 'ab'
		}

		expect(sut.login(loginDto)).rejects.toEqual(new InvalidParamError('username must be at least 3 characters long'))
		expect(sut.login(loginDto)).rejects.toThrow()
	})

	it('Should throw if short password is provided', async () => {
		const { sut } = makeSut()
		const loginDto: LoginDto = {
			password: 'short',
			username: 'any_username'
		}

		expect(sut.login(loginDto)).rejects.toEqual(new InvalidParamError('password must be at least 8 characters long'))
		expect(sut.login(loginDto)).rejects.toThrow()
	})

	it('Should return user data when valid data is provided', async () => {
		const { sut } = makeSut()
		const user = await sut.login(makeLoginDto())

		expect(user).toBeTruthy()
		expect(user).toBeDefined()
	})

	it('Should throw if too long username is provided', async () => {
		const { sut } = makeSut()
		const loginDto: LoginDto = {
			password: 'any_password',
			username: 'too_long_username_provided'
		}

		expect(sut.login(loginDto)).rejects.toEqual(new InvalidParamError('username must be at most 24 characters long'))
		expect(sut.login(loginDto)).rejects.toThrow()
	})

	it('Should call httpClient with correct params', async () => {
		const { sut, httpClient } = makeSut()
		await sut.login(makeLoginDto())

		expect(httpClient.loginParams).toStrictEqual({ url: '/', body: makeLoginDto() })
	})

	it('Should call httpClient with correct params', async () => {
		const { sut, authenticator } = makeSut()
		await sut.login(makeLoginDto())

		expect(authenticator.loginParams).toStrictEqual(makeLoginDto())
	})
})
