import { LoginUseCase } from '../../domain/contracts/loginUseCase'
import { AuthDto } from '../../domain/dtos/authDto'
import { User } from '../../domain/types/user'
import { LoginDto } from '../../domain/dtos/loginDto'
import { MissingParamError, InvalidParamError } from '../../utils/errors'
import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from '../../validations'
import { HttpResponse } from '../entities/httpResponse'
import { LoginRouter } from './loginRouter'

class LoginUseCaseSpy implements LoginUseCase {
	public accessToken = 'valid_token'
	public password = ''
	public username = ''

	public async login({ username, password }: LoginDto) {
		this.password = password
		this.username = username
		return { data: {} as User, token: this.accessToken }
	}
}

class LoginUseCaseWithErrorSpy {
	public async login() {
		throw new Error('')
		return {} as AuthDto
	}
}

function makeAuthUseCase() {
	const authUseCase = new LoginUseCaseSpy()
	return authUseCase
}

function makeSut() {
	const loginUseCase = makeAuthUseCase()
	const passwordValidator = new PasswordValidatorChainHandler()
	const usernameValidator = new UsernameValidatorChainHandler()
	passwordValidator.setNext(usernameValidator)
	const sut = new LoginRouter(loginUseCase, passwordValidator)
	return { sut, loginUseCase }
}

function makeAuthUseCaseWithError() {
	const authUseCaseWithError = new LoginUseCaseWithErrorSpy()
	return authUseCaseWithError
}

describe('LoginRouter', () => {
	it('Should return status 400 if invalid username is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			password: 'any_password',
			username: ''
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(new MissingParamError('username').message)
	})

	it('Should return status 400 if invalid password is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			username: 'any_username',
			password: ''
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(new MissingParamError('password').message)
	})

	it('Should return status 400 if empty request body is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: LoginDto = {
			username: '',
			password: ''
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(new MissingParamError('password').message)
	})

	it('Should return 200 if valid data is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			username: 'valid_username',
			password: 'valid_password'
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(200)
	})

	it('Should return 400 if username has less than 3 characters', async () => {
		const { sut } = makeSut()
		const invalidUsername = 'ab'
		const httpRequest = {
			username: invalidUsername,
			password: 'valid_password'
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(
			new InvalidParamError('username', 'username must be at least 3 characters long').message
		)
	})

	it('Should return 400 if username has more than 24 characters', async () => {
		const { sut } = makeSut()
		const invalidUsername = 'too_long_username_provided'
		const httpRequest = {
			username: invalidUsername,
			password: 'valid_password'
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(
			new InvalidParamError('username', 'username must be at most 24 characters long').message
		)
	})

	it('Should return 400 if password has less than 8 characters', async () => {
		const { sut } = makeSut()
		const invalidPassword = '123467'
		const httpRequest = {
			password: invalidPassword,
			username: 'valid_username'
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(400)
		expect(httpResponse.message).toBe(
			new InvalidParamError('password', 'password must be at least 8 characters long').message
		)
	})

	it('Should return an access token if user is authenticated', async () => {
		const { sut, loginUseCase } = makeSut()
		const httpRequest = {
			password: 'valid_password',
			username: 'valid_username'
		}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.status).toBe(200)
		expect(httpResponse.data?.token).toEqual(loginUseCase.accessToken)
	})

	it('Should call authUseCase with correct username', async () => {
		const { sut, loginUseCase } = makeSut()
		const httpRequest = {
			password: 'valid_password',
			username: 'valid_username'
		}

		await sut.route(httpRequest)

		expect(httpRequest.username).toEqual(loginUseCase.username)
	})

	it('Should call authUseCase with correct password', async () => {
		const { sut, loginUseCase } = makeSut()
		const httpRequest = {
			password: 'valid_password',
			username: 'valid_username'
		}

		await sut.route(httpRequest)

		expect(httpRequest.password).toEqual(loginUseCase.password)
	})

	it('Should return status 500 if authUseCase throws', async () => {
		const loginUseCaseWithError = makeAuthUseCaseWithError()
		const validatorChain = new PasswordValidatorChainHandler()
		const usernameValidator = new UsernameValidatorChainHandler()
		validatorChain.setNext(usernameValidator)
		const sut = new LoginRouter(loginUseCaseWithError, validatorChain)
		const httpRequest = {
			password: 'valid_password',
			username: 'valid_username'
		}

		expect(loginUseCaseWithError.login).rejects.toThrow()
		expect(await sut.route(httpRequest)).toEqual(HttpResponse.serverError())
	})
})
