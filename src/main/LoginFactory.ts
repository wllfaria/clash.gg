import { ChainHandler } from '@/domain/contracts/chainHandler'
import { HttpClient } from 'data/contracts/httpClient'
import { MongoAuthenticator } from 'data/MongoAuthenticator'
import { AxiosHttpClient } from 'infra/AxiosHttpClient'
import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from 'validations'

export class LoginFactory {
	public static make() {
		const validatorChain = LoginFactory.validators
		const httpClient = LoginFactory.httpClient
		return LoginFactory.authenticator(validatorChain, httpClient)
	}

	private static get validators() {
		const usernameValidator = new UsernameValidatorChainHandler()
		const passwordValidator = new PasswordValidatorChainHandler()
		usernameValidator.setNext(passwordValidator)
		return usernameValidator
	}

	private static get httpClient() {
		return new AxiosHttpClient()
	}

	private static authenticator(validatorChain: ChainHandler, httpClient: HttpClient) {
		return new MongoAuthenticator(validatorChain, httpClient)
	}
}
